import { useCallback, useEffect, useMemo } from 'react'

import { atom, useAtomValue } from 'jotai'
import { useReducerAtom } from 'jotai/utils'
import { ASYNC_STATUS, ASYNC_STATUS_ID, BALANCE_EVENT, TX_TYPE } from 'constants/index'
import { useLiquidityContract, useYoloWalletContract } from 'hooks/contracts/useContract'
import { useCustomEventListener } from 'react-custom-events'
import { getTxEvents } from 'redux/slices/wallet/Updaters/Transactions.updater'
import { useToken } from 'utils/hooks/useToken'
import { Zero } from '@ethersproject/constants'
import { BLOCKCHAIN_PULL_INTERVAL } from 'constants/crypto'
import { useIntervalWhen } from 'utils/hooks/useIntervalWhen'
import { useUser } from 'hooks/user/useUser'

const YLP_BALANCE_INIT = {
  status: ASYNC_STATUS.PENDING,

  ylpTokenId: '',
  withdrawableTokenId: '',
  tvlTokenId: '',

  ylpTotalSupplyBN: Zero,
  ylpBalanceBN: Zero,
  withdrawableBalanceBN: Zero,
  convertRateBN: Zero,
  tvlBalanceBN: Zero
}

const ylpBalanceAtom = atom(YLP_BALANCE_INIT)

const useUpdateYlpBalance = () => {
  const { tokenId: ylpTokenId, formatToken: formatYlp } = useToken('YLP')
  const { tokenId, formatToken } = useToken()
  const { account } = useUser('wallet')
  const yoloWalletContract = useYoloWalletContract()
  const liquidityContract = useLiquidityContract()

  const [, dispatch] = useReducerAtom(ylpBalanceAtom, (prev, action) => {
    switch (action.type) {
      case 'PENDING':
        return {
          ...prev,
          status: ASYNC_STATUS.PENDING
        }
      case 'UPDATED':
        return {
          ...prev,
          status: ASYNC_STATUS.IDLE,
          ...action.payload
        }
      case 'ERROR':
        return {
          ...prev,
          status: {
            ...ASYNC_STATUS.ERROR,
            message: action.payload
          }
        }
      default:
        return prev
    }
  })

  const updateYlpBalance = useCallback(async () => {
    dispatch({ type: 'PENDING' })
    try {
      const ylpTotalSupplyBN =
        (await liquidityContract?.totalSupply().catch((err) => {
          dispatch({ Type: 'ERROR', payload: err })
        })) || Zero
      const ylpBalanceBN =
        (await liquidityContract?.balanceOf(account).catch((err) => {
          dispatch({ Type: 'ERROR', payload: err })
        })) || Zero

      const withdrawableBalanceBN =
        (await liquidityContract?.getTokensRedeemed(ylpBalanceBN).catch((err) => {
          dispatch({ Type: 'ERROR', payload: err })
        })) || Zero

      const tvlBalanceBN =
        (await yoloWalletContract?.balances(liquidityContract.address.toLowerCase()).catch((err) => {
          dispatch({ Type: 'ERROR', payload: err })
        })) || Zero

      const convertRateBN = withdrawableBalanceBN.isZero() ? Zero : ylpBalanceBN.div(withdrawableBalanceBN) // USDC/YLP

      dispatch({
        type: 'UPDATED',
        payload: {
          ylpTokenId: ylpTokenId,
          withdrawableTokenId: tokenId,
          tvlTokenId: tokenId,

          ylpTotalSupplyBN,
          ylpBalanceBN,
          withdrawableBalanceBN,
          convertRateBN,
          tvlBalanceBN
        }
      })
    } catch (err) {
      console.log('ACZ err -->', err)
      dispatch({ Type: 'ERROR', payload: err })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, yoloWalletContract, liquidityContract])

  return updateYlpBalance
}

export const YlpBalanceUpdater = () => {
  const { address: yoloWalletAddress } = useYoloWalletContract() || {}

  const updateYlpBalance = useUpdateYlpBalance()

  useEffect(() => {
    updateYlpBalance()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yoloWalletAddress])

  // Balance Puller from BlockChain
  useIntervalWhen(updateYlpBalance, BLOCKCHAIN_PULL_INTERVAL, true, true)

  //YLP balance update event Listener
  useCustomEventListener(BALANCE_EVENT.UPDATE_YLP, updateYlpBalance)

  //Deposit TX event listener
  const depositEvents = getTxEvents(TX_TYPE.YOLO_DEPOSIT)
  useCustomEventListener(depositEvents.confirmed, updateYlpBalance)
  useCustomEventListener(depositEvents.error, updateYlpBalance)

  //Withdraw TX event listener
  const ylpWithdrawEvents = getTxEvents(TX_TYPE.YLP_WITHDRAW)
  useCustomEventListener(ylpWithdrawEvents.confirmed, updateYlpBalance)
  useCustomEventListener(ylpWithdrawEvents.error, updateYlpBalance)

  return null
}

export const useYlpBalance = (optionObj) => {
  const { silentUpdate } = { silentUpdate: false, ...optionObj }
  const ylpBalance = useAtomValue(ylpBalanceAtom)
  const status = ylpBalance.status

  const hasStatus = useCallback((statusToCheck) => status.id === statusToCheck, [status.id])
  const isLoading = useMemo(
    () => (silentUpdate ? false : hasStatus(ASYNC_STATUS_ID.PENDING)),
    [silentUpdate, hasStatus]
  )

  return { ...ylpBalance, status, hasStatus, isYlpLoading: isLoading }
}

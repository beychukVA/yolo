import { useCallback, useEffect, useState } from 'react'
import { getTxEvents } from 'redux/slices/wallet/Updaters/Transactions.updater'

import { Zero } from '@ethersproject/constants'
import { config } from 'config'
import { getLocalTokenApprovalStatus, setLocalTokenApprove } from 'utils/localStorage/tokenApproval'

import { useERC20Contract } from 'hooks/contracts/useContract'
import { useTxsCache } from 'hooks/useTxsCache'
import { ASYNC_STATUS, TX_TYPE } from 'constants/index'
import { useCustomEventListener } from 'react-custom-events'
import { useToken } from 'utils/hooks/useToken'
import { useYoloModal } from 'lib/yoloModals/useYoloModal'
import { useUser } from 'hooks/user/useUser'

export const useERC20Approval = (ERC20ContractId, spenderAddress, tokenId) => {
  const { account, isProxy, chainId } = useUser('wallet')
  const ERC20Contract = useERC20Contract(ERC20ContractId)
  const txRegister = useTxsCache()
  const { updateModal } = useYoloModal()

  const [isERC20Approved, setIsERC20Approved] = useState(
    isProxy || getLocalTokenApprovalStatus(account, ERC20Contract?.address, spenderAddress)
  )
  const [status, setStatus] = useState(ASYNC_STATUS.IDLE)

  const txEvents = getTxEvents(TX_TYPE.APPROVE)

  const getTokenStatusFromContract = useCallback(async () => {
    if (isProxy) {
      setIsERC20Approved(true)
      return
    }
    if (!ERC20Contract) return
    const isERC20ApprovedContract = (
      await ERC20Contract.allowance(account, spenderAddress.toLowerCase()).catch((err) => {
        console.log('tokenContract call error -->', err)
        setStatus({ id: 'error', message: err })
      })
    )?.gt(Zero)
    if (!isERC20ApprovedContract) {
      updateModal({
        id: 'approvalERC20',
        show: true,
        priority: 2,
        backdropClose: false,
        props: { ERC20ContractId, spenderAddress, tokenId }
      })
    }
    setLocalTokenApprove(account, ERC20Contract.address, spenderAddress, isERC20ApprovedContract)
    setIsERC20Approved(isERC20ApprovedContract)
  }, [spenderAddress, account, ERC20Contract, ERC20ContractId, tokenId])

  const approveERC20 = useCallback(
    (clear = false) => {
      const { UINT256_MAX } = config
      const txParams = {
        spender: spenderAddress.toLowerCase(),
        amount: clear ? 0 : UINT256_MAX
      }
      setStatus(ASYNC_STATUS.PENDING)
      ERC20Contract.approve(txParams.spender, txParams.amount)
        .then(async (txResponse) => {
          txRegister({
            from: account,
            hash: txResponse.hash,
            txParams,
            txType: TX_TYPE.APPROVE
          })
        })
        .catch((error) => {
          console.log('txResponse (error) -->', error)
          setStatus({ ...ASYNC_STATUS.ERROR, message: error })
        })
    },
    [account, spenderAddress, ERC20Contract, txRegister]
  )

  useEffect(() => {
    if (!isERC20Approved) {
      getTokenStatusFromContract()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isERC20Approved, account, chainId])

  /**
   * CUSTOM EVENTS LISTENER
   */
  //OnHash
  useCustomEventListener(txEvents.hash, (txInfo) => {})
  //onConfirmed
  useCustomEventListener(txEvents.confirmed, (txInfo) => {
    getTokenStatusFromContract()
    setStatus(ASYNC_STATUS.CONFIRMED)
  })
  //OnError
  useCustomEventListener(txEvents.error, (txInfo) => {
    setStatus({ ...ASYNC_STATUS.ERROR, message: 'error' })
  })

  return { isERC20Approved, approveERC20, status }
}

export const useYlpApproval = (spenderAddress) => {
  const { isERC20Approved, approveERC20, status } = useERC20Approval('liquidity', spenderAddress)
  return { isYlpApproved: isERC20Approved, approveYlp: approveERC20, status }
}

export const useStakedApproval = (spenderAddress) => {
  const { isYlpApproved, approveYlp, status } = useYlpApproval(spenderAddress)
  return { isStakedApproved: isYlpApproved, approveStaked: approveYlp, status }
}

export const useTokenApproval = (spenderAddress) => {
  const { tokenId } = useToken()
  const contractId = { USDC: 'USDC', YOLO: 'token' }
  const { isERC20Approved, approveERC20, status } = useERC20Approval(contractId[tokenId], spenderAddress, tokenId)
  return { isTokenApproved: isERC20Approved, approveToken: approveERC20, status }
}

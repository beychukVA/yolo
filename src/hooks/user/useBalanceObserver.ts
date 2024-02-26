import { config } from 'config/index'
import { API } from 'constants/apiEndPoints'
import { BLOCKCHAIN_PULL_INTERVAL } from 'constants/crypto'
import { EVENTS } from 'constants/events.js'
import { ASYNC_STATUS_ID, TX_TYPE } from 'constants/index'
import { useGatewayListener } from 'hooks/sockets/lvg/useGatewaySocket'
import { useUnclaimedBalance } from 'hooks/unclaimedEarning/useUnclaimedBalance'
import { useCallback, useEffect } from 'react'
import { emitCustomEvent, useCustomEventListener } from 'react-custom-events'
import { getTxEvents } from 'redux/slices/wallet/Updaters/Transactions.updater'
import { useAPI } from 'utils/hooks/useAPI'
import { useIntervalWhen } from 'utils/hooks/useIntervalWhen'

import { Balance } from './user.d'
import { useUser, useUserUpdaters } from './useUser'

const useUpdateTokenBalance = () => {
  const { isProxy } = useUser('wallet')
  const { updateUserBalance } = useUserUpdaters()
  const { data: earningsData } = useUnclaimedBalance()
  const [balanceState, sendBalanceQuery, hasBalanceStatus] = useAPI(API.ACCOUNT_BALANCE, {
    queryType: 'get',
    controlled: true,
    withJwt: true
  })
  useEffect(() => {
    if (hasBalanceStatus(ASYNC_STATUS_ID.ERROR)) {
      // const { message } = balanceState.status
    }
    if (hasBalanceStatus(ASYNC_STATUS_ID.CONFIRMED)) {
      const { tokenAmount, yoloWalletAmount } = balanceState.data
      const earningsBalanceBN = earningsData.totalUnclaimedAmount
      updateUserBalance({
        tokenId: config.DEFAULT_TOKEN,
        earningsBalance: earningsBalanceBN.toString(),
        tokenAmount,
        yoloWalletAmount
      })
      emitCustomEvent(EVENTS.BALANCE_UPDATE)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balanceState.status?.id])

  const updateBalance = useCallback(async () => {
    sendBalanceQuery({
      params: {
        isMetamask: !isProxy
      }
    })
  }, [isProxy, sendBalanceQuery])
  const updateBalanceGateway = useCallback(
    (balanceObj: Partial<Balance>) => {
      updateUserBalance({ tokenId: config.DEFAULT_TOKEN, ...balanceObj })
      emitCustomEvent(EVENTS.BALANCE_UPDATE)
    },
    [updateUserBalance]
  )
  return { updateBalance, updateBalanceGateway }
}

export const useBalanceObserver = () => {
  const { isProxy } = useUser('wallet')
  const { updateBalance: updateTokensBalance, updateBalanceGateway } = useUpdateTokenBalance()

  // Balance API Puller
  useIntervalWhen(updateTokensBalance, BLOCKCHAIN_PULL_INTERVAL, isProxy !== null, true)

  // Gateway user.balance listener
  /* prettier-ignore */ useGatewayListener('user.balance', (balanceObj: Partial<Balance>) => updateBalanceGateway(balanceObj))

  // Balance change Listener
  useCustomEventListener(EVENTS.BALANCE_GATEWAY_UPDATE, updateBalanceGateway)

  //NFT TX event listener
  const nftTxEvents = getTxEvents(TX_TYPE.CLAIM_NFT)
  useCustomEventListener(nftTxEvents.confirmed, updateTokensBalance)
  useCustomEventListener(nftTxEvents.error, updateTokensBalance)

  //BID TX event listener
  const bidTxEvents = getTxEvents(TX_TYPE.BID)
  useCustomEventListener(bidTxEvents.confirmed, updateTokensBalance)
  useCustomEventListener(bidTxEvents.error, updateTokensBalance)

  //WITHDRAW TX event listener
  const withdrawTxEvents = getTxEvents(TX_TYPE.WALLET_WITHDRAW)
  useCustomEventListener(withdrawTxEvents.confirmed, updateTokensBalance)
  useCustomEventListener(withdrawTxEvents.error, updateTokensBalance)

  //HARVEST TX event listener
  const harvestTxEvents = getTxEvents(TX_TYPE.YLP_HARVEST)
  useCustomEventListener(harvestTxEvents.confirmed, updateTokensBalance)
  useCustomEventListener(harvestTxEvents.error, updateTokensBalance)

  //IN-APP USER WALLET event listener
  useCustomEventListener(EVENTS.APP_WALLET_WITHDRAW, updateTokensBalance)

  //GAME RESULT event listener
  useCustomEventListener(EVENTS.GAME_WON, updateTokensBalance)
  useCustomEventListener(EVENTS.GAME_LOST, updateTokensBalance)
  useCustomEventListener(EVENTS.GAME_PUSHED, updateTokensBalance)

  //CLAIM EARNING event listener
  useCustomEventListener(EVENTS.CLAIM_EARNINGS, updateTokensBalance)

  //LIQUIDITY TOKEN event listener
  useCustomEventListener(EVENTS.YLP_TOKEN_DEPOSIT, updateTokensBalance)
  useCustomEventListener(EVENTS.YLP_TOKEN_WITHDRAW, updateTokensBalance)
}

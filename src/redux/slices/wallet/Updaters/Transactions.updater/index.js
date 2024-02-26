import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reduxWalletActions } from '../../actions'

import { selectPendingTxHashes } from 'redux/selectors'
import { Updater } from './Updater'
import { emitCustomEvent } from 'react-custom-events'
import { TX_TYPE } from 'constants/index'
import { config } from 'config'

export const getTxEvents = (txType) => ({
  hash: `onTxHash/${TX_TYPE[txType]}`,
  confirm: `onTxConfirm/${TX_TYPE[txType]}`,
  confirmed: `onTxConfirmed/${TX_TYPE[txType]}`,
  error: `onTxError/${TX_TYPE[txType]}`
})

export const TransactionsUpdater = () => {
  const dispatch = useDispatch()
  const pendingTxHashes = useSelector(selectPendingTxHashes())

  const onConfirm = useCallback(
    ({ chainId, hash, receipt, txType, txParams, gameId }) => {
      const confirmations = receipt.confirmations
      const confirmed = confirmations >= config.MIN_CONFIRMATIONS
      const confirmedEvent = getTxEvents(txType)[confirmed ? 'confirmed' : 'confirm']

      console.log('ACZ txInfo (confirmed) -->', { chainId, hash, txType, txParams, gameId, receipt, confirmations })
      dispatch(reduxWalletActions.removePendingTxHash(hash))
      dispatch(reduxWalletActions.updateTxConfirmations({ chainId, hash, confirmations }))
      emitCustomEvent(confirmedEvent, { chainId, hash, txType, txParams, gameId, receipt, confirmations })
    },
    [dispatch]
  )

  const onError = useCallback(
    ({ chainId, hash, txType, txParams, gameId, error }) => {
      console.log('ACZ txInfo (error) -->', { chainId, hash, txType, txParams, gameId, error })
      const errorEvent = getTxEvents(txType).error
      dispatch(reduxWalletActions.updateTxError({ chainId, hash, txType, txParams, gameId, error }))
      emitCustomEvent(errorEvent, { chainId, hash, txType, txParams, gameId, error })
    },
    [dispatch]
  )
  return <Updater pendingTxHashes={pendingTxHashes} onConfirm={onConfirm} onError={onError} />
}

import { useCallback, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { selectWalletTxs } from '../../selectors'
import { config } from 'config'
import { useUser } from 'hooks/user/useUser'

export const Updater = ({ pendingTxHashes, onConfirm, onError }) => {
  const { library, chainId } = useUser('wallet')
  const txs = useSelector(selectWalletTxs())
  const waitingHashes = useRef()

  useEffect(() => {
    waitingHashes.current = []
  }, [])

  const getReceipt = useCallback(
    (hash) => {
      if (waitingHashes.current.includes(hash)) return
      waitingHashes.current.push(hash)
      if (!library || !chainId) throw new Error('No library or chainId')
      return library.waitForTransaction(hash, config.MIN_CONFIRMATIONS)
    },
    [chainId, library]
  )

  useEffect(() => {
    if (!chainId || !library) return
    pendingTxHashes.map((hash) => {
      const promise = getReceipt(hash)
      const { txType, txParams, gameId } = txs.filter((tx) => tx.hash === hash)?.[0] || {}
      promise
        ?.then(async (receipt) => {
          if (receipt) {
            onConfirm({ chainId, hash, receipt, txType, txParams, gameId })
          } else {
            console.warn(`ACZ Failed to get transaction receipt for ${hash}`)
            onError({ chainId, hash, txType, error: null })
          }
          return
        })
        .catch((error) => {
          if (!error.isCancelledError) {
            console.warn(`ACZ Failed to get transaction update ${hash}`, error)
            onError({ chainId, hash, txType, txParams, gameId, error })
          }
        })
      return true
    })
  }, [chainId, library, getReceipt, onError, onConfirm, txs, pendingTxHashes])

  return null
}

import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { walletReducerActions } from 'redux/slices/wallet'
import { localTxActions } from 'redux/slices/wallet/localTxActions'
import { emitCustomEvent } from 'react-custom-events'
import { getTxEvents } from 'redux/slices/wallet/Updaters/Transactions.updater'
import { atom, useSetAtom } from 'jotai'
import { useUser } from './user/useUser'

const TX_CACHE_INITIAL = {
  pendingTxHashes: [],
  txs: {}
}
// ACZ - WIP this will be improved to make a better manage of the cached Tx, now are managed by Wallet Slice in Redux
// const txsCacheAtom = atomWithStorage('TXC', TX_CACHE_INITIAL)
const txsCacheAtom = atom(TX_CACHE_INITIAL)

const addTxCacheAtom = atom(null, (get, set, newTx) => {
  console.log('ACZ Add TX -->', newTx)
  const { chainId, hash } = newTx
  set(txsCacheAtom, (prev) => ({
    pendingTxHashes: [...prev.pendingTxHashes, hash],
    txs: {
      ...prev.txs,
      [chainId]: {
        ...prev.txs[chainId],
        [hash]: {
          ...newTx,
          status: 'pending',
          confirmations: 0,
          isConfirmed: false,
          timestamp: Math.round(Date.now() / 1000)
        }
      }
    }
  }))
})

// const updateTxCacheAtom = atom(null, (get, set, updateTx) => {
//   console.log('ACZ Update TX -->', updateTx)
//   const { chainId, hash } = updateTx
//   set(txsCacheAtom, (prev) => ({ ...prev }))
// })

export const useTxsCache = () => {
  const dispatch = useDispatch()
  const { chainId } = useUser('wallet')
  const addTxCache = useSetAtom(addTxCacheAtom)
  const txRegister = useCallback(
    (txInfo) => {
      // txInfo = {from, hash, params, txType, eventListenersCb}
      console.log('ACZ txInfo (hash) -->', txInfo)
      const txEvents = getTxEvents(txInfo.txType)
      const payload = { ...txInfo }
      addTxCache(payload)
      emitCustomEvent(txEvents.hash, payload)
    },
    [chainId, dispatch, addTxCache]
  )
  return txRegister
}

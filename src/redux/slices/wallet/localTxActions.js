import { mapValues } from 'lodash'

import { config } from 'config'

import { TRANSACTIONS } from 'constants/index'

const LOCAL_PERSISTANCE = config.LOCAL_TX_PERSISTANCE

export const localTxActions = {
  getTxs: (chainId) => {
    const storedTxs = window.localStorage.getItem(TRANSACTIONS) || '{}'
    const parsedTxs = JSON.parse(storedTxs)
    mapValues(parsedTxs, (txs, chainId) => {
      const newTxs = mapValues(txs, (tx, hash, array) => {
        const now = Date.now() / 1000
        const txTimeGap = now - tx.timestamp
        if (txTimeGap > LOCAL_PERSISTANCE) {
          localTxActions.clearTx(chainId, hash)
        }
        return tx
      })
      return newTxs
    })
    const newStoredTxs = window.localStorage.getItem(TRANSACTIONS) || '{}'
    const newParsedTxs = JSON.parse(newStoredTxs)
    const txs = chainId ? newParsedTxs[chainId] : newParsedTxs
    return txs
  },
  addTx: (chainId, { hash, txParams, txType }) => {
    const newTx = {
      [hash]: {
        hash,
        confirmations: 0,
        isConfirmed: false,
        from: '',
        timestamp: Date.now() / 1000,
        txParams,
        txType
      }
    }
    const storedTxs = window.localStorage.getItem(TRANSACTIONS) || '{}'
    const TXS = JSON.parse(storedTxs)
    //ACZ - this is here for legacy compatibility, will removed once the migration is completed
    const TxsByChainId = { ...TXS[chainId], ...newTx }
    const newTXS = { ...TXS, [chainId]: TxsByChainId }
    window.localStorage.setItem(TRANSACTIONS, JSON.stringify(newTXS))
  },
  updateTx: (chainId, txInfo) => {
    const storedTxs = window.localStorage.getItem(TRANSACTIONS) || '{}'
    const TXS = JSON.parse(storedTxs)
    //ACZ - this is here for legacy compatibility, will removed once the migration is completed
    const TxsByChainId = { ...TXS[chainId], ...txInfo }
    const newTXS = { ...TXS, [chainId]: TxsByChainId }
    window.localStorage.setItem(TRANSACTIONS, JSON.stringify(newTXS))
  },
  clearTx: (chainId, hash) => {
    const storedTxs = window.localStorage.getItem(TRANSACTIONS) || '{}'
    const TXS = JSON.parse(storedTxs)
    //ACZ - this is here for legacy compatibility, will removed once the migration is completed
    const TxsByChainId = TXS[chainId]
    delete TxsByChainId[hash]
    const newTXS = { ...TXS, [chainId]: TxsByChainId }
    window.localStorage.setItem(TRANSACTIONS, JSON.stringify(newTXS))
  }
}

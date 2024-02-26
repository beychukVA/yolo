import { createSelector } from '@reduxjs/toolkit'
import { TX_TYPE } from 'constants/index'

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

// We need to define all the selector as closures in this case we can use them to pass externals parameters from the component

/**
 * Wallet
 */

export const selectWalletConnectionState = () => (state) => state.wallet.isConnected
export const selectWalletProviderInfo = () => (state) => state.wallet.providerInfo
export const selectYoloEarning = () => (state) => state.wallet.yoloEarnings
export const selectChainInfo = () => (state) => state.wallet.chainInfo
export const selectWalletHasNFT = () => (state) => state.wallet.hasNFT
export const selectAvailableNetworkIds = () => (state) => state.wallet.approvedNetworkIds
export const selectClaimExpirationTime = () => (state) => state.wallet.claimExpirationTime
export const selectHasPendingTx = () =>
  createSelector(
    (state) => state.wallet.pendingTxHashes,
    (pendingTxHashes) => !!pendingTxHashes.length
  )
export const selectPendingTxHashes = () =>
  createSelector(
    (state) => state.wallet.pendingTxHashes,
    (pendingTxHashes) => (pendingTxHashes.length ? pendingTxHashes : [])
  )
export const selectWalletTxs = () =>
  createSelector(
    (state) => state.wallet.txs,
    selectChainInfo(),
    (txs, chainInfo) => {
      const { chainId, explorerTxTemplate } = chainInfo || {}
      const selectedTxs = txs[chainId] || {}
      const txList = Object.values(selectedTxs).map((item) => {
        return {
          ...item,
          txScanUrl: explorerTxTemplate.replace('[hashAddress]', item.hash)
        }
      })
      return txList.sort((a, b) => b.timestamp - a.timestamp)
    }
  )

export const selectWalletBids = () =>
  createSelector(
    (state) => state.wallet.txs,
    selectChainInfo(),
    (txs, chainInfo) => {
      const { chainId, explorerTxTemplate } = chainInfo || {}
      const selectedTxs = txs[chainId] || {}
      const txList = Object.values(selectedTxs).map((item) => {
        return {
          ...item,
          txScanUrl: explorerTxTemplate.replace('[hashAddress]', item.hash)
        }
      })
      return txList.filter((item) => item.txType === TX_TYPE.BID).sort((a, b) => b.timestamp - a.timestamp)
    }
  )
export const selectWaitListInfo = () => (state) =>
  createSelector(
    (state) => state.wallet.waitlistInfo.waitlistId,
    (state) => state.wallet.waitlistInfo.total,
    (waitlistId, total) => ({ waitlistId, total })
  )(state)

import { SUPPORTED_WALLETS } from 'constants/wallet'
import { injected } from 'connectors'

export const getWalletInfo = ({ connector }) => {
  let selectedWallet = null
  const isMetamask = window.ethereum?.isMetamask
  Object.keys(SUPPORTED_WALLETS).map((key) => {
    const wallet = SUPPORTED_WALLETS[key]
    if (wallet.connector === connector) {
      if (wallet.connector === injected && isMetamask) {
        selectedWallet = SUPPORTED_WALLETS['METAMASK']
      }
      selectedWallet = wallet
    }
  })
  return selectedWallet
}

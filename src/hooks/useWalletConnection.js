import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { reduxWalletActions } from 'redux/actions'
import { useReconnectionFlag } from './web3'
import { isMobile } from 'utils/userAgent'
import { useReactGA4 } from 'GA4/useReactGA4'
import { useYoloModal } from 'lib/yoloModals/useYoloModal'
import { useUser } from './user/useUser'

const WALLET_SELECTOR_OBJECT = {
  // this component will receive `closeModal` prop to close programmatically the modal
  show: true,
  id: 'walletSelector',
  backdropClose: false,
  backdropBlurred: isMobile
}

export const useWalletConnection = () => {
  const { gaEvent } = useReactGA4()
  const dispatch = useDispatch()
  const { updateModal, clearModal } = useYoloModal()
  const { isConnected, connector } = useUser('wallet')
  const [, setReconnect] = useReconnectionFlag()

  const disconnectWallet = useCallback(() => {
    dispatch(reduxWalletActions.disconnect())
    connector?.handleClose && connector.handleClose()
    connector?.handleDisconnect && connector.handleDisconnect()
    setReconnect(false)
    gaEvent('wallet_disconnect', { pathId: 'wallet.disconnect' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connector])

  const connectWallet = useCallback(
    (type, promotionalCode) => {
      updateModal({ ...WALLET_SELECTOR_OBJECT, props: { type, promotionalCode } })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const closeWalletModal = useCallback(() => clearModal(WALLET_SELECTOR_OBJECT.id), [])

  useEffect(() => {
    if (!isConnected) return
    closeWalletModal()
  }, [isConnected, closeWalletModal])

  return { connectWallet, disconnectWallet, closeWalletModal }
}

import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { config } from 'config'
import { useActiveWeb3React } from 'hooks/useActiveWeb3React'
import { reduxWalletActions } from 'redux/actions'
import { getWeb3 } from 'utils'
import { CHAIN_INFO } from 'constants/chainInfo'
import { localTxActions } from '../localTxActions'
import { useWalletConnection } from 'hooks/useWalletConnection'
import { useYoloModal } from 'lib/yoloModals/useYoloModal'
import { useUser } from 'hooks/user/useUser'

export const ConnectionUpdater = () => {
  const { account, connector, chainId, active } = useUser('wallet')
  const { library } = useActiveWeb3React('web3') //!! Don't touch this line
  const { closeWalletModal } = useWalletConnection()
  const dispatch = useDispatch()
  const { updateModal, clearModal } = useYoloModal()

  const registerLibrary = useCallback(() => {
    window.yoloWeb3 = {
      ...library,
      yoloApp: {
        connectedWalletId: '',
        connector
      }
    }
    if (!!library) {
      const web3 = getWeb3()
      web3.eth.defaultAccount = account
    }
  }, [connector, library, account])

  const isTheCorrectChain = useCallback(() => {
    if (!config.APPROVED_CHAINS_IDS.includes(chainId)) {
      updateModal({
        id: 'changeNetwork',
        show: true,
        priority: 1,
        backdropClose: false
      })

      return false
    } else {
      clearModal('changeNetwork')
      return true
    }
  }, [chainId])

  const checkLocalTxs = useCallback(
    (chainInfo) => {
      if (chainInfo?.chainId) {
        const txs = localTxActions.getTxs(chainInfo.chainId)
        dispatch(reduxWalletActions.bulkTxsAdd({ network: chainInfo.network, chainId: chainInfo.chainId, txs }))
        const txsArray = Object.values(txs || {})
        const pendingTxs = txsArray.filter((txInfo) => txInfo.isConfirmed === false)
        if (pendingTxs.length > 0) {
          const pendingTxHashes = pendingTxs.map((txInfo) => txInfo.hash)
          dispatch(reduxWalletActions.updatePendingTxHashes(pendingTxHashes))
          dispatch(reduxWalletActions.pullingTxInfo())
        }
      }
    },
    [dispatch]
  )

  const getAccountInfo = useCallback(async () => {
    if (!account) {
      return null
    }
    const address = account
    const chainInfo = CHAIN_INFO[chainId]
    checkLocalTxs(chainInfo)
    dispatch(reduxWalletActions.updateAccount({ address, chainInfo }))
  }, [account, checkLocalTxs, dispatch, chainId])

  useEffect(() => {
    if (active) {
      registerLibrary()
      if (isTheCorrectChain()) {
        getAccountInfo()
      }
    }
  }, [
    connector,
    library,
    active,
    chainId,
    account,
    registerLibrary,
    isTheCorrectChain,
    getAccountInfo,
    closeWalletModal
  ])
  return null
}

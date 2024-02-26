import { useCallback, useEffect } from 'react'

import { generateName } from 'utils'

import { useYoloWalletContract } from 'hooks/contracts/useContract'
import { HashZero } from '@ethersproject/constants'
import { toUtf8String } from '@ethersproject/strings'
import { atomWithStorage } from 'jotai/utils'
import { ASYNC_STATUS, TX_TYPE, USERNAMES } from 'constants/index'
import { EVENTS } from 'constants/events.js'
import { atom, useAtom, useAtomValue } from 'jotai'
import { useErrorToUserMessage } from 'utils/hooks/useErrorToUserMessage'
import { isAddress } from 'ethers/lib/utils'
import { useCustomEventListener } from 'react-custom-events'
import { useAPI } from 'utils/hooks/useAPI'
import { API } from 'constants/apiEndPoints'
import { useSignInInfo } from './useSignInUpOut'
import { getTxEvents } from 'redux/slices/wallet/Updaters/Transactions.updater'
import { useDispatch } from 'react-redux'
import { notificationActions } from 'redux/actions'
import { useReactGA4 } from 'GA4/useReactGA4'
import { useUser } from './useUser'

const usernameCacheAtom = atomWithStorage(USERNAMES, {})
const addUsernameToCacheAtom = atom(null, (get, set, update) =>
  set(usernameCacheAtom, (prev) => ({ ...prev, [update.address]: update.username }))
)
const stateAtom = atom(ASYNC_STATUS.IDLE)

export const useAddUsernameToCache = () => {
  const [, addUsernameToCache] = useAtom(addUsernameToCacheAtom)
  return { addUsernameToCache }
}

export const useCachedUsername = () => {
  const usernameCache = useAtomValue(usernameCacheAtom)
  const { isProxy } = useUser('wallet')
  const { signInInfo } = useSignInInfo()

  const getCachedUsername = useCallback(
    (address) => {
      if (!address || !isAddress(address)) return
      if (isProxy) {
        return signInInfo.username
      }
      return usernameCache?.[address]
    },
    [usernameCache, isProxy, signInInfo?.username]
  )
  return getCachedUsername
}

const useUpdateUsername = (address) => {
  const errorToUserMessage = useErrorToUserMessage()
  const yoloWalletContract = useYoloWalletContract()
  const [, setState] = useAtom(stateAtom)
  const [, addUsernameToCache] = useAtom(addUsernameToCacheAtom)
  const getCachedUsername = useCachedUsername()
  const { updateUsername: loginInfoUsernameUpdate } = useSignInInfo()

  const [, sendApiUpdate] = useAPI(API.ACCOUNTS_UPDATE, {
    controlled: true,
    withJwt: true
  })

  const updateBlockChainUsername = useCallback(async () => {
    setState(ASYNC_STATUS.PENDING)
    if (!isAddress(address)) return
    const hexContractUsername =
      (await yoloWalletContract?.userNames(address).catch((err) => {
        const msg = errorToUserMessage(err, { callPoint: 'yoloWalletContract?.userNames', register: false })
        console.log('yoloWalletContract.userNames method error -->', msg)
      })) || HashZero
    const contractUsername = toUtf8String(hexContractUsername).replace(/\0/g, '')
    if (!contractUsername) {
      const cacheUsername = getCachedUsername(address)
      if (!cacheUsername) {
        const randomUsername = generateName()
        addUsernameToCache({ address, username: randomUsername })
        sendApiUpdate({ params: { address, username: randomUsername }, jwtAddress: address })
      }
    } else {
      addUsernameToCache({ address, username: contractUsername })
      sendApiUpdate({ params: { address, username: contractUsername }, jwtAddress: address })
    }
    setState(ASYNC_STATUS.IDLE)
  }, [address, setState, sendApiUpdate, yoloWalletContract, addUsernameToCache, errorToUserMessage, getCachedUsername])

  const updateProxyUsername = useCallback(
    (newUsername) => {
      sendApiUpdate({ params: { address, username: newUsername } })
      loginInfoUsernameUpdate(newUsername)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [address, sendApiUpdate]
  )

  return { updateBlockChainUsername, updateProxyUsername }
}

export const useUsernameObserver = () => {
  const { isConnected, isProxy, chainId, account } = useUser('wallet')
  const dispatch = useDispatch()
  const { gaEvent } = useReactGA4()

  const { updateBlockChainUsername, updateProxyUsername } = useUpdateUsername(account)

  // ON_MOUNT update
  useEffect(() => {
    if (!isConnected) return
    if (isProxy) return
    updateBlockChainUsername()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, chainId, isProxy])

  // Toasts Manager
  const showToast = (toastId) => {
    const usernameToastObj = {
      show: true,
      id: toastId
    }
    dispatch(notificationActions.updateToast(usernameToastObj))
  }

  // External Event Logger
  const sendExternalLoggerEvent = (txInfo, confirmed) => {
    const { hash, txParams } = txInfo
    gaEvent('username_change', {
      pathId: 'profile.username.change',
      hash,
      newUsername: txParams.newUsername,
      confirmed
    })
  }

  /**
   * CUSTOM EVENTS LISTENER
   */

  //On ACCOUNT_BC_CREATE
  useCustomEventListener(EVENTS.ACCOUNT_BC_CREATE, updateBlockChainUsername)

  //On USERNAME_PROXY_UPDATE
  useCustomEventListener(EVENTS.USERNAME_PROXY_UPDATE, updateProxyUsername)

  //Get tx event for Username Contract
  const txEvents = getTxEvents(TX_TYPE.USERNAME)

  //On tx Hash
  useCustomEventListener(txEvents.hash, (txInfo) => {
    showToast('usernamePending')
    //console.log('ACZ onDeposit hash (txInfo) -->', txInfo)
  })

  //on tx Confirmed
  useCustomEventListener(txEvents.confirmed, (txInfo) => {
    updateBlockChainUsername()
    sendExternalLoggerEvent(txInfo, true)
    showToast('usernameReady')
  })

  //On tx Error
  useCustomEventListener(txEvents.error, (txInfo) => {
    sendExternalLoggerEvent(txInfo, false)
    showToast('usernameError')
  })
}

export const useUsername = () => {
  const { account } = useUser('wallet')
  const getCachedUsername = useCachedUsername()
  const username = getCachedUsername(account)
  return username
}

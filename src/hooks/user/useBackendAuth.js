import { useCallback, useEffect } from 'react'
import { atom, useAtom, useAtomValue } from 'jotai'

import { ASYNC_STATUS, ASYNC_STATUS_ID } from 'constants/index'
import { EVENTS } from 'constants/events.js'
import { useAPI } from 'utils/hooks/useAPI'
import { API } from 'constants/apiEndPoints'
import { signMessage } from 'utils/ethers.utils'
import { config } from 'config/index'
import { useCachedUsername } from './useUsername'
import { emitCustomEvent } from 'react-custom-events'
import axios from 'axios'
import { useAccessToken } from './useAccessToken'
import { useUser } from './useUser'

const authStatusAtom = atom(ASYNC_STATUS.IDLE)
const updateAuthStatusAtom = atom(null, (get, set, update) => set(authStatusAtom, (prev) => update))

let tempAddress = {}

export const useBackendAuth = () => {
  // const tempAddress = useRef()
  const { library, isConnected, active } = useUser('wallet')

  const status = useAtomValue(authStatusAtom)
  const [, setStatus] = useAtom(updateAuthStatusAtom)

  const { accessTokensCache, setAccessToken } = useAccessToken()
  const getCachedUsername = useCachedUsername()

  const [stateAccountInfo, sendAccountInfoQuery, accountInfoHasStatus] = useAPI(API.ACCOUNTS_INFO, {
    queryType: 'get',
    controlled: true,
    withJwt: true
  })

  // const [stateSalt, sendSaltQuery, saltHasStatus] = useAPI(API.ACCOUNTS_GET_SALT, {
  //   queryType: 'get',
  //   controlled: true
  // })

  const [stateAccount, sendAccountQuery, accountHasStatus] = useAPI(API.ACCOUNTS_CREATE, {
    queryType: 'post',
    controlled: true
  })

  const [stateAuth, sendAuthQuery, authHasStatus, resetAuthStatus] = useAPI(API.AUTH_AUTH, {
    queryType: 'post',
    controlled: true
  })

  const signSalt = useCallback(
    async ({ salt, isRenew = false }) => {
      if (!library) return
      if (!isRenew && status.id === ASYNC_STATUS_ID.PENDING) return
      const signature = await signMessage(library, tempAddress.current, salt).catch((error) => {
        console.log('ACZ SIGN ERROR -->  we could manage something here')
        setStatus({
          ...ASYNC_STATUS.ERROR,
          message: `Sign: ${error.message}`,
          code: error.code
        })
      })
      if (signature) {
        sendAuthQuery(
          {
            params: {
              address: tempAddress.current,
              signature
            }
          },
          true
        )
      }
    },
    [library, sendAuthQuery, setStatus, status?.id]
  )

  const getSignedSalt = useCallback(
    async ({ address, isRenew = false }) => {
      const saltResponse = await axios
        .get(API.ACCOUNTS_GET_SALT.replace('{{address}}', address?.toLowerCase()))
        .catch((err) => {
          const statusCode = err?.response?.status
          if (statusCode === 404) {
            const username = getCachedUsername(tempAddress.current)
            sendAccountQuery({ params: { address: tempAddress.current, username } })
            return
          }
        })
      if (saltResponse) {
        const salt = saltResponse?.data?.salt
        signSalt({ salt, isRenew })
      }
    },
    [signSalt, getCachedUsername, sendAccountQuery]
  )

  /*****************
   * Starter Block *
   *****************/
  const authAddress = async (address) => {
    if (!isConnected) return
    if (status.id === ASYNC_STATUS_ID.PENDING) return false //TODO: Think on what to return
    setStatus(ASYNC_STATUS.PENDING)
    if (!address) {
      setStatus({
        ...ASYNC_STATUS.ERROR,
        message: `Init: address must be provided`,
        code: '404'
      })
      return false
    }
    tempAddress.current = address?.toLowerCase()
    const cachedAccessToken = accessTokensCache?.[config.NODE_ENV]?.[address?.toLowerCase()] || ''
    if (cachedAccessToken) {
      sendAccountInfoQuery()
      return //TODO: Think on what to return
    } else {
      getSignedSalt({ address })
    }
  }

  /*********************
   * AccessToken Check *
   *********************/
  useEffect(() => {
    const address = tempAddress.current
    if (accountInfoHasStatus(ASYNC_STATUS_ID.ERROR)) {
      //Renewing the Token
      setStatus(ASYNC_STATUS.IDLE)
      getSignedSalt({ address, isRenew: true })
      // setStatus(ASYNC_STATUS.ERROR)
      return
    }
    if (accountInfoHasStatus(ASYNC_STATUS_ID.CONFIRMED)) {
      const { data } = stateAccountInfo
      const apiAddress = data?.address

      if (address === apiAddress) {
        setStatus(ASYNC_STATUS.CONFIRMED)
      } else {
        //Renewing the Token
        setStatus(ASYNC_STATUS.IDLE)
        getSignedSalt({ address, isRenew: true })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateAccountInfo?.status?.id])

  /***************************************
   * Salt Check and Create Account Block *
   ***************************************/
  // useEffect(() => {
  //   if (saltHasStatus(ASYNC_STATUS_ID.ERROR)) {
  //     if (stateSalt?.status?.code === 404) {
  //       const username = getCachedUsername(tempAddress.current)
  //       sendAccountQuery({ params: { address: tempAddress.current, username, xftlevel: 0 } })
  //       return
  //     }
  //     console.log('ACZ SALT ERROR -->  we could manage something here')
  //     setStatus({
  //       ...ASYNC_STATUS.ERROR,
  //       message: `Salt: ${stateSalt?.status?.message}`,
  //       code: stateSalt?.status?.code
  //     })
  //   }
  //   if (saltHasStatus(ASYNC_STATUS_ID.CONFIRMED)) {
  //     const salt = stateSalt?.data?.salt
  //     if (library && salt) {
  //       signSalt(salt)
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [stateSalt?.status?.id])
  // }, [stateSalt?.status?.id, library])

  /***************************************
   * Create Account Effect Block *
   ***************************************/
  useEffect(() => {
    if (accountHasStatus(ASYNC_STATUS_ID.ERROR)) {
      console.log('ACZ ACCOUNT ERROR -->  we could manage something here')
      setStatus({
        ...ASYNC_STATUS.ERROR,
        message: `Account: ${stateAccount?.status?.message}`,
        code: stateAccount?.status?.code
      })
    }
    const salt = stateAccount?.data?.salt
    if (salt) {
      emitCustomEvent(EVENTS.ACCOUNT_BC_CREATE)
      library && signSalt({ salt })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateAccount?.status?.id])

  /***************************************
   * AccessToken Effect Block *
   ***************************************/
  useEffect(() => {
    if (authHasStatus(ASYNC_STATUS_ID.ERROR)) {
      console.log('ACZ AUTH ERROR --> we could manage something here')
      setStatus({
        ...ASYNC_STATUS.ERROR,
        message: `Auth: ${stateAuth?.status?.message}`,
        code: stateAuth?.status?.code
      })
    }
    if (authHasStatus(ASYNC_STATUS_ID.CONFIRMED)) {
      const accessToken = stateAuth?.data?.accessToken
      if (accessToken) {
        setAccessToken({ address: tempAddress.current, accessToken })
        setStatus(ASYNC_STATUS.CONFIRMED)
        resetAuthStatus()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateAuth?.status?.id])

  const hasStatus = useCallback((statusToCheck) => status.id === statusToCheck, [status.id])
  const resetStatus = useCallback(() => setStatus(ASYNC_STATUS.IDLE), [setStatus])

  return { status, authAddress, hasStatus, resetStatus }
}

import { API } from 'constants/apiEndPoints'
import { ASYNC_STATUS_ID, USER_LOGIN_INFO, WALLET_TYPE } from 'constants/index'
import { useAtom, useSetAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAPI } from 'utils/hooks/useAPI'
import { useAccessToken } from './useAccessToken'
import { loginAtom, resetLoginAtom, updateLoginAtom } from './user.atom'
import { useUserUpdaters } from './useUser'

export const useSignInUpOut = () => {
  const setLoginInfo = useSetAtom(updateLoginAtom)
  const resetLoginInfo = useSetAtom(resetLoginAtom)
  const { setAccessToken } = useAccessToken()
  const [state, setState] = useState({})

  //Do login in the App
  const doLogin = (signState) => {
    const { username, avatar, emailValidated, personalReferralCode } = signState

    const { accessToken, proxyAddress, chainDetails } = signState

    const proxyChainId = chainDetails?.chainId
    setLoginInfo({
      //ProfileFields
      username,
      avatar,
      emailValidated,
      personalReferralCode,
      //Wallet Fields
      walletType: WALLET_TYPE.PROXY,
      account: proxyAddress,
      accessToken,
      chainId: proxyChainId
    })

    setAccessToken({ address: proxyAddress, accessToken })
  }

  //Reset state
  const resetState = () => setState({})

  //Sign In logic
  const [signInState, sendSignInQuery, hasSignInStatus, resetSignInStatus] = useAPI(API.PROXY_WALLET_LOGIN, {
    controlled: true
  })

  const signIn = ({ email, password }) => {
    sendSignInQuery({ params: { email, password } })
  }

  useEffect(() => {
    if (hasSignInStatus(ASYNC_STATUS_ID.ERROR)) {
      const errorMessage = signInState?.status?.message

      if (errorMessage.includes('User with address')) {
        setState({ ...state, isError: true, field: 'email' })
        return
      }
      if (errorMessage.includes('Signature verification failed')) {
        setState({ ...state, isError: true, field: 'password' })
        return
      }
      resetSignInStatus()
      setState({ ...state, isError: true })
    }

    if (hasSignInStatus(ASYNC_STATUS_ID.CONFIRMED)) {
      doLogin(signInState.data)
      setState({ ...state, isError: false })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signInState])

  //Sign Up logic
  const [signUpState, sendSignUpQuery, hasSignUpStatus, resetSignUpStatus] = useAPI(API.PROXY_WALLET_REGISTER, {
    controlled: true
  })
  const signUp = ({ username, email, password, referralCode, leverageBetaCode }) => {
    sendSignUpQuery({ params: { username, email, password, referralCode, leverageBetaCode } })
  }

  useEffect(() => {
    if (hasSignUpStatus(ASYNC_STATUS_ID.ERROR)) {
      resetSignUpStatus()
      setState({ ...state, isError: true })
    }

    if (hasSignUpStatus(ASYNC_STATUS_ID.CONFIRMED)) {
      doLogin(signUpState.data)
      resetSignUpStatus()
      setState({ ...state, isError: false })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signUpState])

  //Sign Out logic
  const signOut = () => {
    resetLoginInfo({ walletType: WALLET_TYPE.EXTERNAL })
  }

  return { state, resetState, signIn, signUp, signOut }
}

export const useSignInInfo = () => {
  const [signInInfo, setLoginInfo] = useAtom(loginAtom)
  const isProxyWallet = useMemo(() => signInInfo.walletType === WALLET_TYPE.PROXY, [signInInfo])
  const updateUsername = useCallback(
    (username) => {
      isProxyWallet && setLoginInfo((prev) => ({ ...prev, username }))
    },
    [setLoginInfo, isProxyWallet]
  )
  const updateEmailVerification = useCallback(
    (state) => {
      isProxyWallet && setLoginInfo((prev) => ({ ...prev, emailValidated: state }))
    },
    [isProxyWallet, setLoginInfo]
  )
  return { signInInfo, updateUsername, isProxyWallet, updateEmailVerification }
}

//const { disconnectWallet } = useWalletConnection()

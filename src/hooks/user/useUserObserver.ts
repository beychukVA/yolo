import { API } from 'constants/apiEndPoints'
import { EVENTS } from 'constants/events'
import { useGatewayEmitter, useGatewayListener } from 'hooks/sockets/lvg/useGatewaySocket'
import { useActiveWeb3React } from 'hooks/useActiveWeb3React'
import { useBalanceObserver } from 'hooks/user/useBalanceObserver'
import { useUsernameObserver } from 'hooks/user/useUsername'
import { useYoloToast } from 'lib/yoloToasts/useYoloToast'
import { useCallback, useEffect, useRef } from 'react'
import { emitCustomEvent } from 'react-custom-events'
import { capitalizeFirst } from 'utils'
import { useAPI } from 'utils/hooks/useAPI'

import { useAccessToken } from './useAccessToken'
import { useCountryAllowanceObserver } from './useCountryAllowanceObserver'
import { useInLvgBetaObserver } from './useInLvgBetaObserver'
import { User } from './user.d'
import { useSignInInfo } from './useSignInUpOut'
import { useUserUpdaters } from './useUser'

type UserAuthError = {
  reason: string
  details: string
}

const getErrorToastObj = (errorObj: UserAuthError) => ({
  id: 'errorToast',
  autoClose: false,
  props: {
    message: {
      title: capitalizeFirst(errorObj?.details || errorObj?.reason || 'The order has been cancelled'),
      subtitle: 'Please try again'
    }
  }
})

export const useUserObserver = () => {
  const { active, account, isProxyWallet, connector, library, chainId } = useActiveWeb3React()
  const { signInInfo } = useSignInInfo()
  const { resetUser, updateUserWallet, updateUserProfile } = useUserUpdaters()
  const { gatewayEmit } = useGatewayEmitter()
  const { yToast } = useYoloToast()
  const prevAccount = useRef('')

  //Profile Info
  const { username, avatar, emailValidated, personalReferralCode } = signInInfo
  //Wallet Info
  const { accessToken } = signInInfo

  const logOutUser = useCallback(() => {
    if (prevAccount.current || account) gatewayEmit('user.logout', { reason: 'logout' })
    prevAccount.current = ''
    resetUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetUser, gatewayEmit])

  const updateUser = useCallback(
    (userState: Subset<User>): void => {
      const { wallet, profile } = userState
      updateUserWallet(wallet)
      updateUserProfile(profile)
      gatewayEmit('user.auth', { token: wallet?.accessToken })
    },
    [updateUserWallet, gatewayEmit]
  )

  // external but related observer
  useCountryAllowanceObserver([account, accessToken, isProxyWallet])
  useUsernameObserver()
  useBalanceObserver()
  useInLvgBetaObserver({ account: account || '' })

  // Track account changes
  useEffect(() => {
    if (!account) logOutUser()
    else {
      prevAccount.current = account
      updateUser({
        wallet: { account, accessToken, isProxy: isProxyWallet, connector, library, chainId, active },
        profile: { username, avatar, emailValidated, personalReferralCode }
      })
    }
  }, [
    account,
    accessToken,
    isProxyWallet,
    updateUser,
    logOutUser,
    connector,
    library,
    chainId,
    active,
    username,
    avatar,
    emailValidated,
    personalReferralCode
  ])

  // Gateway user.auth.error listener
  useGatewayListener('user.auth.error', (userAuthError: UserAuthError) => {
    emitCustomEvent(EVENTS.BALANCE_GATEWAY_UPDATE, userAuthError)
    yToast(getErrorToastObj(userAuthError))
  })
}

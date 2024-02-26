import { SingleContentToggle } from 'components/Atoms/SingleContentToggle'
import { API } from 'constants/apiEndPoints'
import { useSignInInfo } from 'hooks/user/useSignInUpOut'
import { useLocation } from 'react-router-dom'
import { useAPI } from 'utils/hooks/useAPI'
import qs from 'qs'

import { VerifiedEmailBarCSS } from './EmailErrorBarCSS.styled'
import { useEffect } from 'react'
import { ASYNC_STATUS_ID } from 'constants/index'
import { notificationActions } from 'redux/actions'
import { useDispatch } from 'react-redux'

export const VerifiedEmailBar = () => {
  const { signInInfo, isProxyWallet, updateEmailVerification } = useSignInInfo()
  const { emailValidated } = signInInfo
  const dispatch = useDispatch()

  const [stateEmailToken, sendEmailToken, hasStatus, resetStatus] = useAPI(API.ACCOUNT_VALIDATE_EMAIL, {
    controlled: true,
    withJwt: true
  })
  const [, sendVerificationEmail] = useAPI(API.ACCOUNT_SEND_VALIDATION_EMAIL, {
    controlled: true,
    withJwt: true
  })

  const location = useLocation()
  const { emailToken } = qs.parse(location.search, { ignoreQueryPrefix: true })

  useEffect(() => {
    if (emailToken) {
      sendEmailToken({ params: { emailToken } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailToken])

  useEffect(() => {
    if (hasStatus(ASYNC_STATUS_ID.ERROR)) {
      console.log('ACZ Email Verification ERROR')
    }
    if (hasStatus(ASYNC_STATUS_ID.CONFIRMED)) {
      updateEmailVerification(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateEmailToken.status.id])

  const verifyEmail = () => {
    const bidToastObj = {
      show: true,
      id: 'genericInfo',
      props: {
        message:
          'A verification email has been sent. In order to complete the process, please click on the link in the email that you received.'
      }
    }
    sendVerificationEmail()
    dispatch(notificationActions.updateToast(bidToastObj))
  }

  return isProxyWallet ? (
    <VerifiedEmailBarCSS>
      <SingleContentToggle
        noWrapper
        toggle={emailValidated}
        trueContent={
          <div className='success_bar'>
            <strong>Success!</strong> Your email address is now verified
          </div>
        }
        falseContent={
          <div className='error_bar'>
            We noticed your email address hasn't yet been verified <button onClick={verifyEmail}>Verify now</button>
          </div>
        }
      />
    </VerifiedEmailBarCSS>
  ) : null
}

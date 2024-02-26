import { ASYNC_STATUS_ID } from 'constants/index'
import { API } from 'constants/apiEndPoints'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAPI } from 'utils/hooks/useAPI'
import { useTimeoutWhen } from 'utils/hooks/useTimeoutWhen'
import { isEmail } from 'validator'

const referralToast = (type) => ({
  show: true,
  id: 'referral',
  props: { type }
})

const referralErrorToast = (type) => ({
  show: true,
  id: 'genericError',
  props: { type }
})

export const JoinYoloSection = ({ className }) => {
  const [state, sendReferralEmail, hasStatus, resetStatus] = useAPI(API.MAIL_LIST_SUBSCRIBE, {
    controlled: true,
    withJwt: true
  })

  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [success, setSuccess] = useState(false)

  useTimeoutWhen(
    () => {
      resetStatus()
      setErrorMessage('')
      setSuccess(false)
    },
    5000,
    hasStatus(ASYNC_STATUS_ID.CONFIRMED)
  )

  const onJoinClick = (event) => {
    event.preventDefault()
    if (!isEmail(email)) {
      setErrorMessage('Enter a valid email')
      return
    }
    setErrorMessage('')
    sendReferralEmail({ params: { email } })
  }
  const onInputChange = (event) => {
    const value = event.target.value
    setEmail(value)
  }

  useEffect(() => {
    if (hasStatus(ASYNC_STATUS_ID.CONFIRMED)) setSuccess(true)
    if (hasStatus(ASYNC_STATUS_ID.ERROR)) setErrorMessage('Please try Again')
  }, [hasStatus])

  return (
    <>
      <div id='level_5' className='join'>
        <div className='content shading'>
          {/* <h4>Join the Yolorekt mailing list</h4> */}
          <form>
            <input type='text' placeholder='Join the mailing list' value={email} onChange={onInputChange} />
            <button id='JoinMailList' onClick={onJoinClick} disabled={!email}>
              Join
            </button>
          </form>
          <UserInfo>
            {!!errorMessage && <ErrorTxt>{errorMessage}</ErrorTxt>}
            {!!success && <SuccessTxt>You are in, thank you</SuccessTxt>}
          </UserInfo>
        </div>
      </div>
    </>
  )
}

const UserInfo = styled.div`
  min-height: 30px;
`

const ErrorTxt = styled.div`
  color: #de0e54 !important;
  padding: 10px 0 0 0px !important;
  font-size: 0.8rem;
`
const SuccessTxt = styled.div`
  color: white;
  padding: 10px 0 0 0;
  font-size: 0.8rem;
`

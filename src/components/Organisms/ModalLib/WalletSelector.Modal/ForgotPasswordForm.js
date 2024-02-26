import { SingleDataLoader } from 'components/Atoms/SingleDataLoader'
import { ASYNC_STATUS_ID } from 'constants/index'
import { API } from 'constants/apiEndPoints'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { notificationActions } from 'redux/actions'
import { useAPI } from 'utils/hooks/useAPI'
import isEmail from 'validator/lib/isEmail'
import { OtpInput } from 'components/Molecules/OtpInput'

const FORM_FIELD_INIT = {
  code: '',
  email: '',
  password: '',
  password2: ''
}

const PASSWORD_VALID_REGEXP = /^.{6,}$/

export const ForgotPasswordForm = ({ onReturn }) => {
  const dispatch = useDispatch()
  const [, sendCodeQuery] = useAPI(API.ACCOUNT_SEND_CODE, { controlled: true })
  const [resetSate, sendResetQuery, hasResetState] = useAPI(API.ACCOUNT_RESET_PASSWORD, { controlled: true })

  const [formFields, setFormFields] = useState(FORM_FIELD_INIT)

  const [errors, setErrors] = useState({})

  const onFieldChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setFormFields({
      ...formFields,
      [name]: value
    })
    setErrors({ ...errors, [name]: false })
  }

  const onSubmit = () => {
    if (!PASSWORD_VALID_REGEXP.test(formFields.code.trim())) {
      setErrors({ ...errors, code: 'This field is required' })
      return
    }
    if (!formFields.email) {
      setErrors({ ...errors, email: 'This field is required' })
      return
    }
    if (!isEmail(formFields.email)) {
      setErrors({ ...errors, email: 'Please enter a valid email address' })
      return
    }
    if (!formFields.password) {
      setErrors({ ...errors, password: 'This field is required' })
      return
    }
    if (!PASSWORD_VALID_REGEXP.test(formFields.password)) {
      setErrors({ ...errors, password: '6 minimum characters are needed' })
      return
    }
    if (formFields.password !== formFields.password2) {
      setErrors({ ...errors, password2: 'Your passwords do not match. Please try again.' })
      return
    }
    const payload = { ...formFields, code: +formFields.code }
    delete payload.password2
    sendResetQuery({ params: payload })
  }

  const onCodeChange = (otpCode) => {
    setErrors({ ...errors, code: '' })
    setFormFields({ ...formFields, code: otpCode })
  }

  const sendPasswordCode = () => {
    if (!isEmail(formFields.email)) {
      setErrors({ ...errors, email: 'Please enter a valid email address' })
      return
    }
    const toastObj = {
      show: true,
      id: 'resetPasswordCode'
    }
    sendCodeQuery({ params: { email: formFields.email } })
    dispatch(notificationActions.updateToast(toastObj))
  }

  useEffect(() => {
    const firstInput = document.querySelector(`input[name=code0]`)
    if (firstInput !== null) {
      firstInput.focus()
    }
  }, [])

  useEffect(() => {
    if (hasResetState(ASYNC_STATUS_ID.ERROR)) {
      const message = resetSate.status.message
      let errorObj
      switch (message.trim()) {
        case 'wrong code':
        case 'code invalid':
        case 'no code found':
          errorObj = { code: 'This code is not correct. Please try again.' }
          break
        case 'no account found':
        case 'no email found':
          errorObj = { email: 'Please enter a valid email address' }
          break
        case 'no password found':
          errorObj = { email: 'Please enter a valid password' }
          break
        default:
          break
      }
      setErrors({ ...errors, ...errorObj })
    }
    if (hasResetState(ASYNC_STATUS_ID.CONFIRMED)) {
      const toastObj = {
        show: true,
        id: 'resetPasswordSucceed'
      }
      dispatch(notificationActions.updateToast(toastObj))
      onReturn()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetSate])

  return (
    <div className='panel' id='hidden_pr-panel'>
      <div className='password_reset_content'>
        <div className='section_title'>Password Reset</div>
        <div className='page_instructions'>
          Please enter the 6-digit code that we sent to your email.
          <div>
            Didn't get an email?{' '}
            <span className='resendCode' onClick={sendPasswordCode}>
              Click here to send another
            </span>
            .
          </div>
        </div>
        <OtpInput
          className={'digit_6_confirmation'}
          codeLength={6}
          onCodeChange={onCodeChange}
          codeError={errors.code}
        />
        <form className='new_password'>
          <fieldset>
            <label htmlFor='email'>
              Email <span className='required_ast'>*</span>
            </label>
            <input
              type='text'
              name='email'
              placeholder='youremail@domain.com'
              value={formFields.email}
              onChange={onFieldChange}
            />
            <div className='field_error'>{errors.email}</div>
          </fieldset>
          <fieldset>
            <label htmlFor='password'>
              New Password <span className='required_ast'>*</span>
            </label>
            <input
              type='password'
              name='password'
              placeholder='●●●●●●●●'
              value={formFields.password}
              onChange={onFieldChange}
            />
            <div className='field_error'>{errors.password}</div>
          </fieldset>
          <fieldset>
            <label htmlFor='password2'>
              New Password (again) <span className='required_ast'>*</span>
            </label>
            <input
              type='password'
              name='password2'
              placeholder='●●●●●●●●'
              value={formFields.password2}
              onChange={onFieldChange}
            />
            <div className='field_error'>{errors.password2}</div>
          </fieldset>
          <fieldset>
            <button type='button' onClick={onSubmit}>
              <SingleDataLoader loading={hasResetState(ASYNC_STATUS_ID.PENDING)} data={'Reset password'} />
            </button>
            <div className='return_to_signin' onClick={onReturn}>
              &lt; Return to Sign in
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  )
}

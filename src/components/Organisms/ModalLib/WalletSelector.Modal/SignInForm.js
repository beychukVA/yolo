import { ASYNC_STATUS_ID } from 'constants/index'
import { API } from 'constants/apiEndPoints'
import { useSignInUpOut } from 'hooks/user/useSignInUpOut'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { notificationActions } from 'redux/actions'
import { useAPI } from 'utils/hooks/useAPI'
import isEmail from 'validator/lib/isEmail'
import { SingleDataLoader } from 'components/Atoms/SingleDataLoader'

const FORM_FIELD_INIT = {
  email: '',
  password: ''
}

export const SignInForm = ({ onFrgtPsw }) => {
  const dispatch = useDispatch()
  const [sendCodeState, sendCodeQuery, hasSendCodeStatus] = useAPI(API.ACCOUNT_SEND_CODE, { controlled: true })
  const { state: signState, resetState: resetSignState, signIn } = useSignInUpOut()
  const [formFields, setFormFields] = useState(FORM_FIELD_INIT)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const onFieldChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setFormFields({
      ...formFields,
      [name]: value
    })
    setErrors({ ...errors, [name]: false })
    resetSignState()
  }

  const onCheckField = (event) => {
    const name = event.target.name
    if (name === 'email' && !isEmail(formFields.email)) {
      setErrors({ ...errors, email: true })
      return
    }
    if (name === 'password' && !formFields.password) {
      setErrors({ ...errors, password: true })
    }
  }

  const onSubmit = () => {
    if (!isEmail(formFields.email)) {
      setErrors({ ...errors, email: true })
      return
    }
    if (!formFields.password) {
      setErrors({ ...errors, password: true })
      return
    }
    signIn(formFields)
    setLoading(true)
  }

  const onKeySubmit = (event) => {
    event.key === 'Enter' && onSubmit()
  }

  const onForgotPassword = () => {
    if (!isEmail(formFields.email)) {
      setErrors({ ...errors, email: true })
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
    if (hasSendCodeStatus(ASYNC_STATUS_ID.CONFIRMED)) {
      onFrgtPsw()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendCodeState.status?.id])

  useEffect(() => {
    if (!signState.isError) return
    setLoading(false)
  }, [signState])

  return (
    <div className='panel' id='one-panel'>
      <div className='signin_wrapper'>
        <form>
          <fieldset>
            <label htmlFor='youremail'>
              Email <span className='required_ast'>*</span>
            </label>
            <input
              type='text'
              name='email'
              placeholder='youremail@domain.com'
              value={formFields.email}
              onChange={onFieldChange}
              onKeyDown={onKeySubmit}
              onBlur={onCheckField}
            />
            {!!errors.email && <div className='field_error'>Please enter a valid email address</div>}
            {signState.field === 'email' && (
              <div className='field_error'>This account doesn't exist. Please try another.</div>
            )}
          </fieldset>
          <fieldset>
            <label htmlFor='yourpassword'>
              Password <span className='required_ast'>*</span>
            </label>
            <input
              type='password'
              name='password'
              placeholder='●●●●●●●●'
              value={formFields.password}
              onChange={onFieldChange}
              onKeyDown={onKeySubmit}
              onBlur={onCheckField}
            />
            {!!errors.password && <div className='field_error'>This field is required</div>}
            {signState.field === 'password' && <div className='field_error'>The password you entered is incorrect</div>}
            <div onClick={onForgotPassword} className='forgot_password'>
              Forgot password?
            </div>
          </fieldset>
          <fieldset>
            <button type='button' onClick={onSubmit}>
              Sign In
              <SingleDataLoader loading={loading} data={''} />
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  )
}

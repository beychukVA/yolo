import { isEmpty } from 'lodash'
import { useSignInUpOut } from 'hooks/user/useSignInUpOut'
import { useEffect, useState } from 'react'
import isEmail from 'validator/lib/isEmail'
import { SingleDataLoader } from 'components/Atoms/SingleDataLoader'

const FORM_FIELD_INIT = {
  username: '',
  email: '',
  password: ''
}

const PASSWORD_VALID_REGEXP = /^.{6,}$/

const PROMOTIONAL_CODE = 'lvgbetacode'

export const SignUpForm = ({ promotionalCode }) => {
  const { state: signState, resetState: resetSignState, signUp } = useSignInUpOut()
  const [formFields, setFormFields] = useState(FORM_FIELD_INIT)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  // const [codeDisable, setCodeDisable] = useState(false)

  useEffect(() => {
    if (isEmpty(promotionalCode)) return
    setFormFields({
      ...formFields,
      leverageBetaCode: promotionalCode[PROMOTIONAL_CODE]
    })
    // setCodeDisable(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!signState.isError) return
    setLoading(false)
  }, [signState])

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
    if (name === 'username' && !formFields.username) {
      setErrors({ ...errors, username: 'This field is required' })
    }
    if (name === 'email' && !isEmail(formFields.email)) {
      setErrors({ ...errors, email: 'Please enter a valid email address' })
      return
    }
    if (name === 'password' && !formFields.password) {
      setErrors({ ...errors, password: 'This field is required' })
      return
    }
    if (name === 'password' && !PASSWORD_VALID_REGEXP.test(formFields.password)) {
      setErrors({ ...errors, password: '6 minimum characters are needed' })
      return
    }
  }

  const onSubmit = () => {
    if (!formFields.username) {
      setErrors({ ...errors, username: 'This field is required' })
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
    signUp(formFields)
    setLoading(true)
  }

  const onKeySubmit = (event) => {
    event.key === 'Enter' && onSubmit()
  }
  return (
    <div className='panel' id='two-panel'>
      <div className='signin_wrapper'>
        <form>
          <fieldset>
            <label htmlFor='username'>
              Username <span className='required_ast'>*</span>
            </label>
            <input
              type='text'
              name='username'
              placeholder='Username'
              value={formFields.username}
              onChange={onFieldChange}
              onKeyDown={onKeySubmit}
              onBlur={onCheckField}
            />
            {!!errors.username && <div className='field_error'>{errors.username}</div>}
            {!!signState.isError && <div className='field_error'>This account already exist. Please try another.</div>}
          </fieldset>
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
              onKeyDown={onKeySubmit}
              onBlur={onCheckField}
            />
            {!!errors.email && <div className='field_error'>{errors.email}</div>}
          </fieldset>
          <fieldset>
            <label htmlFor='password'>
              Password <span className='required_ast'>*</span>
            </label>
            <input
              type='password'
              name='password'
              placeholder='********'
              value={formFields.password}
              onChange={onFieldChange}
              onKeyDown={onKeySubmit}
              onBlur={onCheckField}
            />
            {!!errors.password && <div className='field_error'>{errors.password}</div>}
          </fieldset>
          <fieldset>
            <label htmlFor='password'>Referral code</label>
            <input
              type='text'
              name={'referralCode'}
              value={formFields.referralCode}
              // disabled={codeDisable}
              onChange={onFieldChange}
              onKeyDown={onKeySubmit}
              onBlur={onCheckField}
            />
            {!!errors.leverageBetaCode && <div className='field_error'>{errors.leverageBetaCode}</div>}
          </fieldset>
          {!!formFields.leverageBetaCode && (
            <fieldset>
              <label htmlFor='password'>FUTURE$ Beta code</label>
              <input
                type='text'
                name={'leverageBetaCode'}
                value={formFields.leverageBetaCode}
                disabled={true}
                onChange={onFieldChange}
                onKeyDown={onKeySubmit}
                onBlur={onCheckField}
              />
              {!!errors.leverageBetaCode && <div className='field_error'>{errors.leverageBetaCode}</div>}
            </fieldset>
          )}
          <fieldset>
            <button type='button' onClick={onSubmit}>
              Play now
              <SingleDataLoader loading={loading} data={''} />
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  )
}

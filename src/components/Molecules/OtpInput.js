import { useEffect, useState } from 'react'

export const OtpInput = ({ className, codeLength, onCodeChange, codeError }) => {
  const [otpCode, setOtpCode] = useState('')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => onCodeChange && onCodeChange(otpCode), [otpCode])

  const updateCode = (val, pos) => {
    const codeArray = otpCode.split('')
    codeArray.splice(+pos, 1)
    codeArray.splice(+pos, 0, val)
    const newCode = codeArray.join('')
    if (newCode.length > codeLength) return
    setOtpCode(newCode)
  }

  const inputFocus = (pos) => {
    const nextSibling = document.querySelector(`input[name=code${pos}]`)
    if (nextSibling !== null) {
      nextSibling.focus()
    }
  }

  const onInputChange = (e) => {
    const inputPos = +e.target.name.replace('code', '')
    const inputVal = +e.target.value
    if (inputPos === otpCode.length - 1 && inputVal.length > 1) return
    updateCode(inputVal, inputPos)
    if (inputPos <= otpCode.length - 1) {
      inputFocus(inputPos + 1)
    } else {
      document.querySelector(`input[name=code0]`).focus()
    }
  }

  const onInputPaste = (e) => {
    const pastedCode = e.clipboardData.getData('Text').substring(0, codeLength)
    setOtpCode(pastedCode)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace') {
      e.preventDefault()
      const inputPos = +e.target.name.replace('code', '')
      const posVal = otpCode.split('')[inputPos]
      if (posVal === ' ') {
        inputFocus(inputPos - 1)
      }
      updateCode(' ', inputPos)
    }
  }

  return (
    <form>
      <fieldset className={`${className} ${codeError ? 'with_error' : ''}`}>
        <div>
          {new Array(codeLength).fill(0).map((v, index) => (
            <input
              type='text'
              name={`code${index}`}
              autocomplete='off'
              value={otpCode?.charAt(index)}
              onKeyDown={handleKeyDown}
              onChange={onInputChange}
              onPaste={onInputPaste}
              onFocus={(e) => e.target.select()}
            />
          ))}
        </div>
      </fieldset>
      {!!codeError && <div className='error_banner'>{codeError}</div>}
    </form>
  )
}

import React, { useState } from 'react'
import styled from 'styled-components'

import { Typography } from 'components/Atoms/Typography'

export const ReferralForm = ({ className, onSaveClick, label, onCancel, placeholder, isError }) => {
  const [email, setEmail] = useState('')

  const saveClick = () => {
    onSaveClick(email)
  }

  const cancelClick = () => {
    onCancel()
  }

  const onInputChange = (event) => {
    const value = event.target.value
    setEmail(value)
  }

  return (
    <ReferralFormWrapper className={className}>
      {label && (
        <Label variant='caption' size='0.8'>
          {label}
        </Label>
      )}
      <FormRow>
        <UsernameInput
          className='input'
          type='text'
          onChange={onInputChange}
          value={email}
          placeholder={placeholder || 'Set email address'}
        />
        <SaveButton onClick={saveClick} disabled={!email}>
          Send
        </SaveButton>
        {onCancel && <CancelButton onClick={cancelClick}>Cancel</CancelButton>}
      </FormRow>

      <FormRow>{isError && <ErrorTxt>Enter a valid email</ErrorTxt>}</FormRow>
    </ReferralFormWrapper>
  )
}

const ReferralFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const FormRow = styled.div`
  display: flex;
  flex-direction: row;
`
const Label = styled(Typography)`
  margin: 0 10px 0 0;
`
const UsernameInput = styled.input`
  padding: 8px 15px;
  border-radius: 10px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  margin: 0;
  width: 100%;
  font-size: 0.8rem;
  color: #000;
  line-height: 100%;
  border: 0;
  outline: 0;
  display: flex;
`
const SaveButton = styled.button`
  outline: none;
  border: none;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 160%;
  margin: 0;
  background: #1d4baf;
  padding: 6px 15px;
  border-radius: 10px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  font-size: 0.8rem;
  color: #fff;
  :disabled {
    cursor: not-allowed !important;
    opacity: 0.5;
  }
  :hover {
    background: rgb(42, 109, 255);
  }
`
const CancelButton = styled.button`
  margin: 0 0 0 5px;
  background: rgba(255, 255, 255, 0.1);
  padding: 6px 15px;
  border-radius: 10px;
  font-size: 0.8rem;
  color: #fff;
  :hover {
    background: rgba(255, 255, 255, 0.2);
  }
`
const ErrorTxt = styled.div`
  color: #de0e54;
  padding: 5px 0 0 20px;
  font-size: 0.8rem;
`

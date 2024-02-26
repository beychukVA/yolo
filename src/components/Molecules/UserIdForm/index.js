import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { Typography } from 'components/Atoms/Typography'
import { useReactGA4 } from 'GA4/useReactGA4'
import { useUsernameUpdate } from 'hooks/user/useUsernameUpdate'
import { useUser } from 'hooks/user/useUser'

export const UserIdForm = ({ className, label, onCancel, placeholder }) => {
  const { gaEvent } = useReactGA4()
  const { username } = useUser('profile')
  const { updateUsername } = useUsernameUpdate()

  const [newUsername, setNewUsername] = useState('')

  const saveClick = () => {
    updateUsername(newUsername)
    gaEvent('username_change', {
      pathId: 'profile.username.change',
      previousUsername: username,
      newUsername: newUsername
    })
  }

  useEffect(() => {
    setNewUsername('')
  }, [username])

  const cancelClick = () => {
    onCancel()
  }

  const onInputChange = (event) => {
    const value = event.target.value
    setNewUsername(value)
  }

  return (
    <UserIdFormWrapper className={className}>
      {label && (
        <Label variant='caption' size='0.8'>
          {label}
        </Label>
      )}
      <UsernameInput
        className='input'
        type='text'
        onChange={onInputChange}
        value={newUsername}
        placeholder={placeholder || username || 'Set Username'}
      />
      <SaveButton onClick={saveClick} disabled={!newUsername}>
        Save
      </SaveButton>
      {onCancel && <CancelButton onClick={cancelClick}>Cancel</CancelButton>}
    </UserIdFormWrapper>
  )
}

const UserIdFormWrapper = styled.div``
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
  margin: 0 0 0 10px;
  display: flex;
`
const SaveButton = styled.button`
  outline: none;
  border: none;
  text-decoration: none;
  cursor: pointer;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
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

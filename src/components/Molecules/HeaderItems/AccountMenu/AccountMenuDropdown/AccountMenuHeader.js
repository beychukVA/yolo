import React from 'react'
import styled from 'styled-components'

import { DotLoader } from 'components/Atoms/Loaders'
import { IconLib } from 'components/Atoms/IconLib'
import { Typography } from 'components/Atoms/Typography'
import { useUser } from 'hooks/user/useUser'

export const AccountMenuHeader = () => {
  const { username } = useUser('profile')
  return (
    <UserWrapper id='account'>
      <UserIcon collection='general' name='userCircle' dimension='16px' masking />
      {!!username ? <Username>{username}</Username> : <DotLoader sizeInRem={0.6} />}
    </UserWrapper>
  )
}
const Username = styled(Typography)`
  text-align: left;
  margin: 3px 8px 0 5px;
  max-width: 105px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 13px;
  display: block !important;
  transition: all 0.3s;
  color: #d1d2d4;
`
const UserIcon = styled(IconLib)`
  margin: 2px 0 0 0;
  background: #d1d2d4;
  ${({ theme }) => theme.breakPoints['425px']} {
    display: none;
  }
`
const UserWrapper = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin: 0 5px 0 15px;
  height: 40px;
  &:hover {
    ${Username} {
      color: #ffffff;
    }
    ${UserIcon} {
      background: #ffffff;
    }
  }
`

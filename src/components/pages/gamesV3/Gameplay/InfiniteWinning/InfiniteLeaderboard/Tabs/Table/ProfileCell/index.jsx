import styled from 'styled-components'
import { icons } from 'common'

export const ProfileCell = ({ avatar, username = 'username' }) => {
  return (
    <ProfileWrapper>
      <Avatar avatar={avatar} />
      <Username>{username}</Username>
    </ProfileWrapper>
  )
}

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

const Avatar = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background-image: url(${({ avatar }) => avatar || icons.default_avatar_square});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  margin: 0 5px 0 0;
`

const Username = styled.span`
  font-weight: 700;
`

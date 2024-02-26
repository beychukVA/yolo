import styled from 'styled-components'
import { ProfileAvatar } from 'components/Atoms/ProfileAvatar'
import { useUser, useUserUpdaters } from 'hooks/user/useUser'
import axios from 'axios'
import { API } from 'constants/apiEndPoints'

export const AvatarForm = () => {
  const { updateUserProfile } = useUserUpdaters()
  const { avatar } = useUser('profile')
  const { accessToken } = useUser('wallet')

  const updateAvatar = (e) => {
    const avatarFile = e.target.files[0]

    const formData = new FormData()
    formData.append('file', avatarFile)

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'content-type': 'multipart/form-data'
    }

    axios
      .post(API.ACCOUNT_UPLOAD_AVATAR, formData, { headers })
      .then((response) => {
        const avatar = response?.data?.response?.body?.avatarUrl
        updateUserProfile({ avatar })
        console.log('ACZ response -->', avatar)
      })
      .catch((err) => {
        console.log('ACZ err -->', JSON.parse(JSON.stringify(err)))
      })
  }
  return (
    <AvatarWrapper>
      <input accept='image/*' type='file' id='select-image' style={{ display: 'none' }} onChange={updateAvatar} />
      <label htmlFor='select-image'>
        <Edit>EDIT</Edit>
        <AvatarField avatar={avatar} />
      </label>
    </AvatarWrapper>
  )
}

const AvatarWrapper = styled.div`
  position: relative;
  border-radius: 8px;
  label:hover {
    cursor: pointer;
  }
`

const AvatarField = styled(ProfileAvatar)`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  @media (max-width: 800px) {
    display: block;
  }
`
const Edit = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  color: #ffffff;
  font-weight: 500;
  background: #000000cc;
  padding: 2px 0 0 0;
  border-radius: 0 0 7px 7px;

  ${AvatarWrapper}:hover & {
    color: ${({ theme }) => theme.themeColors.primary};
    font-weight: 600;
  }
`

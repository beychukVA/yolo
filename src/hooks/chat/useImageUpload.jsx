import axios from 'axios'
import { API } from 'constants/apiEndPoints'
import { useUser } from 'hooks/user/useUser'
import { useState } from 'react'

export const useImageUpload = () => {
  const { accessToken } = useUser('wallet')

  const [imageUrl, setImageUrl] = useState('')

  const uploadImage = (imageFile) => {
    const formData = new FormData()
    formData.append('file', imageFile)

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'content-type': 'multipart/form-data'
    }
    axios
      .post(API.SOCIAL_IMAGE_UPLOAD, formData, { headers })
      .then((response) => {
        const imageUrl = response?.data?.body?.imageUrl
        setImageUrl(imageUrl)
      })
      .catch((err) => {
        console.log('ACZ err -->', JSON.parse(JSON.stringify(err)))
      })
  }

  return { imageUrl, uploadImage }
}

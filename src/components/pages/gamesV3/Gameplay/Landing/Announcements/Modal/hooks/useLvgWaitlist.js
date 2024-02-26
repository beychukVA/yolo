import { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { API } from 'constants/apiEndPoints'
import { useAccessToken } from 'hooks/user/useAccessToken'
import { emitCustomEvent } from 'react-custom-events'
import { EVENTS } from 'constants/events'
import { useYoloModal } from 'lib/yoloModals/useYoloModal'
import { useUser } from 'hooks/user/useUser'

export const useLvgWaitlist = () => {
  const { account } = useUser('wallet')
  const { accessToken } = useAccessToken(account)
  const [status, setStatus] = useState('')
  const [userInviteInfo, setUserInviteInfo] = useState()
  const { updateModal } = useYoloModal()

  const JoinTheWaitlistModalObj = {
    show: true,
    id: 'joinTheWaitlist',
    backdropClose: false,
    backdropBlurred: false
  }

  const sendInviteModalObj = {
    show: true,
    id: 'sendInvite',
    backdropClose: false,
    backdropBlurred: false
  }

  const SuccessAdditionToWaitlistModalObj = {
    show: true,
    id: 'successAdditionToWaitlist',
    backdropClose: false,
    backdropBlurred: false
  }

  const getUserInviteInfo = async (accessToken) => {
    const userInviteInfoResponse = await axios
      .get(API.GET_USER_INVITE_INFO, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .catch((err) => {
        throw err
      })
    const userInviteInfo = userInviteInfoResponse?.data?.userInfo || {}
    return userInviteInfo
  }

  const getWaitlistData = async (accessToken) => {
    const waitlistDataResponse = await axios
      .post(API.ADD_TO_BETA_WAITLIST, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .catch((err) => {
        throw err
      })
    const waitlistData = waitlistDataResponse.data.status || ''
    return waitlistData
  }

  const fetchUserInviteInfo = useCallback(async () => {
    getUserInviteInfo(accessToken)
      .then((res) => {
        if (res?.code) {
          setStatus('success')
        }
        setUserInviteInfo(res)
      })
      .catch((error) => console.log('fetchUserInviteInfo: ', error))
  }, [accessToken])

  const addToWaitlist = useCallback(async () => {
    await getWaitlistData(accessToken)
      .then((res) => {
        setStatus(res)
        if (res === 'success') {
          emitCustomEvent(EVENTS.USER_ADDED_LVG_WAITLIST, true)
          showSuccessAdditionToWaitlistModal()
        }
        if (res === 'fail') {
          emitCustomEvent(EVENTS.USER_ADDED_LVG_WAITLIST, false)
        }
      })
      .catch((error) => console.log('fetchWaitlistData: ', error))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const showSendInviteModal = () => {
    if (status === 'success') {
      updateModal(sendInviteModalObj)
    }
  }
  const showWaitlistJoinModal = () => updateModal(JoinTheWaitlistModalObj)
  const showSuccessAdditionToWaitlistModal = () => updateModal(SuccessAdditionToWaitlistModalObj)

  useEffect(() => fetchUserInviteInfo(), [fetchUserInviteInfo])

  return {
    userInviteInfo,
    status,
    addToWaitlist,
    showSendInviteModal,
    showWaitlistJoinModal,
    showSuccessAdditionToWaitlistModal
  }
}

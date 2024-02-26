import qs from 'qs'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useWalletConnection } from 'hooks/useWalletConnection'
import axios from 'axios'
import { API } from 'constants/apiEndPoints'
import { useAccessToken } from 'hooks/user/useAccessToken'
import { emitCustomEvent } from 'react-custom-events'
import { EVENTS } from 'constants/events'
import { useYoloToast } from 'lib/yoloToasts/useYoloToast'
import { useUser } from 'hooks/user/useUser'

const addBetaWithCode = async (accessToken, leverageBetaCode) => {
  const waitlistDataResponse = await axios
    .post(
      API.ADD_BETA_INVITE_CODE,
      { code: leverageBetaCode },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
    .catch((err) => {
      throw err
    })
  const waitlistData = waitlistDataResponse.data.status || ''
  return waitlistData
}

const toastSuccessObj = {
  id: 'announceToast',
  autoClose: false,
  props: {
    message: {
      title: 'Welcome to FUTURE$!',
      subtitle: `Have fun and let us know if you have any issues`,
      showTable: true
    }
  }
}

const toastErrorObj = {
  id: 'errorToast',
  autoClose: false,
  props: {
    message: {
      title: 'Oops! something went wrong',
      subtitle: 'please try again'
    }
  }
}

export const useLvgBetaCode = () => {
  const { yToast } = useYoloToast()
  const location = useLocation()
  const { isConnected, account, accessToken } = useUser('wallet')
  const { connectWallet, disconnectWallet } = useWalletConnection()
  const { getAccessToken } = useAccessToken()
  const { lvgbetacode } = qs.parse(location.search, { ignoreQueryPrefix: true })

  useEffect(() => {
    if (!lvgbetacode) return
    if (!isConnected) connectWallet('signUp', { lvgbetacode })
    if (isConnected) {
      const accessToken = getAccessToken(account)
      addBetaWithCode(accessToken, lvgbetacode)
        .then((res) => {
          if (res === 'success') {
            yToast(toastSuccessObj)
            emitCustomEvent(EVENTS.USER_ADDED_LVG_BETA, true)
          }
          if (res === 'fail') {
            emitCustomEvent(EVENTS.USER_ADDED_LVG_BETA, false)
            yToast(toastErrorObj)
          }
        })
        .catch((err) => {
          yToast(toastErrorObj)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected])
}

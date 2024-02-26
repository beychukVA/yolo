import axios from 'axios'
import {
    useLvgWaitlist
} from 'components/pages/gamesV3/Gameplay/Landing/Announcements/Modal/hooks/useLvgWaitlist'
import { API } from 'constants/apiEndPoints'
import { EVENTS } from 'constants/events'
import { useGatewayListener } from 'hooks/sockets/lvg/useGatewaySocket'
import { useAtomValue, useSetAtom } from 'jotai'
import { useCallback, useEffect } from 'react'
import { useCustomEventListener } from 'react-custom-events'

import { useAccessToken } from './useAccessToken'
import { LvgBeta } from './user'
import { updateUserLvgBetaAtom, userAtom } from './user.atom'

const getWaitlistData = async (accessToken: string) => {
  const waitlistDataResponse = await axios

    .get(API.CHECK_USER_BETA_STATUS, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .catch((err) => {
      throw err
    })

  const waitlistData = waitlistDataResponse.data || ''
  return waitlistData
}

const useUpdateLvgBetaUser = (account: string) => {
  const updateLvgBetaInfo = useSetAtom(updateUserLvgBetaAtom)
  const { getAccessToken } = useAccessToken(account)
  const { showWaitlistJoinModal } = useLvgWaitlist()

  const updateUserInWaitlist = useCallback(
    (origin: any, payload: any) => {
      switch (origin) {
        case 'gateway':
          const { inWaitlist } = payload
          if (!inWaitlist) showWaitlistJoinModal()
          updateLvgBetaInfo(payload)
          break
        case 'endpoint':
          const { account } = payload
          const accessToken = getAccessToken(account)
          getWaitlistData(accessToken)
            .then((res) => {
              const payload = res
              updateLvgBetaInfo(payload)
            })
            .catch((err) => {
              console.log('ACZ getWaitlistData err -->', err)
            })
          break
        default:
          break
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [updateLvgBetaInfo]
  )

  return { updateUserInWaitlist }
}

export const useInLvgBetaObserver = ({ account }: { account: string }) => {
  const userInfo = useAtomValue(userAtom)
  const { updateUserInWaitlist } = useUpdateLvgBetaUser(account)
  const updateLvgBetaInfo = useSetAtom(updateUserLvgBetaAtom)

  // check On load
  useEffect(() => {
    if (!account) return
    updateUserInWaitlist('endpoint', { account })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  // Gateway user.waitlist listener
  useGatewayListener('user.waitlist', (eventPayload: LvgBeta) => updateUserInWaitlist('gateway', eventPayload))

  //Events listeners
  /* prettier-ignore */ useCustomEventListener(EVENTS.USER_ADDED_LVG_WAITLIST, (inWaitlist:boolean) => updateLvgBetaInfo({ ...userInfo.lvgBeta, inWaitlist }))
  /* prettier-ignore */ useCustomEventListener(EVENTS.USER_ADDED_LVG_BETA, (inBeta:boolean) => updateLvgBetaInfo({ ...userInfo.lvgBeta, inBeta }))
}

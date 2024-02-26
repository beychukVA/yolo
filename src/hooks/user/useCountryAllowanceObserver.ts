import axios from 'axios'
import { config } from 'config'
import { API } from 'constants/apiEndPoints'
import { EVENTS } from 'constants/events'
import { useSetAtom } from 'jotai'
import ms from 'ms.macro'
import { useEffect } from 'react'
import { emitCustomEvent, useCustomEventListener } from 'react-custom-events'

import { Allowed } from './user'
import { updateUserAllowedAtom } from './user.atom'

const getCountryTimeOffset = (isoCode: string): number =>
  ({
    IN: ms`-30m`
  }[isoCode.toUpperCase()] || 0)

export const checkCountryAllowance = async (configObj?: { noEvent: boolean }): Promise<Allowed> => {
  const { noEvent } = configObj || { noEvent: false }
  const overrideAuth = ['dev'].includes(config.BASE_BRANCH)
  const { data } = await axios.post(API.AUTH_IP_CHECK)
  const payload = {
    isAllowed: overrideAuth || data?.allowed,
    countryISOCode: data?.countryISOCode,
    timeOffsetMs: getCountryTimeOffset(data?.countryISOCode)
  }
  !noEvent && emitCustomEvent(EVENTS.USER_COUNTRY_ALLOWANCE, payload)
  return payload
}

export const useCountryAllowanceObserver = (triggerArray: any[]) => {
  const updateUserAllowed = useSetAtom(updateUserAllowedAtom)

  const updateCountryAllowance = () =>
    checkCountryAllowance({ noEvent: true }).then((payload) => {
      updateUserAllowed(payload)
    })

  useEffect(() => {
    updateCountryAllowance()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, triggerArray)

  useCustomEventListener(EVENTS.USER_COUNTRY_ALLOWANCE, (payload: Allowed) => {
    updateUserAllowed(payload)
  })
}

import { getLocalStorage, setLocalStorage } from './baseFunction'

import { FIRST_LOAD_ONBOARDING } from 'constants/index'

export const getLocalOnBoardingViewed = () => getLocalStorage(FIRST_LOAD_ONBOARDING) || false
export const setLocalOnBoardingViewed = (boolean) => setLocalStorage(FIRST_LOAD_ONBOARDING, boolean)

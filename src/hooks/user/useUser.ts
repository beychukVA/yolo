import { useAtomValue, useSetAtom } from 'jotai'

import {
    resetUserAtom, updateUserBalanceAtom, updateUserProfileAtom, updateUserWalletAtom, userAtom
} from './user.atom'
import { User } from './user.d'

export const useUserUpdaters = () => {
  const resetUser = useSetAtom(resetUserAtom)
  const updateUserProfile = useSetAtom(updateUserProfileAtom)
  const updateUserWallet = useSetAtom(updateUserWalletAtom)
  const updateUserBalance = useSetAtom(updateUserBalanceAtom)
  return { resetUser, updateUserProfile, updateUserWallet, updateUserBalance }
}

export const useUser = (section: keyof User): any => {
  const userInfo = useAtomValue(userAtom)
  if (!section) return { ...userInfo }
  return { ...userInfo[section] }
}

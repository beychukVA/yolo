import { RANDOM_AVATAR_CACHED } from 'constants/index'
import { atom, useAtom, useAtomValue } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useCallback } from 'react'

import { avatars } from 'common'

const cachedAvatarsAtom = atomWithStorage(RANDOM_AVATAR_CACHED, {})
const updateCachedAvatarAtom = atom(null, (get, set, update) => {
  set(cachedAvatarsAtom, (prev) => ({ ...prev, ...update }))
})

const selectAvatar = () => {
  const avatarLength = Object.keys(avatars).length - 1
  const randomAvatarId = Math.trunc(Math.random() * avatarLength + 1)
  return randomAvatarId
}

export const useRandomAvatar = () => {
  const cachedAvatar = useAtomValue(cachedAvatarsAtom)
  const [, updateCachedAvatar] = useAtom(updateCachedAvatarAtom)

  const updateRandomAvatar = useCallback(
    (address, newName) => updateCachedAvatar({ [address]: newName }),
    [updateCachedAvatar]
  )
  const getRandomAvatar = useCallback(
    (address) => {
      const newAvatarId = selectAvatar()
      const cachedAvatarId = cachedAvatar[address]
      if (!cachedAvatarId && address) {
        updateCachedAvatar({ [address]: newAvatarId })
      }
      const rAvatar = cachedAvatarId || newAvatarId

      return avatars[`avatar${rAvatar}`]
    },
    [cachedAvatar, updateCachedAvatar]
  )
  return { getRandomAvatar, updateRandomAvatar }
}

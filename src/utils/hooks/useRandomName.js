import { RANDOM_USERNAME_CACHED } from 'constants/index'
import { atom, useAtom, useAtomValue } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useCallback } from 'react'
import { generateName } from 'utils/uiUtils'

const cachedNamesAtom = atomWithStorage(RANDOM_USERNAME_CACHED, {})
const updateCachedNamesAtom = atom(null, (get, set, update) => {
  set(cachedNamesAtom, (prev) => ({ ...prev, ...update }))
})

export const useRandomName = () => {
  const cachedNames = useAtomValue(cachedNamesAtom)
  const [, updateCachedName] = useAtom(updateCachedNamesAtom)

  const updateRandomName = useCallback(
    (address, newName) => updateCachedName({ [address]: newName }),
    [updateCachedName]
  )
  const getRandomName = useCallback(
    (address) => {
      const newName = generateName()
      const cachedName = cachedNames[address]
      if (!cachedName && address) {
        updateCachedName({ [address]: newName })
      }
      const rUsername = cachedName || newName
      return rUsername
    },
    [cachedNames, updateCachedName]
  )
  return { getRandomName, updateRandomName }
}

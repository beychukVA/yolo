import { Zero } from '@ethersproject/constants'
import { formatUnits } from '@ethersproject/units'

import { useContract } from 'hooks/contracts/useContract'
import { atom, useAtom, useAtomValue } from 'jotai'
import msM from 'ms.macro'
import { useCallback, useEffect } from 'react'
import { useIntervalWhen } from 'utils/hooks/useIntervalWhen'

const BASIC_POINTS_DECIMALS = 4
const INIT_STATE = { BN: Zero, N: 0 }

const lpFeeRateAtom = atom({})

const lpFeeRateUpdateAtom = atom(null, (get, set, update) => {
  const gameId = update.gameId
  const BN = update.BN
  const N = +formatUnits(BN, BASIC_POINTS_DECIMALS)
  set(lpFeeRateAtom, (prev) => ({ ...prev, [gameId]: { BN, N } }))
})

export const useGameLpFeeRate = (gameId) => {
  const gameContract = useContract(gameId)
  const gamesLpFeeRate = useAtomValue(lpFeeRateAtom)
  const [, updateGameLpFeeRate] = useAtom(lpFeeRateUpdateAtom)

  const updateLpFeeRate = useCallback(
    async (gameId) => {
      const BN =
        (await gameContract?.lpFeeRate().catch((err) => {
          console.log('ACZ lpFeeRate ERROR -->', err)
        })) || Zero
      updateGameLpFeeRate({ gameId, BN })
    },
    [updateGameLpFeeRate, gameContract]
  )

  const updateAll = () => {
    Object.keys(gamesLpFeeRate).map((gId) => updateLpFeeRate(gId))
  }

  useEffect(() => {
    if (!gamesLpFeeRate?.[gameId]?.N) updateLpFeeRate(gameId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId, !!gameContract])

  useIntervalWhen(updateAll, msM`60m`, !!gameContract && gameId, false)

  const nextLpFeeRate = gamesLpFeeRate[gameId] || INIT_STATE

  return { nextLpFeeRate }
}

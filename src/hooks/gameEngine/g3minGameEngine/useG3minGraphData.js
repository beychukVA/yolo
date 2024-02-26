import { atom, useAtom } from 'jotai'
import { isEqual } from 'lodash'
import { useCallback } from 'react'

const g3minGraphDataAtom = atom({})
const updateG3minGraphDataAtom = atom(null, (get, set, update) => {
  const currentGraphData = get(g3minGraphDataAtom)
  if (!isEqual(currentGraphData, update)) {
    set(g3minGraphDataAtom, () => update)
    return
  }
})

export const useG3minGraphDataUpdater = () => {
  const [, setGraphData] = useAtom(updateG3minGraphDataAtom)
  const update3minGraphData = useCallback(
    (data) => {
      const { globals, ...gamesData } = data

      const newGraphData = Object.keys(gamesData)
        .map((gameId) => ({ [gameId]: gamesData[gameId].graphData }))
        .reduce((Obj, item) => ({ ...Obj, ...item }))
      setGraphData(newGraphData)
    },
    [setGraphData]
  )
  return { update3minGraphData }
}

export const useG3minGraphData = (gameId) => {
  const [graphsData] = useAtom(g3minGraphDataAtom)
  return { liveGraphData: graphsData[gameId] }
}

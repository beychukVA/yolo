import { LVG_ASSETS } from 'constants/games/lvg/lvgAssets'
import { atom, useAtomValue, useSetAtom } from 'jotai'
import { focusAtom } from 'jotai-optics'

const INIT_STATE = {
  activeAsset: {},
  activeOrder: {},
  liveOrder: {}
}

export const lvgStateAtom = atom(INIT_STATE)

const updateActiveAssetAtom = atom(null, (get, set, selectedAsset) => {
  set(lvgStateAtom, (prev) => {
    if (prev.activeAsset?.priceFeedSymbol === selectedAsset?.priceFeedSymbol) return prev
    return { ...prev, activeAsset: selectedAsset, activeOrder: {} }
  })
})

const updateActiveOrderAtom = atom(null, (get, set, selectedOrder) => {
  set(lvgStateAtom, (prev) => {
    if (prev.activeOrder?.uuid === selectedOrder?.uuid) return { ...prev, activeOrder: {} }
    const asset = LVG_ASSETS.find((asset) => asset.orderSymbol === selectedOrder?.asset)
    return { ...prev, activeAsset: asset, activeOrder: selectedOrder }
  })
})

const updateLiveOrderAtom = focusAtom(lvgStateAtom, (optic) => optic.prop('liveOrder'))

export const useLvgState = () => {
  const state = useAtomValue(lvgStateAtom)
  const setActiveAsset = useSetAtom(updateActiveAssetAtom)
  const setActiveOrder = useSetAtom(updateActiveOrderAtom)
  const setLiveOrder = useSetAtom(updateLiveOrderAtom)

  return { ...state, setActiveAsset, setActiveOrder, setLiveOrder }
}

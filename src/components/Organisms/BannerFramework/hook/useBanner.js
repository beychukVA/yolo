import { atom } from 'jotai'
import { useReducerAtom } from 'jotai/utils'
import { useCallback } from 'react'

const BANNER_STATE_INIT = {
  show: false,
  banners: [],
  type: {
    id: 'marquee',
    props: {
      delay: 5000
    }
  }
}

// banners: [
//     {
//       id: '',
//       props: {}
//     }

const bannerStateAtom = atom(BANNER_STATE_INIT)

export const useBanner = () => {
  const [state, dispatch] = useReducerAtom(bannerStateAtom, (prev, action) => {
    switch (action.type) {
      case 'SHOW':
        return {
          ...prev,
          show: action.payload
        }
      case 'REPLACE':
        return {
          ...prev,
          ...action.payload
        }
      case 'ADD':
        return {
          ...prev,
          show: action.payload.show ?? prev.show,
          banners: prev.banners.push(action.payload.banner)
        }
      case 'REMOVE':
        return {
          ...prev,
          banners: prev.banners.filter((bannerInfo) => bannerInfo.id !== action.payload)
        }
      case 'CLEAR':
        return BANNER_STATE_INIT
      default:
        return state
    }
  })

  const replace = useCallback((bannerObj) => dispatch({ type: 'REPLACE', payload: bannerObj }), [dispatch])
  const add = useCallback((bannerInfo) => dispatch({ type: 'ADD', payload: bannerInfo }), [dispatch])
  const remove = useCallback((bannerId) => dispatch({ type: 'REMOVE', payload: bannerId }), [dispatch])
  const show = useCallback((bannerId) => dispatch({ type: 'SHOW', payload: true }), [dispatch])
  const hide = useCallback((bannerId) => dispatch({ type: 'SHOW', payload: false }), [dispatch])
  const clear = useCallback(() => dispatch({ type: 'CLEAR' }), [dispatch])

  return { state, replace, add, remove, clear, show, hide }
}

import { useReactGA4Init } from 'GA4/useReactGA4'
import { useBanner } from 'components/Organisms/BannerFramework/hook/useBanner'
import { useLocation } from 'react-router-dom'

const { useEffect } = require('react')
const { useDispatch } = require('react-redux')

const banners = [
  { id: 'new24hrGames', props: {} },
  { id: 'doubleDepositBonus', props: {} }
]

const bannersType = {
  id: 'marquee',
  props: {
    backgroundColor: '#2a6dff',
    pixelSpeed: 50
  }
}

const useMultiBanner = () => {
  const dispatch = useDispatch()
  const { replace } = useBanner()
  const location = useLocation()
  useEffect(() => {
    replace({
      show: true,
      banners,
      type: bannersType
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, location])
}

export const OnLoad = () => {
  useReactGA4Init()
  useMultiBanner()

  return null
}

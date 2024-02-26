import { useCallback, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import { selectActiveStep } from 'redux/selectors'
import { onBoardingActions } from 'redux/actions'

import { IconLib } from 'components/Atoms/IconLib'

import { FullscreenWrapper } from 'components/Atoms/FullscreenWrapper'
import { OnBoardingWindow } from 'components/Atoms/OnBoardingWindow'
import { OnBoardingButton, OnBoardingButtonsRow } from 'components/Atoms/OnBoardingButton'
import { OnBoardingIntro, OnBoardingP } from 'components/Atoms/OnBoardingTexts'
import { setLocalOnBoardingViewed } from 'utils/localStorage/onBoarding'
import { OnBoardingRocket } from 'components/Atoms/OnBoardingRocket'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'

const TOUR_STEP = 'rocket'

export const GamePageTour = () => {
  const dispatch = useDispatch()
  const { activeGameId, setActiveGame, setActivePanel } = useActiveGameData()
  const tourActiveStep = useSelector(selectActiveStep())
  const showTourWindow = useMemo(() => tourActiveStep === TOUR_STEP, [tourActiveStep])

  const goNext = useCallback(() => {
    dispatch(onBoardingActions.goNext())
    // eslint-disable-next-line
  }, [])
  const close = useCallback(() => {
    setLocalOnBoardingViewed(true)
    setActivePanel('game')
    dispatch(onBoardingActions.cancel())
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (showTourWindow) {
      const activeCardRoundOffset = 1
      setActiveGame({ activeGameId, activeCardRoundOffset })
      setActivePanel('game')
    }
  }, [showTourWindow, dispatch, activeGameId])

  return !showTourWindow ? null : (
    <Container id='onBoarding_rocket'>
      <OnBoardingWindowO1 id='onboarding_window.o1'>
        <OnBoardingIntro>Welcome to</OnBoardingIntro>
        <YolorektLogo collection='yolorekt' name='YoloTokenStacked3d' />
        <OnBoardingP>
          YOLOrekt is a gamified price prediction app that makes bidding on assets - like ETH, Tesla, GameStop, Doge,
          and more - fun, rewarding, and potentially lucrative.
        </OnBoardingP>
        <OnBoardingP>
          We also feature YOLO Smart Liquidity Pools, which is backed by automated prediction algorithms, and allow LPs
          to make, at least, 3% fees in each round of bidding.
        </OnBoardingP>
        <OnBoardingP>
          <strong>Are you ready to take the tour?</strong>
        </OnBoardingP>
        <OnBoardingRocket />

        <OnBoardingButtonsRowO1>
          <OnBoardingButton id='button.back' variant='back' onClick={close}>
            Not right now
          </OnBoardingButton>
          <OnBoardingButton id='button.next' variant='next' onClick={goNext}>
            Yes, let's go!
          </OnBoardingButton>
        </OnBoardingButtonsRowO1>
      </OnBoardingWindowO1>
    </Container>
  )
}

const Container = styled(FullscreenWrapper)``
const OnBoardingWindowO1 = styled(OnBoardingWindow)`
  max-width: 500px;
  padding-bottom: 200px;
  ${({ theme }) => theme.breakPoints['1200px']} {
    min-width: 474px;
  }
  ${({ theme }) => theme.breakPoints['480px']} {
    min-width: 0;
    max-width: calc(100% - 40px);
    width: 100%;
    z-index: 9;
    height: calc(100% - 40px);
    padding-bottom: 200px;
  }
`

const YolorektLogo = styled(IconLib)`
  position: relative;
  margin: 10px 0;
  width: 250px;
  height: 140px;
  ${({ theme }) => theme.breakPoints['480px']} {
    width: 200px;
    height: 112px;
  }
`
const OnBoardingButtonsRowO1 = styled(OnBoardingButtonsRow)`
  display: flex;
  width: calc(100% - 60px);
  justify-content: space-between;
  position: absolute;
  bottom: 30px;
  ${({ theme }) => theme.breakPoints['480px']} {
    width: 100%;
    left: 0;
    padding: 0 20px;
    bottom: 20px;
  }
`

import { findDOMNode } from 'react-dom'
import { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import { selectActiveIdx, selectActiveStep } from 'redux/selectors'
import { onBoardingActions } from 'redux/actions'

import { useViewport } from 'contexts/viewport/useViewport'

import { FullscreenWrapper } from 'components/Atoms/FullscreenWrapper'
import { OnBoardingWindow } from 'components/Atoms/OnBoardingWindow'
import { OnBoardingButton, OnBoardingButtonsRow } from 'components/Atoms/OnBoardingButton'
import { OnBoardingProgressDots } from 'components/Atoms/OnBoardingProgressDots'
import { OnBoardingP, OnBoardingTitle } from 'components/Atoms/OnBoardingTexts'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'

const TOUR_STEP = 'bids'
const COMPONENT_ID = 'bidsButtons'

export const NextPredictTour = () => {
  const [position, setPosition] = useState({})
  const dispatch = useDispatch()
  const { gameId, activeCardRoundOffset, setActiveGame } = useActiveGameData()
  const tourActiveStep = useSelector(selectActiveStep())
  const activeIdx = useSelector(selectActiveIdx())
  const { width: windowWidth } = useViewport()

  function highlightComponent() {
    const node = document.getElementById(COMPONENT_ID)
    const componentDOM = findDOMNode(node)
    if (componentDOM) componentDOM.style.zIndex = 20
    return componentDOM
  }

  const showTourWindow = useMemo(
    () => tourActiveStep === TOUR_STEP,
    // eslint-disable-next-line
    [tourActiveStep, position]
  )

  const goNext = useCallback(() => {
    dispatch(onBoardingActions.goNext())
    // eslint-disable-next-line
  }, [])
  const goBack = useCallback(() => {
    dispatch(onBoardingActions.goBack())
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (showTourWindow) {
      const activeCardRoundOffset = 1
      setActiveGame({ gameId, activeCardRoundOffset })
      const componentDOM = highlightComponent()
      const { top, bottom, right, left, width, height } = componentDOM?.getBoundingClientRect() || {}
      setPosition({ top, bottom, right, left, width, height })
    }
    return () => {
      const componentDOM = highlightComponent()
      if (componentDOM) componentDOM.style.zIndex = null
    }
    // eslint-disable-next-line
  }, [showTourWindow, dispatch, gameId, activeCardRoundOffset])

  return useMemo(
    () =>
      !showTourWindow ? null : (
        <Container id='onBoarding_wallet'>
          <OnBoardingWindowO5 id='onboarding_window_o5' pos={position}>
            <OnBoardingTitle>Bid up or down - or both</OnBoardingTitle>
            <OnBoardingP>
              You can place a bid in any amount, to predict whether the strike price will be above or below the current
              price of the asset, or you can bid in both directions - and bid as many times as you’d like.
            </OnBoardingP>
            <OnBoardingProgressDots totalDots={7} currentIdx={activeIdx} />
            <OnBoardingButtonsRow>
              <OnBoardingButton id='button.back' variant='back' onClick={goBack}>
                Back
              </OnBoardingButton>
              <OnBoardingButton id='button.next' variant='next' onClick={goNext}>
                Next
              </OnBoardingButton>
            </OnBoardingButtonsRow>
          </OnBoardingWindowO5>
        </Container>
      ),
    // eslint-disable-next-line
    [tourActiveStep, windowWidth, position]
  )
}

const Container = styled(FullscreenWrapper)``

const OnBoardingWindowO5 = styled(OnBoardingWindow)`
  top: ${({ pos }) => `${pos.top}px`};
  left: ${({ pos }) => `${pos.left}px`};
  margin: 5px 2.5vw;
  transform: translate(0, calc(-100% - 10px));
  padding: 25px;
  max-width: 300px;
  z-index: 4;
  ${({ theme }) => theme.breakPoints['480px']} {
    margin: 5px 0;
    left: 50%;
    transform: translate(-50%, calc(-100% - 10px));
    max-width: 300px;
    width: 300px;
  }
`

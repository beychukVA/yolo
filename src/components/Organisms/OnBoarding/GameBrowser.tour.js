import { findDOMNode } from 'react-dom'
import { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import { selectActiveIdx, selectActiveStep } from 'redux/selectors'
import { onBoardingActions } from 'redux/actions'

import { useViewport } from 'contexts/viewport/useViewport'

import { OnBoardingWindow } from 'components/Atoms/OnBoardingWindow'
import { OnBoardingButton, OnBoardingButtonsRow } from 'components/Atoms/OnBoardingButton'
import { OnBoardingProgressDots } from 'components/Atoms/OnBoardingProgressDots'
import { OnBoardingP, OnBoardingTitle } from 'components/Atoms/OnBoardingTexts'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'

const TOUR_STEP = 'ribbon'
const COMPONENT_ID = 'gameBrowser'

export const GameBrowserTour = () => {
  const [position, setPosition] = useState({})
  const dispatch = useDispatch()
  const { gameId, setActiveGame } = useActiveGameData()
  const tourActiveStep = useSelector(selectActiveStep())
  const activeIdx = useSelector(selectActiveIdx())
  const { width: windowWidth } = useViewport()

  function highlightComponent() {
    const node = document.getElementById(COMPONENT_ID)
    const componentDOM = findDOMNode(node)
    if (!componentDOM) return null
    componentDOM.style.zIndex = 20
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
      const componentDOM = highlightComponent()
      const { top, bottom, right, width, height } = componentDOM.getBoundingClientRect() || {}
      setPosition({ top, bottom, right: windowWidth - right, width, height })
      setActiveGame({ gameId, activeCardRoundOffset })
    }
    return () => {
      const componentDOM = highlightComponent()
      if (componentDOM) componentDOM.style.zIndex = null
    }
    // eslint-disable-next-line
  }, [showTourWindow, dispatch, gameId])

  return useMemo(
    () =>
      !showTourWindow ? null : (
        <Container id='onBoarding_wallet' holePos={position}>
          <OnBoardingWindowO4 id='onboarding_window_o4' pos={position}>
            <OnBoardingTitle>Round Carousel</OnBoardingTitle>
            <OnBoardingP>
              Here you’ll be able to see past rounds, live rounds, and upcoming rounds - which you’ll be able to bid in
              within the length of the round.
            </OnBoardingP>
            <OnBoardingP>
              If you click on a live round, you can watch everything happen in real-time. You can chat with other
              bidders, keep track of how others are bidding, and monitor live stats in the process.
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
          </OnBoardingWindowO4>
        </Container>
      ),
    // eslint-disable-next-line
    [tourActiveStep, windowWidth, position]
  )
}

//const Container = styled(FullscreenWrapper)``

const Container = styled.div`
  position: fixed;
  top: ${({ holePos }) => `${holePos.top}px`};
  left: ${({ holePos }) => `${holePos.left}px`};
  width: ${({ holePos }) => `${holePos.width}px`};
  height: ${({ holePos }) => `${holePos.height}px`};
  box-shadow: 0 0 0 99999px rgba(0, 0, 0, 0.7);
  z-index: 20;
`

const OnBoardingWindowO4 = styled(OnBoardingWindow)`
  top: ${({ pos }) => `${pos.bottom}px`};
  left: 0;
  margin: 20px 20px;
  max-width: 300px;
  transform: none;
  z-index: 4;
  ${({ theme }) => theme.breakPoints['480px']} {
    left: 50%;
    margin: 20px 0;
    transform: translate(-50%, 0);
    width: 300px;
  }
`

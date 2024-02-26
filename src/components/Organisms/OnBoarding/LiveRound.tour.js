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

const TOUR_STEP = 'live'
const COMPONENT_ID1 = 'gameWrapper'

export const LiveRoundTour = () => {
  const [position, setPosition] = useState({})
  const dispatch = useDispatch()
  const { gameId, setActiveGame } = useActiveGameData()
  const tourActiveStep = useSelector(selectActiveStep())
  const activeIdx = useSelector(selectActiveIdx())
  const { width: windowWidth } = useViewport()

  function highlightComponent(id, zIndex) {
    const node = document.getElementById(id)
    const componentDOM = findDOMNode(node)
    if (componentDOM) componentDOM.style.zIndex = zIndex
    if (componentDOM) componentDOM.style.overflow = 'hidden'
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
      const activeCardRoundOffset = 0
      setActiveGame({ gameId, activeCardRoundOffset })
      const componentDOM = highlightComponent(COMPONENT_ID1, 20)
      const { top, bottom, right, left, width, height } = componentDOM.getBoundingClientRect() || {}
      setPosition({ top, bottom, right, left, width, height })
    }
    return () => {
      const componentDOM = highlightComponent(COMPONENT_ID1, null)
      if (componentDOM) componentDOM.style.overflow = ''
    }
    // eslint-disable-next-line
  }, [showTourWindow, dispatch, gameId])

  return useMemo(
    () =>
      !showTourWindow ? null : (
        <Container id='onBoarding_wallet'>
          <OnBoardingWindowO6 id='onboarding_window_o6' pos={position}>
            <OnBoardingTitle>The LIVE ROUND</OnBoardingTitle>
            <OnBoardingP>
              After you’ve placed bids, you can see them in action in the LIVE ROUND, monitor your total payout, and
              follow the current price up until the last block before settlement.
            </OnBoardingP>
            <ProgressDots totalDots={7} currentIdx={activeIdx} />
            <OnBoardingButtonsRow>
              <OnBoardingButton id='button.back' variant='back' onClick={goBack}>
                Back
              </OnBoardingButton>
              <OnBoardingButton id='button.next' variant='next' onClick={goNext}>
                Next
              </OnBoardingButton>
            </OnBoardingButtonsRow>
          </OnBoardingWindowO6>
        </Container>
      ),
    // eslint-disable-next-line
    [tourActiveStep, windowWidth, position]
  )
}

const Container = styled(FullscreenWrapper)``

const OnBoardingWindowO6 = styled(OnBoardingWindow)`
  top: 0;
  left: 0;
  transform: translate(0, 0);
  padding: 20px;
  max-width: 370px;
  border-top-left-radius: 0;
  z-index: 4;
  ${OnBoardingButtonsRow} {
    margin: -10px 0 0 0;
  }

  ${({ theme }) => theme.breakPoints['480px']} {
    max-width: 480px;
    width: 100%;
    left: 0;
    transform: none;
    z-index: 4;
    top: 0;
    border-top-right-radius: 0;
    ${OnBoardingButtonsRow} {
      margin: -10px 0 0 0;
    }
  }
`
const ProgressDots = styled(OnBoardingProgressDots)`
  align-items: center;
  margin: 0;
  ${({ theme }) => theme.breakPoints['480px']} {
    margin: 5px 0 0 0;
  }
`

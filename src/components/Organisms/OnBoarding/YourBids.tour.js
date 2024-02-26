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
import { Link } from 'components/Atoms/Link'
import { setLocalOnBoardingViewed } from 'utils/localStorage/onBoarding'
import { OnBoardingP, OnBoardingTitle } from 'components/Atoms/OnBoardingTexts'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'

const TOUR_STEP = 'yourBids'
const COMPONENT_ID1 = 'yourBids'

export const YourBidsTour = () => {
  const [position, setPosition] = useState({})
  const dispatch = useDispatch()
  const { gameId, activePanel, setActivePanel } = useActiveGameData()
  const tourActiveStep = useSelector(selectActiveStep())
  const activeIdx = useSelector(selectActiveIdx())
  const { width: windowWidth } = useViewport()

  function highlightComponent(id, zIndex) {
    const node = document.getElementById(id)
    const componentDOM = findDOMNode(node)
    if (componentDOM) componentDOM.style.zIndex = zIndex
    return componentDOM
  }

  const showTourWindow = useMemo(
    () => tourActiveStep === TOUR_STEP,
    // eslint-disable-next-line
    [tourActiveStep, position]
  )

  const restart = useCallback(() => {
    setLocalOnBoardingViewed(true)
    dispatch(onBoardingActions.start())
    // eslint-disable-next-line
  }, [])
  const goBack = useCallback(() => {
    dispatch(onBoardingActions.goBack())
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
      setActivePanel('stats')
      const componentDOM = highlightComponent(COMPONENT_ID1, 20)
      const { top, bottom, right, left, width, height } = componentDOM.getBoundingClientRect() || {}
      setPosition({ top, bottom, right, left, width, height })
    }
    return () => {
      const componentDOM = highlightComponent(COMPONENT_ID1, null)
      if (componentDOM) componentDOM.style.overflow = ''
    }
    // eslint-disable-next-line
  }, [showTourWindow, dispatch, gameId, activePanel])

  return useMemo(
    () =>
      !showTourWindow ? null : (
        <Container id='onBoarding_wallet'>
          <OnBoardingWindowO7 id='onboarding_window_o7' pos={position}>
            <OnBoardingTitle>YOUR BIDS</OnBoardingTitle>
            <OnBoardingP>View your complete bidding history for any asset, all in one place.</OnBoardingP>
            <ProgressDots totalDots={7} currentIdx={activeIdx} />
            <OnBoardingButtonsRow>
              <OnBoardingButton id='button.back' variant='back' onClick={goBack}>
                Back
              </OnBoardingButton>
              <OnBoardingButton id='button.next' variant='next' onClick={close}>
                Close
              </OnBoardingButton>
            </OnBoardingButtonsRow>
            <RestartLink to='/game' onClick={restart}>
              Restart tour
            </RestartLink>
          </OnBoardingWindowO7>
        </Container>
      ),
    // eslint-disable-next-line
    [tourActiveStep, windowWidth, position]
  )
}

const Container = styled(FullscreenWrapper)``

const OnBoardingWindowO7 = styled(OnBoardingWindow)`
  top: ${({ pos }) => `${pos.top}px`};
  left: ${({ pos }) => `${pos.left}px`};
  transform: translate(calc(-100% - 20px), 0);
  max-width: 300px;
  padding: 20px;
  z-index: 4;
  ${({ theme }) => theme.breakPoints['480px']} {
    left: 50%;
    top: ${({ pos }) => `${pos.bottom}px`};
    transform: translate(-50%, 20px);
    max-width: 300px;
    width: 300px;
  }
`

const ProgressDots = styled(OnBoardingProgressDots)`
  align-items: center;
`
const RestartLink = styled(Link)`
  padding: 10px 0;
  width: 100%;
  flex: 0 1 auto;
  font-size: 0.8rem;
  :hover {
    color: inherit;
  }
`

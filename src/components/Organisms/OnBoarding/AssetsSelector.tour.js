import { useCallback, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import { selectActiveIdx, selectActiveStep } from 'redux/selectors'
import { onBoardingActions } from 'redux/actions'

import { FullscreenWrapper } from 'components/Atoms/FullscreenWrapper'
import { OnBoardingWindow } from 'components/Atoms/OnBoardingWindow'
import { OnBoardingButton, OnBoardingButtonsRow } from 'components/Atoms/OnBoardingButton'
import { OnBoardingProgressDots } from 'components/Atoms/OnBoardingProgressDots'
import { OnBoardingP, OnBoardingTitle } from 'components/Atoms/OnBoardingTexts'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'

const TOUR_STEP = 'games'

export const AssetsSelectorTour = ({ componentRef, isActive, openMenu, closeMenu }) => {
  const dispatch = useDispatch()
  const { activeGameId } = useActiveGameData()

  const tourActiveStep = useSelector(selectActiveStep())
  const activeIdx = useSelector(selectActiveIdx())

  const { top, bottom, right, left } = componentRef?.current?.childNodes?.[1]?.getBoundingClientRect() || {}

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const showTourWindow = useMemo(() => componentRef.current && tourActiveStep === TOUR_STEP, [tourActiveStep])

  const position = { top, bottom, right, left }

  const goNext = useCallback(() => {
    closeMenu && closeMenu()
    dispatch(onBoardingActions.goNext())
    // eslint-disable-next-line
  }, [])
  const goBack = useCallback(() => {
    closeMenu && closeMenu()
    dispatch(onBoardingActions.goBack())
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const componentDOM = componentRef?.current
    if (componentDOM && showTourWindow) {
      componentDOM.style.zIndex = 20
      openMenu && openMenu()
    }
    return () => {
      componentDOM.style.zIndex = null
    }
    // eslint-disable-next-line
  }, [showTourWindow, dispatch, activeGameId])

  const stopPropagation = (e) => {
    e.stopPropagation()
  }

  return !showTourWindow ? null : (
    <Container id='onBoarding_games' onClick={stopPropagation}>
      <OnBoardingWindowO3 id='onboarding_window_o3' pos={position}>
        <OnBoardingTitle>Select a Game</OnBoardingTitle>
        <OnBoardingP>
          Select games to display in your round carousel and bid on rounds that use assets like ETH, Tesla, Doge, and
          more, at various block lengths.
        </OnBoardingP>
        <OnBoardingP>After selecting a game, you’ll be able to bid in any of the upcoming rounds.</OnBoardingP>
        <OnBoardingProgressDots totalDots={7} currentIdx={activeIdx} />
        <OnBoardingButtonsRow>
          <OnBoardingButton id='button.back' variant='back' onClick={goBack}>
            Back
          </OnBoardingButton>
          <OnBoardingButton id='button.next' variant='next' onClick={goNext}>
            Next
          </OnBoardingButton>
        </OnBoardingButtonsRow>
      </OnBoardingWindowO3>
    </Container>
  )
}

const Container = styled(FullscreenWrapper)``

const OnBoardingWindowO3 = styled(OnBoardingWindow)`
  top: ${({ pos }) => `${pos.top + 10}px`};
  left: ${({ pos }) => `${pos.right + 5}px`};
  transform: none;
  z-index: 4;
  max-width: 300px;
  ${({ theme }) => theme.breakPoints['480px']} {
    left: 50%;
    margin: 15px 0;
    top: ${({ pos }) => `${pos.bottom}px`};
    transform: translate(-50%, 0);
    max-width: 350px;
    width: 350px;
    z-index: 4;
    ${OnBoardingButtonsRow} {
      margin: -15px 0 0 0;
    }
  }
`

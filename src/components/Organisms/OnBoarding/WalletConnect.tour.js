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

const TOUR_STEP = 'wallet'

export const WalletConnectTour = ({ componentRef }) => {
  const [position, setPosition] = useState({})
  const dispatch = useDispatch()
  const { gameId, setActiveGame } = useActiveGameData()
  const tourActiveStep = useSelector(selectActiveStep())
  const activeIdx = useSelector(selectActiveIdx())
  const { width: windowWidth } = useViewport()

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
    const componentDOM = componentRef?.current || {}
    if (showTourWindow) {
      const activeCardRoundOffset = 1
      const { top, bottom, right, left, width, height } = componentDOM.getBoundingClientRect() || {}
      setPosition({ top, bottom, left, right: windowWidth - right, width, height })
      componentDOM.style.zIndex = 20
      setActiveGame({ gameId, activeCardRoundOffset })
    }
    return () => {
      componentDOM.style.zIndex = null
    }
    // eslint-disable-next-line
  }, [showTourWindow, dispatch, gameId])

  return useMemo(
    () =>
      !showTourWindow ? null : (
        <Container id='onBoarding_wallet'>
          <OnBoardingWindowO2 id='onboarding_window_o2' pos={position}>
            <OnBoardingTitle>Sign in / Register / Wallet</OnBoardingTitle>
            <OnBoardingP>
              In order to bid you must first create an account, or Sign in if you already have one. You also have the
              option to connect a private external Wallet such as MetaMask.
            </OnBoardingP>
            <OnBoardingP>
              With a YOLOREKT account, you can take advantage of our all-new Wallet - where depositing and withdrawing
              funds is fast and easy. You now have the option to use your Credit/Debit card as a source of funds, or a
              Polygon exchange.
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
          </OnBoardingWindowO2>
        </Container>
      ),
    // eslint-disable-next-line
    [tourActiveStep, windowWidth, position]
  )
}

const Container = styled(FullscreenWrapper)``

const OnBoardingWindowO2 = styled(OnBoardingWindow)`
  top: ${({ pos }) => `${pos.bottom}px`};
  right: ${({ pos }) => `${pos.right}px`};
  margin: 20px 0;
  max-width: 300px;
  left: auto;
  transform: none;
  padding: 25px;
  width: 300px;
  z-index: 4;

  ${({ theme }) => theme.breakPoints['1200px']} {
    left: 50%;
    top: ${({ pos }) => `${pos.top}px`};
    transform: translate(-50%, calc(-100% - 40px));
    width: 300px;
  }
`

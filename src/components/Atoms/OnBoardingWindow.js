import { useCallback } from 'react'
import styled from 'styled-components'

import { useDispatch } from 'react-redux'
import { onBoardingActions } from 'redux/actions'

import { OnBoardingCloseButton } from './OnBoardingCloseButton'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'

export const OnBoardingWindow = ({ className, children }) => {
  const dispatch = useDispatch()
  const { setActivePanel } = useActiveGameData()
  const cancel = useCallback(() => {
    setActivePanel('game')
    dispatch(onBoardingActions.cancel())
  }, [dispatch])

  return (
    <OnBoardingWindowCSS className={className}>
      <OnBoardingCloseButton onClick={cancel} />
      {children}
    </OnBoardingWindowCSS>
  )
}

const OnBoardingWindowCSS = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;

  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  z-index: 4;
  backdrop-filter: blur(40px);
  padding: 20px;

  :after {
    position: absolute;
    background: rgba(42, 109, 255, 0.2);
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -2;
    content: '';
    border-radius: 15px;
  }
  ${({ theme }) => theme.breakPoints['480px']} {
    padding: 20px 20px 10px 20px;
  }
`

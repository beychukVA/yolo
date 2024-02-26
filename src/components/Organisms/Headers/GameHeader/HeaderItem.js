import { IconLib } from 'components/Atoms/IconLib'
import React, { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import styled, { css, keyframes } from 'styled-components'

export const HeaderItem = ({ children, onClick, emphasis, forMobile, forAll, badgeIcon, isActive, pathAttached }) => {
  const location = useLocation()
  const onAction = () => {
    onClick && onClick()
  }
  const myPage = useMemo(() => {
    if (pathAttached) return location.pathname === pathAttached
    return true
  }, [location.pathname, pathAttached])

  return (
    myPage && (
      <LeftItem onClick={onAction} forMobile={forMobile} forAll={forAll} emphasis={emphasis} isActive={isActive}>
        {children}
        {badgeIcon && <BadgeIcon {...badgeIcon} />}
      </LeftItem>
    )
  )
}

const textClip = keyframes`
  to {
    background-position: 200% center;
  }
`
const emphasisStyle = css`
  text-decoration: none;
  font-weight: 600;
  background-image: linear-gradient(-225deg, #fff 0%, #2a6dff 29%, #de0e54 67%, #ffffff 100%);
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  color: #fff;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${textClip} 2s linear infinite;
  filter: brightness(150%);
  transition: none;
  :hover {
    background-image: none;
    background-color: #fff;
    filter: brightness(100%);
    animation: none;
    color: #fff;
  }
`

const activeCss = css`
  color: #2a6dff;
  text-decoration: none;
  font-weight: 700;
`

const LeftItem = styled.div`
  display: ${({ forAll, forMobile }) => (forAll ? 'flex' : forMobile ? 'none' : 'flex')};
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 10px;
  text-transform: uppercase;
  cursor: pointer;
  margin: 0 0 0 20px;
  text-decoration-color: #666;
  text-underline-position: under;
  font-size: 13px;
  align-items: center;
  ${({ emphasis, isActive }) => !isActive && emphasis && emphasisStyle}
  ${({ isActive }) => isActive && activeCss}
  
  ${({ theme }) => theme.breakPoints['1200px']} {
    display: flex;
  }
  ${({ theme }) => theme.breakPoints['768px']} {
    display: ${({ forAll, forMobile }) => (forAll ? 'flex' : forMobile ? 'flex' : 'none')};
  }
  ${({ theme }) => theme.breakPoints['480px']} {
    margin: 0 0 0 5px;
    padding: 0 5px;
  }
  :hover {
    text-decoration: none;
  }
`
const BadgeIcon = styled(IconLib)`
  padding: 0 10px;
  width: 10px;
  height: 10px;
`

import React, { useMemo } from 'react'
import { createPortal } from 'react-dom'
import { Staked } from './Staked'
import { SlideLeft } from './SlideLeft'
import styled from 'styled-components'
import { useBanner } from '../hook/useBanner'
import { Marquee } from './Marquee'

const getAnimationComponent = (typeId) =>
  ({
    staked: <Staked />,
    slideLeft: <SlideLeft />,
    marquee: <Marquee />
  }[typeId] || <Staked />)

export const BannerFramework = ({ containerId }) => {
  const { state } = useBanner()
  const { type } = state

  const AnimationComponent = useMemo(() => getAnimationComponent(type.id), [type.id])

  const AnimationComponentIsValidElement = React.isValidElement(AnimationComponent)
  const ComposedBanner =
    (AnimationComponentIsValidElement && React.cloneElement(AnimationComponent, type.props)) || null

  const container = document.getElementById(containerId)

  console.log('ACZ> container -->', container)

  return state.show && container ? createPortal(<BannersWrapper>{ComposedBanner}</BannersWrapper>, container) : null
}

const BannersWrapper = styled.div`
  width: 100vw;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
`

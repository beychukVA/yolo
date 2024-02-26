import styled from 'styled-components'
import { motion } from 'framer-motion'
import React, { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useViewport } from 'contexts/viewport/useViewport'
import { BannerLib } from '../Banners'
import { useBanner } from '../hook/useBanner'

export const Marquee = ({ className, pixelSpeed, backgroundColor }) => {
  const { width } = useViewport()
  const trackRef = useRef()
  const [track, setTrack] = useState()
  const {
    state: { banners }
  } = useBanner()

  const marqueeVariants = useMemo(
    () => ({
      animate: {
        x: [width, -trackRef.current?.scrollWidth],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: trackRef.current?.scrollWidth / pixelSpeed,
            ease: 'linear'
          }
        }
      }
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [width, trackRef.current?.scrollWidth, pixelSpeed]
  )

  useLayoutEffect(() => {
    const track = banners.map((bannerInfo, idx) => (
      <React.Fragment key={`0${idx}`}>
        <BannerLib key={`1${idx}`} bannerId={bannerInfo.id} props={bannerInfo.props} />
        <Divider key={`2${idx}`} />
      </React.Fragment>
    ))
    setTrack(track)
  }, [banners, trackRef.current?.scrollWidth])

  return (
    <>
      <MarqueeContainer className={className} backgroundColor={backgroundColor}>
        <MarqueeTrack ref={trackRef} variants={marqueeVariants} animate='animate'>
          {track}
        </MarqueeTrack>
      </MarqueeContainer>
    </>
  )
}

const MarqueeContainer = styled.div`
  position: relative;
  width: 100vw;
  max-width: 100%;
  overflow-x: hidden;
  background: ${({ backgroundColor }) => backgroundColor};
  height: 30px;
`

const MarqueeTrack = styled(motion.div)`
  height: 100%;
  display: flex;
  flex-direction: row;
  white-space: nowrap;
  width: max-content;
`
const Divider = styled.div`
  position: relative;
  width: 150px;
  height: 100%;
`

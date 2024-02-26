import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { useViewport } from 'contexts/viewport/useViewport'
import { useIntervalWhen } from 'utils/hooks/useIntervalWhen'
import { BannerLib } from '../Banners'
import { useBanner } from '../hook/useBanner'

const shiftToLeft = (array) => {
  const first = array[0]
  const newArray = [...array]
  newArray.shift()
  newArray.push(first)
  return newArray
}

export const SlideLeft = ({ state }) => {
  const { width } = useViewport()
  const {
    state: { banners }
  } = useBanner()
  const [idxArray, setIdsArray] = useState(banners)

  const shiftBanners = () => {
    setIdsArray(shiftToLeft(idxArray))
  }

  const isMoreThanOne = useMemo(() => banners.length > 1, [banners.length])

  useIntervalWhen(shiftBanners, state.transition.delay, isMoreThanOne, false)

  return (
    <>
      <BannersContainer>
        <AnimatePresence>
          <BannerItem key={idxArray[0].id} exit={{ x: -width }} transition={{ duration: 1 }}>
            <BannerLib bannerId={idxArray[0].id} props={idxArray[0].props} />
            {isMoreThanOne && <BannerLib bannerId={idxArray[1].id} props={idxArray[1].props} />}
          </BannerItem>
        </AnimatePresence>
      </BannersContainer>
    </>
  )
}

const BannersContainer = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: flex-start;
  height: 30px;

  ${({ theme }) => theme.breakPoints['768px']} {
    height: 85px;
  }
`

const BannerItem = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`

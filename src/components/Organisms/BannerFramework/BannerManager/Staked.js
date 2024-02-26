import styled from 'styled-components'
import { motion } from 'framer-motion'
import { BannerLib } from '../Banners'

export const Staked = ({ state }) => {
  const { banners } = state
  return (
    <BannersContainer>
      {banners.map((bannerInfo, bannerIdx) => (
        <BannerItem>
          <BannerLib key={bannerIdx} bannerId={bannerInfo.id} props={bannerInfo.props} />
        </BannerItem>
      ))}
    </BannersContainer>
  )
}

const BannersContainer = styled(motion.div)`
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`

const BannerItem = styled(motion.div)`
  width: 100vw;
`

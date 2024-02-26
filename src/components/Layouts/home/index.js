import styled from 'styled-components'

import { BackgroundParticles } from 'components/Organisms/homeV3/BackgroundParticles'
import { PageBackground } from 'components/Atoms/PagesBackground'
import { Footer } from 'components/Organisms/Footers/Footer'
import { LandingHeader } from 'components/Organisms/Headers/LandingHeader'
import { GameHeader } from 'components/Organisms/Headers/GameHeader'

export const HomeLayout = ({ children }) => {
  return (
    <Wrapper id='home_wrapper'>
      <BackgroundParticles />
      <Container>
        <PageBackground />
        <StickyHeader>
          <GameHeader isLandingVersion={true} />
        </StickyHeader>
        {children}
        <Footer position='relative' bgColor='transparent' />
      </Container>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`
const Container = styled.div`
  overflow-y: overlay;
  overflow-x: hidden;
  padding: 0;
`
const StickyHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
`

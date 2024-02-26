import styled from 'styled-components'

import { PageBackground } from 'components/Atoms/PagesBackground'
import { Footer } from 'components/Organisms/Footers/Footer'
import { LandingHeader } from 'components/Organisms/Headers/LandingHeader'
import { GameHeader } from 'components/Organisms/Headers/GameHeader'

export const NoWalletLayout = ({ children }) => {
  return (
    <>
      <PageBackground />
      <Wrapper id='page_wrapper'>
        <GameHeader />
        {children}
        <Footer bgColor='transparent' />
      </Wrapper>
    </>
  )
}
const Wrapper = styled.div`
  height: 100vh;
  position: relative;
  display: grid;
  align-items: stretch;
  align-content: space-between;
  grid-template: auto 1fr auto / 1fr;
`

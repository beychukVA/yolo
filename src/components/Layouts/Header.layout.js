import styled from 'styled-components'

export const HeaderLayout = ({ children, gridArea }) => {
  return (
    <HeaderWrapper gridArea={gridArea}>
      <BannerContainer id='bannerSlot' />
      <HeaderContainer>{children}</HeaderContainer>
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.div`
  ${({ gridArea }) => ({ gridArea })}
  z-index:5;
`
const BannerContainer = styled.div``
const HeaderContainer = styled.div``

import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import { LitePaper } from 'components/Molecules/LitePaper'
import { BurgerMenu } from 'components/Molecules/BurgerMenu'
import { IconLib } from 'components/Atoms/IconLib'
import { Link } from 'components/Atoms/Link'
import { HeaderLayout } from 'components/Layouts/Header.layout'

export const LandingHeader = () => {
  const history = useHistory()

  const redirectOnClick = () => {
    history.push('/game')
  }

  return (
    <HeaderLayout>
      <NavBar id='home_header'>
        <LeftNavBar>
          <Link to='/'>
            <MoonLogo collection='yolo' name='moon' dimension='34px' />
          </Link>
          <LitePaper />
        </LeftNavBar>
        <RightNavBar>
          <EnterAppBtn onClick={redirectOnClick}>Play now</EnterAppBtn>
          <BurgerMenu variant='landing' />
        </RightNavBar>
      </NavBar>
    </HeaderLayout>
  )
}

const NavBar = styled.div`
  position: sticky;
  top: 0;
  min-width: 320px;
  max-height: 60px;
  width: 100vw;
  z-index: 9;
  color: ${({ theme }) => theme.themeColors.textPrimary};
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  background: rgba(25, 30, 39, 0.4);
  backdrop-filter: blur(45px);
`
const LeftNavBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`
const RightNavBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`
const MoonLogo = styled(IconLib)`
  margin: 0 20px 0 0;
`
const EnterAppBtn = styled.button`
  background: #1d4baf;
  color: ${({ theme }) => theme.themeColors.textPrimary};
  position: relative;
  padding: 10px 18px;
  border-radius: 15px;
  white-space: nowrap;
  line-height: 100%;
  font-size: 0.8rem;
  z-index: 3;
  height: 38px;
  &:hover {
    background: rgb(42, 109, 255);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed !important;
  }
`

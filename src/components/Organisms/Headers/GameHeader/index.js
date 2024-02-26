import React, { useMemo } from 'react'
import styled from 'styled-components'

import { HeaderDropdownItem } from 'components/Molecules/HeaderDropdownItem'
import { IconLib } from 'components/Atoms/IconLib'
import { AssetsSelector } from 'components/Molecules/AssetsSelector/'
import { BurgerMenu } from 'components/Molecules/BurgerMenu'
import { WalletManager } from 'components/Molecules/WalletManager'
import { Link } from 'components/Atoms/Link'
import { HeaderLayout } from 'components/Layouts/Header.layout'
import { HeaderItem } from './HeaderItem'
import { useHistory } from 'react-router-dom'
import { LitePaper } from 'components/Molecules/LitePaper'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { useUser } from 'hooks/user/useUser'

export const GameHeader = ({ className, gridArea, onItemClick, isLandingVersion }) => {
  const history = useHistory()
  const { account } = useUser('wallet')
  const { activeCardRoundOffset, activePanel } = useActiveGameData()

  const redirectOnClick = () => {
    history.push('/game')
  }
  const LEFT_ITEMS_PROPS = useMemo(
    () => [
      {
        forMobile: true,
        pathAttached: '/game',
        children: 'chat',
        onClick: () => {
          onItemClick && onItemClick({ id: 'chat' })
        },
        isActive: activePanel === 'chat'
      },
      {
        forMobile: true,
        pathAttached: '/game',
        children: activeCardRoundOffset < 0 ? 'bids' : 'LIVE BIDS',
        onClick: () => {
          onItemClick && onItemClick({ id: 'stats' })
        },
        isActive: activePanel === 'stats'
      },
      {
        children: 'bid now',
        forAll: true,
        isDropdown: false,
        emphasis: true,
        onClick: () => {
          history.push('/game?action=bidOnNext')
        }
      }
      // TODO - ACZ: this will be reenabled once other priorities have done
      // {
      //   children: 'compete',
      //   forMobile: false,
      //   isDropdown: false,
      //   //needsAccount: true,
      //   emphasis: true,
      //   onClick: () => history.push('/game/leader')
      // }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeCardRoundOffset, activePanel]
  )

  // const showLoading = useMemo(() => isRoundEnded, [isRoundEnded])

  return (
    <HeaderLayout>
      <HeaderNav id='HeaderNav' className={className}>
        <LeftArea>
          <Link to='/'>
            <YoloLogo collection='yolorekt' name={'moon'} dimension='34px' />
          </Link>
          {isLandingVersion && <LitePaper />}
          {!isLandingVersion && <AssetsSelector />}
          <FeaturesBetaButton to='/game' className='futures_link'>
            <strong>FUTURE$</strong> (Beta)
          </FeaturesBetaButton>
          {!isLandingVersion &&
            LEFT_ITEMS_PROPS.map((props, idx) => {
              if (props.needsAccount && !account) return null
              return props?.isDropdown ? (
                <HeaderDropdownItem key={`headerItem-${idx}`} {...props} />
              ) : (
                <HeaderItem key={`headerItem-${idx}`} {...props} />
              )
            })}
        </LeftArea>
        <RightArea>
          {/* <DisBtn onClick={onApprovalClick}>Disapproval</DisBtn> */}
          {isLandingVersion && <EnterAppBtn onClick={redirectOnClick}>Play now</EnterAppBtn>}
          {!isLandingVersion && <WalletManager />}
        </RightArea>
        <MenuArea>
          <BurgerMenu variant='game' />
        </MenuArea>
      </HeaderNav>
    </HeaderLayout>
  )
}

// const DisBtn = styled.button`
//   color: white;
//   background: orange;
//   margin: 0 20px;
//   padding: 10px;
//   border-radius: 10px;
// `

const HeaderNav = styled.div`
  box-sizing: border-box;
  flex: 1 0;
  height: 60px;
  display: flex;
  z-index: 4;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10px 20px;
  background: rgb(25, 30, 39);
  /* background: rgba(25, 30, 39, 0.4); */
  /* backdrop-filter: blur(45px); */
  align-items: center;
  transition: all ease-out 0.5s;
  @media (max-width: 480px) {
    padding: 10px 10px;
  }
`
const LeftArea = styled.div`
  flex: 1 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`
const RightArea = styled.div`
  flex: 1 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  ${({ theme }) => theme.breakPoints['1200px']} {
    display: none;
  }
`
const MenuArea = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
const YoloLogo = styled(IconLib)``
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
const FeaturesBetaButton = styled(Link)`
  cursor: pointer;
  display: flex;
  align-items: center;
  text-decoration: none;
  text-transform: uppercase;
  height: 100%;
  margin: 0 0 0 10px;
  color: #d1d2d4;
  background: #5a1998;
  padding: 3px 6px 2px 6px;
  line-height: 100%;
  border-radius: 0.4em;
  font-size: 0.8rem;
  text-transform: none;
  white-space: nowrap;
  &:hover {
    background: #6e1fba;
    color: #fff;
  }
  strong {
    font-weight: 800;
    padding: 0 4px 0 0;
  }
  ${({ theme }) => theme.breakPoints['1200px']} {
    display: none;
  }
`

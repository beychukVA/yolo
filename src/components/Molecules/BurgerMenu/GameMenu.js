import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import styled, { css } from 'styled-components'
import { onBoardingActions } from 'redux/actions'

import { Link } from 'components/Atoms/Link'
import { IconLib } from 'components/Atoms/IconLib'
import { useHistory } from 'react-router-dom'
import { useUser } from 'hooks/user/useUser'

export const GameMenu = () => {
  const history = useHistory()
  const { account } = useUser('wallet')
  const dispatch = useDispatch()
  const startTour = useCallback(() => {
    history.push('/game')
    dispatch(onBoardingActions.start())
  }, [dispatch, history])

  /* prettier-ignore */
  const MENU_ITEMS = [
    // { id: 'xft',             label: 'YOLO XFT',               icon: 'xftFramed',  collection: 'general',  to: '/game/yoloxft' },
    // { id: 'tour',            label: 'Onboarding Tour',        icon: 'tour',       collection: 'general',  to: '/game',                          onClick: startTour },
    // { id: 'compete',         label: 'Compete',                icon: 'crown',      collection: 'general',  to: '/game/leader',                   hideOn: 'desktop' },
    // { id: 'contest',         label: 'Leaderboard',            icon: 'crown',      collection: 'general',  to: '/game/leaderboard',                    },
    // { id: 'referralContest', label: 'Referral Program',       icon: 'referral',   collection: 'general',  to: '/game/referral',                 isSection: true },
    //-----------------------------------------------------------------
    { id: 'about',           label: 'About',                  icon: 'about',      collection: 'general',  to: '/about' },
    { id: 'docs',            label: 'Docs',                   icon: 'docs',       collection: 'general',  href: 'https://docs.yolorekt.finance'},
    { id: 'press',           label: 'Press & Media',          icon: 'press',      collection: 'brands',   href: 'https://docs.yolorekt.finance/press-and-media' },
    { id: 'support',         label: 'Support',                icon: 'support',    collection: 'general',  href: 'https://yolorekt.zendesk.com' },
    { id: 'careers',         label: 'Careers',                icon: 'career',     collection: 'general',  href: 'https://pallet.xyz/list/bankless/job/409d9a69-e6fd-4644-83e3-02714e1cc1cc'    },
    { id: 'home',            label: 'Home',                   icon: 'moon',       collection: 'yolorekt', to: '/' }
  ]

  return (
    <StyledMenu>
      {MENU_ITEMS.map((item, index) => {
        if (item.needsAccount && !account) return null
        return (
          <>
            <MenuItem key={index} href={item.href} to={item.to} onClick={item.onClick} hide={item.hideOn}>
              <ItemIcon name={item.icon} collection={item.collection} />
              {item.label}
            </MenuItem>
            {item.isSection && <Section />}
          </>
        )
      })}
    </StyledMenu>
  )
}

const manageHideMenuItems = css`
  ${({ hide }) => (hide === 'desktop' ? 'display: none;' : 'display: flex;')}
  ${({ theme }) => theme.breakPoints['768px']} {
    ${({ hide }) => (hide === 'desktop' ? 'display: flex;' : 'display: none;')}
  }
`

const StyledMenu = styled.div`
  position: relative;
  margin: 10px 0 0 0;
  padding: 15px 0;
  box-sizing: border-box;
  z-index: 40 !important;
  width: auto;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  list-style: none;
  color: rgba(255, 255, 255, 1);
  backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
  cursor: default;
  justify-content: flex-start;
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: transparent;
    top: 0;
    left: 0;
    box-shadow: 10px 30px 35px 0px rgb(0 0 0 / 35%);
    z-index: -1;
    border-radius: 15px;
  }
`
const MenuItem = styled(Link)`
  ${({ hide }) => (hide ? manageHideMenuItems : 'display: flex;')}
  text-decoration: none;
  padding: 7px 24px;
  width: 100%;
  justify-content: flex-start;
  white-space: nowrap;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 400;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: ${({ theme }) => theme.themeColors.white};
  }
`
const ItemIcon = styled(IconLib).attrs((props) => ({
  collection: props.collection || 'brands',
  dimension: '16px',
  masking: true
}))`
  width: 16px;
  height: 16px;
  margin-right: 10px;
`
const Section = styled.div`
  padding: 0 0 10px 0;
  margin: 0 0 10px 0;
  border-bottom: 1px dotted rgba(255, 255, 255, 0.3);
`

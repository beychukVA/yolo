import React from 'react'
import styled from 'styled-components'

import { images } from 'common'

export const RoundMenuBody = ({ open, activeRound, setSelectedRound, isActive }) => {
  /* prettier-ignore */
  const MENU_ITEMS = [activeRound, activeRound + 1, activeRound + 2]
  return (
    <StyledMenu>
      {MENU_ITEMS.map((item, index) => (
        <MenuItem key={index} onClick={() => setSelectedRound(item)}>
          {item}
        </MenuItem>
      ))}
    </StyledMenu>
  )
}

const StyledMenu = styled.div`
  position: relative;
  margin: 10px 0 0 0;
  padding: 10px 0;
  box-sizing: border-box;
  z-index: 4;
  background: rgba(50, 73, 100, 0.8);
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

  @-moz-document url-prefix() {
    background: rgba(255, 255, 255, 0.2) url(${images.FireFoxMenuBg}) center center / cover no-repeat;
  }
`
const MenuItem = styled.div`
  text-decoration: none;
  white-space: nowrap;
  line-height: 120%;
  font-weight: 600;
  font-size: 1.4rem;
  padding: 5px 20px;
  display: flex;
  flex-wrap: nowrap;
  width: 100%;

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: ${({ theme }) => theme.themeColors.white};
  }
`

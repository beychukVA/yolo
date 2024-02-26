import React from 'react'
import styled, { css } from 'styled-components'

export const AssetsButton = ({ onClick, isActive }) => {
  return (
    <StyledButton onClick={onClick} menuIsOpen={isActive}>
      games
    </StyledButton>
  )
}

const menuOpen = css`
  color: #2a6dff;
  text-decoration: none;
`

const StyledButton = styled.div`
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  cursor: pointer;
  margin: 0 0 0 20px;
  align-items: center;
  text-transform: uppercase;
  /* text-decoration: underline; */
  text-decoration-color: #666;
  text-underline-position: under;
  font-size: 13px;
  color: ${({ theme }) => theme.themeColors.white};
  ${({ menuIsOpen }) => menuIsOpen && menuOpen}

  ${({ theme }) => theme.breakPoints['480px']} {
    margin: 0 0 0 10px;
    padding: 0 5px;
  }

  &:hover {
    text-decoration: none;
  }
  z-index: 9999999999 !important;
`

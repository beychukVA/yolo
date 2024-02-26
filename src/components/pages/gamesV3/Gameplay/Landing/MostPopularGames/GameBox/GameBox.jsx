import React from 'react'
import styled from 'styled-components'

export const GameBox = ({ children, onClick, className, href }) => {
  return (
    // <GameBoxContainer className={className} onClick={() => onClick()}>
    <GameBoxContainer
      href={href}
      onClick={() => {
        if (onClick) onClick()
      }}
      className={className}
    >
      {children}
    </GameBoxContainer>
  )
}

const GameBoxContainer = styled.a`
  background: hsla(0, 0%, 0%, 0.2);
  width: calc(50% - 15px);
  display: flex;
  border-radius: 10px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  line-height: 140%;
  flex-direction: row;
  padding: 30px;
  text-decoration: none;
`

import React from 'react'
import styled from 'styled-components'

export const HeadLine = ({ children }) => {
  return <Container>{children}</Container>
}

const Container = styled.div`
  text-align: center;
  justify-content: center;
  font-size: 2.1rem;
  letter-spacing: -0.02em;
  font-weight: 100;
  padding: 30px 10% 0 10%;
  line-height: 110%;

  & strong {
    display: inline;
    font-weight: 600;
  }

  ${({ theme }) => theme.breakPoints['480px']} {
    padding: 15px 15px 0 15px;
    font-size: 1.8rem;
  }
`

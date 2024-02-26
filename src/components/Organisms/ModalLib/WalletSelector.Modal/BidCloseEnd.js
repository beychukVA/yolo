import React from 'react'
import styled from 'styled-components'

export const BetaEnded = ({ timeLeft }) => {
  return (
    <Container id='modal_alert'>
      The Beta program has ended and the public release of Yolorekt will come in a few weeks. Please stay tuned for
      updates.
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  background: rgba(42, 109, 255, 0.3);
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  padding: 15px 10px;
  display: flex;
  justify-content: center;
  width: 320px;
  text-align: center;
  font-size: 0.8rem;
`

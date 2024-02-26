import React from 'react'
import styled from 'styled-components'

import { Typography } from 'components/Atoms/Typography'
import { IconLib } from 'components/Atoms/IconLib'

export const HasPendingTx = () => {
  return (
    <Container id='modal_alert'>
      <WarningIcon collection='general' name='warning' masking />
      <MsgContent weight='400'>A bid is currently pending approval</MsgContent>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px 30px;
  display: flex;
  background: rgba(255, 205, 25, 0.3);
  align-items: center;
`

const WarningIcon = styled(IconLib)`
  width: 18px;
  height: 18px;
  margin: 0 10px 0 0;
`
const MsgContent = styled(Typography)`
  font-size: 0.8rem;
  strong {
    font-weight: 700;
  }
`

import React from 'react'
import styled from 'styled-components'

import { Typography } from 'components/Atoms/Typography'
import { IconLib } from 'components/Atoms/IconLib'
import { formatTimeStamp } from 'utils'

export const BidCloseEnd = ({ timeLeft }) => {
  const msTimeLeft = Math.max(timeLeft, 0)
  return (
    <Container id='modal_alert'>
      <WarningIcon collection='general' name='warning' masking />
      <MsgContent weight='400'>
        Round will end in <strong>{formatTimeStamp(msTimeLeft, 'ss')}</strong> seconds.
        <br /> This bid may fail.
      </MsgContent>
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
  background: rgba(255, 0, 0, 0.3);
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

import { icons } from 'common'
import React from 'react'
import styled from 'styled-components'
import { ComingUpDetails } from '../ComingUpDetails/ComingUpDetails'
import { ComingUpIcon } from '../ComingUpDetails/ComingUpIcon'
import { ComingUpPeek } from '../ComingUpPeek/ComingUpPeek'
import { PeekTimer } from '../ComingUpPeek/PeekTimer'
import { PriceDirectionIcon } from '../ComingUpPeek/PriceDirectionIcon'
import { TotalTime } from '../ComingUpPeek/TotalTime'

const ShortTermCollapsedContent = ({ status }) => {
  return (
    <Container>
      <Icon status={status} />
      {/* <ComingUpDetails>
        <ComingUpIcon />
        <label>COMING UP</label>
      </ComingUpDetails>
      <ComingUpPeek>
        <TotalTime>3M</TotalTime>
        <PriceDirectionIcon arrow={true} />
        <PeekTimer>2:38</PeekTimer>
      </ComingUpPeek> */}
    </Container>
  )
}

export default ShortTermCollapsedContent

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  /* background: hsla(262, 75%, 59%, 0.2); */
`

const Icon = styled.div`
  width: 24px;
  height: 24px;
  -webkit-mask: url(${icons.short_term_prediction_icon}) center center / auto 25px no-repeat;
  mask: url(${icons.short_term_prediction_icon}) center center / auto 25px no-repeat;
  background: ${({ status }) => (status ? '#9343e0' : 'rgba(255, 255, 255, 1)')};
`

import { icons, images } from 'common'
import React from 'react'
import styled from 'styled-components'

const YoloDaysCollapsedContent = ({ status }) => {
  return (
    <Container>
      <Icon status={status} />
    </Container>
  )
}

export default YoloDaysCollapsedContent

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`
const Icon = styled.div`
  width: 24px;
  height: 24px;
  -webkit-mask: url(${icons.yolo_days_icon}) center center / auto 25px no-repeat;
  mask: url(${icons.yolo_days_icon}) center center / auto 25px no-repeat;
  background: ${({ status }) => (status ? '#9343e0' : 'rgba(255, 255, 255, 1)')};
`

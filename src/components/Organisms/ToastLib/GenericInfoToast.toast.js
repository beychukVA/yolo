import React from 'react'
import styled from 'styled-components'

import { Typography } from 'components/Atoms/Typography'

export const GenericInfoToast = ({ message, closeToast }) => {
  return (
    <Container>
      <MsgContent>
        <Typography variant='caption' align='left' size='0.9' weight='600'>
          {message}
        </Typography>
      </MsgContent>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 15px 20px;
`
const MsgContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 85%;
  white-space: break-spaces;
  strong {
    font-weight: 800;
  }
`

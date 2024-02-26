import React from 'react'
import styled from 'styled-components'

import { Typography } from 'components/Atoms/Typography'
import { IconLib } from 'components/Atoms/IconLib'

export const ReferralToast = ({ closeToast, type }) => {
  return (
    <Container>
      <ToastIcon collection='general' name='contest' masking />
      <MsgContent>
        <Typography variant='caption' align='left' size='0.9' weight='600'>
          Thanks for your interest!
        </Typography>
        <Typography size='0.8'>The email has been sent</Typography>
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
const ToastIcon = styled(IconLib)`
  width: 15%;
  height: 46px;
  margin: 0 15px 0 0;
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

import React from 'react'
import styled from 'styled-components'

import { IconLib } from 'components/Atoms/IconLib'
import { Typography } from 'components/Atoms/Typography'

export const GenericErrorToast = ({ closeToast, title, paragraph }) => {
  return (
    <Container>
      <ToastIcon collection='general' name='error' masking />
      <MsgContent>
        <Typography variant='caption' align='left' size='0.9' weight='600'>
          Username update fails
        </Typography>
        <Typography size='0.8'>
          Try setting a different username. If it persists, <a href='mailto:support@yolorekt.com'>contact us</a> for
          assistance.
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

const ToastIcon = styled(IconLib)`
  width: 15%;
  height: 46px;
  margin: 0 15px 0 0;
`
const MsgContent = styled.div`
  width: 85%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  flex-wrap: wrap;
`

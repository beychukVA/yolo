import React, { useMemo } from 'react'
import styled from 'styled-components'

import { Typography } from 'components/Atoms/Typography'
import { IconLib } from 'components/Atoms/IconLib'
import { Zero } from '@ethersproject/constants'
import { useConvertAmount } from 'utils/hooks'
import { config } from 'config'
import { useToken } from 'utils/hooks/useToken'

const { DEFAULT_TOKEN, DEFAULT_FIAT } = config

export const G3minBidPlacedToast = ({ closeToast, isUp, unitAmount, roundId, gameId }) => {
  const { tokenId, formatToken } = useToken()
  const tokenAmount = formatToken(unitAmount || Zero)
  const convert = useConvertAmount()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fiatAmount = useMemo(() => convert(tokenAmount || 0, tokenId, DEFAULT_FIAT), [tokenAmount])

  return (
    <Container>
      <ToastIcon collection='yolorekt' name={isUp ? 'bidUpSuccess' : 'bidDownSuccess'} />
      <MsgContent>
        <Typography variant='caption' align='left' size='0.9' weight='400'>
          Your <strong>Bid {isUp ? 'Up' : 'Down'}</strong> of <strong>{fiatAmount}</strong> has been successfully
          applied to <strong>Round {roundId}</strong>
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
  height: 35px;
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

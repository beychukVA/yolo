import React from 'react'
import styled from 'styled-components'

import { Typography } from 'components/Atoms/Typography'
import { IconLib } from 'components/Atoms/IconLib'
import { Link } from 'components/Atoms/Link'
import { useHistory } from 'react-router-dom'
import { useUnclaimedBalance } from 'hooks/unclaimedEarning/useUnclaimedBalance'

export const NoBiddableBalance = ({ closeModal }) => {
  const history = useHistory()
  const onClick = () => {
    history.push('/game/bidder-dashboard?id=claimSection')
    closeModal && closeModal()
  }

  const {
    data: { hasUnclaimedRounds }
  } = useUnclaimedBalance()

  return (
    <Container id='modal_alert'>
      <WarningIcon collection='general' name='warning' masking />
      <MsgContent weight='400'>
        {
          <>
            You do not have enough biddable funds. <br />
          </>
        }{' '}
        {hasUnclaimedRounds ? (
          <>
            Please <BidModalLink onClick={onClick}>claim your earnings</BidModalLink> to continue.
          </>
        ) : (
          <BidModalLink
            target='_'
            href='https://docs.yolorekt.finance/docs/getting-started#heres-what-you-need-to-do-to-get-started-bidding'
          >
            Learn how to get USDC and start bidding.
          </BidModalLink>
        )}
      </MsgContent>
    </Container>
  )
}

const BidModalLink = styled(Link)`
  &:hover {
    text-decoration: none;
    color: white;
  }
`

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

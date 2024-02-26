import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { currencyFormatter } from 'utils'
import { useConvertAmount } from 'utils/hooks'
import { UP, DOWN } from 'constants/index'
import { potentialGain } from 'utils/amounts'
import { config } from 'config'
import { useGameLpFeeRate } from 'hooks/games/useGameLpFeeRate'
import { useActiveGameData } from 'hooks/activeGameData/useActiveGameData'
import { PredictButton } from './PredictButton'
import { isEmpty } from 'lodash'
import { memoThis } from 'utils/react'
import { useYoloModal } from 'lib/yoloModals/useYoloModal'
import { useUser } from 'hooks/user/useUser'

const { DEFAULT_TOKEN, DEFAULT_FIAT } = config

export const G3minNextPredictView = memoThis(({ gamePool }) => {
  const { isAllowed } = useUser('allowed')
  const { gameId } = useActiveGameData()
  const {
    nextLpFeeRate: { N: fee }
  } = useGameLpFeeRate(gameId)

  const [showButtonsBanner] = useState(false)
  const [payoutsAndGainsUp, setPayoutsAndGainsUp] = useState({})
  const [payoutsAndGainsDown, setPayoutsAndGainsDown] = useState({})
  const { modalState, updateModal } = useYoloModal()

  const convert = useConvertAmount()

  const getBiddingModalObj = (bidObj) => ({
    show: true,
    id: 'bidding',
    backdropClose: false,
    backdropBlurred: false,
    // this component will receive `closeModal` prop to close programmatically the modal
    props: { bidObj }
  })

  useEffect(() => {
    if (isEmpty(gamePool)) return
    const myBids = gamePool.bids.myBids
    let upAmount = 0,
      downAmount = 0
    myBids.map((bid, index) => {
      if (bid.direction === UP) {
        upAmount += parseInt(bid.amount)
      } else {
        downAmount += parseInt(bid.amount)
      }
    })

    const { potentialRawGain: potRawGainUp, potentialPayout: potPayoutUp } = potentialGain(gamePool, fee, UP, upAmount)
    const { potentialRawGain: potRawGainDown, potentialPayout: potPayoutDown } = potentialGain(
      gamePool,
      fee,
      DOWN,
      downAmount
    )
    const fiatGainUp = convert(potRawGainUp, DEFAULT_TOKEN, DEFAULT_FIAT, { number: true }) || 0
    const fiatGainDown = convert(potRawGainDown, DEFAULT_TOKEN, DEFAULT_FIAT, { number: true }) || 0

    setPayoutsAndGainsUp({ potGain: currencyFormatter(fiatGainUp), potPayout: potPayoutUp })
    setPayoutsAndGainsDown({ potGain: currencyFormatter(fiatGainDown), potPayout: potPayoutDown })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gamePool])

  const isOpened = modalState.show && modalState.id === 'bidding'

  const onButtonClick = () => {
    const biddingModalObj = getBiddingModalObj({ gamePool })
    updateModal(biddingModalObj)
  }
  return (
    <Container id='bidsButtons'>
      {showButtonsBanner && (
        <ButtonsBanner>
          The Beta program has ended and the public release will come in a few weeks. Please stay tuned for updates.
        </ButtonsBanner>
      )}
      <Buttons disabled={isOpened}>
        <BidButton onClick={onButtonClick} disabled={isOpened || !isAllowed} />
        <BidButton onClick={onButtonClick} isUp disabled={isOpened || !isAllowed} />
      </Buttons>
      <Payouts>
        <PayoutContainer>
          <strong>Payout</strong>
          {payoutsAndGainsDown.potGain}
          <Payout isUp={false}>{payoutsAndGainsDown.potPayout}</Payout>
        </PayoutContainer>
        <PayoutContainer>
          <strong>Payout</strong>
          {payoutsAndGainsUp.potGain}
          <Payout isUp={true}>{payoutsAndGainsUp.potPayout}</Payout>
        </PayoutContainer>
      </Payouts>
    </Container>
  )
})

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  padding: 0 2.5vw;
  flex-direction: column;
  align-items: center;
  margin: 0 0 20px 0;
  ${({ theme }) => theme.breakPoints['xs']} {
    margin: 0 0 15px 0;
  }
`

const Buttons = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  ${({ disabled }) => (!disabled ? '-webkit-box-shadow: 0 0 60px 0 rgb(42 109 255 / 40%);' : '')}
  ${({ disabled }) => (!disabled ? 'border: 1px solid rgba(42, 109, 255, 0.4);' : '')}
  border-radius: 10px;
  margin: 0 0 10px 0;
`
const BidButton = styled(PredictButton)`
  width: 50%;
  padding: 14px 0;
`
const Payouts = styled.div`
  flex: 1 0 auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: space-between;
`
const PayoutContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 0 0;
  font-weight: 300;

  & strong {
    display: flex;
    padding-right: 9px;
    opacity: 0.5;
  }
`
const Payout = styled.div`
  display: flex;
  padding: 2px 4px;
  border-radius: 5px;
  font-size: 0.8rem;
  margin: 0 0 0 8px;
  font-weight: 600;
  background: ${({ isUp }) =>
    isUp
      ? 'linear-gradient(0deg, rgba(0,135,13,.5) 0%, rgba(1,168,17,.5) 100%)'
      : 'linear-gradient(0deg, rgba(175,11,66,.5) 0%, rgba(226,14,85,.5) 100%)'};
`
const ButtonsBanner = styled.div`
  position: relative;
  background: rgba(42, 109, 255, 0.3);
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  padding: 5px 10px;
  display: flex;
  justify-content: center;
  width: 320px;
  text-align: center;
  font-size: 0.8rem;
  width: calc(100% - 20px);
`

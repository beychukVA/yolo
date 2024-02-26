import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { currencyFormatter } from 'utils'
import { isEmpty } from 'lodash'
import { SingleContentToggle } from 'components/Atoms/SingleContentToggle'
import { getPayoutsFactorBN } from 'utils/payout'
import { useToken } from 'utils/hooks/useToken'
import { Zero } from '@ethersproject/constants'
import { useYoloModal } from 'lib/yoloModals/useYoloModal'
import { useUser } from 'hooks/user/useUser'

export const G24hrNextPredictView = ({ gamePool }) => {
  const { formatToken: formatFactor } = useToken('BASIS_POINT')
  const { isAllowed } = useUser('allowed')

  const [showButtonsBanner] = useState(false)
  const [payoutsAndGainsMin, setPayoutsAndGainsMin] = useState({})
  const [payoutsAndGainsMax, setPayoutsAndGainsMax] = useState({})
  const { modalState, updateModal } = useYoloModal()

  const biddingModalObj = {
    show: true,
    id: 'bidding',
    backdropClose: false,
    backdropBlurred: false
  }

  useEffect(() => {
    if (isEmpty(gamePool)) return

    const bucketsAmount = gamePool?.bucketsAmount || {}
    const bAmountArray = Object.keys(bucketsAmount).reduce((result, item, idx) => {
      return [...result, bucketsAmount?.[`l${idx}`]]
    }, [])
    const payoutsFactorBN = getPayoutsFactorBN(bAmountArray).sort((aBN, bBN) => {
      return aBN.sub(bBN)
    })

    setPayoutsAndGainsMin({ potPayoutBN: payoutsFactorBN[0] })
    setPayoutsAndGainsMax({ potPayoutBN: payoutsFactorBN[payoutsFactorBN.length - 1] })
  }, [gamePool])

  const isOpened = modalState.show && modalState.id === 'bidding'

  const onButtonClick = () => {
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
        <BidButton onClick={onButtonClick} disabled={isOpened || !isAllowed}>
          Bid now
        </BidButton>
      </Buttons>
      <Payouts>
        <PayoutContainer>
          <SingleContentToggle
            toggle={!!gamePool?.bids?.allBids.length}
            trueContent={
              <>
                <strong>Payout range</strong>
                <Payout isUp={false}>
                  {`${currencyFormatter(formatFactor(payoutsAndGainsMin.potPayoutBN || Zero), {
                    decimalDigits: 2,
                    noCurrencySign: true
                  })}`}
                  X
                </Payout>
                &nbsp;&nbsp;-
                <Payout isUp={true}>
                  {`${currencyFormatter(formatFactor(payoutsAndGainsMax.potPayoutBN || Zero), {
                    decimalDigits: 2,
                    noCurrencySign: true
                  })}`}
                  X
                </Payout>
              </>
            }
            falseContent={<strong>No Payouts available</strong>}
          />
        </PayoutContainer>
      </Payouts>
    </Container>
  )
}

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
  border-radius: 15px;
  margin: 0 0 10px 0;
`
const BidButton = styled.button`
  text-align: center;
  background: linear-gradient(
    90deg,
    rgba(0, 135, 13, 1) 0%,
    rgba(0, 113, 11, 1) 15%,
    rgba(0, 96, 9, 1) 25%,
    rgba(0, 82, 8, 1) 40%,
    rgba(51, 56, 67, 1) 50%,
    rgba(104, 0, 35, 1) 60%,
    rgba(119, 7, 45, 1) 75%,
    rgba(150, 9, 57, 1) 85%,
    rgba(175, 11, 66, 1) 100%
  );
  margin-left: 0;
  width: 100%;
  border-radius: 15px;
  font-size: 1.2rem;
  font-weight: 500;
  padding: 16px 0;
  position: relative;
  justify-content: center;
  cursor: pointer;
  color: #fff;
`
const Payouts = styled.div`
  flex: 1 0 auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: space-between;
`
const PayoutContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 0 0;
  font-weight: 300;
  font-size: 0.8rem;

  & strong {
    display: flex;
    padding-right: 9px;
    opacity: 0.5;
    font-size: 0.75rem;
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

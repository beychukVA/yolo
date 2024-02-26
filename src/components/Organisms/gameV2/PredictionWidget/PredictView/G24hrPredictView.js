import { useEffect, useState, useMemo, useCallback } from 'react'
import styled from 'styled-components'
import { isEmpty } from 'lodash'

import { useSelector } from 'react-redux'

import { UP, DOWN } from 'constants/index'
import { getGameParameters } from 'constants/games'

import { selectActiveGameId } from 'redux/selectors'

import { BidDropdown } from 'components/Atoms/BidDropdown'
import { IconLib } from 'components/Atoms/IconLib'

import { formatUTCTimestamp, currencyFormatter } from 'utils'
import { memoThis } from 'utils/react'
import { BucketsLevelIcon } from 'components/Atoms/BucketLevelIcon'
import { getPayoutsFactorBN } from 'utils/payout'
import { useToken } from 'utils/hooks/useToken'
import { Zero } from '@ethersproject/constants'
import { SingleContentToggle } from 'components/Atoms/SingleContentToggle'

export const G24hrPredictView = memoThis(({ gamePool, potentialGain, myBids = [] }) => {
  const { formatToken: formatFactor } = useToken('BASIS_POINT')
  const [selectedItem, setSelectedItem] = useState()
  const [options, setOptions] = useState([])
  const [level, setLevel] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState()
  const [hasBids, setHasBids] = useState(false)
  const [myUpTotal, setMyUpTotal] = useState(0)
  const [myDownTotal, setMyDownTotal] = useState(0)

  const showPayout = (isPayoutUp) => {
    if (isEmpty(gamePool)) return `0.00 X`

    const payoutFactor = gamePool?.[isPayoutUp ? 'payoutUp' : 'payoutDown']

    if (payoutFactor === Infinity) return 'MAX'
    return `${payoutFactor.toFixed(2)} X`
  }

  const levelPayoutFactorBN = useMemo(() => {
    const bucketsAmount = gamePool?.bucketsAmount || {}
    const bAmountArray = Object.keys(bucketsAmount).reduce((result, item, idx) => {
      return [...result, bucketsAmount?.[`l${idx}`]]
    }, [])
    const payoutsFactorBN = getPayoutsFactorBN(bAmountArray)
    return payoutsFactorBN
  }, [gamePool?.bucketsAmount])

  useEffect(() => {
    if (!myBids) {
      setOptions([])
      setMyUpTotal(0)
      setMyDownTotal(0)
      return
    }
    let opts = []
    let upTotal = 0
    let downTotal = 0
    for (let i = 0; i < myBids.length; i++) {
      const bidAmount = parseFloat(myBids[i].amount)

      if (myBids[i].direction === UP) {
        upTotal += bidAmount
      } else if (myBids[i].direction === DOWN) {
        downTotal += bidAmount
      }

      opts.push({
        id: `${i}-${myBids[i].bucketLevel}-${bidAmount.toFixed(2)}`,
        level: myBids[i].bucketLevel,
        caption: '$' + bidAmount.toFixed(2)
      })
    }
    setOptions(opts)
    setMyUpTotal(upTotal)
    setMyDownTotal(downTotal)
  }, [myBids])

  useEffect(() => {
    if (!options || !options.length) {
      setHasBids(false)
      setSelectedItem('')
      setSelectedAmount('0.00')
      return
    }
    const currentItem = selectedItem ? selectedItem : options[0].id
    const currentBid = currentItem.split('-')
    setHasBids(true)
    setLevel(currentBid[1])
    setSelectedAmount(currentBid[2])
  }, [options, selectedItem])

  const onBidItemChange = (value) => {
    setSelectedItem(value)
  }

  return (
    <Container>
      {useMemo(
        () => (
          <>
            <SectionNumberOfBids>
              <BidsCountDropdown label='You made' options={options} onChange={onBidItemChange}></BidsCountDropdown>
            </SectionNumberOfBids>
            <SectionCurrentBid>
              {hasBids ? <DateTime>{formatUTCTimestamp(gamePool?.timestamp)}</DateTime> : ''}
              {hasBids ? (
                <BidAmountWrapper>
                  <BucketsLevelIcon level={level} size='large' />
                  <Amount>{currencyFormatter(selectedAmount)}</Amount>
                </BidAmountWrapper>
              ) : (
                ''
              )}
            </SectionCurrentBid>
          </>
        ),
        // eslint-disable-next-line
        [hasBids, level, options.length, selectedAmount]
      )}
      {useMemo(
        () => (
          <>
            <SectionPayout>
              <TotalPayoutHeading hasBids={hasBids}>Total Payout</TotalPayoutHeading>
              <Payout>
                <strong>{`${currencyFormatter(selectedAmount * formatFactor(levelPayoutFactorBN[level] || Zero), {
                  decimalDigits: 2
                })}`}</strong>
                <Multiply hasBids={hasBids} isUp={level >= 3}>
                  <SingleContentToggle
                    noWrapper
                    toggle={hasBids}
                    trueContent={`${currencyFormatter(formatFactor(levelPayoutFactorBN[level] || Zero), {
                      decimalDigits: 2,
                      noCurrencySign: true
                    })}X`}
                    falseContent={`${currencyFormatter(0, {
                      decimalDigits: 2,
                      noCurrencySign: true
                    })}X`}
                  />
                </Multiply>
              </Payout>
            </SectionPayout>
          </>
        ),
        // eslint-disable-next-line
        [myUpTotal, myDownTotal, hasBids, level, showPayout]
      )}
    </Container>
  )
})

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  min-height: 90px;
  padding: 0;
  ${({ theme }) => theme.breakPoints['1200px']} {
    margin: 0 30px;
  }

  ${({ theme }) => theme.breakPoints['600px']} {
    width: 100%;
    padding: 0 15px;
    margin: 0;
    position: absolute;
    bottom: 0;
    transform: translate(-50%);
    left: 50%;
  }

  ${({ theme }) => theme.breakPoints['480px']} {
    min-height: 60px;
  }
`
const SectionNumberOfBids = styled.div`
  width: 33.3%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;

  ${({ theme }) => theme.breakPoints['480px']} {
    width: 33%;
  }
`

const BidsCountDropdown = styled(BidDropdown)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
const SectionCurrentBid = styled.div`
  width: 33.333333%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`
const DateTime = styled.div`
  font-size: 0.75rem;
  color: #7d7f83;
  line-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  margin-top: -15px;

  ${({ theme }) => theme.breakPoints['480px']} {
    font-size: 0.7rem;
    margin-top: 0;
    height: 15px;
    align-items: flex-start;
  }
`
const BidAmountWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const IconBid = styled(IconLib).attrs({ collection: 'yolorekt', dimension: '26px' })`
  width: 30px;
  height: 26px;

  ${({ theme }) => theme.breakPoints['480px']} {
    width: 24px;
    height: 20px;
  }
`

const Amount = styled.div`
  font-size: 1.9rem;
  font-weight: 300;
  letter-spacing: -0.02em;
  margin: 0 5px;
  display: flex;
  line-height: 100%;

  ${({ theme }) => theme.breakPoints['480px']} {
    font-size: 1.3rem;
    letter-spacing: -0.01em;
  }
`
const SectionPayout = styled.div`
  width: 33.333333%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
  font-size: 0.9rem;
  position: relative;
  font-weight: 500;

  ${({ theme }) => theme.breakPoints['768px']} {
    justify-content: flex-end;
  }

  ${({ theme }) => theme.breakPoints['480px']} {
    width: 33%;
  }
`
const TotalPayoutHeading = styled.div`
  color: #aaa;
  display: flex;
  justify-content: flex-end;
  font-size: 0.75rem;
  margin: 0 0 2px 0;

  ${({ theme }) => theme.breakPoints['768px']} {
    justify-content: flex-end;
    width: 100%;
  }
`
const Payout = styled.div`
  flex-direction: row;
  display: flex;
  line-height: 120%;
  text-align: right;
  justify-content: flex-end;
  align-items: center;
  & strong {
    margin: 0 0 0 5px;
    color: white;
    display: flex;
  }
`
const Multiply = styled.div`
  padding: 4px 6px;
  line-height: 100%;
  white-space: nowrap;
  font-weight: 300;
  border-radius: 5px;
  margin: 0 0 0 5px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ hasBids, isUp }) =>
    hasBids ? (isUp ? `rgba(0, 194, 19, 0.5)` : `rgba(226, 14, 85, 0.5)`) : `rgba(118,118,118,0.4)`};

  ${({ theme }) => theme.breakPoints['480px']} {
    font-size: 0.75rem;
  }
`

import React, { useMemo } from 'react'
import styled, { css } from 'styled-components'
import { linearInterpolator } from 'utils'
import { BigNumber } from '@ethersproject/bignumber'
import { useConvertAmount } from 'utils/hooks'
import { config } from 'config'
import { useToken } from 'utils/hooks/useToken'

const { DEFAULT_FIAT } = config
export const LevelIndicator = React.memo(({ levelDec = 0, roundCountBn, cumulativeBidAmountBn }) => {
  const { tokenId, formatToken } = useToken()
  const convert = useConvertAmount()
  const posInterpolator = linearInterpolator([0, 1, 2, 6], [0, 1, 20, 99])
  const roundCount = (BigNumber.isBigNumber(roundCountBn) && roundCountBn.toNumber()) || 0
  const cumulativeBidAmount = useMemo(() => {
    const tokenAmount = (BigNumber.isBigNumber(cumulativeBidAmountBn) && formatToken(cumulativeBidAmountBn)) || 0
    return convert(tokenAmount, tokenId, DEFAULT_FIAT)
  }, [cumulativeBidAmountBn, convert, formatToken, tokenId])

  return (
    <LevelIndicatorWrapper id='level_indicator' pos={posInterpolator(levelDec)} level={levelDec}>
      <div className='level_indicator'>
        <label>Level {levelDec} / 6</label>
        <div className='line'></div>

        <div className='level_details'>
          <div className='level_details_i'>
            <div className='bids_value'>{roundCount}</div>
            <div className='bids_label'>BIDS</div>
          </div>
          <div className='separator'>/</div>
          <div className='level_details_i'>
            <div className='bids_value'>{cumulativeBidAmount}</div>
            <div className='bids_label'>TOTAL AMOUNT BID</div>
          </div>
        </div>
      </div>
    </LevelIndicatorWrapper>
  )
})

const childCss = css`
  /*! CSS Used from: http://yolo.tino.me/game-omega-staging/resources/css/dashboard.css */

  .level_indicator {
    position: absolute;
    top: -10px;
    height: 66px;
    z-index: 2;
    left: ${({ pos }) => `${pos}%`};
    transition: all 3 ease-in-out;
  }
  .level_indicator label {
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    font-weight: 500;
    font-size: 1rem;
  }
  .level_indicator .line {
    background: #fff;
    height: 60px;
    width: 2px;
  }
  .level_indicator .level_details {
    display: flex;
    align-items: center;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    left: ${({ level }) => (level < 4 ? 'calc(30% + 30px)' : 'auto')};
    right: ${({ level }) => (level < 4 ? 'auto' : 'calc(30% + 30px)')};
    white-space: nowrap;
  }
  .level_indicator .level_details_i {
    display: flex;
    align-items: center;
  }
  .level_indicator .level_details .bids_value {
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: -0.04em;
    padding: 0 10px 0 0;
  }
  .level_indicator .level_details .bids_label {
    font-size: 0.75rem;
    text-transform: uppercase;
    padding: 0 10px 0 0;
  }
  .level_indicator .level_details .separator {
    font-size: 1.5rem;
    font-weight: 200;
    padding-right: 10px;
  }
  @media (max-width: 980px) {
    .level_indicator .level_details .bids_value {
      font-size: 1.4rem;
      letter-spacing: -0.02em;
      padding: 0 10px 0 0;
      line-height: 100%;
      min-width: 115px;
      justify-content: flex-end;
    }
    .level_indicator .line {
      height: 80px;
    }
    .level_indicator .level_details {
      left: ${({ level }) => (level < 4 ? 'calc(30% + 30px)' : 'auto')};
      right: ${({ level }) => (level < 4 ? 'auto' : 'calc(30% + 30px)')};
      flex-flow: column;
      align-items: flex-start;
      top: calc(50% + 10px);
    }
    .level_indicator .level_details .separator {
      display: none;
    }
  }
  @media (max-width: 600px) {
    .level_indicator label {
      right: auto;
      left: calc(30% + 35px);
    }
    .level_indicator .level_details {
      left: ${({ level }) => (level < 4 ? 'calc(30% + 30px)' : 'auto')};
      right: ${({ level }) => (level < 4 ? 'auto' : 'calc(30% + 30px)')};
    }
  }

  @media (max-width: 480px) {
    .level_indicator .line {
      height: 40px;
    }
    .level_indicator .level_details {
      flex-flow: column;
      top: calc(50% + 20px);
      transform: ${({ pos }) => `translateX(-${pos}%)`};
      width: 310px;
    }
  }
`

const LevelIndicatorWrapper = styled.div`
  ${childCss}
`

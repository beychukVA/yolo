import styled from 'styled-components'

import { Card } from 'components/Atoms/Card'
import { Tooltip } from 'components/Atoms/Tooltip'
import { IconLib } from 'components/Atoms/IconLib'

import { useYlpBalance } from 'hooks/ylp/useYlpBalance'
import { SingleDataLoader } from 'components/Atoms/SingleDataLoader'
import { ASYNC_STATUS_ID } from 'constants/index'
import { currencyFormatter } from 'utils'
import { useYlpStakedBalance } from 'hooks/ylp/useYlpStakedBalance'
import { useYlpRewardBalance } from 'hooks/ylp/useYlpRewardBalance'
import { useYoloModal } from 'lib/yoloModals/useYoloModal'

export const YLPStake = () => {
  const { updateModal } = useYoloModal()

  const { hasStatus: hasYlpStatus, ylpBalance } = useYlpBalance()
  const { hasStatus: hasYlpStakedStatus, ylpStakedBalance } = useYlpStakedBalance()
  const { hasStatus: hasYlpRewardStatus, ylpRewardBalance } = useYlpRewardBalance()
  const hasYlpStatusPending = hasYlpStatus(ASYNC_STATUS_ID.PENDING)
  const hasYlpStakedStatusPending = hasYlpStakedStatus(ASYNC_STATUS_ID.PENDING)
  const hasYlpRewardStatusPending = hasYlpRewardStatus(ASYNC_STATUS_ID.PENDING)

  const stakeModalObj = {
    show: true,
    id: 'stake',
    backdropClose: false,
    backdropBlurred: false
  }

  const unstakeModalObj = {
    show: true,
    id: 'unstake',
    backdropClose: false,
    backdropBlurred: false
  }

  const harvestModalObj = {
    show: true,
    id: 'harvest',
    backdropClose: false,
    backdropBlurred: false
  }

  const onStake = () => {
    updateModal(stakeModalObj)
  }

  const onUnstake = () => {
    updateModal(unstakeModalObj)
  }

  const onHarvest = () => {
    updateModal(harvestModalObj)
  }

  return (
    <Container>
      <YoloCard>
        <Title>Stake</Title>
        <GridRewards>
          <CellTitle>
            Available YLP to Stake
            <Tooltip>Tooltip stuff</Tooltip>
          </CellTitle>
          <CellData>
            <SingleDataLoader
              loading={hasYlpStatusPending}
              data={currencyFormatter(ylpBalance, {
                noCurrencySign: true
              })}
            />
            <IconYolo></IconYolo>
          </CellData>
          <CellButton>
            <StakeYLPButton disabled={ylpBalance <= 0} onClick={onStake}>
              Stake YLP Tokens
            </StakeYLPButton>
          </CellButton>
          <CellTitle>
            Total YLP Staked
            <Tooltip>Tooltip stuff</Tooltip>
          </CellTitle>
          <CellData>
            <SingleDataLoader
              loading={hasYlpStakedStatusPending}
              data={currencyFormatter(ylpStakedBalance, {
                noCurrencySign: true
              })}
            />
            <IconYolo></IconYolo>
          </CellData>
          <CellButton>
            <UnstakeYLPButton disabled={ylpStakedBalance <= 0} onClick={onUnstake}>
              Unstake YLP Tokens
            </UnstakeYLPButton>
          </CellButton>
          <CellTitle>
            Total YOLO Earned
            <Tooltip>Tooltip stuff</Tooltip>
          </CellTitle>
          <CellData>
            <SingleDataLoader
              loading={hasYlpRewardStatusPending}
              data={currencyFormatter(ylpRewardBalance, {
                noCurrencySign: true
              })}
            />
            <IconYolo></IconYolo>
          </CellData>
          <CellButton>
            <HarvestButton disabled={ylpRewardBalance <= 0} onClick={onHarvest}>
              Harvest
            </HarvestButton>
          </CellButton>
        </GridRewards>
      </YoloCard>
    </Container>
  )
}

const Container = styled.div`
  margin: 5px;
  margin-top: 10px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: default;
  grid-template-areas: 'card1 card2';
  grid-gap: 5px;

  width: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  margin-top: 10px;

  ${({ theme }) => theme.breakPoints['768px']} {
    display: flex;
    flex-direction: column;
  }
`
const YoloCard = styled(Card)`
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.breakPoints['768px']} {
    width: 100%;
  }
`
const Title = styled.div`
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: 500;
  margin: 0 0 3px 0;
  line-height: 100%;
`
const GridRewards = styled.div`
  display: grid;
  grid-template-columns: 3fr 3fr 2fr;
  font-size: 0.8rem;
  max-width: 25%;
  margin: 15px 0 0 0;

  ${({ theme }) => theme.breakPoints['768px']} {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    width: 100%;
  }
`
const CellTitle = styled.span`
  padding: 2px 10px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  font-weight: 400;
  justify-content: flex-end;
  text-align: right;
  white-space: nowrap;

  ${({ theme }) => theme.breakPoints['768px']} {
    padding: 2px 10px 2px 0;
    text-align: left;
    justify-content: flex-start;
  }
`
const CellData = styled.span`
  padding: 2px 10px;
  text-align: center;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 1.3rem;
  font-weight: 200;

  ${({ theme }) => theme.breakPoints['768px']} {
    padding: 2px 10px 2px 0;
    text-align: left;
    justify-content: flex-start;
    font-size: 1.7rem;
    font-weight: 100;
    letter-spacing: -0.03em;
  }
`
const CellButton = styled.span`
  font-size: 0.9rem;
  text-align: center;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 2px 10px;

  ${({ theme }) => theme.breakPoints['768px']} {
    padding: 2px 10px 2px 0;
    text-align: left;
    justify-content: flex-start;
    margin-bottom: 30px;
  }
`
const IconYolo = styled(IconLib).attrs({
  collection: 'yolorekt',
  name: 'YoloTokenIcon',
  dimension: '22px'
})`
  width: 22px;
  height: 22px;
  margin: 0 8px 0 0;
  margin-left: 6px;
`
const StakeYLPButton = styled.button`
  outline: none;
  border: none;
  text-decoration: none;
  cursor: pointer;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: rgba(29, 75, 175, 1);
  padding: 12px 32px;
  line-height: 100%;
  margin-right: 6px;
  white-space: nowrap;
  font-size: 0.9rem;
  color: #fff;

  &:hover {
    background: rgba(42, 109, 255, 1);
  }

  &:selected {
    background: rgba(42, 109, 255, 1);
    cursor: default;
  }

  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
const UnstakeYLPButton = styled.button`
  outline: none;
  border: none;
  text-decoration: none;
  cursor: pointer;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: rgba(29, 75, 175, 1);
  padding: 12px 32px;
  line-height: 100%;
  margin-right: 6px;
  white-space: nowrap;
  font-size: 0.9rem;
  color: #fff;

  &:hover {
    background: rgba(42, 109, 255, 1);
  }

  &:selected {
    background: rgba(42, 109, 255, 1);
    cursor: default;
  }

  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
const HarvestButton = styled.button`
  outline: none;
  border: none;
  text-decoration: none;
  cursor: pointer;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: rgba(29, 75, 175, 1);
  padding: 12px 32px;
  line-height: 100%;
  margin-right: 6px;
  white-space: nowrap;
  font-size: 0.9rem;
  color: #fff;

  &:hover {
    background: rgba(42, 109, 255, 1);
  }

  &:selected {
    background: rgba(42, 109, 255, 1);
    cursor: default;
  }

  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

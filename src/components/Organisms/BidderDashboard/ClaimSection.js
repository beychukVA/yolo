import { IconLib } from 'components/Atoms/IconLib'
import { Table } from 'components/Molecules/Table'
import { getGameParameters } from 'constants/games'
import { useUnclaimedBalance } from 'hooks/unclaimedEarning/useUnclaimedBalance'
import { useEffect, useLayoutEffect, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { capitalizeFirst } from 'utils'
import { Header1 } from './sharedComponent'
import { Zero } from '@ethersproject/constants'
import { useConvertAmount, usePrevious } from 'utils/hooks'
import { useClaimEarning } from 'hooks/unclaimedEarning/useClaimEarning'
import { useGameBidsByRounds } from 'hooks/useGameBidsByRounds'
import { config } from 'config'
import { useToken } from 'utils/hooks/useToken'
import { isEqual } from 'lodash'
import { ASYNC_STATUS_ID } from 'constants/index'
import { useUser } from 'hooks/user/useUser'

const { DEFAULT_FIAT } = config

const tableHeader = [
  { id: 'roundNumber', caption: 'Round number' },
  {
    id: 'roundLength',
    caption: 'Round length'
  },
  { id: 'bidAmount', caption: 'Bid amount' },
  {
    id: 'bidDirection',
    caption: 'Bid direction',
    formatter: (data) => (
      <>
        <IconArrow masking rotate={data === 'up' ? 'down' : 'up'} isUp={data === 'up'}></IconArrow>
        {capitalizeFirst(data)}
      </>
    )
  }
]
const TABLE_DATA_INIT = { totalUnclaimed: Zero, tableData: [] }

export const ClaimSection = () => {
  const { account } = useUser('wallet')
  const { tokenId, formatToken } = useToken()
  const convert = useConvertAmount()
  const { data, getGameUnclaimed, isLoading } = useUnclaimedBalance()
  const {
    claimEarning,
    status: claimStatus,
    hasStatus: hasClaimStatus,
    resetStatus: resetClaimStatus
  } = useClaimEarning()
  const [activeTabId, setActiveTabId] = useState(0)
  const [panelData, setPanelData] = useState(TABLE_DATA_INIT)
  const [sortBy, setSortBy] = useState({ fieldId: tableHeader[0].id, isSortUp: true })
  const { bidsState, getBids } = useGameBidsByRounds()

  const prevGamesIdWithUnclaimed = usePrevious(data.gamesIdWithUnclaimed)
  const isClaimedSomething = isEqual(data.gamesIdWithUnclaimed, prevGamesIdWithUnclaimed)

  // here we need to work to mix values
  const prepareDataForTable = (onlyBids) => {
    const tableRows = onlyBids.map(({ bidRoundIndex: roundNumber, amount: amountInUnit, isUp, txInfo }, idx) => {
      const bidAmount = convert(formatToken(amountInUnit), tokenId, DEFAULT_FIAT)
      const gameId = txInfo.gameId
      const roundLength = getGameParameters(gameId).gameTypeLabel
      const bidDirection = isUp ? 'up' : 'down'
      return { roundNumber, bidAmount, roundLength, bidDirection }
    })
    return tableRows.filter((item) => !!item)
  }

  const onClaimEarning = () => {
    const gameId = data.gamesIdWithUnclaimed[activeTabId]
    claimEarning(gameId)
  }

  useLayoutEffect(() => {
    if (hasClaimStatus(ASYNC_STATUS_ID.CONFIRMED)) {
      setActiveTabId(0)
      resetClaimStatus()
    }
  }, [claimStatus?.id, resetClaimStatus])

  useEffect(() => {
    if (data.hasUnclaimedRounds) {
      const gameId = data.gamesIdWithUnclaimed[activeTabId]
      const { roundsClaimed } = getGameUnclaimed(gameId)
      getBids(gameId, roundsClaimed)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTabId])

  useEffect(() => {
    if (Array.isArray(bidsState.data) && bidsState.data.length > 0) {
      const gameId = data.gamesIdWithUnclaimed[activeTabId]
      const { totalUnclaimedAmount } = getGameUnclaimed(gameId) || {}
      if (!totalUnclaimedAmount) return
      const nonEmptyRounds = bidsState.data.filter((round) => round.bid)
      const onlyBids = nonEmptyRounds.map((item) => item.bid)
      const myBids = onlyBids.filter((bid) => bid.txInfo.from === account)
      const tableData = prepareDataForTable(myBids)
      const newPanelData = { ...panelData, totalUnclaimed: totalUnclaimedAmount, tableData }
      setPanelData(newPanelData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bidsState.status.id, isClaimedSomething, data.hasUnclaimedRounds, isLoading])

  return (
    <Container id='claimSection'>
      <Title>UNCLAIMED EARNINGS</Title>
      <TabsWrapper>
        <Tabs>
          {data.gamesIdWithUnclaimed.map((gId, idx) => {
            const gParams = getGameParameters(gId)
            return (
              <Tab key={idx} selected={activeTabId === idx} onClick={() => setActiveTabId(idx)}>
                {gParams.gameLabel}
              </Tab>
            )
          })}
        </Tabs>
        <Panels>
          <TotalUnclaimed>
            <UnclaimedAmount>{convert(formatToken(panelData.totalUnclaimed), tokenId, DEFAULT_FIAT)}</UnclaimedAmount>
            <ClaimButton onClick={onClaimEarning}>Claim earnings</ClaimButton>
          </TotalUnclaimed>
          <Institutional_copy>(After claiming your earnings, you can withdraw to your Wallet)</Institutional_copy>
          <HistoryTable
            sortBy={sortBy}
            columns={tableHeader}
            data={panelData.tableData}
            onSort={setSortBy}
            maxHeight='400px'
          />
        </Panels>
      </TabsWrapper>
    </Container>
  )
}

const fadeIn = keyframes`
from { opacity: 0; }
to { opacity: 1; } `

const selectedTab = css`
  background: #32415d;
  font-weight: 600;
  color: #fff;
`

const Container = styled.div`
  .wallet_content * {
    display: flex;
  }
  display: flex;
  flex-direction: column;
  margin: 40px 0;
  width: 100%;

  @media only screen and (max-width: 750px) {
    width: 100%;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }

  @media (max-width: 576px) {
  }
`

const Title = styled.div`
  ${Header1}
  margin: 0 0 10px 0;
`

const TabsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`
const Tabs = styled.div``
const Tab = styled.label`
  cursor: pointer;
  padding: 10px 20px;
  margin: 0 10px 0 0;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 0;
  display: inline-block;
  border-radius: 10px 10px 0 0;
  color: rgba(255, 255, 255, 0.5);
  ${({ selected }) => selected && selectedTab}
`
const Panels = styled.div`
  overflow: hidden;
  animation: ${fadeIn} 0.8s;
  width: 100%;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  border-top-right-radius: 15px;
  padding: 0 15px 15px 15px;
  min-height: 450px;
  display: flex;
  flex-direction: column;
`
const TotalUnclaimed = styled.div`
  padding: 30px 30px 15px 30px;
  display: flex;
  flex-flow: row;
  align-items: center;
`

const HistoryTable = styled(Table)`
  border-radius: 10px;
  overflow: hidden;
  background: rgba(129, 170, 255, 0.06);
  .headerCell {
    //background: rgba(0, 0, 0, 0.3);
    background: rgb(31, 38, 52);
    border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  }
  .dataCell {
    border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  }
  .dataCell.date {
    background: rgba(129, 170, 255, 0.15);
  }
  ${({ theme }) => theme.breakPoints['1200px']} {
    border-top: none;
    .dataCell.date {
      background: rgba(0, 0, 0, 0.3);
      padding: 5px;
      :before {
        content: none;
      }
    }
    .dataCell {
      &:nth-child(${({ columns }) => `${columns.length}n`}) {
        margin: 0 0 15px 0;
        border-bottom: 2px solid rgba(0, 0, 0, 0.2);
      }
      :before {
        width: 190px;
      }
    }
  }
`
const IconArrow = styled(IconLib).attrs({ collection: 'general', name: 'arrowUp', dimension: '12px' })`
  width: 12px;
  height: 12px;
  margin-right: 10px;
  background: ${({ isUp }) => (isUp ? 'rgba(0, 194, 19, 1.0)' : 'rgba(226, 14, 85, 1.0)')};
`
const UnclaimedAmount = styled.div`
  font-size: 1.6rem;
  color: #2a6dff !important;
  letter-spacing: -0.03em;
  font-weight: 400;
`
const ClaimButton = styled.button`
  padding: 10px 30px;
  line-height: 100%;
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 15px;
  width: fit-content;
  background: rgba(29, 75, 175, 1) !important;
  margin: 0 0 0 20px;
  color: #fff;
  :hover {
    filter: brightness(1.3);
  }
`
const Institutional_copy = styled.div`
  padding: 0 0 15px 0;
  font-size: 0.75rem;
  opacity: 0.7;
`

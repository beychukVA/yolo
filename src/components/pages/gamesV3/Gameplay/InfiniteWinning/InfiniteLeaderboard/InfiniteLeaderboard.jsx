import { useEffect, useState } from 'react'
import styled from 'styled-components'
import ClosedBids from './Tabs/ClosedBids/ClosedBids'
import Leaderboard from './Tabs/Leaderboard/Leaderboard'
import LiveBids from './Tabs/LiveBids/LiveBids'
import Tabs from './Tabs/Tabs'
import { currencyFormatter } from 'utils'
import { useCustomEventListener } from 'react-custom-events'
import { EVENTS } from 'constants/events.js'
import { usePriceFeed2 } from 'hooks/gameEngine/usePriceFeed'
import { LVG_ASSETS } from 'constants/games/lvg/lvgAssets'
import { Ranking } from './Tabs/Ranking'
import { LONG_DASH } from 'constants/index'
import { RewardsPool } from './Tabs/RewardsPool'
import { YourBids } from './Tabs/YourBidsNew'
import { ContentSwitcherByState } from 'components/Atoms/ContentSwitcherByState'

const TABS = [
  { id: 0, name: 'YOUR BIDS' },
  { id: 1, name: 'LIVE BIDS' },
  { id: 2, name: 'CLOSED BIDS' },
  { id: 3, name: 'LEADERBOARD' },
  { id: 4, name: 'COMPETITION' },
  {
    id: 5,
    name: 'REWARDS POOL',
    infoTooltip:
      'Pool percentage is decided based on how a bidder performs when compared to other bidders in the pool - based on the total bid amount and net P&L.'
  }
]

const InfiniteLeaderboard = ({ data = [], leaderboardData, LeaderboardSortBy }) => {
  const [currentTab, setCurrentTab] = useState(TABS[0].id)
  const [tableData, setTableData] = useState({
    nonLive: [],
    live: []
  })
  const getPriceFeed = usePriceFeed2()
  const [tableHeaders, setTableHeaders] = useState([])

  useCustomEventListener(EVENTS.LVG_ORDER_PENDING, () => setCurrentTab(TABS[0].id))

  const onTabSelected = (id) => setCurrentTab(id)

  const getFeeRate = (entryPr, exitPr) => {
    return 0.1
  }

  const getPnL = (entryPrice, exitPrice, side, qty) => {
    let result
    if (side === 'buy') {
      //ACZ create a const for this
      if (exitPrice <= entryPrice) {
        result = exitPrice - entryPrice
      } else {
        const rate = getFeeRate(entryPrice, exitPrice)
        result = (1 - rate) * (exitPrice - entryPrice)
      }
    } else if (side === 'sell') {
      //ACZ create a const for this
      if (exitPrice >= entryPrice) {
        result = entryPrice - exitPrice
      } else {
        const rate = getFeeRate(entryPrice, exitPrice)
        result = (1 - rate) * (entryPrice - exitPrice)
      }
    } else {
      throw new Error('pnl side is unspecified')
    }

    return result * qty
  }

  const getAssetName = (symbol) => {
    return LVG_ASSETS.find((asset) => asset.orderSymbol === symbol)?.name
  }
  const getAssetDecimals = (symbol) => {
    return LVG_ASSETS.find((asset) => asset.orderSymbol === symbol)?.fiatDecimals
  }

  const makeLiveBidsData = (data) => {
    const liveData = []

    data.all.live.map((order, index) => {
      const {
        bidder,
        status,
        asset,
        entryPrice,
        userFillDollarAmount,
        amount,
        fillQuantity,
        bustPrice,
        side,
        address,
        username,
        avatar,
        createdAt,
        updatedAt,
        takeProfitPrice,
        userStopLossPrice,
        uuid,
        leverage
      } = order

      const ROI =
        (getPnL(entryPrice, getPriceFeed(asset)?.price, side, fillQuantity) * 100) / Number(userFillDollarAmount)

      liveData.push({
        uuid,
        Status: status,
        Bidder: bidder,
        Asset: getAssetName(asset),
        Entry: entryPrice ? Number(entryPrice).toFixed(getAssetDecimals(asset)) : '-',
        'Bid Amount': currencyFormatter(amount),
        Bust: bustPrice ? Number(bustPrice).toFixed(getAssetDecimals(asset)) : '-',
        Multiplier: `x${leverage}`,
        TPSL: (
          <>
            {takeProfitPrice || `${LONG_DASH} /`}
            {userStopLossPrice ? (
              <>
                <br />
                {userStopLossPrice}
              </>
            ) : (
              ` ${LONG_DASH}`
            )}
          </>
        ),
        Side: side,
        'P&L': currencyFormatter(
          getPnL(entryPrice, getPriceFeed(asset)?.price, side, fillQuantity, getAssetDecimals(asset)),
          {
            decimalDigits: getAssetDecimals(asset)
          }
        ),
        ROI: `${Number.isNaN(ROI) ? '0.00' : ROI.toFixed(2)}%`,
        Address: address,
        username,
        avatar,
        createdAt: createdAt,
        updatedAt: updatedAt,
        assetType: LVG_ASSETS.filter((lvgAsset) => lvgAsset.orderSymbol === asset)[0].type
      })
    })
    setTableData({ nonLive: [], live: liveData })
    setTableHeaders(['Bidder', 'Asset', 'Entry', 'Bid Amount', 'Bust', 'Multiplier', 'TP / SL', 'P&L', 'ROI'])
  }

  const makeClosedBidsData = (data) => {
    let { closed } = data.all

    // closed = closed.slice(0, 25)

    const closedData = []
    closed.map((order, index) => {
      const {
        bidder,
        status,
        asset,
        entryPrice,
        exitPrice,
        userFillDollarAmount,
        amount,
        bustPrice,
        side,
        address,
        username,
        avatar,
        createdAt,
        updatedAt,
        leverage,
        takeProfitPrice,
        userStopLossPrice,
        pnl,
        uuid
      } = order

      const ROI = Number((pnl * 100) / Number(userFillDollarAmount))

      closedData.push({
        uuid,
        Status: status,
        Bidder: bidder,
        Asset: getAssetName(asset),
        Entry: entryPrice ? Number(entryPrice).toFixed(getAssetDecimals(asset)) : '-',
        'Bid Amount': currencyFormatter(amount),
        Bust: bustPrice ? Number(bustPrice).toFixed(getAssetDecimals(asset)) : '-',
        Multiplier: `x${leverage}`,
        Side: side,
        Exit: exitPrice ? Number(exitPrice).toFixed(getAssetDecimals(asset)) : '-',
        TPSL: (
          <>
            {takeProfitPrice || `${LONG_DASH} /`}
            {userStopLossPrice ? (
              <>
                <br />
                {userStopLossPrice}
              </>
            ) : (
              ` ${LONG_DASH}`
            )}
          </>
        ),
        'P&L': currencyFormatter(pnl, {
          decimalDigits: getAssetDecimals(asset)
        }),
        ROI: `${Number.isNaN(ROI) ? '0.00' : ROI.toFixed(2)}%`,
        Result: '',
        Address: address,
        username,
        avatar,
        createdAt: createdAt,
        updatedAt: updatedAt,
        assetType: LVG_ASSETS.filter((lvgAsset) => lvgAsset.orderSymbol === asset)[0]?.type
      })
    })
    setTableData({ nonLive: closedData, live: [] })
    setTableHeaders([
      'Bidder',
      'Asset',
      'Entry',
      'Bid Amount',
      'Bust',
      'Multiplier',
      'Exit',
      'TP / SL',
      'P&L',
      'ROI',
      'Result'
    ])
  }

  const makeLeaderboardData = (data) => {
    const leaderboardData = []

    data.map((row, index) => {
      const {
        status,
        asset,
        entryPrice,
        exitPrice,
        userFillDollarAmount,
        amount,
        bustPrice,
        pnl,
        side,
        address,
        username,
        avatar,
        createdAt,
        updatedAt,
        leverage,
        userOrderId
      } = row

      const ROI = Number((pnl * 100) / Number(userFillDollarAmount))

      leaderboardData.push({
        userOrderId: userOrderId,
        Status: status,
        Bidder: '',
        Asset: getAssetName(asset),
        Entry: entryPrice ? Number(entryPrice).toFixed(getAssetDecimals(asset)) : '-',
        'Bid Amount': currencyFormatter(amount),
        Bust: bustPrice ? Number(bustPrice).toFixed(getAssetDecimals(asset)) : '-',
        Multiplier: `x${leverage}`,
        Side: side,
        Exit: exitPrice ? Number(exitPrice).toFixed(getAssetDecimals(asset)) : '-',
        'P&L': currencyFormatter(pnl, {
          decimalDigits: getAssetDecimals(asset)
        }),
        ROI: `${Number.isNaN(ROI) ? '0.00' : ROI.toFixed(2)}%`,
        Address: address,
        username,
        avatar,
        createdAt: createdAt,
        updatedAt: updatedAt,
        assetType: LVG_ASSETS.filter((lvgAsset) => lvgAsset.orderSymbol === asset)[0].type
      })
    })
    setTableData({ nonLive: leaderboardData, live: [] })
    setTableHeaders(['Bidder', 'Asset', 'Entry', 'Bid Amount', 'Bust', 'Multiplier', 'Exit', 'P&L', 'ROI'])
  }

  const bPrice = getPriceFeed('XBT/USD')?.price

  useEffect(() => {
    const makeTableData = (currentTab) => {
      switch (currentTab) {
        case 1:
          makeLiveBidsData(data)
          break
        case 2:
          makeClosedBidsData(data)
          break
        case 3:
          makeLeaderboardData(leaderboardData)
          break
        default:
          break
      }
    }

    makeTableData(currentTab)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTab, data, bPrice])

  return (
    <StatsTabWrapper>
      <Tabs currentTab={currentTab} onTabSelected={onTabSelected} tabs={TABS} />
      <PanelsContainer>
        <ContentSwitcherByState
          noWrapper
          activeState={currentTab}
          stateObject={{
            [TABS[0].id]: <YourBids />,
            [TABS[1].id]: <LiveBids data={tableData} headers={tableHeaders} />,
            [TABS[2].id]: <ClosedBids data={tableData} headers={tableHeaders} />,
            [TABS[3].id]: <Leaderboard data={tableData} headers={tableHeaders} LeaderboardSortBy={LeaderboardSortBy} />,
            [TABS[4].id]: <Ranking />,
            [TABS[5].id]: <RewardsPool />
          }}
        />
      </PanelsContainer>
    </StatsTabWrapper>
  )
}

export default InfiniteLeaderboard

const StatsTabWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  position: relative;
  z-index: 0;
  background: rgba(0, 0, 0, 0.2);
  padding: 20px 30px 0 30px;
  border-radius: 10px 10px 0 0;
  height: 100%;
`

const PanelsContainer = styled.div`
  width: 100%;
  overflow: hidden;
`

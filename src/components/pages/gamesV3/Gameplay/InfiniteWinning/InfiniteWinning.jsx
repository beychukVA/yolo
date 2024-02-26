import { LVG_ASSETS } from 'constants/games/lvg/lvgAssets'
import { useLvgOrdersList } from 'hooks/games/lvg/useLvgOrders'
import { useLvgState } from 'hooks/games/lvg/useLvgState'
import React, { useEffect } from 'react'
import { GamePlayArea, GamePlayStats } from '../SaredComponents/SharedComponent'
import InfiniteLeaderboard from './InfiniteLeaderboard/InfiniteLeaderboard'
import { useFetchLeaderboardData } from './InfiniteLeaderboard/Tabs/Leaderboard/hooks/useFetchLeaderboardData'
import { LvgGameHeader } from './LvgGameHeader'
import { LvgGraph } from './LvgGraph'
import { SingleContentToggle } from 'components/Atoms/SingleContentToggle'
import { ASSETS_TYPES } from 'constants/assets'
import { isStockMarketOpen } from 'utils'
import { LvgStockMarketClosed } from './LvgStockMarketClosed'

const DEFAULT_STOCK_ASSET_NAME = 'SPY'
const DEFAULT_CRYPTO_ASSET_NAME = 'BTC/USD'

const InfiniteWinning = (props) => {
  const orderList = useLvgOrdersList()
  const { leaderboardData, LeaderboardSortBy } = useFetchLeaderboardData()

  const { activeAsset, setActiveAsset } = useLvgState()

  useEffect(() => {
    const defaultAssetName = isStockMarketOpen().state ? DEFAULT_STOCK_ASSET_NAME : DEFAULT_CRYPTO_ASSET_NAME
    const defaultAsset = LVG_ASSETS.filter((asset) => asset.name === defaultAssetName)
    setActiveAsset(defaultAsset.at(0) || LVG_ASSETS.at(0))
    return () => setActiveAsset({})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isMarketClose = activeAsset.type === ASSETS_TYPES.STOCK && !isStockMarketOpen().state

  return (
    <>
      <GamePlayArea>
        <LvgGameHeader />
        <SingleContentToggle
          noWrapper
          toggle={isMarketClose}
          trueContent={<LvgStockMarketClosed />}
          falseContent={<LvgGraph />}
        />
      </GamePlayArea>
      <GamePlayStats>
        <InfiniteLeaderboard data={orderList} leaderboardData={leaderboardData} LeaderboardSortBy={LeaderboardSortBy} />
      </GamePlayStats>
    </>
  )
}

export default InfiniteWinning

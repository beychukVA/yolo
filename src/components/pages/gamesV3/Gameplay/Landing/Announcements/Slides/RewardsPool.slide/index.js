import { RewardsPoolSlideCss } from './RewardsPoolCss.styled'
import { ItemContainer } from '../../Carousel/ItemContainer'
import { useWeeklyRewardsData } from 'hooks/games/lvg/useWeeklyRewardsData'
import { useMemo } from 'react'
import { ASSETS } from 'constants/assets'
import { DateTime } from 'luxon'
import { currencyFormatter } from 'utils'
import { SingleDataLoader } from 'components/Atoms/SingleDataLoader'
import { isEmpty } from 'lodash'

export const RewardsPoolSlide = () => {
  const { contestInfo } = useWeeklyRewardsData()

  const assetData = useMemo(
    () => ASSETS.find((asset) => asset.orderSymbol === contestInfo.featured_symbol),
    [contestInfo?.featured_symbol]
  )

  return (
    <ItemContainer>
      <RewardsPoolSlideCss featuredAsset={assetData || {}}>
        <div className='carousel__slide futures_rewards_pool'>
          <div className='left'>
            <div className='futures_logo'></div>
            <h1>Rewards Pool</h1>
            <h2>The more you bid, the more profit you earn, the larger share of the pool you'll receive.</h2>
          </div>
          <div className='right'>
            <div className='thisweek_info'>
              <div className='dates'>
                <SingleDataLoader
                  loading={isEmpty(contestInfo)}
                  data={`${DateTime.fromSQL(contestInfo.startSQL).toFormat('M/dd/yy')} - ${DateTime.fromSQL(
                    contestInfo.endSQL
                  ).toFormat('M/dd/yy')}`}
                />
              </div>
              <div className='subtitle'>What's in the pool this week?</div>

              <div className='rewards_feature_asset'>
                <div className='asset'>{!isEmpty(assetData) && <div className='asset_icon'></div>}</div>
                <p>
                  {currencyFormatter(contestInfo.total_pool, { noCurrencySign: true, decimalDigits: 0 })}{' '}
                  {contestInfo.coin_symbol} tokens
                </p>
              </div>
            </div>
          </div>
        </div>
      </RewardsPoolSlideCss>
    </ItemContainer>
  )
}

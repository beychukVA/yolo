import { ASSETS } from 'constants/assets'
import React, { useMemo, useState } from 'react'
import { currencyFormatter, pad, padNumber } from 'utils'
import { RewardsPoolCss } from './RewardsPoolCss.styled'
import { DateTime, Interval } from 'luxon'
import { useIntervalWhen } from 'utils/hooks/useIntervalWhen'
import { useWeeklyRewardsData } from 'hooks/games/lvg/useWeeklyRewardsData'
import { isEmpty } from 'lodash'
import { SingleDataLoader } from 'components/Atoms/SingleDataLoader'
import { icons } from 'common'

const COLUMNS = [
  { header: 'Bidder', class: '' },
  { header: 'Total Bids', class: '' },
  // { header: 'P&L', class: '' },
  { header: 'Pool percentage', class: '' }
]

const DURATION_INIT = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
}

export const RewardsPool = () => {
  const { contestInfo, rewards } = useWeeklyRewardsData()
  const [duration, setDuration] = useState(DURATION_INIT)

  useIntervalWhen(
    () => {
      const interval = Interval.fromDateTimes(DateTime.now(), DateTime.fromSQL(contestInfo.endSQL).plus({ hours: 24 }))
      if (!interval.isValid) {
        setDuration(DURATION_INIT)
        return
      }
      const duration = interval.toDuration(['days', 'hours', 'minutes', 'seconds']).toObject()
      setDuration(duration)
    },
    1000,
    !isEmpty(contestInfo),
    true
  )

  const assetData = useMemo(
    () => ASSETS.find((asset) => asset.orderSymbol === contestInfo.featured_symbol),
    [contestInfo?.featured_symbol]
  )

  return (
    <RewardsPoolCss featuredAsset={assetData || {}}>
      <div className='panel' id='five-panel'>
        <div className='rewards_feature_wrapper'>
          <div className='left'>
            <div className='asset'>
              <SingleDataLoader loading={isEmpty(assetData)} data={<div className='asset_icon'></div>} />
            </div>
            <p>
              <strong>
                {currencyFormatter(contestInfo.total_pool, { noCurrencySign: true, decimalDigits: 0 })}{' '}
                {contestInfo.coin_symbol} is in this week's pool.
              </strong>{' '}
              Keep bidding to get your share!
            </p>
          </div>
          <div className='right'>
            <div className='length_dates'>
              {DateTime.fromSQL(contestInfo.startSQL).toFormat('M/dd/yy')} -{' '}
              {DateTime.fromSQL(contestInfo.endSQL).toFormat('M/dd/yy')}
            </div>
            <div className='countdown_container'>
              <ul id='countdown'>
                <li>
                  <span className='days timenumbers'>{padNumber(duration.days, 2)}</span>
                </li>
                <li>
                  <span className='hours timenumbers'>{padNumber(duration.hours, 2)}</span>
                </li>
                <li>
                  <span className='minutes timenumbers'>{padNumber(duration.minutes, 2)}</span>
                </li>
                <li>
                  <span className='seconds timenumbers yellow-text'>{padNumber(duration?.seconds?.toFixed(), 2)}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='table_wrapper'>
          <div className='grid-body rewards_iw'>
            <div className='grid-header'>
              {COLUMNS.map((column) => (
                <label className='bidder'>
                  {column.header}
                  <div className='menu_select'></div>
                </label>
              ))}
            </div>
            <div className='grid-content'>
              {rewards.map((row, idx) => (
                <React.Fragment key={`reward-row-${idx}`}>
                  <label className='bidder'>
                    <div className='profile_avatar'>
                      <img alt='avatar' src={row.avatar || icons.default_avatar_square} />
                    </div>
                    {row.username}
                  </label>
                  <label className='bidamount'>
                    <span>{currencyFormatter(row.bidAmount)}</span>
                  </label>
                  {/* <label className={`pandl ${row.totalPnl < 0 ? 'down' : 'up'}`}>
                    {currencyFormatter(row.totalPnl)}
                  </label> */}
                  <label className='pandl'>{(row.score * 100).toFixed(2)}%</label>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </RewardsPoolCss>
  )
}

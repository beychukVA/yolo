import { ASSETS } from 'constants/assets'
import { useWeeklyRewardsData } from 'hooks/games/lvg/useWeeklyRewardsData'
import { WeeklyRewardsCss } from './WeeklyRewardsCss.styled'
import { DateTime, Interval } from 'luxon'
import { useMemo, useState } from 'react'
import { useIntervalWhen } from 'utils/hooks/useIntervalWhen'
import { currencyFormatter, padNumber } from 'utils'
import { isEmpty } from 'lodash'
import { SingleDataLoader } from 'components/Atoms/SingleDataLoader'

const DURATION_INIT = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
}

export const WeeklyRewards = () => {
  const { contestInfo } = useWeeklyRewardsData()

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
    <WeeklyRewardsCss featuredAsset={assetData || {}}>
      <ul className='event rewards_pool'>
        <li>
          <div className='event_title'>
            <span>This week's Rewards Pool</span>
          </div>

          <div className='rewards_pool_details'>
            <div className='asset'>
              <SingleDataLoader loading={isEmpty(assetData)} data={<div className='asset_icon'></div>} />
            </div>
            <p>
              <span>
                {currencyFormatter(contestInfo.total_pool, { noCurrencySign: true, decimalDigits: 0 })}{' '}
                {contestInfo.coin_symbol} is in this week's pool.
              </span>
              {/* <button className='invite-games_panel' onClick={() => null}>
                Learn more
              </button> */}
            </p>
          </div>

          <div className='countdown_container'>
            <ul id='countdown'>
              <li>
                <span className='days timenumbers'>{padNumber(duration.days, 2)}</span>
                <p className='timeRefDays timedescription'>days</p>
              </li>
              <li>
                <span className='hours timenumbers'>{padNumber(duration.hours, 2)}</span>
                <p className='timeRefHours timedescription'>hours</p>
              </li>
              <li>
                <span className='minutes timenumbers'>{padNumber(duration.minutes, 2)}</span>
                <p className='timeRefMinutes timedescription'>minutes</p>
              </li>
              <li>
                <span className='seconds timenumbers yellow-text'>{padNumber(duration?.seconds?.toFixed(), 2)}</span>
                <p className='timeRefSeconds timedescription'>seconds</p>
              </li>
            </ul>
            <div className='length_dates'>
              <SingleDataLoader
                loading={isEmpty(contestInfo)}
                data={`${DateTime.fromSQL(contestInfo.startSQL).toFormat('M/dd/yy')} - ${DateTime.fromSQL(
                  contestInfo.endSQL
                ).toFormat('M/dd/yy')}`}
              />
            </div>
          </div>
        </li>
      </ul>
    </WeeklyRewardsCss>
  )
}

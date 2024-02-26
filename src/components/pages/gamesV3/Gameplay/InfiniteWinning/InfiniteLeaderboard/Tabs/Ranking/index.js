import React, { useState } from 'react'
import { RankingCss } from './RankingCss.styled'
import { useRankingData } from './useRankingData'

const COLUMNS = [
  { header: 'Rank', class: 'rank' },
  { header: 'Bidder', class: 'bidder' },
  { header: '', class: 'pandl' }
]

const TIMES = [
  { caption: 'This month', period: 'monthly' },
  { caption: 'All time', period: 'allTime' }
]

export const Ranking = () => {
  const [time, setTime] = useState(TIMES[0])
  const { rows } = useRankingData(time.period)

  return (
    <RankingCss>
      <div className='panel' id='four-panel'>
        <div className='leaderboard_menus'>
          <h1>Filter by</h1>
          <div className='filter_by_time'>
            <div className='select-box'>
              <div className='select-box__current' tabindex='1'>
                <div className='select-box__value'>
                  <input
                    className='select-box__input'
                    type='radio'
                    id='0'
                    value='0'
                    name='time_option'
                    checked={TIMES[0].period === time.period}
                  />
                  <p className='select-box__input-text'>{TIMES[0].caption}</p>
                </div>

                <div className='select-box__value'>
                  <input
                    className='select-box__input'
                    type='radio'
                    id='1'
                    value='2'
                    name='time_option'
                    checked={TIMES[1].period === time.period}
                  />
                  <p className='select-box__input-text'>{TIMES[1].caption}</p>
                </div>

                <div className='menu_select'></div>
              </div>
              <ul className='select-box__list'>
                {TIMES.map((time) => (
                  <li onClick={() => setTime(time)}>
                    <label className='select-box__option' htmlFor='0'>
                      {time.caption}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className='table_wrapper'>
          <div className='grid-body rankings_iw'>
            <div className='grid-header'>
              {COLUMNS.map((column, idx) => (
                <label key={`h-${idx}`} className={column.class}>
                  {column.header}
                  {!!column.header && <div className='menu_select'></div>}
                </label>
              ))}
            </div>
            <div className='grid-content'>
              {rows.map((row, idx) => (
                <React.Fragment key={`d-${idx}`}>
                  <label className={`rank ${row.rank === 1 ? 'leader' : ''}`}>{row.rank}</label>
                  <label className={`bidder ${row.rank === 1 ? 'leader' : ''}`}>
                    <div className='profile_avatar'>
                      <img alt='avatar' src={row.avatar} />
                    </div>
                    {row.username}
                    <div className={row.rank === 1 ? 'rank_1_icon' : ''}></div>
                  </label>
                  <label className={`pandl ${row.pnl < 0 ? 'down' : 'up'}`}></label>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </RankingCss>
  )
}

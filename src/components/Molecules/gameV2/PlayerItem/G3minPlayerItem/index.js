import React, { useEffect } from 'react'
import { currencyFormatter } from 'utils'

import { useRandomName } from 'utils/hooks/useRandomName'
import { G3minPlayerItemStyled } from './G3minPlayerItem.styled'

export const G3minPlayerItem = React.memo(({ playerItem }) => {
  const { getRandomName, updateRandomName } = useRandomName()
  const { amount, direction, username, address } = playerItem

  useEffect(() => {
    if (username) {
      updateRandomName(address, username)
    }
  }, [username, address, updateRandomName])

  return (
    <G3minPlayerItemStyled>
      <div className='single_transaction'>
        <div className='status_wrap'>
          <div className='status'>
            <div className='status_icon'></div>
            {username || getRandomName(address)}
          </div>
        </div>
        <div className='value'>{currencyFormatter(amount)}</div>
        <div className='bid_type_3 '>
          <div className={`triangle ${direction === 'up' ? 'up large green light' : 'down large red light'} `}></div>
        </div>
      </div>
    </G3minPlayerItemStyled>
  )
})

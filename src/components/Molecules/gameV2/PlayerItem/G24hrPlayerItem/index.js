import { BucketsLevelIcon } from 'components/Atoms/BucketLevelIcon'
import React, { useEffect } from 'react'
import { currencyFormatter } from 'utils'

import { useRandomName } from 'utils/hooks/useRandomName'
import { G24hrPlayerItemStyled } from './G24hrPlayerItem.styled'

export const G24hrPlayerItem = React.memo(({ playerItem }) => {
  const { getRandomName, updateRandomName } = useRandomName()
  const { amount, username, address, bucketLevel } = playerItem

  useEffect(() => {
    if (username) {
      updateRandomName(address, username)
    }
  }, [username, address, updateRandomName])

  return (
    <G24hrPlayerItemStyled>
      <div className='single_transaction'>
        <div className='status_wrap'>
          <div className='status'>
            <div className='status_icon'></div>
            {username || getRandomName(address)}
          </div>
        </div>
        <div className='value'>{currencyFormatter(amount)}</div>
        <BucketsLevelIcon level={bucketLevel} />
      </div>
    </G24hrPlayerItemStyled>
  )
})

import React, { useState, useEffect } from 'react'
import { Grid } from '@giphy/react-components'
import ResizeObserver from 'react-resize-observer'
import { useGiphy } from '../hooks/useGiphy'

export const GridContainer = ({ onGifClick, filter, currTab }) => {
  const { giphy } = useGiphy()
  const [width, setWidth] = useState(window.innerWidth)
  const [key, setKey] = useState(Math.random())

  //I ran out of ideas to force the grid to update when the filter is updated
  useEffect(() => setKey(Math.random()), [filter, currTab])

  return (
    <>
      <Grid
        className='grid'
        key={key}
        onGifClick={onGifClick}
        fetchGifs={
          currTab.type === 'emoji'
            ? (offset) => giphy.emoji({ offset, limit: 10 })
            : (offset) => giphy.search(filter || 'yolo', { offset, sort: 'relevant', type: currTab.type })
        }
        width={width}
        hideAttribution={true}
        columns={3}
        gutter={6}
      />
      <ResizeObserver
        onResize={({ width }) => {
          setWidth(width)
        }}
      />
    </>
  )
}

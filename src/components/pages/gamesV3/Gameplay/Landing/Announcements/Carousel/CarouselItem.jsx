import React from 'react'
import styled from 'styled-components'

export const CarouselItem = ({ key, id, children }) => {
  return (
    <Item key={key} id={id}>
      {children}
    </Item>
  )
}

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 100%;
  max-width: 100%;
  /* height: calc(100% - 25x); */

  /* min-height: 100%; */
  border-radius: 10px;
`

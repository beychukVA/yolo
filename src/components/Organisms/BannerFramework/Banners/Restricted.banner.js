import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const RestrictedBanner = ({ closeBanner }) => {
  return (
    <RBWrapper id='restrictedBanner'>
      <p>
        Persons that are located in or are a legal resident of the United States, or any region(s) on the following
        list, are not eligible to participate in any of the currency transactions on YOLOrekt.&nbsp;
        <Link to='/restricted'>Learn more</Link>
      </p>
    </RBWrapper>
  )
}

const RBWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-width: 320px;
  width: 100vw;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
  padding: 10px 30px;
  z-index: 10;
  font-size: 0.75rem;
`

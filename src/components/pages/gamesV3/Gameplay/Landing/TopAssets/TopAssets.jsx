import { ACTIVE_ASSETS } from 'constants/assets/activeAssets'
import React from 'react'
import styled from 'styled-components'
import { AssetBox } from './AssetBox/AssetBox'

export const TopAssets = (props) => {
  return (
    <TopAssetsContainer>
      <Title>Top Assets</Title>
      <AssetBoxContainer>
        {ACTIVE_ASSETS.map((coin, index) => (
          <AssetBox key={index} coin={coin} />
        ))}
      </AssetBoxContainer>
    </TopAssetsContainer>
  )
}

const TopAssetsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 80%;
`

const AssetBoxContainer = styled.div`
  width: 100%;
  flex-direction: row;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 15px 0;
  overflow-x: auto;
  min-height: 127px;
`

const Title = styled.h1`
  font-size: 1.1rem;
  font-weight: 300;
  text-transform: uppercase;
  width: 100%;
  padding: 5px 30px 10px 0;
`

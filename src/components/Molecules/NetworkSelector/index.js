import React from 'react'
import styled from 'styled-components'

import { CHAIN_INFO } from 'constants/chainInfo'
import { config } from 'config'
import { IconLib } from 'components/Atoms/IconLib'

export const NetworkSelector = React.memo(() => {
  return (
    <Container>
      {Object.values(CHAIN_INFO).map((networkInfo, idx) => {
        if (!config.APPROVED_CHAINS_IDS.includes(networkInfo.chainId)) {
          return null
        }
        return (
          <NetworkButton borderColor={networkInfo.border} key={`NB-${idx}`}>
            <NetworkIcon backgroundColor={networkInfo.background} {...networkInfo.logoProps} masking />
          </NetworkButton>
        )
      })}
    </Container>
  )
})

const NetworkButton = styled.button`
  padding: 0 10px;
  height: 34px;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  border: 1px solid ${({ borderColor }) => borderColor};
  border-radius: 10px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background: rgba(19, 24, 31, 1);
  &:hover {
    filter: brightness(1.5);
  }
`
const NetworkIcon = styled(IconLib)`
  width: 14px;
  height: 14px;
  margin: 0 0 0 0;
  background: ${({ backgroundColor }) => backgroundColor};
`
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  z-index: 9;
`

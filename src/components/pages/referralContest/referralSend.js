import React, { useMemo } from 'react'
import styled, { css } from 'styled-components'

import { ReferralLinkArea } from 'components/Organisms/referralContest/ReferralLinkArea'
import { ContestGridArea } from 'components/Organisms/referralContest/ContestGridArea'
import { ContestProcess } from 'components/Organisms/referralContest/ContestProcess'
import { ProgramRules } from 'components/Organisms/referralContest/ProgramRules'
import { FlipCountdownDHMS } from 'components/Molecules/FlipCountdownDHMS'
import { useReferralData } from 'datasource/referralContest/useReferralData'

const flipNumberCSS = css`
  background: rgba(18, 59, 125, 1);
`

export const ReferralSendPage = () => {
  const { data } = useReferralData()
  return (
    <Container>
      <FlipCountdownDHMS deadLineMs={data?.deadline} flipNumberCSS={flipNumberCSS} />
      <ReferralLinkArea />
      <ContestGridArea />
      <ContestProcess />
      <ProgramRules />
    </Container>
  )
}

const Container = styled.div`
  grid-area: 'content';
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 30px;
  transition: width 300ms ease-in-out;
`

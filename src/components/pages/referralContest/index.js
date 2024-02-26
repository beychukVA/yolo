import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import qs from 'qs'

import { SingleContentToggle } from 'components/Atoms/SingleContentToggle'

import { ReferralSendPage } from './referralSend'
import { ReferralLandingPage } from './referralLanding'
import { useLocation } from 'react-router-dom'
import { ContestLayout } from 'components/Layouts/Contest.layout'
import { HeadLine } from 'components/Organisms/referralContest/HeadLine'
import { ContestHeader } from 'components/Organisms/referralContest/ContestHeader'
import { isObjectEmpty, scrollToId } from 'utils'
import { ReferralDataUpdater } from 'datasource/referralContest/useReferralData'
import { useReactGA4 } from 'GA4/useReactGA4'

export const ReferralContestPage = () => {
  const { gaEvent } = useReactGA4()
  const location = useLocation()
  const [urlParam, setUrlParam] = useState(null)

  useEffect(() => {
    gaEvent('contest_visit', {
      pathId: 'contest.referral.visit',
      contestId: 'referral',
      source: '',
      timeSpent: ''
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useLayoutEffect(() => {
    const urlParam = qs.parse(location.search, { ignoreQueryPrefix: true })
    setUrlParam(urlParam)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  const hasCorrectParams = useMemo(() => !isObjectEmpty(urlParam) && urlParam?.id && urlParam?.email, [urlParam])

  return (
    <ContestLayout>
      <ReferralDataUpdater />
      <Container>
        <ContestHeader />
        <HeadLine>
          <SingleContentToggle
            noWrapper
            toggle={hasCorrectParams}
            trueContent={<>Thank you for your interest in the Referral Contest</>}
            falseContent={
              <>
                We are hosting a new program and is a tremendous opportunity to
                <strong> earn rewards and USDC </strong> with every successful referral
              </>
            }
          />
        </HeadLine>
        <SingleContentToggle
          noWrapper
          toggle={hasCorrectParams}
          trueContent={null}
          falseContent={<LearnMore onClick={() => scrollToId('how-it-work')}>Learn more ↓</LearnMore>}
        />
        <SingleContentToggle
          toggle={hasCorrectParams}
          trueContent={<ReferralLandingPage urlParam={urlParam} />}
          falseContent={<ReferralSendPage />}
        />
      </Container>
    </ContestLayout>
  )
}

const Container = styled.div`
  grid-area: 'content';
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 60px;
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 30px;
  transition: width 300ms ease-in-out;

  ${({ theme }) => theme.breakPoints['1200px']} {
    height: 100%;
    padding: 60px;
  }

  ${({ theme }) => theme.breakPoints['600px']} {
    padding: 30px;
  }

  ${({ theme }) => theme.breakPoints['480px']} {
    padding: 30px;
  }
`
const LearnMore = styled.div`
  font-size: 0.9rem;
  margin: 20px 0 0 0;
  padding: 5px 15px;
  line-height: 100%;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  color: #fff;
  text-decoration: underline;
  text-decoration-color: rgba(255, 255, 255, 0.4);
  transition: all 0.3s;
  :hover {
    cursor: pointer;
    text-decoration: none;
  }
`

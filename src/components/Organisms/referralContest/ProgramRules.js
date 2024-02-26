import React from 'react'
import styled from 'styled-components'

export const ProgramRules = () => {
  return (
    <Container>
      <Title>PROGRAM RULES</Title>
      <UlContent>
        <li>
          A program participant can invite as many people as they want by visiting
          https://yolorekt.finance/referral_program/ and clicking the “Send link via email” button.
        </li>
        <li>
          The referring participant must make, at least, 5 successful bids in the amount of, at least, $5 each in order
          for the program to recognize it as a valid referral.
        </li>
        <li>
          Once the valid referral is counted, please allow the system a little time to update, and the claim will
          reflect automatically on your Dashboard once the conditions are verified.
        </li>
        <li>
          Referral program rewards are distributed on a first-serve, first-served basis. When the prize pool for the
          program is exhausted, no further rewards will be distributed unless otherwise notified by Yolorekt.
        </li>
        <li>
          The earned referral amount(s) will be distributed and sent to a participant’s wallet in the form of USDC.
        </li>
        <li>Any abuse of the referral process will result in an immediate ban.</li>
        <li>
          The frequency of referral rewards distribution will be once per week, and may occur starting on any day within
          the week.
        </li>
        <li>
          Yolorekt maintains the right to modify the referral program with or without notice at any time. We reserve the
          right not to entertain complaints surrounding referral fees for any reason.
        </li>
      </UlContent>
    </Container>
  )
}

const Container = styled.div`
  text-align: center;
`
const Title = styled.div`
  text-transform: uppercase;
  font-weight: 600;
  text-align: start;
  font-size: 0.9rem;
`
const UlContent = styled.ul`
  line-height: 150%;
  font-size: 0.9rem;
  font-weight: 300;
  text-align: left;
  li {
    text-align: left;
    list-style: disc;
    margin: 5px 0 5px 15px;
  }
`

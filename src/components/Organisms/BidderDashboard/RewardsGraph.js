import React from 'react'
import styled from 'styled-components'

import { Box, Header1, Data11, Data12, DataLabel, DataLabel2 } from './sharedComponent'
import { SymbolChart } from './charts/SymbolChart'
import { cumulativeRewardsGraph } from 'datasource/account'
import { SingleDataLoader } from 'components/Atoms/SingleDataLoader'
import { LONG_DASH } from 'constants/index'

export const RewardsGraph = ({ isPending, data }) => {
  const {
    allAmount,
    winningAmount,
    winningUpAmount,
    winningDownAmount,
    losingAmount,
    losingUpAmount,
    losingDownAmount
  } = data?.amounts || {}
  return (
    <Container>
      <Item0></Item0>
      <>
        <Item1>
          <SingleDataLoader loading={isPending} data={allAmount?.formatted} />
        </Item1>
        <Item6>Total amount bid</Item6>
      </>
      <>
        <Item8>
          <SingleDataLoader loading={isPending} data={winningAmount?.formatted} />
        </Item8>
        <Item9>
          Total <br />
          winnings
        </Item9>
      </>
      <Spacer7></Spacer7>
      <Spacer8></Spacer8>
      <>
        <Item10>
          <SingleDataLoader loading={isPending} data={losingAmount?.formatted} />
        </Item10>
        <Item11>
          Total <br /> losses
        </Item11>
      </>
      <Spacer4></Spacer4>
      <>
        <Item12>
          <SingleDataLoader loading={isPending} data={winningUpAmount?.formatted} />
        </Item12>
        <Item13>Won / bid up</Item13>
        <Item16>
          <SingleDataLoader loading={isPending} data={winningDownAmount?.formatted} />
        </Item16>
        <Item17>Won / bid down</Item17>
      </>
      <>
        <Item14>
          <SingleDataLoader loading={isPending} data={losingUpAmount?.formatted} />
        </Item14>
        <Item15>Lost / bid up</Item15>
        <Item18>
          <SingleDataLoader loading={isPending} data={losingDownAmount?.formatted} />
        </Item18>
        <Item19>Lost / bid down</Item19>
      </>
      <>
        <Spacer1></Spacer1>
        <Spacer2></Spacer2>
        <Item3>Rewards</Item3>
        <Item4>
          <SingleDataLoader loading={isPending} data={<SymbolChart series={cumulativeRewardsGraph} height={330} />} />
        </Item4>
        <Spacer5></Spacer5>
        <Item5>
          <SingleDataLoader loading={isPending} data={LONG_DASH} />
        </Item5>
        <Spacer3></Spacer3>
        <Item7>Total rewards earned</Item7>
        <Item20></Item20>
        <Item21></Item21>
        <Spacer6></Spacer6>
      </>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 0.25fr 1fr 0.25fr 1fr;
  grid-template-areas:
    'label0 label0 label0 label0'
    'label1 label6 label6 label6'
    'Spacer3 Spacer3 Spacer3 Spacer3'
    'label8 label9 label10 label11'
    'Spacer4 Spacer4 Spacer4 Spacer4'
    'label12 label13 label14 label15'
    'label16 label17 label18 label19'
    'Spacer1 Spacer1 Spacer1 Spacer1'
    'Spacer2 Spacer2 Spacer2 Spacer2'
    'label3 label3 label3 label3'
    'label4 label4 label4 label4'
    'Spacer5 Spacer5 Spacer5 Spacer5'
    'label5 label7 label7 label7'
    'Spacer6 Spacer6 Spacer6 Spacer6'
    'label20 label21 label21 label21';
  width: calc(50% - 10px);
  gap: 0px;

  ${({ theme }) => theme.breakPoints['980px']} {
    width: 100%;
  }

  ${({ theme }) => theme.breakPoints['768px']} {
    grid-template-columns: 0.15fr 1fr;
    grid-template-areas:
      'label0 label0'
      'label1 label6'
      'Spacer3 Spacer3'
      'label8 label9'
      'Spacer7 Spacer7'
      'label12 label13'
      'label16 label17'
      'Spacer8 Spacer8'
      'label10 label11'
      'Spacer4 Spacer4'
      'label14 label15'
      'label18 label19'
      'Spacer1 Spacer1'
      'Spacer2 Spacer2'
      'label3 label3'
      'label4 label4'
      'Spacer5 Spacer5'
      'label5 label7'
      'Spacer6 Spacer6'
      'label20 label21';
  }
`
const Item0 = styled(Box)`
  ${Header1}
  grid-area: label0;
`
const Item1 = styled(Box)`
  ${Data11}
  grid-area: label1;
`
const Item3 = styled(Box)`
  ${Header1}
  grid-area: label3;
`
const Item4 = styled(Box)`
  position: relative;
  grid-area: label4;
  border-radius: 10px;
  min-height: 330px;
  background-color: rgba(40, 58, 105, 0.9);
  justify-content: center;
  overflow: hidden;
  :before {
    position: absolute;
    backdrop-filter: blur(10px);
    content: 'COMING SOON';
    font-size: 1.3rem;
    font-weight: 300;
    text-align: center;
    background: rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    border-radius: 10px;
    align-items: center;
    z-index: 1;
    width: 100%;
    height: 100%;
  }
`
const Item5 = styled(Box)`
  ${Data11}
  grid-area: label5;
  color: #2a6dff;
`
const Item6 = styled(Box)`
  ${DataLabel}
  grid-area: label6;
`
const Item7 = styled(Box)`
  ${DataLabel}
  grid-area: label7;
`
const Item8 = styled(Box)`
  ${Data11}
  grid-area: label8;
  border: 1px solid #2a6dff;
  border-right: 0;
  background: #213152;
`
const Item9 = styled(Box)`
  ${DataLabel}
  grid-area: label9;
  margin-right: 2.5px;
  border: 1px solid #2a6dff;
  border-left: 0;
  background: #213152;
`
const Item10 = styled(Box)`
  ${Data11}
  grid-area: label10;
  margin-left: 2.5px;
  border: 1px solid #7a4800;
  border-right: 0;
  background: #212026;
`
const Item11 = styled(Box)`
  ${DataLabel}
  grid-area: label11;
  border: 1px solid #7a4800;
  border-left: 0;
  background: #212026;
`
const Item12 = styled(Box)`
  ${Data12}
  grid-area: label12;
`
const Item13 = styled(Box)`
  ${DataLabel2}
  grid-area: label13;

  ${({ theme }) => theme.breakPoints['1200px']} {
    font-size: 0.6rem;
  }
`
const Item14 = styled(Box)`
  ${Data12}
  grid-area: label14;
`
const Item15 = styled(Box)`
  ${DataLabel2}
  grid-area: label15;

  ${({ theme }) => theme.breakPoints['1200px']} {
    font-size: 0.6rem;
  }
`
const Item16 = styled(Box)`
  ${Data12}
  grid-area: label16;
`
const Item17 = styled(Box)`
  ${DataLabel2}
  grid-area: label17;
`
const Item18 = styled(Box)`
  ${Data12}
  grid-area: label18;
`
const Item19 = styled(Box)`
  ${DataLabel2}
  grid-area: label19;

  ${({ theme }) => theme.breakPoints['1200px']} {
    font-size: 0.6rem;
  }
`
const Item20 = styled(Box)`
  ${Data12}
  grid-area: label20;
  color: #2a6dff;
  font-size: 1.2rem;
  ${({ theme }) => theme.breakPoints['768px']} {
    align-items: flex-start;
  }
`
const Item21 = styled(Box)`
  ${DataLabel2}
  grid-area: label21;

  ${({ theme }) => theme.breakPoints['1200px']} {
    font-size: 0.6rem;
  }
`
const Spacer1 = styled(Box)`
  grid-area: Spacer1;
`
const Spacer2 = styled(Box)`
  grid-area: Spacer2;
`
const Spacer3 = styled(Box)`
  grid-area: Spacer3;
`
const Spacer4 = styled(Box)`
  grid-area: Spacer4;
`
const Spacer5 = styled(Box)`
  grid-area: Spacer5;
`
const Spacer6 = styled(Box)`
  grid-area: Spacer6;
`
const Spacer7 = styled(Box)`
  grid-area: Spacer7;
  display: none;
  ${({ theme }) => theme.breakPoints['768px']} {
    display: flex;
  }
`
const Spacer8 = styled(Box)`
  grid-area: Spacer8;
  display: none;
  ${({ theme }) => theme.breakPoints['768px']} {
    display: flex;
  }
`

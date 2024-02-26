import React from 'react'
import styled from 'styled-components'

import { Box, Header1, Data11, Data12, DataLabel, DataLabel2 } from './sharedComponent'
import { PlotBandChart } from './charts/PlotBandChart'
import { SingleDataLoader } from 'components/Atoms/SingleDataLoader'

export const BidsGraph = ({ isPending, data }) => {
  const { counts, graphs } = data

  return (
    <Container>
      <Item0>Bids</Item0>
      <>
        <Item1>
          <SingleDataLoader loading={isPending} data={counts?.allBids} />
        </Item1>
        <Item10>Total number of bids</Item10>
      </>
      <Spacer3></Spacer3>
      <Item7></Item7>
      <>
        <Item2>Winning & losing bids</Item2>
        <Item5>
          <SingleDataLoader loading={isPending} data={<PlotBandChart series={graphs} height={330} />} />
        </Item5>
      </>
      <Spacer1></Spacer1>
      <Spacer2></Spacer2>
      <>
        <>
          <Item4>
            <SingleDataLoader loading={isPending} data={counts?.winningBids} />
          </Item4>
          <Item11>
            Total <br />
            winning bids
          </Item11>
        </>
        <>
          <Item12>
            <SingleDataLoader loading={isPending} data={counts?.losingBids} />
          </Item12>
          <Item13>
            Total <br />
            losing bids
          </Item13>
        </>
      </>
      <Item9></Item9>
      <></>
      <>
        <Item6>
          <SingleDataLoader loading={isPending} data={`${counts?.winningUpPercentageBids}%`} />
        </Item6>
        <Item14>Bids up</Item14>
      </>
      <>
        <Item15>
          <SingleDataLoader loading={isPending} data={`${counts?.losingUpPercentageBids}%`} />
        </Item15>
        <Item16>Bids up</Item16>
      </>
      <>
        <>
          <Item8>
            <SingleDataLoader loading={isPending} data={`${counts?.winningDownPercentageBids}%`} />
          </Item8>
          <Item17>Bids down </Item17>
        </>
        <>
          <Item18>
            <SingleDataLoader loading={isPending} data={`${counts?.losingDownPercentageBids}%`} />
          </Item18>
          <Item19>Bids down</Item19>
        </>
      </>
      <Spacer4></Spacer4>
      <Spacer5></Spacer5>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 0.25fr 1fr 0.25fr 1fr;
  grid-template-areas:
    'label0 label0 label0 label0'
    'label1 label10 label10 label10'
    'spacer3 spacer3 spacer3 spacer3'
    'label7 label7 label7 label7'
    'label2 label2 label2 label2'
    'label5 label5 label5 label5'
    'spacer1 spacer1 spacer1 spacer1'
    'spacer2 spacer2 spacer2 spacer2'
    'label4 label11 label12 label13'
    'label9 label9 label9 label9'
    'label6 label14 label15 label16'
    'label8 label17 label18 label19'
    'label20 label20 label20 label20';
  width: calc(50% - 10px);
  gap: 0px;

  ${({ theme }) => theme.breakPoints['980px']} {
    width: 100%;
  }
  ${({ theme }) => theme.breakPoints['768px']} {
    grid-template-columns: 0.15fr 1fr;
    grid-template-areas:
      'label0 label0'
      'label1 label10'
      'spacer3 spacer3'
      'label7 label7'
      'label2 label2'
      'label5 label5'
      'spacer1 spacer1'
      'spacer2 spacer2'
      'label4 label11'
      'spacer4 spacer4'
      'label6 label14'
      'label8 label17'
      'spacer5 spacer5'
      'label12 label13'
      'label9 label9'
      'label15 label16'
      'label18 label19'
      'label20 label20';
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
const Item2 = styled(Box)`
  ${Header1}
  grid-area: label2;
`
const Item4 = styled(Box)`
  ${Data11}
  grid-area: label4;
`
const Item5 = styled(Box)`
  grid-area: label5;
  border-radius: 10px;
  min-height: 330px;
  background-color: rgba(40, 58, 105, 0.9);
  justify-content: center;
  overflow: hidden;
`
const Item6 = styled(Box)`
  ${Data12}
  grid-area: label6;
`
const Item7 = styled(Box)`
  grid-area: label7;
`
const Item8 = styled(Box)`
  ${Data12}
  grid-area: label8;
`
const Item9 = styled(Box)`
  grid-area: label9;
`
const Item10 = styled(Box)`
  ${DataLabel}
  grid-area: label10;
`
const Item11 = styled(Box)`
  ${DataLabel}
  margin-right: 2.5px;
  grid-area: label11;
`
const Item12 = styled(Box)`
  ${Data11}
  margin-left: 2.5px;
  grid-area: label12;
`
const Item13 = styled(Box)`
  ${DataLabel}
  grid-area: label13;
`
const Item14 = styled(Box)`
  ${DataLabel2}
  grid-area: label14;
`
const Item15 = styled(Box)`
  ${Data12}
  grid-area: label15;
`
const Item16 = styled(Box)`
  ${DataLabel2}
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
`
const Spacer1 = styled(Box)`
  grid-area: spacer1;
`
const Spacer2 = styled(Box)`
  grid-area: spacer2;
`
const Spacer3 = styled(Box)`
  grid-area: spacer3;
`
const Spacer4 = styled(Box)`
  grid-area: spacer4;
  display: none;
  ${({ theme }) => theme.breakPoints['768px']} {
    display: flex;
  }
`
const Spacer5 = styled(Box)`
  grid-area: spacer5;
  display: none;
  ${({ theme }) => theme.breakPoints['768px']} {
    display: flex;
  }
`

import React, { useState } from 'react'
import styled from 'styled-components'

import { Card } from 'components/Atoms/Card'
import { Grid } from 'components/Atoms/Grid'
import { Cell } from 'components/Atoms/Grid/Cell'
import { HeaderCell } from 'components/Atoms/Grid/HeaderCell'
// import { IconLib } from 'components/Atoms/IconLib'

import { Dropdown } from 'components/Atoms/Dropdown'
import { tableData } from 'datasource/liquidityDashboard/index_HARDCODED'

export const YoloTable = () => {
  const [sortBy, setSortBy] = useState({ fieldId: tableData.sortOptions[0].id, isSortUp: false })
  const [timePeriod, setTimePeriod] = useState({ fieldId: tableData.timeOptions[0].id, isSortUp: false })

  return (
    <Container>
      <YoloCard>
        <Title>LP Earning History</Title>
        <Menu>
          <SortDropdown label='Sort by' options={tableData.sortOptions} onChange={setSortBy} value={sortBy} />
          <TimeDropdown
            label='Time period'
            options={tableData.timeOptions}
            onChange={setTimePeriod}
            value={timePeriod}
          />
        </Menu>
        <GridContainer>
          <YoloGrid>
            {tableData.tableHeader.map((headerText, index) => (
              <HeaderCell text={headerText} key={index} isUp={true} />
            ))}
            {tableData.tableData.map((rowData, index) => {
              return (
                <React.Fragment key={index}>
                  <DateCell key={`a-${index}`}>{rowData[0]}</DateCell>
                  <TotalYoloEarningsCell key={`b-${index}`}>{rowData[1]}</TotalYoloEarningsCell>
                  <FeesEarnedCell key={`c-${index}`}>
                    <div>{rowData[2]}</div>
                  </FeesEarnedCell>
                  <YoloVolumeCell key={`d-${index}`}>
                    <div>{rowData[3]}</div>
                  </YoloVolumeCell>
                </React.Fragment>
              )
            })}
          </YoloGrid>
        </GridContainer>
      </YoloCard>
    </Container>
  )
}

const Container = styled.div`
  margin: 5px;
  margin-top: 10px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: default;
  grid-template-areas: 'card1 card2';
  grid-gap: 5px;

  width: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  margin-top: 10px;

  ${({ theme }) => theme.breakPoints['768px']} {
    display: flex;
    flex-direction: column;
  }
`

const YoloCard = styled(Card)`
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: 500;
  margin: 0 0 3px 0;
  line-height: 100%;
`

const Menu = styled.div`
  padding: 20px 0 0 0;
  @media only screen and (max-width: 768px), (min-device-width: 768px) and (max-device-width: 1200px) {
    display: flex;
    flex-direction: row;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const SortDropdown = styled(Dropdown)`
  display: none;
  margin-right: 30px;

  @media (max-width: 480px) {
    &:nth-child(1) {
      margin-right: 0;
    }
  }
`

const TimeDropdown = styled(Dropdown)`
  display: flex;

  @media (max-width: 480px) {
    &:nth-child(1) {
      margin-right: 0;
    }
  }
`

const GridContainer = styled.div`
  width: 100%;
`

const YoloGrid = styled(Grid)`
  grid-template-columns: 0.75fr 1fr 1fr 1fr;
`

const DateCell = styled(Cell)`
  background: rgba(129, 170, 255, 0.15);

  @media only screen and (max-width: 768px), (min-device-width: 768px) and (max-device-width: 1200px) {
    padding-top: 5px;
    padding-bottom: 5px;
  }
`

const TotalYoloEarningsCell = styled(Cell)`
  @media only screen and (max-width: 768px), (min-device-width: 768px) and (max-device-width: 1200px) {
    &:before {
      content: 'Total YOLO earnings';
    }
  }
`

const FeesEarnedCell = styled(Cell)`
  @media only screen and (max-width: 768px), (min-device-width: 768px) and (max-device-width: 1200px) {
    &:before {
      content: 'Fees earned';
    }
  }
`

const YoloVolumeCell = styled(Cell)`
  @media only screen and (max-width: 768px), (min-device-width: 768px) and (max-device-width: 1200px) {
    &:before {
      content: 'YOLO volume';
    }
  }
`

// const PercentageOfPoolCell = styled(Cell)`
//   @media only screen and (max-width: 768px), (min-device-width: 768px) and (max-device-width: 1200px) {
//     &:before {
//       content: '% of Pool / Token balance';
//     }
//   }
// `

// const IconSort = styled(IconLib).attrs({ collection: 'general', name: 'arrow', rotate: 'up' })`
//   width: 12px;
//   height: 8px;
//   background: #fff;
// `

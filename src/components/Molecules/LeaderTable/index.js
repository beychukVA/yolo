import { useEffect, useMemo, useState } from 'react'
import {
  TableWrapper,
  TabContainer,
  Tab,
  TableContainer,
  TableBody,
  TableHeader,
  TableContent,
  HeaderCell,
  ContentCell,
  TriangleButton,
  CrownIcon,
  AwardStar,
  MenuWrapper,
  LeaderDropdown,
  DollarIcon,
  DollarWrapper,
  LeaderWrapper
} from './Table.styled'

import { isAddressesEqual } from 'utils/wallet/addresses'
import { useToken } from 'utils/hooks/useToken'
import { currencyFormatter } from 'utils'
import { useFetchWinningStreak } from 'components/pages/leaderboard/useFetchWinningStreak'
import { useGetWeek } from 'components/pages/leaderboard/hooks/useGetWeek'
import useFetchTableData from 'components/pages/leaderboard/useFetchTableData'
import { useUser } from 'hooks/user/useUser'

const LeaderTable = () => {
  const { currentWeek, previousWeek } = useGetWeek()
  const [tabs, setTabs] = useState([])
  const [selectedTab, setSelectedTab] = useState(tabs[0])
  const { formatToken: formatUSDC } = useToken('USDC')
  const { account } = useUser('wallet')
  const [leaderTableData, setSort] = useFetchTableData(makeLeaderTableData)
  const [weekData, SortBy, setStartDate, setEndDate] = useFetchWinningStreak(makeWeekTableData)
  const [sortBy, setSortBy] = useState({ fieldName: '', isSortUp: true })
  const [tableBodyKey, setTableBodyKey] = useState(Math.random())

  useEffect(() => {
    const makeTabs = () => {
      setTabs([
        {
          name: 'All time',
          startDate: '',
          endDate: ''
        },
        previousWeek,
        currentWeek
      ])
    }
    makeTabs()
  }, [currentWeek, previousWeek])

  useEffect(() => setSelectedTab(tabs[0]), [tabs])

  useEffect(() => {
    if (selectedTab) {
      setStartDate(selectedTab.startDate || tabs[1].startDate)
      setEndDate(selectedTab.endDate || tabs[1].endDate)
    }
    selectedTab?.name === 'All time'
      ? setSortBy((prev) => ({ fieldName: 'Total Earned', isSortUp: prev.isSortUp }))
      : setSortBy((prev) => ({ fieldName: 'Total Won', isSortUp: prev.isSortUp }))
    setTableBodyKey(Math.random())
  }, [selectedTab, setEndDate, setStartDate, tabs])

  function makeWeekTableData(data) {
    const newData = []
    data.forEach((item, index) => {
      const { address, username, winningStreak, winningPercentage, totalBids, totalWon } = item
      newData.push({
        Address: address,
        Bidder: username,
        'Winning Streak': String(winningStreak),
        'Winning %': String(winningPercentage),
        'Total Bids': String(totalBids),
        'Total Won': currencyFormatter(formatUSDC(totalWon))
        // 'Total Rounds': index
      })
    })
    return newData
  }

  function makeLeaderTableData(data) {
    const newData = []
    data.forEach((item) => {
      const { address, username, numberOfBids, winningVolume, losingBidsCount, winningBidsCount, winPercentage } = item
      newData.push({
        Address: address,
        'User ID': username,
        'Total Bids': Number(losingBidsCount) + Number(winningBidsCount),
        'Total Earned': currencyFormatter(formatUSDC(winningVolume)),
        'Total Games': numberOfBids,
        'Winning %': winPercentage
      })
    })
    return newData
  }

  let isDektop = window.innerWidth > 1024

  const sortedData = useMemo(() => {
    const sortItem = (field, item) => {
      return sortBy.fieldName === field
        ? item[sortBy.fieldName].toLowerCase()
        : Number(`${item[sortBy.fieldName]}`.replace(/[\D]+/g, ''))
    }

    const isAllTab = selectedTab?.name === 'All time'
    const array = isAllTab ? leaderTableData : weekData

    return array.sort((a, b) => {
      const itemA = isAllTab ? sortItem('User ID', a) : sortItem('Bidder', a)
      const itemB = isAllTab ? sortItem('User ID', b) : sortItem('Bidder', b)
      if (itemA < itemB) return sortBy.isSortUp ? 1 : -1
      if (itemA > itemB) return sortBy.isSortUp ? -1 : 1
      return 0
    })
  }, [selectedTab, leaderTableData, weekData, sortBy])

  const handleOptionChange = (e) => {
    setSortBy(e)
    setSort(e)
    SortBy(e)
  }

  const keys = Object.keys(sortedData[0] || {}).filter((item) => item !== 'Address')
  return (
    <LeaderWrapper id='leaderboard_wrapperKK'>
      <MenuWrapper>
        <LeaderDropdown
          id='dashboard_menus_wrapper'
          label='Sort by'
          options={keys}
          onChange={handleOptionChange}
          value={sortBy}
        />
      </MenuWrapper>
      <TableWrapper>
        <TabContainer>
          {tabs &&
            tabs.map((tab, index) => (
              <Tab
                className={tab?.name === selectedTab?.name ? 'selectedTab' : ''}
                key={index}
                onClick={() => setSelectedTab(tabs[index])}
              >
                {tab.name}
              </Tab>
            ))}
        </TabContainer>
        <TableContainer>
          <TableBody key={tableBodyKey}>
            {isDektop ? (
              <TableHeader>
                {['Ranking', ...keys].map((item, index) => (
                  <HeaderCell
                    className={sortBy.fieldName === item ? 'selectedHeaderCell' : ''}
                    key={index}
                    onClick={() => {
                      if (item === 'Ranking') return
                      handleOptionChange({ fieldName: item, isSortUp: !sortBy.isSortUp })
                    }}
                  >
                    {item}
                    <TriangleButton
                      opacity={sortBy.fieldName === item}
                      rotateUp={sortBy.isSortUp && sortBy.fieldName === item}
                    />
                  </HeaderCell>
                ))}
              </TableHeader>
            ) : (
              <TableHeader>
                {sortedData.map((obj, dataindex) => {
                  const currUser = isAddressesEqual(obj['Address'], account)

                  return ['Ranking', ...keys].map((item, index, array) => (
                    <>
                      <HeaderCell
                        className={`${currUser ? 'you' : ''} ${isDektop ? '' : 'cellMobile'}`}
                        key={obj['User ID'] + item}
                      >
                        {item}
                      </HeaderCell>
                      {!isDektop && index === array.length - 1 && <HeaderCell className='transparent'>X</HeaderCell>}
                    </>
                  ))
                })}
              </TableHeader>
            )}

            <TableContent>
              {sortedData.map((obj, dataIndex, array) => {
                const currUser = isAddressesEqual(obj['Address'], account)
                let currIndex = 0
                const sort = sortBy.isSortUp ? dataIndex < 3 : dataIndex > array.length - 4
                const icons = sortBy.isSortUp
                  ? currIndex === 0 && (dataIndex === 0 ? <CrownIcon /> : <AwardStar ranking={dataIndex} />)
                  : currIndex === 0 &&
                    (dataIndex === array.length - 1 ? (
                      <CrownIcon />
                    ) : (
                      <AwardStar ranking={array.length - 1 - dataIndex} />
                    ))
                return (
                  <>
                    <ContentCell className={`${currUser ? 'you' : ''} ${isDektop ? '' : 'cellMobile'} `}>
                      {sortBy.isSortUp ? dataIndex + 1 : array.length - dataIndex}
                    </ContentCell>
                    {keys.map((item, index, array) => {
                      const value = obj[item]
                      currIndex = index
                      const isTotalWom = item === 'Total Won'
                      const isUsername = item === 'User ID' || item === 'Bidder'
                      return (
                        <>
                          <ContentCell
                            key={index}
                            className={`${currUser ? 'you' : ''} ${isTotalWom ? 'alignRight' : ''} ${
                              isDektop ? '' : 'cellMobile'
                            }`}
                          >
                            {isUsername && sort && icons}
                            {value}
                            {isTotalWom && (
                              <DollarWrapper>
                                <DollarIcon />
                              </DollarWrapper>
                            )}
                          </ContentCell>
                          {!isDektop && index === array.length - 1 && (
                            <ContentCell className='transparent'>X</ContentCell>
                          )}
                        </>
                      )
                    })}
                  </>
                )
              })}
            </TableContent>
          </TableBody>
        </TableContainer>
      </TableWrapper>
    </LeaderWrapper>
  )
}

export default LeaderTable

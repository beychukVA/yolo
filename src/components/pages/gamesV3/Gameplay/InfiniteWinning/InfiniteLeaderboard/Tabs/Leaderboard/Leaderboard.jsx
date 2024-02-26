import { icons } from 'common'
import { LVG_ASSETS } from 'constants/games/lvg/lvgAssets'
import { useUser } from 'hooks/user/useUser'
import { useCachedUsername } from 'hooks/user/useUsername'
import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { isAddressesEqual } from 'utils/wallet/addresses'
import { Table } from '../Table/Table'
import ContentCell from '../Table/TableContent/ContentCell/ContentCell'
import { TableContent } from '../Table/TableContent/TableContent'
import HeaderCell from '../Table/TableHeader/HeaderCell/HeaderCell'
import { TableHeader } from '../Table/TableHeader/TableHeader'
import { TableWrapper } from '../Table/TableWrapper/TableWrapper'
import Statement from '../Table/Statement/Statement'
import { ProfileCell } from '../Table/ProfileCell'
// import { LeaderboardFilter } from './LeaderboardFilter'

const hiddenContent = [
  'uuid',
  'Side',
  'Address',
  'createdAt',
  'updatedAt',
  'Status',
  'userOrderId',
  'username',
  'avatar',
  'assetType',
  'TPSL'
]

const Leaderboard = ({ data, headers, LeaderboardSortBy }) => {
  const { account } = useUser('wallet')
  const { avatar: profileAvatar } = useUser('profile')
  const getCachedUsername = useCachedUsername()
  const [sortBy, setSortBy] = useState({ fieldName: 'Status', isSortUp: true })
  // const [filterAsset, setFilterAsset] = useState(null)
  // const [filterTime, setFilterTime] = useState(null)

  const updatedData = useMemo(() => {
    return { nonLive: data?.nonLive, live: data?.live }
  }, [data])

  const sortedData = useMemo(() => {
    let isStatus = false
    const sortItem = (field, item) => {
      isStatus = sortBy.fieldName === field
      return isStatus ? item['pnl'] : Number(`${item[sortBy.fieldName]}`.replace(/[^-.\d]+/g, ''))
    }

    const sortArray = (array) => {
      return array?.sort((a, b) => {
        const itemA = isStatus ? Date.parse(sortItem('Status', a)) : sortItem('Status', a)
        const itemB = isStatus ? Date.parse(sortItem('Status', b)) : sortItem('Status', b)
        if (itemA < itemB) return sortBy.isSortUp ? 1 : -1
        if (itemA > itemB) return sortBy.isSortUp ? -1 : 1
        return 0
      })
    }

    const sortedLeaderboardData = sortArray(updatedData?.nonLive ?? [])

    return sortedLeaderboardData
  }, [updatedData, sortBy])

  const handleOptionChange = (e) => {
    setSortBy(e)
    LeaderboardSortBy(e)
  }

  const getIcon = (coinName) => {
    const asset = LVG_ASSETS.find((asset) => asset.name === coinName)
    if (!asset) return null
    return asset.icon
  }

  const isYou = (address1, address2) => isAddressesEqual(address1, address2)

  return (
    <TableWrapper>
      <Table gridTemplate='2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr'>
        <TableHeader>
          {headers &&
            headers.map((header, index) => (
              <HeaderCell key={index} onClick={handleOptionChange} sortBy={sortBy}>
                {header}
              </HeaderCell>
            ))}
        </TableHeader>
        <TableContent>
          {
            //filteredDataByTime &&
            sortedData.map((content, index) => {
              const keys = Object.keys(content)
              return keys.map((key) => {
                if (hiddenContent.includes(key)) {
                  return null
                }
                const isBidder = key === 'Bidder'
                const isAsset = key === 'Asset'
                const isBidAmount = key === 'Bid Amount'
                const direction = content['Side'] === 'buy' ? true : false
                const isStatement = key === 'P&L' || key === 'ROI' ? true : false
                const statementClosed = content['Status'] === 'closed' ? true : false
                const avatar = isAddressesEqual(content['Address'], account) ? profileAvatar : content['avatar']

                // const username = isAddressesEqual(account, content['Address'])
                //   ? currentUsername
                //   : getRandomName(content['Address']) //bidder.username

                const username = isYou(account, content['Address'])
                  ? getCachedUsername(content['Address'])
                  : content['username'] //bidder.username

                return (
                  <ContentCell
                    className={isYou(account, content['Address']) ? (isStatement ? 'noShadow' : 'you') : ''}
                    field={key}
                    value={content[key]}
                  >
                    {isBidder && <ProfileCell avatar={avatar} username={username} />}
                    {isAsset && <Icon icon={key === 'Asset' ? getIcon(content[key]) : ''} />}
                    {isBidAmount && <BidIcon direction={direction} />}
                    {isStatement ? (
                      <Statement isLive={statementClosed} statementKey={key} order={content}>
                        {content[key]}
                      </Statement>
                    ) : (
                      content[key]
                    )}
                  </ContentCell>
                )
              })
            })
          }
        </TableContent>
      </Table>
    </TableWrapper>
  )
}

export default Leaderboard

const Icon = styled.div`
  width: 14px;
  height: 14px;
  margin: 0 4px 0 0;
  background-image: url(${({ icon }) => icon});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
`

const BidIcon = styled.div`
  -webkit-mask: url(${icons.bid_direction_icon}) center center / auto 14px no-repeat;
  mask: url(${icons.bid_direction_icon}) center center / auto 14px no-repeat;
  background: ${({ direction }) => (direction ? '#00c213' : '#dd0e53')};
  transform: rotate(${({ direction }) => (direction ? '180deg' : '0deg')});
  transition: all 250ms ease;
  width: 14px;
  height: 14px;
  margin: 0 3px 0 0;
`

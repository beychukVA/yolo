import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { TableWrapper } from '../Table/TableWrapper/TableWrapper'
import { Table } from '../Table/Table'
import { TableHeader } from '../Table/TableHeader/TableHeader'
import { TableContent } from '../Table/TableContent/TableContent'
import ContentCell from '../Table/TableContent/ContentCell/ContentCell'
import HeaderCell from '../Table/TableHeader/HeaderCell/HeaderCell'
import Statement from '../Table/Statement/Statement'
import { isAddressesEqual } from 'utils/wallet/addresses'
import { useUser } from 'hooks/user/useUser'
import { useCachedUsername } from 'hooks/user/useUsername'
import { LVG_ASSETS } from 'constants/games/lvg/lvgAssets'
import { icons } from 'common'
import { useLvgResult } from 'hooks/games/lvg/uselvgResult'
import { ProfileCell } from '../Table/ProfileCell'

const hiddenContent = ['Side', 'Address', 'createdAt', 'updatedAt', 'uuid', 'Status', 'username', 'avatar', 'assetType']

const ClosedBids = ({ data, headers }) => {
  const { account } = useUser('wallet')
  const { avatar: profileAvatar } = useUser('profile')
  const getCachedUsername = useCachedUsername()
  const [sortBy, setSortBy] = useState({ fieldName: 'Status', isSortUp: true })
  const { getLvgResult } = useLvgResult()

  const updatedData = useMemo(() => {
    return { nonLive: data?.nonLive, live: data?.live }
  }, [data])

  const sortedData = useMemo(() => {
    let isStatus = false
    const sortItem = (field, item) => {
      isStatus = sortBy.fieldName === field
      return isStatus
        ? // ? item[sortBy.fieldName].toLowerCase()
          item['updatedAt']
        : Number(`${item[sortBy.fieldName]}`.replace(/[^-.\d]+/g, ''))
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

    const sortedNonLive = sortArray(updatedData?.nonLive ?? [])
    const sortedLive = sortArray(updatedData?.live ?? [])

    return [...sortedLive, ...sortedNonLive]
  }, [updatedData, sortBy])

  const getStatus = (dataOrder) => {
    const direction = dataOrder['Side'] === 'buy' ? true : false
    const entryPrice = Number(dataOrder['Entry'])
    const exitPrice = Number(dataOrder['Exit'])
    return direction ? (exitPrice > entryPrice ? true : false) : exitPrice < entryPrice ? true : false
  }

  const handleOptionChange = (e) => {
    setSortBy(e)
  }

  const getIcon = (coinName) => {
    return LVG_ASSETS.find((asset) => asset.name === coinName)?.icon
  }

  const isYou = (address1, address2) => isAddressesEqual(address1, address2)

  return (
    <TableWrapper>
      <Table>
        <TableHeader>
          {headers &&
            headers.map((header, index) => (
              <HeaderCell key={index} onClick={handleOptionChange} sortBy={sortBy}>
                {header}
              </HeaderCell>
            ))}
        </TableHeader>
        <TableContent>
          {sortedData &&
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
                const isCashStatus = key === 'Result' ? true : false
                const isCashOut = statementClosed && isCashStatus ? true : false
                const cashStatus = getStatus(content)
                const avatar = isAddressesEqual(content['Address'], account) ? profileAvatar : content['avatar']

                const noShadow = isStatement || isCashStatus
                // const username = isAddressesEqual(account, content['Address'])
                //   ? currentUsername
                //   : getRandomName(content['Address']) //bidder.username

                const username = isYou(account, content['Address'])
                  ? getCachedUsername(content['Address'])
                  : content['username'] //bidder.username

                return (
                  <ContentCell
                    className={isYou(account, content['Address']) ? (noShadow ? 'noShadow' : 'you') : ''}
                    field={key}
                    value={content[key]}
                  >
                    {key === 'TPSL' && <TpslCell>{content[key]}</TpslCell>}
                    {isBidder && <ProfileCell avatar={avatar} username={username} />}
                    {isAsset && <Icon icon={key === 'Asset' ? getIcon(content[key]) : ''} />}
                    {isBidAmount && <BidIcon direction={direction} />}
                    {isStatement ? (
                      <Statement isLive={statementClosed} statementKey={key} order={content}>
                        {content[key]}
                      </Statement>
                    ) : isCashStatus ? (
                      isCashOut && (
                        <CashStatus status={cashStatus}>
                          {getLvgResult(content['Exit'], content['Entry'], content['Side'])}
                        </CashStatus>
                      )
                    ) : (
                      key !== 'TPSL' && content[key]
                    )}
                  </ContentCell>
                )
              })
            })}
        </TableContent>
      </Table>
    </TableWrapper>
  )
}

export default ClosedBids

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

const CashStatus = styled.span`
  color: ${({ status }) => (status ? '#00c213' : '#dd0e53')};
  font-weight: 700;
`

const TpslCell = styled.div`
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: 500;
  z-index: 0;
  position: relative;
  min-height: 45px;
  font-size: 0.7rem;
  line-height: 120%;
  padding: 8px 10px 6px 10px;
  color: #fff;
  opacity: 1;
`

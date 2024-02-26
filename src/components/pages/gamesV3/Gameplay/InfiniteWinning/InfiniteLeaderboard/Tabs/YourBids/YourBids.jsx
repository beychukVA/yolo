import styled, { css } from 'styled-components'
import { Table } from '../Table/Table'
import { TableContent } from '../Table/TableContent/TableContent'
import HeaderCell from '../Table/TableHeader/HeaderCell/HeaderCell'
import { TableHeader } from '../Table/TableHeader/TableHeader'
import { TableWrapper } from '../Table/TableWrapper/TableWrapper'
import { useEffect, useState } from 'react'
import { useMemo } from 'react'
import { useLvgOrderManager } from 'hooks/games/lvg/useLvgOrders'
import ButtonCashOut from './Buttons/ButtonCashOut'
import { icons } from 'common'
import { LVG_ASSETS } from 'constants/games/lvg/lvgAssets'
import { useLvgState } from 'hooks/games/lvg/useLvgState'
import { LVG_ORDER_STATE } from 'constants/index'
import { capitalizeFirst, isStockMarketOpen } from 'utils'
import { ContentSwitcherByState } from 'components/Atoms/ContentSwitcherByState'
import { useYoloModal } from 'lib/yoloModals/useYoloModal'
import { ASSETS_TYPES } from 'constants/assets'
import { LvgTwitterShareBid } from 'components/Molecules/LvgTwitterSharedBid.button'
import { isEmpty } from 'lodash'
import { EditBtn } from './Buttons/EditButton'

const hiddenContent = [
  'Side',
  'Address',
  'createdAt',
  'updatedAt',
  'uuid',
  'username',
  'avatar',
  'assetType',
  'isWinning'
]

const YourBids = ({ orders = [], data, headers }) => {
  const [sortBy, setSortBy] = useState({ fieldName: 'Status', isSortUp: true })
  const [hoverOrderUUID, setHoverOrderUUID] = useState('')
  const { closeOrder } = useLvgOrderManager()
  const { activeOrder, setActiveOrder } = useLvgState()
  const { updateModal } = useYoloModal()

  const updatedData = useMemo(() => {
    return { nonLive: data?.nonLive, live: data?.live, pending: data?.pending }
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
    const sortedPanding = sortArray(updatedData?.pending ?? [])

    return [...sortedPanding, ...sortedLive, ...sortedNonLive]
  }, [updatedData, sortBy])

  const handleOptionChange = (e) => {
    setSortBy(e)
  }

  const getIcon = (coinName) => {
    return LVG_ASSETS.find((asset) => asset.name === coinName)?.icon
  }

  const getOrder = (dataOrder) => {
    const order = orders.find((order) => {
      return order.uuid === dataOrder.uuid
    })
    return order
  }

  const getStatus = (dataOrder) => {
    const direction = dataOrder['Side'] === 'buy' ? true : false
    const entryPrice = Number(dataOrder['Entry'])
    const exitPrice = Number(dataOrder['Exit'])
    return direction ? (exitPrice > entryPrice ? true : false) : exitPrice < entryPrice ? true : false
  }

  const onCloseOrder = (dataOrder) => {
    closeOrder(getOrder(dataOrder))
  }

  const onSelectRow = (dataOrder) => {
    const order = getOrder(dataOrder)
    if (isEmpty(order)) return
    const orderModalObj = {
      show: true,
      id: 'order',
      props: { order },
      backdropClose: false,
      backdropBlurred: false
    }
    updateModal(orderModalObj)

    if (dataOrder.assetType === ASSETS_TYPES.STOCK && !isStockMarketOpen().state) return
    setActiveOrder(order)
  }

  const RowClick = (key, content) => {
    if (key === '-') return
    if (key === 'TPSL') return
    onSelectRow(content)
  }

  const editOrder = (dataOrder) => {
    const order = getOrder(dataOrder)
    if (isEmpty(order)) return
    const updateOrderModalObj = {
      show: true,
      id: 'updateOrder',
      props: { order },
      backdropClose: false,
      backdropBlurred: false
    }
    updateModal(updateOrderModalObj)
  }

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
        <TableContent onMouseLeave={() => setHoverOrderUUID('')}>
          {sortedData &&
            sortedData.map((content, index) => {
              const keys = Object.keys(content)
              return keys.map((key) => {
                if (hiddenContent.includes(key)) {
                  return null
                }
                const direction = content['Side'] === 'buy' ? true : false
                const statementLive = content['Status'] === LVG_ORDER_STATE.LIVE ? true : false
                const isCashStatus = key === '-' ? true : false
                const isCashOut = statementLive && isCashStatus ? true : false
                const isExitPrice = key === 'Exit' ? true : false
                const isStatusPending = content['Status'] === LVG_ORDER_STATE.PENDING
                const statementClosed = content['Status'] === LVG_ORDER_STATE.CLOSED ? true : false
                const cashStatus = getStatus(content)
                const isClosed = !(
                  content['Status'] === LVG_ORDER_STATE.PENDING || content['Status'] === LVG_ORDER_STATE.LIVE
                )
                // content['Status'] === LVG_ORDER_STATE.PENDING || content['Status'] === LVG_ORDER_STATE.LIVE
                //  ?
                const isWinning = content['isWinning']
                return (
                  <CellWrapper
                    className={
                      content?.uuid === activeOrder.uuid
                        ? key === 'ROI' || key === 'P&L' || key === 'Status' || key === '-'
                          ? 'noShadow'
                          : 'you'
                        : ''
                    }
                    isClosed={isClosed}
                    isWinning={isWinning}
                    padding={isCashStatus}
                    field={key}
                    value={content[key]}
                    isHover={content?.uuid === hoverOrderUUID}
                    onClick={() => RowClick(key, content)}
                    onMouseOver={() => setHoverOrderUUID(content.uuid)}
                    content={content}
                  >
                    <ContentSwitcherByState
                      noWrapper
                      activeState={key}
                      stateObject={{
                        Status: (
                          <Cell
                            isWinning={key === 'Status' && isWinning}
                            isLoosing={isClosed || (key === 'Status' && !isWinning)}
                          >
                            {
                              isClosed ? (
                                <>
                                  {/* <img
                                    alt={'closed_order_icon'}
                                    src={icons.closed_order_icon}
                                    width='14px'
                                    height='14px'
                                  /> */}
                                  Closed
                                </>
                              ) : (
                                <>
                                  {/* <img
                                    alt={'closed_order_icon'}
                                    src={icons[isWinning ? 'open_bid_icon_green' : 'open_bid_icon_red']}
                                    width='14px'
                                    height='14px'
                                  /> */}
                                  Open
                                </>
                              ) //content[key]?.toUpperCase()
                            }
                          </Cell>
                        ),
                        Asset: (
                          <Cell>
                            <Icon icon={key === 'Asset' ? getIcon(content[key]) : ''} />
                            {content[key]}
                          </Cell>
                        ),
                        Entry: content[key],
                        'Bid Amount': (
                          <Cell>
                            <BidIcon direction={direction} />
                            {content[key]}
                          </Cell>
                        ),
                        Bust: <Cell>{content[key]}</Cell>,
                        Multiplier: <Cell>{content[key]}</Cell>,
                        Exit: <Cell>{isExitPrice && statementLive ? '-' : content[key]}</Cell>,
                        TPSL: (
                          <BtnRow>
                            <TpslCell>{content[key]?.value}</TpslCell>
                            {content[key]?.edit && <EditBtn onClick={() => editOrder(content)} />}
                          </BtnRow>
                        ),
                        'P&L': (
                          <Cell isWinning={key === 'P&L' && isWinning} isLoosing={key === 'P&L' && !isWinning}>
                            {isStatusPending ? '-' : content[key]}
                          </Cell>
                        ),
                        ROI: (
                          <Cell isWinning={key === 'ROI' && isWinning} isLoosing={key === 'ROI' && !isWinning}>
                            {isStatusPending ? '-' : content[key]}
                          </Cell>
                        ),
                        '-': (
                          <BtnRow>
                            <TwitterShareBtn variant='icon' order={getOrder(content)} />
                            {isCashOut ? (
                              <ButtonCashOut
                                order={content}
                                isWinning={isWinning}
                                onCloseOrder={(dataOrder) => onCloseOrder(dataOrder)}
                                assetType={content.assetType}
                              >
                                Cash Out
                              </ButtonCashOut>
                            ) : statementClosed ? (
                              <CashStatus status={cashStatus}>{cashStatus ? 'Cashed out' : 'Cashed out'}</CashStatus>
                            ) : (
                              <CashStatus status={cashStatus}>{capitalizeFirst(content['Status'])}</CashStatus>
                            )}
                          </BtnRow>
                        )
                      }}
                    />
                  </CellWrapper>
                )
              })
            })}
        </TableContent>
      </Table>
    </TableWrapper>
  )
}

export default YourBids

const Hover = css`
  cursor: pointer;
  background: hsla(0, 0%, 100%, 0.1);
`
const Winning = css`
  color: hsla(126, 100%, 38%, 1);
`
const Loosing = css`
  color: hsla(340, 88%, 46%, 1);
`

const CellWrapper = styled.div`
  z-index: 0;
  position: relative;
  padding: ${({ padding }) => (padding ? '6px 10px 5px 10px' : '12px 10px 10px 10px')};
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 0.8rem;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: 500;
  min-height: 45px;
  transition: all 0.5s linear;
  background: ${({ isClosed, isWinning }) =>
    isClosed ? '' : isWinning ? 'hsla(126,100%,38%,.1)' : 'hsla(340,88%,46%,.1)'};
  border-bottom: 1px solid ${({ isWinning }) => (isWinning ? 'hsla(126,100%,38%,.1)' : 'hsla(340,88%,46%,.1)')};
  ${({ isHover }) => (isHover ? Hover : '')}
  ${({ theme }) => theme.breakPoints['1024px']} {
    width: 100%;
  }
`

const Cell = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  img {
    margin: 0 5px 0 0;
  }
  ${({ isWinning }) => (isWinning ? Winning : '')}
  ${({ isLoosing }) => (isLoosing ? Loosing : '')}
`

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
  width: 12px;
  height: 12px;
  margin: 0 3px 0 0;
`

const BtnRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
const TwitterShareBtn = styled(LvgTwitterShareBid)`
  margin: 0 10px 0 0;
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

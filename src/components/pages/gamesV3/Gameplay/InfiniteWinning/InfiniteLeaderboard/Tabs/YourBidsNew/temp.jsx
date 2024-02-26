import styled, { css } from 'styled-components'
import { Table } from '../Table/Table'
import { TableContent } from '../Table/TableContent/TableContent'
import HeaderCell from '../Table/TableHeader/HeaderCell/HeaderCell'
import { TableHeader } from '../Table/TableHeader/TableHeader'
import { TableWrapper } from '../Table/TableWrapper/TableWrapper'
import { useState } from 'react'
import { useMemo } from 'react'
import ButtonCashOut from './ButtonCashOut/ButtonCashOut'
import { icons } from 'common'
import { LVG_ASSETS } from 'constants/games/lvg/lvgAssets'
import { useLvgState } from 'hooks/games/lvg/useLvgState'
import { LONG_DASH, LVG_ORDER_STATE } from 'constants/index'
import { capitalizeFirst, currencyFormatter, isStockMarketOpen } from 'utils'
import { ContentSwitcherByState } from 'components/Atoms/ContentSwitcherByState'
import { useYoloModal } from 'lib/yoloModals/useYoloModal'
import { ASSETS_TYPES } from 'constants/assets'
import { LvgTwitterShareBid } from 'components/Molecules/LvgTwitterSharedBid.button'
import { useLvgYourOrdersList, useLvgYourOrderManager } from 'hooks/games/lvg/useLvgYourOrders'
import { StatementLiveOrder } from '../Table/Statement/StatementLiveOrder'
import { CellWrapper } from './CellWrapper'

const columns = [
  { id: 'status', header: 'Status', orderProp: 'updatedAt' },
  { id: 'asset', header: 'Asset', orderProp: 'asset' },
  { id: 'entry', header: 'Entry', orderProp: 'entryPrice' },
  { id: 'bid', header: 'Bid Amount', orderProp: 'amount' },
  { id: 'bust', header: 'Bust', orderProp: 'bustPrice' },
  { id: 'multiplier', header: 'Multiplier', orderProp: 'leverage' },
  { id: 'exit', header: 'Exit', orderProp: 'exitPrice' },
  { id: 'pnl', header: 'P&L', orderProp: 'pnl' },
  { id: 'roi', header: 'ROI', orderProp: '' },
  { id: 'share', header: '', orderProp: '' }
]

const YourBids = ({ orders: OLD_orders, data: OLD_data, headers: OLD_headers }) => {
  const [sortBy, setSortBy] = useState({ fieldId: 'updatedAt', isSortUp: true })
  const [hoverOrderUUID, setHoverOrderUUID] = useState('')
  const { closeOrder } = useLvgYourOrderManager()
  const { activeOrder, setActiveOrder } = useLvgState()
  const { updateModal } = useYoloModal()

  const { data } = useLvgYourOrdersList()

  const getIcon = (coinName) => {
    return LVG_ASSETS.find((asset) => asset.orderSymbol === coinName)?.icon
  }
  const getAssetDecimals = (orderSymbol) => {
    return LVG_ASSETS.find((asset) => asset.orderSymbol === orderSymbol)?.fiatDecimals
  }
  const getAssetName = (orderSymbol) => {
    return LVG_ASSETS.find((asset) => asset.orderSymbol === orderSymbol)?.name
  }

  const getStatus = (dataOrder) => {
    const direction = dataOrder['Side'] === 'buy' ? true : false
    const entryPrice = Number(dataOrder['Entry'])
    const exitPrice = Number(dataOrder['Exit'])
    return direction ? (exitPrice > entryPrice ? true : false) : exitPrice < entryPrice ? true : false
  }

  const updatedData = data //useMemo(() => {
  //   return { nonLive: data?.nonLive, live: data?.live, pending: data?.pending }
  // }, [data])

  const sortedData = useMemo(() => {
    const sortArray2 = (array) => {
      let itemA, itemB
      return array.sort((a, b) => {
        switch (sortBy.fieldId) {
          case 'asset':
            itemA = getAssetName(a[sortBy.fieldId])
            itemB = getAssetName(b[sortBy.fieldId])
            break
          default:
            itemA = a[sortBy.fieldId]
            itemB = b[sortBy.fieldId]
        }
        if (itemA < itemB) return sortBy.isSortUp ? 1 : -1
        if (itemA > itemB) return sortBy.isSortUp ? -1 : 1
        return 0
      })
    }
    const pendingOrders = data.filter((order) => order.status === LVG_ORDER_STATE.PENDING)
    const sortedPendingOrders = sortArray2(pendingOrders)

    const liveOrders = data.filter((order) => order.status === LVG_ORDER_STATE.LIVE)
    const sortedLiveOrders = sortArray2(liveOrders)

    const closeOrders = data.filter((order) => order.status === LVG_ORDER_STATE.CLOSED).slice(0, 100)
    const sortedCloseOrders = sortArray2(closeOrders)

    return [...sortedPendingOrders, ...sortedLiveOrders, ...sortedCloseOrders]
  }, [data, sortBy])

  const handleOptionChange = (e) => {
    setSortBy(e)
  }

  const onCloseOrder = (order) => {
    closeOrder(order)
  }

  const onSelectRow = (order) => {
    const orderModalObj = {
      show: true,
      id: 'order',
      props: { order },
      backdropClose: false,
      backdropBlurred: false
    }
    updateModal(orderModalObj)

    if (order.assetType === ASSETS_TYPES.STOCK && !isStockMarketOpen()) return
    setActiveOrder(order)
  }

  const RowClick = (key, content) => {
    if (key === 'share') return
    onSelectRow(content)
  }

  return (
    <TableWrapper>
      <Table>
        <TableHeader>
          {columns &&
            columns.map((column, index) => (
              <HeaderCell key={index} column={column} onClick={handleOptionChange} sortBy={sortBy} />
            ))}
        </TableHeader>
        <TableContent onMouseLeave={() => setHoverOrderUUID('')}>
          {sortedData &&
            sortedData.map((order, index) => {
              return columns.map((column) => {
                const statementLive = order['status'] === LVG_ORDER_STATE.LIVE ? true : false
                const isCashStatus = column.id === 'share' ? true : false
                const isCashOut = statementLive && isCashStatus

                const statementClosed = order['status'] === LVG_ORDER_STATE.CLOSED ? true : false
                const cashStatus = getStatus(order)
                const isClosed = !(
                  order['status'] === LVG_ORDER_STATE.PENDING || order['status'] === LVG_ORDER_STATE.LIVE
                )

                const isUp = order['side'] === 'buy' ? true : false

                return (
                  <CellWrapper
                    className={
                      order?.uuid === activeOrder.uuid
                        ? column.header === 'ROI' ||
                          column.header === 'P&L' ||
                          column.header === 'Status' ||
                          column.header === '-'
                          ? 'noShadow'
                          : 'you'
                        : ''
                    }
                    order={order}
                    isClosed={isClosed}
                    padding={isCashStatus}
                    field={column.header}
                    value={order[column.header]}
                    isHover={order?.uuid === hoverOrderUUID}
                    onClick={() => RowClick(column.id, order)}
                    onMouseOver={() => setHoverOrderUUID(order.uuid)}
                    content={order}
                  >
                    <ContentSwitcherByState
                      noWrapper
                      activeState={column.id}
                      stateObject={{
                        status: <StatementLiveOrder isLive={!isClosed} statementKey={column.id} order={order} />,
                        asset: (
                          <Cell>
                            <Icon icon={getIcon(order[column.orderProp])} />
                            {getAssetName(order[column.orderProp])}
                          </Cell>
                        ),
                        entry: order[column.orderProp]
                          ? Number(order[column.orderProp]).toFixed(getAssetDecimals(order['asset']))
                          : LONG_DASH,
                        bid: (
                          <Cell>
                            <BidIcon direction={isUp} />
                            {currencyFormatter(order[column.orderProp])}
                          </Cell>
                        ),
                        bust: order[column.orderProp]
                          ? Number(order[column.orderProp]).toFixed(getAssetDecimals(order['asset']))
                          : LONG_DASH,
                        multiplier: <Cell>{`x${order[column.orderProp]}`}</Cell>,
                        exit: (
                          <Cell>
                            {order[column.orderProp]
                              ? Number(order[column.orderProp]).toFixed(getAssetDecimals(order['asset']))
                              : LONG_DASH}
                          </Cell>
                        ),
                        pnl: <StatementLiveOrder isLive={!isClosed} statementKey={column.id} order={order} />,
                        roi: <StatementLiveOrder isLive={!isClosed} statementKey={column.id} order={order} />,
                        share: (
                          <BtnRow>
                            <TwitterShareBtn variant='icon' order={order} />
                            {isCashOut ? (
                              <ButtonCashOut
                                order={order}
                                onCloseOrder={(dataOrder) => onCloseOrder(dataOrder)}
                                assetType={order.assetType}
                              />
                            ) : statementClosed ? (
                              <StatementLiveOrder isLive={!isClosed} statementKey={column.id} order={order}>
                                {cashStatus ? 'Cashed out' : 'Cashed out'}
                              </StatementLiveOrder>
                            ) : (
                              <StatementLiveOrder isLive={!isClosed} statementKey={column.id} order={order}>
                                {capitalizeFirst(order['status'])}
                              </StatementLiveOrder>
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

const Winning = css`
  color: hsla(126, 100%, 38%, 1);
`
const Loosing = css`
  color: hsla(340, 88%, 46%, 1);
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
  width: 14px;
  height: 14px;
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

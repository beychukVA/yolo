import { LVG_ASSETS } from 'constants/games/lvg/lvgAssets'
import { LVG_ORDER_STATE } from 'constants/index'
import { useCallback, useMemo, useState } from 'react'
import { useYourBidsOrders } from './useYourBidsOrders'
import { YourBidsCSS } from './YourBidsCSS.styled'
import { YourBidsRow } from './YourBidsRow'

const COLUMNS = [
  { id: '0', header: 'Status', headerClass: 'status', orderField: 'updatedAt' },
  { id: '1', header: 'Asset', headerClass: 'asset', orderField: 'asset' },
  { id: '2', header: 'Entry', headerClass: 'entry', orderField: 'entryPrice' },
  { id: '3', header: 'Bid', headerClass: 'bidamount', orderField: 'amount' },
  { id: '4', header: 'Bust', headerClass: 'bust', orderField: 'bustPrice' },
  { id: '5', header: 'Multiplier', headerClass: 'multiplier', orderField: 'leverage' },
  { id: '6', header: 'Exit', headerClass: 'exit', orderField: 'exitPrice' },
  { id: '7', header: 'TP / SL', headerClass: 'tpsl', orderField: '' },
  { id: '8', header: 'P&L', headerClass: 'pandl', orderField: 'pnl' },
  { id: '9', header: 'ROI', headerClass: 'roi', orderField: '' },
  { id: '10', header: '', headerClass: 'share_bid', orderField: '' },
  { id: '11', header: '', headerClass: 'action_status', orderField: '' }
]

export const YourBids = () => {
  const [sortBy, setSortBy] = useState({ fieldId: 'updatedAt', isSortUp: true })
  const { yourBidsOrders } = useYourBidsOrders()

  const getAssetName = (orderSymbol) => {
    return LVG_ASSETS.find((asset) => asset.orderSymbol === orderSymbol)?.name
  }

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
    const pendingOrders = yourBidsOrders.filter((order) => order.status === LVG_ORDER_STATE.PENDING)
    const sortedPendingOrders = sortArray2(pendingOrders)

    const liveOrders = yourBidsOrders.filter((order) => order.status === LVG_ORDER_STATE.LIVE)
    const sortedLiveOrders = sortArray2(liveOrders)

    const closeOrders = yourBidsOrders.filter((order) => order.status === LVG_ORDER_STATE.CLOSED).slice(0, 100)
    const sortedCloseOrders = sortArray2(closeOrders)

    return [...sortedPendingOrders, ...sortedLiveOrders, ...sortedCloseOrders]
  }, [yourBidsOrders, sortBy])

  const sortColumn = useCallback((fieldId) => setSortBy((prev) => ({ fieldId, isSortUp: !prev.isSortUp })), [])

  return (
    <YourBidsCSS>
      <div className='panel' id='one-panel'>
        <div className='table_wrapper'>
          <div className='grid-body your_bids_iw'>
            <div className='grid-header'>
              {COLUMNS.map((column) => (
                <label className={column.headerClass}>
                  <span>{column.header}</span>
                  {column.header && column.orderField && (
                    <div className='menu_select' onClick={() => sortColumn(column.orderField)} />
                  )}
                </label>
              ))}
            </div>
            <div className='grid-content'>
              {sortedData.map((order) => (
                <YourBidsRow order={order} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </YourBidsCSS>
  )
}

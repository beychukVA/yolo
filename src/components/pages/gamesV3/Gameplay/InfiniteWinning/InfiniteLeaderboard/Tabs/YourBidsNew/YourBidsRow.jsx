import { icons } from 'common'
import { ContentSwitcherByState } from 'components/Atoms/ContentSwitcherByState'
import { ASSETS_TYPES } from 'constants/assets'
import { LVG_ASSETS } from 'constants/games/lvg/lvgAssets'
import { LONG_DASH, LVG_ORDER_STATE } from 'constants/index'
import { useActivePnl } from 'hooks/games/lvg/useActivePnL'
import { useEffect, useMemo, useState } from 'react'
import { currencyFormatter } from 'utils'
import { memoThis } from 'utils/react'
import { isEmpty } from 'lodash'
import { useYoloModal } from 'lib/yoloModals/useYoloModal'
import { isStockMarketOpen } from 'utils'
import { useLvgState } from 'hooks/games/lvg/useLvgState'
import { LvgTwitterShareBid } from 'components/Molecules/LvgTwitterSharedBid.button'
import { useLvgOrderManager } from 'hooks/games/lvg/useLvgOrders'
import { SingleDataLoader } from 'components/Atoms/SingleDataLoader'
import { useDebouncedCallback } from 'utils/hooks/useDebounceCallback'

export const YourBidsRow = memoThis(({ order }) => {
  const { updateModal } = useYoloModal()
  const { setActiveOrder } = useLvgState()
  const { closeOrder } = useLvgOrderManager()
  const [closingOrder, setClosingOrder] = useState(false)

  const showOrderModal = (e) => {
    e?.preventDefault()
    e?.stopPropagation()
    if (isEmpty(order)) return
    const orderModalObj = {
      show: true,
      id: 'order',
      props: { order },
      backdropClose: false,
      backdropBlurred: false
    }
    updateModal(orderModalObj)
    if (order.assetType === ASSETS_TYPES.STOCK && !isStockMarketOpen().state) return
    setActiveOrder(order)
  }

  const editTPSL = (e) => {
    e?.preventDefault()
    e?.stopPropagation()

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
  const cashOut = useDebouncedCallback((e) => {
    closeOrder(order)
    setClosingOrder(true)
  }, 500)

  const onCashOut = (e) => {
    e?.preventDefault()
    e?.stopPropagation()
    cashOut(order)
  }

  useEffect(() => {
    setClosingOrder(false)
  }, [order.uuid])

  const { activePnl } = useActivePnl(order)
  const isProfit = useMemo(() => activePnl >= 0, [activePnl])
  const isPending = useMemo(() => order.status === LVG_ORDER_STATE.PENDING, [order?.status])
  const isLive = useMemo(() => order.status === LVG_ORDER_STATE.LIVE, [order?.status])
  const roi = useMemo(
    () => (activePnl * 100) / Number(order.userFillDollarAmount),
    [activePnl, order?.userFillDollarAmount]
  )
  const assetInfo = useMemo(
    () =>
      LVG_ASSETS.filter((asset) => {
        return asset.orderSymbol === order.asset
      }).at(0),
    [order?.asset]
  )

  return (
    <div className='yourbids_table_row' onClick={showOrderModal}>
      {/* Status Cell */}
      <label className={`status ${isPending || isLive ? 'open' : 'closed'} ${isProfit ? 'profit' : 'loss'}`}>
        {(isPending || isLive) && (
          <img alt='status' src={isProfit ? icons.open_bid_icon_green : icons.open_bid_icon_red} />
        )}
        <span>{isPending ? 'Pending' : isLive ? 'Open' : 'Closed'}</span>
      </label>

      {/* Asset Cell */}
      <label className={`asset ${isPending || isLive ? 'open' : 'closed'} ${isProfit ? 'profit' : 'loss'}`}>
        <div className='asset_icon btc'>
          <img alt='coinIcon' src={assetInfo.icon} />
        </div>
        <span>{assetInfo.name}</span>
      </label>

      {/* Entry Price Cell */}
      <label className={`entry ${isPending || isLive ? 'open' : 'closed'} ${isProfit ? 'profit' : 'loss'}`}>
        {order?.entryPrice
          ? currencyFormatter(order.entryPrice, { noCurrencySign: true, decimalDigits: assetInfo.fiatDecimals })
          : LONG_DASH}
      </label>

      {/* Bid Cell */}
      <label className={`bidamount ${isPending || isLive ? 'open' : 'closed'} ${isProfit ? 'profit' : 'loss'}`}>
        <div className={`bid_direction ${order.side === 'buy' ? 'above' : 'below'}`}></div>
        <span>{currencyFormatter(order.amount)}</span>
      </label>

      {/* Bust Cell */}
      <label className={`bust ${isPending || isLive ? 'open' : 'closed'} ${isProfit ? 'profit' : 'loss'}`}>
        {order?.bustPrice
          ? currencyFormatter(order.bustPrice, { noCurrencySign: true, decimalDigits: assetInfo.fiatDecimals })
          : LONG_DASH}
      </label>

      {/* Multiplier Cell */}
      <label className={`multiplier ${isPending || isLive ? 'open' : 'closed'} ${isProfit ? 'profit' : 'loss'}`}>
        x{order.leverage}
      </label>

      {/* Exit Price Cell */}
      <label className={`exit ${isPending || isLive ? 'open' : 'closed'} ${isProfit ? 'profit' : 'loss'}`}>
        {order?.exitPrice
          ? currencyFormatter(order.exitPrice, {
              noCurrencySign: true,
              decimalDigits: assetInfo.fiatDecimals
            })
          : LONG_DASH}
      </label>

      {/* TPSL Cell */}
      <label className={`tpsl ${isPending || isLive ? 'open' : 'closed'} ${isProfit ? 'profit' : 'loss'}`}>
        {order.takeProfitPrice ? currencyFormatter(order.takeProfitPrice) : `${LONG_DASH} /`}
        {order.userStopLossPrice ? (
          <>
            <br />
            {currencyFormatter(order.userStopLossPrice)}
          </>
        ) : (
          ` ${LONG_DASH}`
        )}
        {isLive && <button className='edit_tpsl' onClick={editTPSL}></button>}
      </label>

      {/* PnL Cell */}
      <label
        className={`pandl ${isProfit ? 'up' : 'down'} ${isPending || isLive ? 'open' : 'closed'} ${
          isProfit ? 'profit' : 'loss'
        }`}
      >
        {currencyFormatter(activePnl, { decimalDigits: assetInfo.fiatDecimals })}
      </label>

      {/* ROI Cell */}
      <label
        className={`roi ${isProfit ? 'up' : 'down'} ${isPending || isLive ? 'open' : 'closed'} ${
          isProfit ? 'profit' : 'loss'
        }`}
      >
        {currencyFormatter(roi, { noCurrencySign: true })}%
      </label>

      {/* Share Cell */}
      <label className={`share_bid ${isPending || isLive ? 'open' : 'closed'} ${isProfit ? 'profit' : 'loss'}`}>
        <LvgTwitterShareBid variant='icon' order={order} />
      </label>

      {/* Action Cell */}
      <ContentSwitcherByState
        noWrapper
        activeState={order.status}
        stateObject={{
          [LVG_ORDER_STATE.PENDING]: (
            <label
              className={`action_status ${isPending || isLive ? 'open' : 'closed'} ${
                isProfit ? 'profit' : 'loss'
              } pending`}
            >
              <SingleDataLoader loading={true} data='' />
              <span>Pending</span>
            </label>
          ),
          [LVG_ORDER_STATE.LIVE]: (
            <label className={`action_status ${isLive ? 'open' : 'closed'} ${isProfit ? 'profit' : 'loss'}`}>
              <div onClick={onCashOut}>
                <button className='cashout'>
                  <SingleDataLoader loading={closingOrder} data={'Cash out'} />
                </button>
                <button className='cashout_icon'></button>
              </div>
            </label>
          ),
          [LVG_ORDER_STATE.CLOSED]: (
            <label className={`result cashed_out ${isProfit ? 'profit' : 'loss'}`}>
              <span>Cashed out</span>
            </label>
          ),
          [LVG_ORDER_STATE.BUSTED]: (
            <label className='result busted'>
              <span>Busted</span>
            </label>
          )
        }}
      />
    </div>
  )
})

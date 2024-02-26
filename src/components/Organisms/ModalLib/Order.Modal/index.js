import React, { useMemo } from 'react'
import { OrderModalCss } from './OrderModalCss.styled'
import { ASSETS } from 'constants/assets'
import { currencyFormatter, formatTimeStamp2 } from 'utils'
import { useActivePnl } from 'hooks/games/lvg/useActivePnL'
import { useYoloModal } from 'lib/yoloModals/useYoloModal'
import { LONG_DASH, LVG_ORDER_STATE } from 'constants/index'
import { isAddressesEqual } from 'utils/wallet/addresses'
import { useUser } from 'hooks/user/useUser'

const shareCardModalObj = {
  show: true,
  id: 'orderTwitterCard',
  backdropClose: false,
  backdropBlurred: false
}

export const OrderModal = ({ closeModal, order }) => {
  const { activePnl } = useActivePnl(order)
  const { account } = useUser('wallet')
  const { avatar: profileAvatar } = useUser('profile')
  // const { asset, avatar, address,bustPrice, createdAt, entryPrice, amount, leverage, side, username } = order
  const {
    asset,
    address,
    bustPrice,
    createdAt,
    entryPrice,
    amount,
    leverage,
    side,
    username,
    takeProfitPrice,
    userStopLossPrice,
    avatar: orderAvatar
  } = order
  const { updateModal } = useYoloModal()

  const avatar = isAddressesEqual(address, account) ? profileAvatar : orderAvatar

  const assetInfo = ASSETS.filter((item) => {
    return item.orderSymbol === asset
  })[0]

  const disabledShare = useMemo(() => {
    if (order.status === LVG_ORDER_STATE.LIVE) return 'disabled'
    return ''
  }, [order?.status])

  const shareTwitter = () => {
    updateModal({ ...shareCardModalObj, props: { order } })
  }

  return (
    <OrderModalCss assetIcon={assetInfo.icon}>
      <div className='popUpContainer user-bid'>
        <header>
          Bid details
          <div className='closePopUp' onClick={closeModal}>
            X
          </div>
        </header>

        <article>
          <div className='content column'>
            <div className='grid-content'>
              <label className='title'>Asset</label>
              <label className='value'>
                <div className='asset'>
                  <div className='asset_icon'></div>
                  {assetInfo.name}
                </div>
              </label>
              <label className='title'>Bid direction</label>
              <label className='value'>
                <div className='asset'>
                  <div className={`price_direction_icon ${side === 'buy' ? 'up' : 'down'}`}></div>
                  {side === 'buy' ? 'Up' : 'Down'}
                </div>
              </label>
              <label className='title'>Entry price</label>
              <label className='value'>
                {currencyFormatter(entryPrice, { noCurrencySign: true, decimalDigits: assetInfo.fiatDecimals })}
              </label>
              <label className='title'>Bid amount</label>
              <label className='value'>{currencyFormatter(amount)}</label>
              <label className='title'>Bust price</label>
              <label className='value'>
                {currencyFormatter(bustPrice, { noCurrencySign: true, decimalDigits: assetInfo.fiatDecimals })}
              </label>
              <label className='title'>Multiplier</label>
              <label className='value'>x{leverage}</label>
              <label className='title'>
                Take Profit / <br /> Stop Loss
              </label>
              <label className='value'>
                {`${takeProfitPrice ? currencyFormatter(takeProfitPrice) : LONG_DASH}  /`}
                <br />
                {`${userStopLossPrice ? currencyFormatter(userStopLossPrice) : LONG_DASH}`}
              </label>
              <label className='title'>P&amp;L</label>
              <label className={`value ${activePnl > 0 ? 'green' : 'red'}`}>
                <div className='asset'>
                  <div className={`profit_direction ${activePnl > 0 ? 'up' : 'down'}`}></div>
                  {currencyFormatter(activePnl, { decimalDigits: assetInfo.fiatDecimals })}
                </div>
              </label>
              <label className='title'>ROI</label>
              <label className={`value ${activePnl > 0 ? 'green' : 'red'}`}>
                {Number((activePnl * 100) / amount).toFixed(3)}%
              </label>
            </div>
          </div>
          <div className='content column-alt'>
            <div className='social_list'>
              <div className='twitter' onClick={disabledShare !== 'disabled' ? shareTwitter : undefined}></div>
            </div>
          </div>
          <div className='content column-alt '>
            <button className='clone_bid disabled' type='button'>
              Copy bid
            </button>
          </div>
          <div className='content'>
            <div className='profile_wrapper'>
              <div className='profile_avatar'>
                <img alt='img' src={avatar} />
              </div>
              <div className='profile_name'>{username}</div>
            </div>
            <div className='bid_date'>
              Bid placed on {formatTimeStamp2(new Date(createdAt), '%MM/%DD/%YY @ %hh:%mm:%ss')}
            </div>
          </div>
        </article>
      </div>
    </OrderModalCss>
  )
}

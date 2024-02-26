import React, { useMemo, useState, useEffect, useCallback } from 'react'
import { OrderUpdateModalCss } from './OrderUpdateModalCss.styled'
import { ASSETS } from 'constants/assets'
import { currencyFormatter, formatTimeStamp2 } from 'utils'
import { useActivePnl } from 'hooks/games/lvg/useActivePnL'
import { useYoloModal } from 'lib/yoloModals/useYoloModal'
import { LONG_DASH, LVG_ORDER_STATE } from 'constants/index'
import { isAddressesEqual } from 'utils/wallet/addresses'
import { useUser } from 'hooks/user/useUser'
import { usePriceFeed2 } from 'hooks/gameEngine/usePriceFeed'
import { useLvgOrderManager } from 'hooks/games/lvg/useLvgOrders'
import { SingleContentToggle } from 'components/Atoms/SingleContentToggle'

const shareCardModalObj = {
  show: true,
  id: 'orderTwitterCard',
  backdropClose: false,
  backdropBlurred: false
}

export const OrderUpdateModal = ({ closeModal, order }) => {
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
    takeProfitPrice = '',
    userStopLossPrice = '',
    cancelTakeProfitOrder = false,
    cancelUserStopLossOrder = false,
    avatar: orderAvatar,
    status
  } = order
  const { updateModal } = useYoloModal()
  const { updateOrder } = useLvgOrderManager()
  const [takeProfit, setTakeProfit] = useState(takeProfitPrice)
  const [stopLoss, setStopLoss] = useState(userStopLossPrice)
  const [isCancelTakeProfitTrigger, setCancelTakeProfitTrigger] = useState(cancelTakeProfitOrder)
  const [isCancelStopLossTrigger, setCancelStopLossTrigger] = useState(cancelUserStopLossOrder)
  const [takeProfitError, setTakeProfitError] = useState('')
  const [stopLossError, setStopLossError] = useState('')

  const isYou = isAddressesEqual(address, account)
  const avatar = isYou ? profileAvatar : orderAvatar

  const assetInfo = ASSETS.filter((item) => {
    return item.orderSymbol === asset
  })[0]

  const { priceFeed } = usePriceFeed2(assetInfo.priceFeedSymbol)

  const profit = useMemo(() => {
    let profit

    if (!takeProfit) return LONG_DASH
    if (order?.side === 'buy')
      profit = (Number(amount) * Number(leverage) * (Number(takeProfit ?? 0) - Number(entryPrice))) / Number(entryPrice)
    else
      profit = (Number(amount) * Number(leverage) * (Number(entryPrice) - Number(takeProfit ?? 0))) / Number(entryPrice)

    if (profit < 0) return LONG_DASH

    return currencyFormatter(profit, {
      noCurrencySign: false,
      decimalDigits: assetInfo.fiatDecimals
    })
  }, [amount, entryPrice, assetInfo.fiatDecimals, leverage, takeProfit, order?.side])

  const loss = useMemo(() => {
    let loss

    if (!stopLoss) loss = -Number(amount)
    else if (order?.side === 'buy')
      loss = (Number(amount) * Number(leverage) * (Number(stopLoss ?? 0) - Number(entryPrice))) / Number(entryPrice)
    else loss = (Number(amount) * Number(leverage) * (Number(entryPrice) - Number(stopLoss ?? 0))) / Number(entryPrice)

    //max loss is the amount
    if (loss < -Number(amount)) loss = -Number(amount)

    if (loss > 0) return LONG_DASH

    return currencyFormatter(loss, {
      noCurrencySign: false,
      decimalDigits: assetInfo.fiatDecimals
    })
  }, [amount, entryPrice, assetInfo.fiatDecimals, leverage, stopLoss, order?.side])

  const disabledSaveChanges = useMemo(() => {
    if (isCancelTakeProfitTrigger || isCancelStopLossTrigger) {
      return false
    }
    if (takeProfit !== takeProfitPrice || stopLoss !== userStopLossPrice) {
      return false
    }
    return true
  }, [takeProfit, takeProfitPrice, stopLoss, userStopLossPrice, isCancelTakeProfitTrigger, isCancelStopLossTrigger])

  const disabledShare = useMemo(() => {
    if (order.status === LVG_ORDER_STATE.LIVE) return 'disabled'
    return ''
  }, [order?.status])

  const shareTwitter = () => {
    updateModal({ ...shareCardModalObj, props: { order } })
  }

  const onlyDigits = (value) => {
    let digits = value?.replace(/[^.\d]+/g, '')
    if (digits && digits.match(/\./g)?.length > 1) {
      digits = digits.substr(0, digits.lastIndexOf('.'))
    }
    return digits
  }

  const checkTakeProfitError = useCallback(() => {
    console.log('ACZ kk__>', side, takeProfit)
    if (side === 'buy' && Number(takeProfit) < Number(entryPrice))
      setTakeProfitError(
        `The new value should be above ${currencyFormatter(entryPrice, {
          noCurrencySign: false,
          decimalDigits: assetInfo.fiatDecimals
        })}`
      )

    if (side === 'sell' && Number(takeProfit) > Number(entryPrice))
      setTakeProfitError(
        `The new value should be below ${currencyFormatter(entryPrice, {
          noCurrencySign: false,
          decimalDigits: assetInfo.fiatDecimals
        })}`
      )
  }, [assetInfo?.fiatDecimals, entryPrice, side, takeProfit])

  const checkStopLossError = useCallback(() => {
    if (side === 'buy' && Number(stopLoss) > Number(entryPrice))
      setStopLossError(
        `The new value should be below ${currencyFormatter(entryPrice, {
          noCurrencySign: false,
          decimalDigits: assetInfo.fiatDecimals
        })}`
      )

    if (side === 'sell' && Number(stopLoss) < Number(entryPrice))
      setStopLossError(
        `The new value should be above ${currencyFormatter(entryPrice, {
          noCurrencySign: false,
          decimalDigits: assetInfo.fiatDecimals
        })}`
      )
  }, [assetInfo?.fiatDecimals, entryPrice, side, stopLoss])

  useEffect(() => {
    setTakeProfitError('')
    setStopLossError('')
  }, [takeProfit, stopLoss])

  const handleSaveChanges = () => {
    if (takeProfitError || stopLossError) return
    updateOrder({
      ...order,
      newTakeProfitPrice: isCancelTakeProfitTrigger ? takeProfitPrice : takeProfit,
      newUserStopLossPrice: isCancelStopLossTrigger ? userStopLossPrice : stopLoss,
      cancelTakeProfitOrder: isCancelTakeProfitTrigger,
      cancelUserStopLossOrder: isCancelStopLossTrigger
    })
    closeModal(true)
  }

  return (
    <OrderUpdateModalCss assetIcon={assetInfo.icon}>
      <div className='popUpContainer tpsl-edit variable-width'>
        <header>
          Edit
          <br />
          Take Profit / Stop Loss
          <div className='closePopUp' onClick={closeModal}>
            X
          </div>
        </header>

        <article>
          <div className='content column'>
            <div className='edit pl_max-min_option'>
              <div className='switch_wrapper'>
                <div className='show_maxmin'>
                  <div className='max'>
                    <fieldset>
                      <span>{`Close bid at ${side === 'buy' ? 'max' : 'min'} price`}</span>
                      <input
                        className={!!takeProfitError ? 'error' : ''}
                        type='text'
                        placeholder={`${side === 'buy' ? 'Max' : 'Min'} Price`}
                        value={takeProfit}
                        onChange={(e) => setTakeProfit(onlyDigits(e.target.value))}
                        disabled={isCancelTakeProfitTrigger}
                        onBlur={checkTakeProfitError}
                      />
                    </fieldset>
                    <fieldset>
                      <strong>Profit</strong>
                      <input type='text' className='tpsl_result_data profit' readOnly value={profit} />
                    </fieldset>
                  </div>
                  <div className='cancel_check'>
                    <input
                      type='checkbox'
                      name='maxmin_checkbox'
                      className='max_switch'
                      value={isCancelTakeProfitTrigger}
                      checked={isCancelTakeProfitTrigger}
                      onChange={() => {}}
                      onClick={() => setCancelTakeProfitTrigger(!isCancelTakeProfitTrigger)}
                    />
                    Cancel <strong>Take Profit</strong> trigger
                  </div>
                  <div className='min'>
                    <fieldset>
                      <span>{`Close bid at ${side === 'buy' ? 'min' : 'max'} price`}</span>
                      <input
                        className={!!stopLossError ? 'error' : ''}
                        type='text'
                        placeholder={`${side === 'buy' ? 'Min' : 'Max'} Price`}
                        value={stopLoss}
                        onChange={(e) => setStopLoss(onlyDigits(e.target.value))}
                        disabled={isCancelStopLossTrigger}
                        onBlur={checkStopLossError}
                      />
                    </fieldset>
                    <fieldset>
                      <strong>Loss</strong>
                      <input type='text' className='tpsl_result_data loss' readOnly value={loss} />
                    </fieldset>
                  </div>
                  <div className='cancel_check'>
                    <input
                      type='checkbox'
                      name='maxmin_checkbox'
                      className='max_switch'
                      value={isCancelStopLossTrigger}
                      checked={isCancelStopLossTrigger}
                      onChange={() => {}}
                      onClick={() => setCancelStopLossTrigger(!isCancelStopLossTrigger)}
                    />
                    Cancel <strong>Stop Loss</strong> trigger
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='content column action_area'>
            <button
              className={`save_profile ${disabledSaveChanges ? 'disabled' : ''}`}
              disabled={takeProfitError || stopLossError || disabledSaveChanges}
              onClick={handleSaveChanges}
            >
              Save
            </button>
            {(takeProfitError || stopLossError) && <div class='min_error'>{takeProfitError || stopLossError}</div>}
            <button className='cancel_profile' onClick={closeModal}>
              Cancel
            </button>
          </div>
        </article>
      </div>
    </OrderUpdateModalCss>
  )
}

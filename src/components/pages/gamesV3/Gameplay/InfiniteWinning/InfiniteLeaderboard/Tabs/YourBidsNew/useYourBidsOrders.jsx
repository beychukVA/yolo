import { LVG_ORDER_STATE, ASYNC_STATUS_ID } from 'constants/index'
import { LVG_ASSETS } from 'constants/games/lvg/lvgAssets'
import { useEffect } from 'react'
import { useAPI } from 'utils/hooks/useAPI'
import { API } from 'constants/apiEndPoints'
import { useGatewayListener } from 'hooks/sockets/lvg/useGatewaySocket'
import { isAddressesEqual } from 'utils/wallet/addresses'
import { useUser } from 'hooks/user/useUser'
import { useLvgState } from 'hooks/games/lvg/useLvgState'
import { capitalizeFirst } from 'utils'
import { useYoloToast } from 'lib/yoloToasts/useYoloToast'
import { emitCustomEvent, useCustomEventListener } from 'react-custom-events'
import { EVENTS } from 'constants/events'
import { atom, useAtom, useSetAtom } from 'jotai'
import { icons } from 'common'
import { LvgTwitterShareBid } from 'components/Molecules/LvgTwitterSharedBid.button'

const ALLOWED_STATES = [LVG_ORDER_STATE.PENDING, LVG_ORDER_STATE.LIVE, LVG_ORDER_STATE.CLOSED, LVG_ORDER_STATE.BUSTED]

const toastSuccessLiveObj = {
  id: 'successToast',
  autoClose: true,
  props: {
    message: {
      title: 'Your bid has been placed successfully',
      subtitle: `to track your bid and cash out`,
      showTable: true
    }
  }
}
const toastUpdateLiveObj = {
  id: 'successToast',
  autoClose: true,
  props: {
    message: {
      title: 'Your bid has been updated successfully',
      subtitle: `to track your bid and cash out`,
      showTable: true
    }
  }
}

const getToastSuccessClosedObj = (order) => ({
  id: 'announceToast',
  autoClose: false,
  props: {
    icon: icons.bid_success_black_icon,
    message: {
      title: <strong>Cash out was successful</strong>,
      subtitle: (
        <>
          Your balance will be updated shortly
          <br />
          <LvgTwitterShareBid order={order} fromToast />
        </>
      )
    }
  }
})

// Atoms Definition
const lvgYourOrdersCacheAtom = atom([])
const updateLvgYourOrderCachedAtom = atom(null, (get, set, order) => {
  const { uuid } = order
  if (!uuid) return
  set(lvgYourOrdersCacheAtom, (prev) => {
    const orderExists = prev.some((prevOrder) => prevOrder.uuid === uuid)
    if (!orderExists) return [...prev, order]
    const updatedOrders = prev.map((prevOrder) => {
      if (prevOrder.uuid === uuid) return { ...prevOrder, ...order }
      return prevOrder
    })
    return updatedOrders
  })
})

export const useYourBidsOrders = () => {
  const [yourOrders, setYourOrders] = useAtom(lvgYourOrdersCacheAtom)
  const updateYourOrder = useSetAtom(updateLvgYourOrderCachedAtom)
  const [lvgYourState, sendLvgYourQuery, hasLvgYourStatus] = useAPI(API.LVG_ORDERS_LIST, {
    queryType: 'get',
    controlled: true,
    withJwt: true
  })

  // Filling the cached
  useEffect(() => {
    sendLvgYourQuery()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (hasLvgYourStatus(ASYNC_STATUS_ID.CONFIRMED)) {
      const ownOrdersByStatus = lvgYourState.data
      const ownOrders = Object.keys(ownOrdersByStatus).reduce(
        (ownOrders, stateArray) => [...ownOrders, ...(ownOrdersByStatus[stateArray] || [])],
        []
      )
      const reviewedOrders = ownOrders
        .filter((order) => !!order.uuid)
        .filter((order) => {
          const assetFound = LVG_ASSETS.find((asset) => asset.orderSymbol === order.asset)
          return !!assetFound
        })
        .map((order) => {
          const { status } = order
          if (status.includes('pending')) {
            order.status = LVG_ORDER_STATE.PENDING
          }
          return order
        })
        .filter((order) => ALLOWED_STATES.includes(order.status))

      setYourOrders(reviewedOrders)
      // setYourOrdersCached(reviewedOrders)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lvgYourState.status?.id])

  // Listening for updates
  const { account } = useUser('wallet')
  const { setActiveOrder } = useLvgState()
  const { yToast } = useYoloToast()

  const orderUpdateMiddleware = (order) => {
    const extendedOrder = { ...order, address: order.userAddress }
    const { status, uuid } = extendedOrder
    if (!uuid) return
    if (!isAddressesEqual(extendedOrder.address, account)) return
    switch (status) {
      case LVG_ORDER_STATE.PENDING:
        emitCustomEvent(EVENTS.LVG_ORDER_PENDING, extendedOrder)
        break
      case LVG_ORDER_STATE.LIVE:
        setActiveOrder(extendedOrder)
        const isUpdate =
          yourOrders.filter((cachedOrder) => cachedOrder.uuid === order.uuid)?.[0]?.status === LVG_ORDER_STATE.LIVE ||
          false
        yToast(isUpdate ? toastUpdateLiveObj : toastSuccessLiveObj)
        emitCustomEvent(EVENTS.LVG_ORDER_LIVE, extendedOrder)
        break

      case LVG_ORDER_STATE.CLOSED:
        yToast(getToastSuccessClosedObj(order))
        emitCustomEvent(EVENTS.LVG_ORDER_CLOSED, extendedOrder)
        break

      case LVG_ORDER_STATE.CANCELLED:
        const toastErrorCancelledObj = {
          id: 'errorToast',
          autoClose: false,
          props: {
            message: {
              title: capitalizeFirst(extendedOrder?.details || extendedOrder?.reason || 'The order has been cancelled'),
              subtitle: 'Please try again'
            }
          }
        }
        yToast(toastErrorCancelledObj)
        emitCustomEvent(EVENTS.LVG_ORDER_CANCELLED, extendedOrder)
        break

      case LVG_ORDER_STATE.BUSTED:
        const toastWarningBustedObj = {
          id: 'warningToast',
          autoClose: true,
          props: {
            message: {
              title: capitalizeFirst(extendedOrder?.details || extendedOrder?.reason || 'The order was busted'),
              subtitle: 'Please try again'
            }
          }
        }
        yToast(toastWarningBustedObj)
        emitCustomEvent(EVENTS.LVG_ORDER_BUSTED, extendedOrder)
        break

      case LVG_ORDER_STATE.ERROR:
        const toastErrorObj = {
          id: 'errorToast',
          autoClose: false,
          props: {
            message: {
              title: capitalizeFirst(extendedOrder?.details || extendedOrder?.reason || 'Error'),
              subtitle: 'Please try again'
            }
          }
        }
        yToast(toastErrorObj)
        emitCustomEvent(EVENTS.LVG_ORDER_ERROR, extendedOrder)
        break

      default:
        break
    }
    updateYourOrder(extendedOrder)
  }

  /* prettier-ignore */ useCustomEventListener(EVENTS.LVG_ORDER_PENDING, orderUpdateMiddleware)
  /* prettier-ignore */ useGatewayListener('order.public', orderUpdateMiddleware)
  /* prettier-ignore */ useGatewayListener('order.error', (order) => orderUpdateMiddleware({ ...order, status: LVG_ORDER_STATE.ERROR }))

  return { yourBidsOrders: yourOrders }
}

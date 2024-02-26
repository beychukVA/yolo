import { useCallback, useEffect, useMemo, useState } from 'react'
import uuid from 'react-uuid'
import { atom, useAtomValue, useSetAtom } from 'jotai'

import { useGatewayEmitter, useGatewayListener } from 'hooks/sockets/lvg/useGatewaySocket'
import { ASYNC_STATUS_ID, LVG_ORDER_STATE } from 'constants/index'
import { EVENTS } from 'constants/events.js'
import { emitCustomEvent } from 'react-custom-events'
import { useAPI } from 'utils/hooks/useAPI'
import { API } from 'constants/apiEndPoints'
import { LVG_ASSETS } from 'constants/games/lvg/lvgAssets'
import { useHistory } from 'react-router-dom'
import { useUser } from 'hooks/user/useUser'
import { checkCountryAllowance } from 'hooks/user/useCountryAllowanceObserver'
import axios from 'axios'

// Main Atom
const lvgOrdersCacheAtom = atom([])

// Update All Order Atom
const updateLvgOrderCacheAtom = atom(null, (get, set, order) => {
  const { uuid } = order
  if (!uuid) return
  set(lvgOrdersCacheAtom, (prev) => {
    const orderExists = prev.some((prevOrder) => prevOrder.uuid === uuid)
    if (!orderExists) return [...prev, order]
    const updatedOrders = prev.map((prevOrder) => {
      if (prevOrder.uuid === uuid) return { ...prevOrder, ...order }
      return prevOrder
    })
    return updatedOrders
  })
})

export const useLvgOrderObserver = () => {
  const updateAllOrder = useSetAtom(updateLvgOrderCacheAtom)
  const setAllOrdersCache = useSetAtom(lvgOrdersCacheAtom)

  const [lvgAllState, sendLvgAllQuery, hasLvgAllStatus] = useAPI(API.LVG_PUBLIC_ORDER_LIST, {
    queryType: 'get',
    controlled: true
  })

  //First load filling the cached
  useEffect(() => {
    sendLvgAllQuery()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (hasLvgAllStatus(ASYNC_STATUS_ID.CONFIRMED)) {
      const oldOrders = lvgAllState.data.array
      const reviewedOrders = oldOrders
        .filter((order) => !!order.uuid)
        .filter((order) => {
          const assetFound = LVG_ASSETS.find((asset) => asset.orderSymbol === order.asset)
          return !!assetFound
        })
        //this is a patch to remove live from this
        .filter((order) => order.status !== LVG_ORDER_STATE.LIVE)
        .filter((order) => order.status !== LVG_ORDER_STATE.CLOSED)
        .map((order) => {
          const { status } = order
          //TODO: Add here a new checker for closing state
          if (status.includes('pending')) {
            order.status = LVG_ORDER_STATE.PENDING
          }
          return order
        })
      axios.get(API.LVG_PUBLIC_LIVE_ORDERS).then((liveRes) => {
        const liveOrders = liveRes?.data?.body || []
        axios
          .get(API.LVG_PUBLIC_CLOSED_ORDER)
          .then((closeRes) => {
            const closedOrders = closeRes?.data?.body || []
            setAllOrdersCache([...liveOrders, ...closedOrders, ...reviewedOrders])
          })
          .catch((err) => {
            setAllOrdersCache([...liveOrders, ...reviewedOrders])
          })
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lvgAllState.status?.id])

  const orderUpdateMiddleware = (order) => {
    const extendedOrder = { ...order, address: order.userAddress }
    const { uuid } = extendedOrder
    if (!uuid) return
    updateAllOrder(extendedOrder)
  }

  /* prettier-ignore */ useGatewayListener('order.public',  orderUpdateMiddleware)
  /* prettier-ignore */ useGatewayListener('order.error', (order) => orderUpdateMiddleware({ ...order, status: LVG_ORDER_STATE.ERROR }))
}

export const useLvgOrderManager = () => {
  const { account } = useUser('wallet')
  const { gatewayEmit } = useGatewayEmitter()
  const history = useHistory()

  const sendOrder = useCallback(
    (orderObj) => {
      checkCountryAllowance().then((payload) => {
        if (!payload.isAllowed) history.push('/restricted')
        else {
          const rawOrder = { ...orderObj, uuid: uuid() }
          gatewayEmit('order.new', rawOrder)
          const pendingOrder = { ...rawOrder, userAddress: account, status: LVG_ORDER_STATE.PENDING }
          emitCustomEvent(EVENTS.LVG_ORDER_PENDING, pendingOrder)
        }
      })
    },
    [gatewayEmit, account, history]
  )

  const closeOrder = useCallback(
    (liveOrder) => {
      gatewayEmit('order.close', liveOrder)
    },
    [gatewayEmit]
  )
  const updateOrder = useCallback(
    (orderObj) => {
      gatewayEmit('order.update', orderObj)
    },
    [gatewayEmit]
  )

  return { sendOrder, closeOrder, updateOrder }
}

const getOrdersByStatus = (orders, status) => {
  if (!status) return []
  return orders.filter((order) => order.status === status)
}

export const useLvgOrdersList = () => {
  const allOrders = useAtomValue(lvgOrdersCacheAtom)
  const [render, setRender] = useState(false)

  useEffect(() => {
    setRender(!render)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allOrders])

  const allPending = useMemo(() => getOrdersByStatus(allOrders, LVG_ORDER_STATE.PENDING), [allOrders])
  const allLive = useMemo(() => getOrdersByStatus(allOrders, LVG_ORDER_STATE.LIVE), [allOrders])
  const allClosed = useMemo(() => getOrdersByStatus(allOrders, LVG_ORDER_STATE.CLOSED), [allOrders])
  const allCancelled = useMemo(() => getOrdersByStatus(allOrders, LVG_ORDER_STATE.CANCELLED), [allOrders])
  const allBusted = useMemo(() => getOrdersByStatus(allOrders, LVG_ORDER_STATE.BUSTED), [allOrders])
  const allError = useMemo(() => getOrdersByStatus(allOrders, LVG_ORDER_STATE.ERROR), [allOrders])

  return {
    isEmpty: !allOrders.length,
    all: {
      all: allOrders,
      pending: allPending,
      live: allLive,
      closed: allClosed,
      cancelled: allCancelled,
      busted: allBusted,
      error: allError
    }
  }
}

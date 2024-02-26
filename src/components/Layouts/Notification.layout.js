import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { toast } from 'react-toastify'

import { notificationActions } from 'redux/actions'
import { selectToastState } from 'redux/selectors'

import { ToastLib } from 'components/Organisms/ToastLib'

export const NotificationLayout = ({ children }) => {
  const dispatch = useDispatch()
  const toastState = useSelector(selectToastState())

  // Specially for Toast (For toast we will use the Rayan lib,
  // may be we can integrate it in the action logic instead of here)
  useEffect(() => {
    const { show, id, props } = toastState

    if (show) {
      toast(<ToastLib toastId={id} {...props} />, {
        toastId: id,
        onOpen: ({ uid }) => dispatch(notificationActions.clearToast(id)),
        onClose: ({ uid }) => dispatch(notificationActions.clearToast(id))
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastState])

  return null
}

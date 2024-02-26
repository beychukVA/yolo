import { createSelector } from '@reduxjs/toolkit'

/**
 * Notification
 */

export const selectToastState = () =>
  createSelector(
    (state) => state.notification.toastShow,
    (state) => state.notification.toastId,
    (state) => state.notification.toastProps,
    (toastShow, toastId, toastProps) => ({
      show: toastShow,
      id: toastId,
      props: toastProps
    })
  )

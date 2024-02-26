import { createAsyncThunk } from '@reduxjs/toolkit'

import { toastInitialState } from './initialState'

// The `reducers` object lets us define reducers and generate associated actions
export const notificationReducers = {
  updateToast: (state, action) => {
    state.toastShow = action.payload.show ?? state.toastShow
    state.toastId = action.payload.id ?? state.toastId
    state.toastProps = action.payload.props ?? state.toastProps
  },
  cleanToast: (state, action) => {
    state.toastShow = toastInitialState.toastShow
    state.toastId = toastInitialState.toastId
    state.toastProps = toastInitialState.toastProps
  }
}

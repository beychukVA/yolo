import { createSlice } from '@reduxjs/toolkit'

import { onBoardingInitialState } from './initialState'
import { onBoardingReducers } from './reducers'

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
/* export const incrementAsync = createAsyncThunk('counter/fetchCount', async (amount) => {
  const response = await fetchCount(amount)
  // The value we return becomes the `fulfilled` action payload
  return response.data
}) */

export const onBoarding = createSlice({
  name: 'onBoarding',
  initialState: onBoardingInitialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: onBoardingReducers,

  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {}
})

export const onBoardingReducerActions = onBoarding.actions

export const onBoardingReducer = onBoarding.reducer
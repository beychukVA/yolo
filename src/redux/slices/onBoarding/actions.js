import { reduxWalletActions } from '../wallet/actions'
import { onBoardingReducerActions } from './index'

const { setActiveStep, cancelOnBoarding } = onBoardingReducerActions

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

// We can write thunks real actions, which may contain both sync and async logic.
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

const start = () => (dispatch, getState) => {
  //dispatch(reduxWalletActions.disconnect())
  // dispatch(setActiveStep(0))
}
const goNext = () => (dispatch, getState) => {
  const state = getState()
  const maxStep = state.onBoarding.steps.length - 1
  const nextIdx = state.onBoarding.activeStep ? state.onBoarding.activeStepIndex + 1 : 0
  !(nextIdx > maxStep) && dispatch(setActiveStep(nextIdx))
}
const goBack = () => (dispatch, getState) => {
  const state = getState()
  const nextIdx = state.onBoarding.activeStepIndex - 1
  !(nextIdx < 0) && dispatch(setActiveStep(nextIdx))
}
const cancel = cancelOnBoarding

export const onBoardingActions = {
  start,
  goNext,
  goBack,
  cancel
}

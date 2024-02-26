import { onBoardingInitialState } from './initialState'

// The `reducers` object lets us define reducers and generate associated actions
export const onBoardingReducers = {
  setActiveStep: (state, action) => {
    state.activeStep = state.steps[action.payload]
    state.activeStepIndex = action.payload
  },
  cancelOnBoarding: (state, action) => onBoardingInitialState
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const onBoardingExtraReducer = {}

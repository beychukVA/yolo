import { configureStore } from '@reduxjs/toolkit'

import { walletReducer } from 'redux/slices/wallet'
import { priceFeedReducer } from 'redux/slices/priceFeed'
import { notificationReducer } from 'redux/slices/notification'
import { onBoardingReducer } from 'redux/slices/onBoarding'
import { config } from 'config'

export const store = configureStore({
  reducer: {
    onBoarding: onBoardingReducer,
    notification: notificationReducer,
    wallet: walletReducer,
    priceFeed: priceFeedReducer
  },
  devTools: config.ENABLE_REDUX_DEV_TOOLS
})

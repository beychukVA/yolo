import { createSelector } from '@reduxjs/toolkit'
import { getGameParameters } from 'constants/games'
import ms from 'ms'

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

// We need to define all the selector as closures in this case we can use them to pass externals parameters from the component

/**
 * PriceFeed
 */

//Selectors with Arguments
export const selectGameIdCurrentRoundIndex = (gameId) => (state) =>
  createSelector(
    (state) => state.priceFeed.data,
    (data) => {
      const gameIdData = data[gameId]
      return Number(gameIdData?.roundIndex || 0)
    }
  )(state, gameId)

export const selectCurrentRoundIndexes = (registeredGameIds) => (state) =>
  createSelector(
    (state) => state.priceFeed.data,
    (state, registeredGameIds) => registeredGameIds || [],
    (data, registeredGameIds) => {
      const currentRoundIndexes = {}
      registeredGameIds.map((gameId) => {
        currentRoundIndexes[gameId] = Number(data[gameId]?.roundIndex || 0)
      })
      return currentRoundIndexes
    }
  )(state, registeredGameIds)

export const selectStrikePrice = (gameId) => (state) =>
  createSelector(
    (state) => state.priceFeed.data,
    (data) => {
      const gameIdData = data[gameId]
      return Number(gameIdData?.strikePrice || 0)
    }
  )(state, gameId)

export const selectCurrentPrice = (gameId) => (state) =>
  createSelector(
    (state) => state.priceFeed.data,
    (data) => {
      const gameIdData = data[gameId]
      return Number(gameIdData?.currentPrice || 0)
    }
  )(state, gameId)

export const selectIsRoundEnded = (gameId) => (state) =>
  createSelector(
    (state) => state.priceFeed.data,
    (data) => {
      const gameIdData = data[gameId]
      return Boolean(gameIdData?.isRoundEnded || false)
    }
  )(state, gameId)

export const selectCurrentPriceForMultipleGameIds = (registeredGameIds) => (state) =>
  createSelector(
    (state) => state.priceFeed.data,
    (state, registeredGameIds) => registeredGameIds || [],
    (data, registeredGameIds) => {
      const currentPrices = {}
      registeredGameIds.map((gameId) => {
        currentPrices[gameId] = Number(data[gameId]?.currentPrice || 0)
      })
      return currentPrices
    }
  )(state, registeredGameIds)

export const selectGraphData = (gameId) => (state) =>
  createSelector(
    (state) => state.priceFeed.data,
    (state, gameId) => gameId || state.gameData.gameId,
    (data, gameId) => {
      const gameIdData = data[gameId]
      return gameIdData?.graphData || []
    }
  )(state, gameId)

export const selectLastPointGraph = (gameId) => (state) =>
  createSelector(
    (state) => state.priceFeed.data,
    (state, gameId) => gameId || state.gameData.gameId,
    (data, gameId) => {
      const gameIdData = data[gameId]
      const graphData = gameIdData?.graphData || []
      const lastPoint = graphData[graphData.length - 1]
      const price = (lastPoint && Number(lastPoint[0])) || 0
      const x = (price && ms(`${lastPoint[1][0]}s`)) || 0
      const y = (price && lastPoint[1][1]) || 0
      return { price, x, y }
    }
  )(state, gameId)

export const selectSettlementPoint = (gameId) => (state) =>
  createSelector(
    (state) => state.priceFeed.data,
    (state, gameId) => gameId || state.gameData.gameId,
    (data, gameId) => {
      const gameIdData = data[gameId]
      return Number(gameIdData?.selectSettlementPrice || 0)
    }
  )(state, gameId)

import { priceFeedReducerActions } from './index'

const { connect, disconnect, updateGames, pauseUpdate } = priceFeedReducerActions

// We can write thunks real actions, which may contain both sync and async logic.
const priceFeedOpenSocket = (socket) => (dispatch, getState) => {
  if (socket) {
    dispatch(connect())
    socket.on('broadcast', (data) => {})
  }
}

const priceFeedCloseSocket = () => (dispatch, getState) => {
  dispatch(disconnect())
}

export const priceFeedActions = {
  priceFeedOpenSocket,
  priceFeedCloseSocket,
  pauseUpdate,
  updateGames
}

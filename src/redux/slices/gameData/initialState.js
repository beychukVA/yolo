import { DEFAULT_GAME_ID } from 'constants/games'
import { ethers } from 'ethers'

export const gameDataInitialState = {
  gameId: DEFAULT_GAME_ID,
  gameHexId: ethers.utils.solidityKeccak256(['string'], [DEFAULT_GAME_ID]),
  activeCardRoundOffset: 0,
  activeCardRoundIndex: 0,
  checkBidResult: true,
  activePanel: 'game'
}

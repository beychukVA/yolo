import { ASSETS } from '.'

export const ACTIVE_ASSETS = ASSETS.filter((asset) => asset.games.length > 0)

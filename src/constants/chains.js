/**
 * List of all the networks supported by the Yolorekt Interface
 */
export const SUPPORTED_CHAIN_ID = Object.freeze({
  MAINNET: 1,
  ROPSTEN: 3,
  RINKEBY: 4,
  GOERLI: 5,
  KOVAN: 42,

  POLYGON: 137,
  POLYGON_MUMBAI: 80001
})

/**
 * Array of all the supported chain IDs
 */
export const ALL_SUPPORTED_CHAIN_IDS = Object.values(SUPPORTED_CHAIN_ID).filter((id) => typeof id === 'number')

import { config } from 'config'

const version = config.CONTRACTS_VERSION

//Tokens
const YOLO = {} //require(`./${version}/YoloEthereumUtilityTokens.json`)
const USDC = require(`./${version}/StablecoinToken.json`)

//Core
const yoloWallet = require(`./${version}/YoloWallet.json`)
//const yoloNft = require(`./${version}/YoloNFT.json`)
const yoloNftPack = require(`./${version}/YoloNFTPack.json`)
const nftTracker = require(`./${version}/NFTTracker.json`)
//const nftClaims = require(`./${version}/NftClaims.json`)
const liquidity = require(`./${version}/LiquidityPool.json`)
const staking = require(`./${version}/StakingRewards.json`)
const whitelistSFTClaims = require(`./${version}/WhitelistSFTClaims.json`)
const biddersRewards = require(`./${version}/BiddersRewards.json`)

//3min Games
const ETH_USD_70 = require(`./${version}/ETH_USD_70.json`)
const DOGE_USD_70 = require(`./${version}/DOGE_USD_70.json`)
const TSLA_USD_70 = require(`./${version}/TSLA_USD_70.json`)
const MATIC_USD_70 = require(`./${version}/MATIC_USD_70.json`)
const GME_USD_70 = require(`./${version}/GME_USD_70.json`)
const BTC_USD_70 = require(`./${version}/BTC_USD_70.json`)
//24hr Games
const ETH_USD_86400 = require(`./${version}/ETHDailyReturns24.json`)
const SPY_USD_23400 = require(`./${version}/SPYDailyReturns24.json`)
// const ETH_USD_86400 = require(`./${version}/DailyReturns.json`)
const ETH_USD_864 = require(`./${version}/MOCK_DailyReturns24.json`)

const CONTRACT_DICT = {
  //Tokens
  YOLO,
  USDC,

  //Core
  yoloWallet,
  //yoloNft,
  yoloNftPack,
  nftTracker,
  // nftClaims,
  liquidity,
  staking,
  whitelistSFTClaims,
  biddersRewards,

  //3min Games
  ETH_USD_70,
  DOGE_USD_70,
  TSLA_USD_70,
  MATIC_USD_70,
  GME_USD_70,
  BTC_USD_70,

  //24h Games
  ETH_USD_86400,
  SPY_USD_23400,
  ETH_USD_864
}

export const getSmartContractsInfo = (contractIdArray) => contractIdArray.map((contractId) => CONTRACT_DICT[contractId])
export const getSmartContractsInfoByAddress = (contractAddress) => {
  const contractIdArray = Object.keys(CONTRACT_DICT).filter(
    (contractId) => CONTRACT_DICT[contractId].address?.toLowerCase() === contractAddress.toLowerCase()
  )
  return getSmartContractsInfo(contractIdArray)[0]
}

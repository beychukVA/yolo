import { BigNumber } from '@ethersproject/bignumber'

type Allowed = {
  isAllowed: boolean | null
  countryISOCode: string
  timeOffsetMs: number
}

type Profile = {
  username: string
  avatar: string
  emailValidated: boolean | null
  personalReferralCode: string
}

type Wallet = {
  isProxy: boolean | null
  isConnected: boolean
  account: string
  accessToken: string
  chainId: number | undefined
  active: boolean
  connector: AbstractConnector
  library: any
}

type Balance = {
  tokenId: string

  earningsBalance: string
  tokenAmount: string
  yoloWalletAmount: string
  totalBalance: string

  earningsBalanceBN: BigNumber
  tokenAmountBN: BigNumber
  yoloWalletAmountBN: BigNumber
  totalBalanceBN: BigNumber
}

type LvgBeta = {
  inBeta: boolean | null
  inWaitlist: boolean | null
  position: number | null
}

type User = {
  profile: Profile
  allowed: Allowed
  wallet: Wallet
  balance: Balance
  lvgBeta: LvgBeta
}

type Login = {
  username: string
  avatar: string
  emailValidated: boolean | null
  personalReferralCode: string
  walletType: string
  account: string
  accessToken: string
  chainId: string
}

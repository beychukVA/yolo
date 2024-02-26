import { icons } from 'common'
import { USER_LOGIN_INFO } from 'constants/index'
import { BigNumber } from 'ethers'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import { Zero } from '@ethersproject/constants'

import { Allowed, Balance, Login, LvgBeta, Profile, User, Wallet } from './user.d'

/**
 * Allowed Atom
 */
const ALLOWED_INIT: Allowed = {
  isAllowed: true,
  countryISOCode: '',
  timeOffsetMs: 0
}
export const userAllowedAtom = atom(ALLOWED_INIT)
export const updateUserAllowedAtom = atom(null, (get, set, payload: Allowed) =>
  set(userAllowedAtom, (prev) => ({ ...prev, ...payload }))
)

/**
 * Profile Atom
 */
const PROFILE_INIT: Profile = {
  username: '',
  avatar: '',
  emailValidated: null,
  personalReferralCode: ''
}
export const userProfileAtom = atom(PROFILE_INIT)
export const updateUserProfileAtom = atom(null, (get, set, payload: Partial<Profile> | undefined) => {
  if (payload?.avatar === null) payload.avatar = icons.default_avatar_square
  else set(loginAtom, (prev: any) => ({ ...prev, avatar: payload?.avatar }))
  set(userProfileAtom, (prev) => ({ ...prev, ...payload }))
})

/**
 * Wallet Atom
 */
const WALLET_INIT: Wallet = {
  isProxy: null,
  isConnected: false,
  account: '',
  accessToken: '',
  connector: undefined,
  library: undefined,
  chainId: undefined,
  active: false
}
export const userWalletAtom = atom(WALLET_INIT)
export const updateUserWalletAtom = atom(null, (get, set, updateObj: Partial<Wallet> | undefined): void => {
  if (!updateObj) return
  set(userWalletAtom, (prev) => {
    const isConnected = prev.isConnected || !!prev.account || !!updateObj?.account
    return { ...prev, isConnected, ...updateObj }
  })
})

/**
 * Wallet Atom
 */
const BALANCE_INIT: Balance = {
  tokenId: '',

  earningsBalance: '0',
  tokenAmount: '0', //userBalance
  yoloWalletAmount: '0', //tokenBalance
  totalBalance: '0',

  earningsBalanceBN: Zero,
  tokenAmountBN: Zero, //userBalanceBN
  yoloWalletAmountBN: Zero, //tokenBalanceBN
  totalBalanceBN: Zero
}

export const userBalanceAtom = atom(BALANCE_INIT)
export const updateUserBalanceAtom = atom(null, (get, set, updateObj: Partial<Balance> | undefined): void => {
  if (!updateObj) return
  set(userBalanceAtom, (prev) => {
    const tokenAmount = updateObj.tokenAmount || prev.tokenAmount
    const yoloWalletAmount = updateObj.yoloWalletAmount || prev.yoloWalletAmount
    const earningsBalance = updateObj.earningsBalance || prev.earningsBalance

    //calculated values
    const tokenBalanceBN = BigNumber.from(yoloWalletAmount)
    const userBalanceBN = BigNumber.from(tokenAmount)
    const totalBalanceBN = tokenBalanceBN.add(userBalanceBN)
    const totalBalance = totalBalanceBN.toString()

    const earningsBalanceBN = BigNumber.from(earningsBalance)
    const yoloWalletAmountBN = BigNumber.from(yoloWalletAmount)
    const tokenAmountBN = BigNumber.from(tokenAmount)

    return { ...prev, ...updateObj, totalBalance, totalBalanceBN, tokenAmountBN, yoloWalletAmountBN, earningsBalanceBN }
  })
})

/**
 * Lvg Beta Atom
 */
const LVG_BET_INIT: LvgBeta = {
  inBeta: null,
  inWaitlist: null,
  position: null
}

export const userLvgBetaAtom = atom(LVG_BET_INIT)
export const updateUserLvgBetaAtom = atom(null, (get, set, updateObj: LvgBeta) =>
  set(userLvgBetaAtom, (prev) => ({ ...prev, ...updateObj }))
)

/**
 * Composed Used Atom
 */
export const userAtom = atom((get): User => {
  const allowed = get(userAllowedAtom)
  const profile = get(userProfileAtom)
  const wallet = get(userWalletAtom)
  const balance = get(userBalanceAtom)
  const lvgBeta = get(userLvgBetaAtom)
  return { allowed, profile, wallet, balance, lvgBeta }
})

export const resetUserAtom = atom(null, (get, set, update): void => {
  set(userAllowedAtom, ALLOWED_INIT)
  set(userProfileAtom, PROFILE_INIT)
  set(userWalletAtom, WALLET_INIT)
  set(userBalanceAtom, BALANCE_INIT)
  set(userLvgBetaAtom, LVG_BET_INIT)
})

/**
 * Login Info persistance in localStorage
 */

const LOGIN_INFO_INIT = {
  username: '',
  avatar: '',
  emailValidated: null,
  personalReferralCode: '',
  walletType: '',
  account: '',
  accessToken: '',
  chainId: ''
}

export const loginAtom = atomWithStorage(USER_LOGIN_INFO, LOGIN_INFO_INIT)
export const updateLoginAtom = atom(null, (get, set, updateObj: any) =>
  set(loginAtom, (prev) => ({ ...prev, ...updateObj }))
)
export const resetLoginAtom = atom(null, (get, set, updateObj: any) =>
  set(loginAtom, (prev) => ({ ...LOGIN_INFO_INIT, ...updateObj }))
)

import { get } from 'lodash'

import { getYoloBalance, getUserBalance } from 'datasource/crypto/contracts'

import { getWeb3 } from 'utils/web3.utils'
import { CHAIN_INFO } from 'constants/chainInfo'

const YOLO = 'YOLO'

// export const isMetamaskInstalled = () => metamaskService.isWalletInstalled()

export const getAccount = async (cb) => {
  const web3 = getWeb3()
  const yoloAppInfo = get(web3, 'yoloApp', null)
  if (yoloAppInfo) {
    try {
      const accounts = await web3.eth.getAccounts()
      const defaultAccount = accounts[0]
      web3.eth.defaultAccount = defaultAccount
      cb && cb(defaultAccount)
      return defaultAccount
    } catch (err) {
      if (err.code === 4001) {
        console.warn(`Please connect to ${yoloAppInfo.connectedWalletId}.`)
      } else {
        //TODO:: (ACZ) - define error Status and responses
        console.error(err)
      }
    }
  }
}

export const getYoloTokenContractBalance = async (address) => {
  const web3 = getWeb3()
  const yoloAppInfo = get(web3, 'yoloApp', null)
  if (yoloAppInfo) {
    try {
      const { chainInfo } = await getChainInfo()
      const network = chainInfo.network
      const account = address || web3.eth.defaultAccount
      if (network === 'Polygon') {
        const balanceData = await getYoloBalance(account)
        return { [YOLO]: Number(balanceData) }
      }
      return { [YOLO]: 0 }
    } catch (err) {
      if (err.code === 4001) {
        console.log(`Please connect to ${yoloAppInfo.connectedWalletId}.`)
      } else {
        //TODO:: (ACZ) - define error Status and responses
        console.error(err)
      }
    }
  }
}

export const getUserContractBalance = async (address) => {
  const web3 = getWeb3()
  const yoloAppInfo = get(web3, 'yoloApp', null)
  if (yoloAppInfo) {
    try {
      const { chainInfo } = await getChainInfo()
      const network = chainInfo.network
      const account = address || web3.eth.defaultAccount
      if (network === 'Polygon') {
        const balanceData = await getUserBalance(account)
        return { [YOLO]: Number(balanceData) }
      }
      return { [YOLO]: 0 }
    } catch (err) {
      if (err.code === 4001) {
      } else {
        //TODO:: (ACZ) - define error Status and responses
        console.error(err)
      }
    }
  }
}

export const getChainInfo = async () => {
  const web3 = getWeb3()
  const yoloAppInfo = get(web3, 'yoloApp', null)
  if (yoloAppInfo) {
    try {
      const chainId = await web3.eth.net.getId()
      const chainInfo = CHAIN_INFO[chainId]
      const newChainInfo = { chainInfo }
      return newChainInfo
    } catch (err) {
      if (err.code === 4001) {
        console.log('Please connect to MetaMask.')
      } else {
        //TODO:: (ACZ) - define error Status and responses
        console.error(err)
      }
    }
  }
}

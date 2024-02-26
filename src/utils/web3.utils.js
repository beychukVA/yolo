import { get } from 'lodash'
import Web3 from 'web3'
import { CHAIN_INFO } from 'constants/chainInfo'
import { Exception } from 'utils'

const EMPTY_CHAIN = { name: '', shortName: '', currency: '', network: 'ethereum', chainId: 0 }

export const chainInfoSelector = (chainId) => {
  let id = chainId
  if (typeof chainId === 'string' && chainId.substr(0, 2) === '0x') {
    id = parseInt(chainId)
  }

  return CHAIN_INFO[id] || EMPTY_CHAIN
}

export const getWeb3 = () => {
  const web3 = window.yoloWeb3
  const yoloAppInfo = get(web3, 'yoloApp', null)
  if (yoloAppInfo) {
    return web3
  }
  throw new Exception(4001, 'connect a wallet to continue')
}

const web3Utils = new Web3().utils

export const weiToCrypto = (amountInWei) => web3Utils.fromWei(`${amountInWei}`)
export const soliditySha3 = web3Utils.soliditySha3
export const getWeb3Utils = () => web3Utils

export const getTxInfo = async (txHash) => {
  try {
    const web3 = getWeb3() //new Web3('https://rpc-mumbai.matic.today') //
    if (web3 && web3.eth) {
      const txInfo = await web3.eth.getTransaction(txHash)
      const txReceipt = await web3.eth.getTransactionReceipt(txHash)
      const status = txReceipt?.status
      return { ...txInfo, status, receipt: txReceipt }
    } else {
      throw new Exception(4001, 'connect a wallet to continue')
    }
  } catch (err) {
    console.error(`ERROR: "getTxInfo" fails: ${err}`)
    throw err
  }
}

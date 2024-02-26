import { getAddress } from '@ethersproject/address'
import { AddressZero } from '@ethersproject/constants'
import { Contract } from '@ethersproject/contracts'

/**
 * It returns the checksummed address if the address is valid, otherwise returns false
 * @param {*} value:any
 * @returns string | false
 */
export function isAddress(value) {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

/**
 * get ethers signer
 * @param {Web3Provider} library
 * @param {string?} account
 * @returns {JsonRpcSigner}
 */
// account is not optional
function getSigner(library, account) {
  return library.getSigner(account).connectUnchecked()
}

/**
 * get ethers provider or signer
 * @param {Web3Provider} library
 * @param {string?} account
 * @returns {Web3Provider | JsonRpcSigner}
 */
function getProviderOrSigner(library, account) {
  return account ? getSigner(library, account) : library
}

/**
 * It get a contract Instance
 * @param {string} address
 * @param {any} ABI
 * @param {Web3Provider} library
 * @param {string?} account
 * @returns {ethersContract}
 */
export function getContract(address, ABI, library, account) {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account))
}

export function signMessage(library, account, message) {
  const signer = getSigner(library, account)
  const signature = signer.signMessage(message)
  return signature
}

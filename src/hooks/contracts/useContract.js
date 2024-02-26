import { useCallback } from 'react'
import { getContract } from 'utils'

import { getSmartContractsInfo } from 'config/smartContracts.config'
import { useUser } from 'hooks/user/useUser'

/**
 * Hook to get multiple contract instances,
 * it return an array with contractInstance or null (on error)
 * in the same order than contractArray
 * @param {Array(string)} contractIdArray
 * @returns {Array(ethersContract | null)}
 */
export const useContractArray = (contractIdArray) => {
  const { account, library, chainId } = useUser('wallet')
  const withSignerIfPossible = true
  const getSingleContract = useCallback(
    (contractAddress, ABI) => {
      if (!contractAddress || !ABI || !library || !chainId) return null
      let address = undefined
      if (typeof contractAddress === 'string') address = contractAddress
      else return null
      if (!address) return null
      try {
        return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
      } catch (error) {
        console.error('Failed to get contract', error)
        return null
      }
    },
    [library, chainId, withSignerIfPossible, account]
  )

  const contractsInfo = contractIdArray.map((contractId) => {
    const [contractInfo] = getSmartContractsInfo([contractId])

    return getSingleContract(contractInfo?.address, contractInfo?.abi)
  })

  return contractsInfo
}

/**
 * Hook to get a contract instance, it returns null on error
 * @param {string} contractId
 * @returns {ethersContract | null}
 */
export const useContract = (contractId) => useContractArray([contractId])[0]

/**
 * Hooks to get predefined contracts
 */
export const useERC20Contract = (contractId) => useContract(contractId)
export const useTokenContract = () => useContract('token')
export const useLiquidityContract = () => useContract('liquidity')
export const useStakingRewardsContract = () => useContract('staking')
export const useNftPackContract = () => useContract('yoloNftPack')
export const useNftTrackerContract = () => useContract('nftTracker')
export const useWhitelistSFTClaimsContract = () => useContract('whitelistSFTClaims')
export const useYoloWalletContract = () => useContract('yoloWallet')
export const useUsdcContract = () => useContract('USDC')

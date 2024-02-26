import { useCallback, useState } from 'react'

import { useYoloWalletContract } from 'hooks/contracts/useContract'
import { useTxsCache } from 'hooks/useTxsCache'
import { ASYNC_STATUS, TX_TYPE } from 'constants/index'
import { EVENTS } from 'constants/events.js'
import { emitCustomEvent } from 'react-custom-events'
import { formatBytes32String } from 'ethers/lib/utils'
import { useAPI } from 'utils/hooks/useAPI'
import { API } from 'constants/apiEndPoints'
import { useUser } from './useUser'

export const useUsernameUpdate = () => {
  const { account, isProxy } = useUser('wallet')
  const yoloWalletContract = useYoloWalletContract()
  const txRegister = useTxsCache()

  const [status, setStatus] = useState(ASYNC_STATUS.IDLE)

  const [, sendApiUpdate] = useAPI(API.ACCOUNTS_UPDATE, {
    controlled: true,
    withJwt: true
  })

  const updateContractUsername = useCallback(
    (newUsername) => {
      setStatus(ASYNC_STATUS.PENDING)
      const hexUsername = formatBytes32String(newUsername)
      yoloWalletContract
        .setUserNames(hexUsername)
        .then(async (txResponse) => {
          txRegister({
            from: account,
            hash: txResponse.hash,
            txParams: { address: account, newUsername, hexUsername },
            txType: TX_TYPE.USERNAME
          })
          sendApiUpdate({ params: { address: account, username: newUsername } })
          setStatus(ASYNC_STATUS.CONFIRMED)
        })
        .catch((error) => {
          console.log('txResponse (error) -->', error)
          setStatus({ ...ASYNC_STATUS.ERROR, message: error })
        })
    },
    [account, yoloWalletContract, sendApiUpdate, txRegister]
  )

  const updateProxyUsername = useCallback((newUsername) => {
    emitCustomEvent(EVENTS.USERNAME_PROXY_UPDATE, newUsername)
  }, [])

  const updateUsername = useCallback(
    (newUsername) => {
      if (isProxy) {
        updateProxyUsername(newUsername)
      } else {
        updateContractUsername(newUsername)
      }
    },
    [isProxy, updateContractUsername, updateProxyUsername]
  )

  const hasStatus = useCallback((statusToCheck) => status.id === statusToCheck, [status.id])

  return { updateUsername, status, hasStatus }
}

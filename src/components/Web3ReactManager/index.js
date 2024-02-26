import { useWeb3React } from '@web3-react/core'
import { useEffect } from 'react'
import styled from 'styled-components'

import { network } from '../../connectors'
import { NetworkContextName } from '../../constants/misc'
import { useEagerConnect, useInactiveListener } from 'hooks/web3'
import { useBackendAuth } from 'hooks/user/useBackendAuth'
import { usePrevious } from 'utils/hooks'
import { useReactGA4 } from 'GA4/useReactGA4'

const MessageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20rem;
`

const Message = styled.h2`
  color: white;
  font-size: 2rem;
`

export function Web3ReactManager({ children }) {
  const { gaEvent } = useReactGA4()
  const { active, account, chainId } = useWeb3React()
  const { active: networkActive, error: networkError, activate: activateNetwork } = useWeb3React(NetworkContextName)
  const { authAddress } = useBackendAuth()

  // const triedEager = useEagerConnect()
  const triedEager = false

  const prevAccount = usePrevious(account)
  const prevChainId = usePrevious(chainId)

  //onChainId change
  useEffect(() => {
    if (prevChainId && chainId && prevChainId !== chainId) {
      gaEvent('chain_change', { pathId: 'wallet.chainId.change', prevChainId })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, gaEvent])

  //onAccount change
  useEffect(() => {
    if (prevAccount && account && prevAccount !== account) {
      gaEvent('account_change', { pathId: 'wallet.account.change', prevAddress: `::${prevAccount}` })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, gaEvent])

  useEffect(() => {
    if (!account) return
    authAddress(account)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  useEffect(() => {
    if (!networkActive && !networkError && !active) {
      activateNetwork(network)
    }
  }, [networkActive, networkError, activateNetwork, active])

  // when there's no account connected, react to logins (broadly speaking) on the injected provider, if it exists
  useInactiveListener(!triedEager)

  // if the account context isn't active, and there's an error on the network context, it's an irrecoverable error
  if (triedEager && !active && networkError) {
    return (
      <MessageWrapper>
        <Message>
          Oops! An unknown error occurred. Please refresh the page, or visit from another browser or device.
        </Message>
      </MessageWrapper>
    )
  }

  return children
}

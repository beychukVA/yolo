import { ContentSwitcherByState } from 'components/Atoms/ContentSwitcherByState'
import { IconLib } from 'components/Atoms/IconLib'
import { SingleDataLoader } from 'components/Atoms/SingleDataLoader'
import { ASYNC_STATUS_ID, TIMEOUT } from 'constants/index'
import { API } from 'constants/apiEndPoints'
import { useUser } from 'hooks/user/useUser'
import styled from 'styled-components'
import { useAPI } from 'utils/hooks/useAPI'
import { useCallback, useEffect } from 'react'
import { useWalletConnection } from 'hooks/useWalletConnection'
import { useTimeoutWhen } from 'utils/hooks/useTimeoutWhen'
import { useHistory } from 'react-router-dom'

export const ReferralLandingPage = ({ urlParam }) => {
  const history = useHistory()
  const { connectWallet } = useWalletConnection()
  const { account } = useUser('wallet')
  const [redeemState, sendRedeemQuery, hasRedeemStatus] = useAPI(API.REFERRALS_REDEEM, {
    controlled: true,
    withJwt: true
  })
  const redirectToGame = () => history.push('/game')
  useTimeoutWhen(
    () => {
      redirectToGame()
    },
    TIMEOUT.PAGE_REDIRECTION,
    hasRedeemStatus(ASYNC_STATUS_ID.CONFIRMED)
  )

  const tryConnectWallet = useCallback(() => {
    if (!account) {
      connectWallet()
      return true
    }
    return false
  }, [account, connectWallet])

  const onConfirm = () => {
    if (tryConnectWallet()) return
    if (hasRedeemStatus(ASYNC_STATUS_ID.CONFIRMED)) redirectToGame()
    sendRedeemQuery({ params: { referralCode: urlParam.id, email: urlParam.email, address: account } })
  }

  useEffect(() => {
    const timer = setTimeout(tryConnectWallet, 500)
    return () => clearTimeout(timer)
  }, [account, tryConnectWallet])

  return (
    <Container>
      <Button onClick={onConfirm}>
        <ContentSwitcherByState
          activeState={redeemState.status.id}
          stateObject={{
            [ASYNC_STATUS_ID.CONFIRMED]: <ConfirmedTick collection='general' name='tick' masking />,
            [ASYNC_STATUS_ID.ERROR]: 'Error, retry',
            default: (
              <SingleDataLoader loading={hasRedeemStatus(ASYNC_STATUS_ID.PENDING)} data={'Enroll in the contest'} />
            )
          }}
        />
      </Button>
    </Container>
  )
}

const Container = styled.div`
  grid-area: 'content';
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 60px;
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 30px;
  transition: width 300ms ease-in-out;
`

const Button = styled.button`
  display: flex;
  border-radius: 10px;
  background: rgba(29, 75, 175, 1);
  padding: 12px 32px;
  line-height: 100%;
  margin-right: 6px;
  width: 198px;
  height: 45px;
  white-space: nowrap;
  font-size: 1rem;
  outline: none;
  border: none;
  text-decoration: none;
  cursor: pointer;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  justify-content: center;
  align-items: center;
  color: #fff;
`
const ConfirmedTick = styled(IconLib)`
  height: 1.2rem;
`

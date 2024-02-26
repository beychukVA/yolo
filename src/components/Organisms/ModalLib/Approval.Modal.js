import React, { useEffect, useMemo } from 'react'
import styled from 'styled-components'

import { Typography } from 'components/Atoms/Typography'
import { IconLib } from 'components/Atoms/IconLib'

import { images } from 'common'
import { getGameParameters } from 'constants/games'
import { useERC20Approval } from 'hooks/contracts/useERC20Approval'
import { SingleDataLoader } from 'components/Atoms/SingleDataLoader'
import { ContentSwitcherByState } from 'components/Atoms/ContentSwitcherByState'
import { TIMEOUT, ASYNC_STATUS_ID } from 'constants/index'
import { getSmartContractsInfoByAddress } from 'config/smartContracts.config'

export const ApprovalModal = ({ closeModal, ERC20ContractId, spenderAddress, tokenId }) => {
  const contractInfo = getSmartContractsInfoByAddress(spenderAddress)
  const contractId = contractInfo?.id
  const { status, approveERC20 } = useERC20Approval(ERC20ContractId, spenderAddress, tokenId)
  const fallbackIcon = useMemo(() => ({ collection: 'general', name: 'error', masking: true }), [])

  const onApprovalClick = () => {
    if (status.id === ASYNC_STATUS_ID.PENDING) return
    if (status.id === ASYNC_STATUS_ID.CONFIRMED) {
      closeModal()
      return
    }
    approveERC20()
  }

  const onErrorClose = () => {
    closeModal()
  }

  useEffect(() => {
    let intervalId
    if (status.id === ASYNC_STATUS_ID.CONFIRMED) {
      intervalId = setInterval(() => closeModal(), TIMEOUT.MODAL_AUTO_CLOSE)
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [status, closeModal])
  const modalIcon = getGameParameters(contractId)?.iconProps || fallbackIcon
  return (
    <Container>
      <ModalBox isError={status.id === ASYNC_STATUS_ID.ERROR}>
        <Close masking onClick={() => closeModal()}>
          &times;
        </Close>
        <Icon id='alert_icon' {...modalIcon} />
        <ContentSwitcherByState
          activeState={status.id}
          stateObject={{
            confirmed: <Title>APPROVED</Title>,
            error: <Title>Approval Error</Title>,
            default: <Title>Approval Needed</Title>
          }}
        />
        <ContentSwitcherByState
          activeState={status.id}
          stateObject={{
            pending: <InfoPending>{tokenId} Token approval is currently pending</InfoPending>,
            confirmed: <InfoConfirmed>You may now place bids with this asset</InfoConfirmed>,
            error: (
              <Info>
                There was an error in approving the asset. Please try again or{' '}
                <a href='mailto:support@yolorekt.com'>contact us</a> for assistance.
              </Info>
            ),
            default: <Info>You need to approve this asset in your wallet before you can use it for bidding</Info>
          }}
        />
        <ButtonsContainers>
          <ApprovalButton onClick={onApprovalClick}>
            <ContentSwitcherByState
              activeState={status.id}
              stateObject={{
                confirmed: <ConfirmedTick collection='general' name='tick' masking />,
                error: 'RETRY APPROVAL',
                default: <SingleDataLoader loading={status.id === ASYNC_STATUS_ID.PENDING} data={'APPROVE TOKEN'} />
              }}
            />
          </ApprovalButton>
          {status.id === ASYNC_STATUS_ID.ERROR && <CloseButton onClick={onErrorClose}>CLOSE</CloseButton>}
        </ButtonsContainers>
      </ModalBox>
    </Container>
  )
}

const Container = styled.div`
  z-index: 9;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: rgba(32, 38, 51, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  &:before {
    position: absolute;
    background: rgba(5, 12, 30, 0.4);
    filter: blur(200px);
    width: 60vw;
    height: 60vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    content: '';
    border-radius: 50%;
  }
  h1 {
    margin: 10px 0 30px 0;
  }
`
const ModalBox = styled.div`
  width: 320px;
  /* height: 200px; */
  border-radius: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 0;
  -webkit-backdrop-filter: blur(30px);
  backdrop-filter: blur(30px);
  background: rgba(255, 255, 255, 0.1);
  padding: 30px;
  &:after {
    width: 300px;
    height: 200px;
    background: rgba(42, 109, 255, 0.2);
    -webkit-filter: blur(50px);
    z-index: -1;
    content: '';
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @-moz-document url-prefix() {
    background: rgba(255, 255, 255, 0.2) url(${images.FireFoxMenuBg}) center center / cover no-repeat;
  }
  border: ${({ isError }) => (isError ? '1px solid rgba(255,0,0,0.5)' : '')};
`
const Icon = styled(IconLib)`
  width: 46px;
  height: 46px;
  margin: 0 0 10px 0;
`
const Title = styled(Typography)`
  font-size: 1.3rem;
  font-weight: 600;
  text-align: center;
  line-height: 120%;
`
const Info = styled.div`
  text-align: center;
  width: 100%;
  text-align: center;
  font-size: 0.9rem;
  padding: 5px 5px 0 5px;
`
const InfoPending = styled(Info)`
  padding: 12px 5px 12px 5px;
`
const InfoConfirmed = styled(Info)`
  padding: 12px 5px;
`
const ButtonsContainers = styled.div`
  display: flex;
  flex-direction: row;
`
const ApprovalButton = styled.button`
  padding: 6px 14px;
  min-width: 135px;
  min-height: 30px;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  background: rgba(36, 89, 202, 1);
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  margin: 10px 4px 0 4px;
  text-decoration: none;
  color: white;
  &:hover {
    background: rgba(42, 109, 255, 1);
  }
`
const CloseButton = styled(ApprovalButton)`
  background: rgba(255, 0, 0, 0.4);
  min-width: 90px;
  &:hover {
    background: rgba(255, 0, 0, 1);
  }
`

const ConfirmedTick = styled(IconLib)`
  height: 1.2rem;
`
const Close = styled(IconLib).attrs({ collection: 'general', name: 'closeOutline', dimension: '25px' })`
  color: #fff;
  font-size: 1.4rem;
  line-height: 100%;
  position: absolute;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  left: -8px;
  text-align: center;
  text-decoration: none;
  top: -8px;
  z-index: 1;
  background: rgba(255, 255, 255, 1);

  @media (max-width: 480px) {
    left: -8px;
    top: -8px;
  }
`

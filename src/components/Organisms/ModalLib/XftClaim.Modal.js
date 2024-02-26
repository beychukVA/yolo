import React, { useEffect } from 'react'
import styled from 'styled-components'

import { Typography } from 'components/Atoms/Typography'
import { IconLib } from 'components/Atoms/IconLib'

import { SingleDataLoader } from 'components/Atoms/SingleDataLoader'
import { ContentSwitcherByState } from 'components/Atoms/ContentSwitcherByState'
import { TIMEOUT, ASYNC_STATUS_ID } from 'constants/index'
import { useXftClaim } from 'hooks/xftCampaign/useXftClaim'
import { useTimeout } from 'utils/hooks'
import { useTokenApproval } from 'hooks/contracts/useERC20Approval'
import { useWhitelistSFTClaimsContract } from 'hooks/contracts/useContract'

export const XftClaimModal = ({ closeModal }) => {
  const { claimXFT, status, hasStatus } = useXftClaim()

  const whitelistSFTClaimsContract = useWhitelistSFTClaimsContract()
  const { isTokenApproved } = useTokenApproval(whitelistSFTClaimsContract.address)

  const succeedTimeout = useTimeout(closeModal, TIMEOUT.MODAL_AUTO_CLOSE)

  useEffect(() => {
    if (hasStatus(ASYNC_STATUS_ID.ERROR)) {
    }
    if (status.id === ASYNC_STATUS_ID.CONFIRMED) {
      succeedTimeout.start()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, succeedTimeout])

  useEffect(() => {
    if (!isTokenApproved) {
      closeModal()
      return
    }
    claimXFT()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onClaimClick = () => {
    if (hasStatus(ASYNC_STATUS_ID.PENDING)) return
    if (hasStatus(ASYNC_STATUS_ID.CONFIRMED)) {
      closeModal()
      return
    }
    claimXFT()
  }
  return (
    <Container>
      <ModalBox isError={status.id === ASYNC_STATUS_ID.ERROR}>
        <Close masking onClick={() => closeModal()}>
          &times;
        </Close>
        <ModalHeading>
          <Title> Approve & Claim your XFT </Title>
        </ModalHeading>
        {hasStatus(ASYNC_STATUS_ID.ERROR) && (
          <ErrorMsg>
            There was an error claiming your XFT
            <br />
            <ErrorReason>{status.message}</ErrorReason>
          </ErrorMsg>
        )}
        <ClaimButton onClick={onClaimClick}>
          <ContentSwitcherByState
            activeState={status.id}
            stateObject={{
              confirmed: <ConfirmedTick collection='general' name='tick' masking />,
              error: 'Claim XFT',
              default: <SingleDataLoader loading={status.id === ASYNC_STATUS_ID.PENDING} data={'Claim XFT'} />
            }}
          />
        </ClaimButton>
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
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  position: relative;

  background: rgba(255, 255, 255, 0.2);
  padding: 30px;
  min-width: 370px;
  white-space: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  -webkit-backdrop-filter: blur(30px);
  backdrop-filter: blur(30px);
  -webkit-box-shadow: 0 1px 49px 0px rgb(0 0 0 / 30%);
  box-shadow: 0 1px 49px 0px rgb(0 0 0 / 30%);
`
// const ModalBox = styled.div`
//   width: 320px;
//   /* height: 200px; */
//   border-radius: 20px;
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   z-index: 0;
//   -webkit-backdrop-filter: blur(30px);
//   backdrop-filter: blur(30px);
//   background: rgba(255, 255, 255, 0.1);
//   padding: 30px;
//   &:after {
//     width: 300px;
//     height: 200px;
//     background: rgba(42, 109, 255, 0.2);
//     -webkit-filter: blur(50px);
//     z-index: -1;
//     content: '';
//     position: fixed;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//   }

//   @-moz-document url-prefix() {
//     background: rgba(255, 255, 255, 0.2) url(${images.FireFoxMenuBg}) center center / cover no-repeat;
//   }
//   border: ${({ isError }) => (isError ? '1px solid rgba(255,0,0,0.5)' : '')};
// `
// const Info = styled.div`
//   text-align: center;
//   width: 100%;
//   text-align: center;
//   font-size: 0.9rem;
//   padding: 5px 5px 0 5px;
// `
const ErrorMsg = styled.div`
  font-weight: 300;
  border: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  background: rgba(255, 0, 0, 0.2);
  padding: 4px;
  width: 100%;
  text-align: center;
  border-radius: 5px;
  margin: 4px 0 0 0;
  font-size: 0.9rem;
  margin: 0 0 10px 0;
`
const ErrorReason = styled.div`
  font-weight: 100;
  margin: 5px 0 0 0;
`
const ClaimButton = styled.button`
  outline: none;
  border: none;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 160%;
  border-radius: 15px;
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  margin: 0 2px;
  background: #0088bb;
  color: #fff;
  height: 43px;
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
const ModalHeading = styled.div`
  font-weight: 600;
  white-space: nowrap;
  display: flex;
  text-align: left;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  flex-direction: row;
  line-height: 100%;
  width: 100%;
  padding: 0 0 10px 0;
`
const Title = styled(Typography)`
  font-size: 1.3rem;
  font-weight: 600;
  text-align: center;
  line-height: 120%;
`

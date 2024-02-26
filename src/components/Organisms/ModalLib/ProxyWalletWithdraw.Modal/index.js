import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

import { IconLib } from 'components/Atoms/IconLib'
import { images } from 'common'
import { ProxyWalletWithdrawStyled } from './ProxyWalletWithdrawModal.styled'
import { notificationActions } from 'redux/actions'
import { useDispatch } from 'react-redux'
import { useWalletWithdraw } from 'hooks/yoloWallet/useWalletWithdraw'
import { useTimeoutWhen } from 'utils/hooks/useTimeoutWhen'
import { Zero } from '@ethersproject/constants'
import { ASYNC_STATUS_ID } from 'constants/index'
import ms from 'ms.macro'
import { ContentSwitcherByState } from 'components/Atoms/ContentSwitcherByState'
import { SingleDataLoader } from 'components/Atoms/SingleDataLoader'
import { useAPI } from 'utils/hooks/useAPI'
import { API } from 'constants/apiEndPoints'
import { OtpInput } from 'components/Molecules/OtpInput'

const FORM_FIELD_INIT = {
  address: '',
  code: '',
  amount: {
    value: '',
    valueBN: Zero
  }
}

export const ProxyWalletWithdrawModal = ({ formData, closeModal }) => {
  const [apiState, sendWithdrawCodeQuery] = useAPI(API.PROXY_WALLET_WITHDRAW_CODE, {
    controlled: true,
    withJwt: true
  })
  const {
    walletWithdraw,
    status: withdrawStatus,
    hasStatus: hasWithdrawStatus,
    isLoading: isWithdrawLoading,
    resetStatus: resetWithdrawStatus
  } = useWalletWithdraw()
  const dispatch = useDispatch()
  const [formFields, setFormFields] = useState({ ...FORM_FIELD_INIT, ...formData })
  const [errors, setErrors] = useState({})

  const resendWithdrawCode = () => {
    sendWithdrawCodeQuery()
    const toastObj = {
      show: true,
      id: 'genericInfo',
      props: { message: 'A withdraw verification code has been sent to your email.' }
    }
    dispatch(notificationActions.updateToast(toastObj))
  }

  const doWithdraw = useCallback(() => {
    walletWithdraw(formFields)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletWithdraw])

  useTimeoutWhen(
    () => {
      resetWithdrawStatus()
      setFormFields(FORM_FIELD_INIT)
      closeModal()
    },
    ms`3.5s`,
    hasWithdrawStatus(ASYNC_STATUS_ID.CONFIRMED)
  )

  const onCodeChange = (otpCode) => {
    setErrors({ ...errors, code: '' })
    setFormFields({ ...formFields, code: otpCode })
  }

  useEffect(() => {
    if (hasWithdrawStatus(ASYNC_STATUS_ID.ERROR)) {
      let errorMessage
      switch (withdrawStatus.message.trim()) {
        case 'wrong code':
          errorMessage = 'This code is not correct. Please try again.'
          break
        case 'withdraw amount is lower than available amount':
          errorMessage =
            'Due to the terms of the double bonus promotion, there are insufficient funds available to withdraw at this time. Please place a bid or deposit more funds, then try again.'
          break
        case 'just prepare for the new error is defined':
          errorMessage =
            'There are insufficient funds available to withdraw at this time. Please deposit more funds, then try again.'
          break
        default: //withdrawStatus.message
          errorMessage = 'error'
          break
      }
      setErrors({ code: errorMessage })
    }
    if (hasWithdrawStatus(ASYNC_STATUS_ID.CONFIRMED)) {
      const toastObj = {
        show: true,
        id: 'genericInfo',
        props: { message: 'Your withdraw request has been successful and will appear in your Wallet shortly.' }
      }
      dispatch(notificationActions.updateToast(toastObj))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [withdrawStatus])

  useEffect(() => {
    const firstInput = document.querySelector(`input[name=code0]`)
    if (firstInput !== null) {
      firstInput.focus()
    }
  }, [])

  return (
    <ModalOverlay>
      <ModalWrapper>
        <Close masking onClick={closeModal}>
          &times;
        </Close>
        <ModalContent>
          <ProxyWalletWithdrawStyled>
            <div className='withdraw_code_content'>
              <div className='section_title'>Withdraw Verification</div>
              <div className='page_instructions'>
                Please enter the 6-digit code that we sent to your email.
                <div>
                  <span className='resendCode' onClick={resendWithdrawCode}>
                    Click here to send another email and code
                  </span>
                </div>
              </div>
              <OtpInput
                className={'digit_6_confirmation'}
                codeLength={6}
                onCodeChange={onCodeChange}
                codeError={errors.code}
              />
              <form>
                <button type='button' onClick={doWithdraw}>
                  <ContentSwitcherByState
                    activeState={withdrawStatus?.id}
                    stateObject={{
                      confirmed: <ConfirmedTick collection='general' name='tick' masking />,
                      error: 'Retry withdraw',
                      default: <SingleDataLoader loading={isWithdrawLoading} data={'Submit'} />
                    }}
                  />
                </button>
              </form>
            </div>
          </ProxyWalletWithdrawStyled>
        </ModalContent>
      </ModalWrapper>
    </ModalOverlay>
  )
}
const ModalOverlay = styled.div`
  position: relative;
  z-index: 9999;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  ${({ theme }) => theme.breakPoints['480px']} {
    background: rgba(25, 30, 39, 0.8);
  }
`
const ModalWrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  position: relative;
  background: rgba(128, 170, 255, 0.3);
  min-width: 400px;
  white-space: wrap;
  backdrop-filter: blur(30px);
  ${({ theme }) => theme.breakPoints['480px']} {
    min-width: 25px;
  }

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: transparent;
    top: 0;
    left: 0;
    box-shadow: 0 1px 50px 0px rgba(0, 0, 0, 0.3);
    z-index: -1;
    border-radius: 15px;
  }
  @-moz-document url-prefix() {
    background: rgba(255, 255, 255, 0.2) url(${images.FireFoxMenuBg}) center center / cover no-repeat;
  }
`
const ModalContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding: 30px;
  width: 390px;

  ${({ theme }) => theme.breakPoints['480px']} {
    padding: 20px;
  }
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
const ConfirmedTick = styled(IconLib)`
  height: 1.2rem;
`

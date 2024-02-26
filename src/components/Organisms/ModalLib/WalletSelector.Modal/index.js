import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { Typography } from 'components/Atoms/Typography'
import { IconLib } from 'components/Atoms/IconLib'
import { ModalOverlay } from 'components/Atoms/ModalOverlay'

import { WalletSelector } from 'components/Molecules/WalletSelector'

import { icons, images, logos } from 'common'
import { isMobile } from 'react-device-detect'
import { useWeb3React } from '@web3-react/core'
import { injected } from 'connectors'
import { useReconnectionFlag } from 'hooks/web3'
import { LoginWrapperStyled } from './LoginWrapper.styled'
import { Tabs } from './Tabs'

export const WalletSelectorModal = ({ closeModal, fullConnection, type, promotionalCode }) => {
  const { activate } = useWeb3React()
  const [, setReconnect] = useReconnectionFlag()
  // eslint-disable-next-line no-unused-vars
  const [showInfoBanner, setShowInfoBanner] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [isDisabled, setIsDisabled] = useState(false)

  useEffect(() => {
    if (window.web3 && window.ethereum && isMobile) {
      activate(injected, undefined, true)
        .then(() => {
          setReconnect(true)
          closeModal()
        })
        .catch(() => {
          closeModal()
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activate, closeModal])

  if (window.web3 && window.ethereum && isMobile) {
    return null
  }

  return (
    <ModalOverlay darkBackdrop={isMobile}>
      <ModalWrapper id='wallet_selector_modal'>
        <Close name='close2' masking onClick={closeModal} />
        <ModalContainer>
          <ModalContent>
            <LoginWrapperStyled>
              <div className='signin_modal_tabs_wrapper'>
                <Tabs closeModal={closeModal} type={type} promotionalCode={promotionalCode} />
                <div className='signin_marketing_panel'>
                  <div className='yolorekt_logo'>
                    <img alt='' src={logos.yolorekt_logo_stacked} />
                  </div>
                  <div className='access_statement'>
                    By accessing this site, I attest that I am at least 18 years old and have read the
                    <a href='https://docs.yolorekt.finance/legal/terms-of-service' target='blank'>
                      Terms &amp; Conditions
                    </a>
                    .
                  </div>
                </div>
              </div>
            </LoginWrapperStyled>
          </ModalContent>
        </ModalContainer>
      </ModalWrapper>
    </ModalOverlay>
  )
}

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const ModalContainer = styled.div`
  display: flex;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 1px 49px 0px rgb(0 0 0 / 30%);
  border-radius: 10px;
  backdrop-filter: blur(45px);
  :after {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.1);
    -webkit-filter: blur(100px);
    content: '';
    width: 100%;
    height: 100%;
    z-index: -1;
    border-radius: 10px;
  }

  @-moz-document url-prefix() {
    background: rgba(255, 255, 255, 0.1) url(${images.FireFoxMenuBg}) center center / cover no-repeat;
  }
`

const Close = styled(IconLib).attrs((props) => ({ collection: 'general', name: 'closeOutline', dimension: '25px' }))`
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

const ModalTitle = styled(Typography)`
  font-weight: 600;
  padding: 7px 15px 10px 15px;
  display: flex;
  text-align: center;
  justify-content: center;
  font-size: 1.1rem;
  white-space: nowrap;
`
const ModalContent = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding: 30px 30px 30px 30px;
  border-radius: 0 0 10px 10px;
  /* overflow: hidden; */
  ${({ theme }) => theme.breakPoints['480px']} {
    padding: 20px;
  }
`
const DisabledLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(44, 44, 44, 0.6);
`

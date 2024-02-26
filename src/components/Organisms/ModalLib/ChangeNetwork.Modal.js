import styled from 'styled-components'

import { CHAIN_INFO } from 'constants/chainInfo'
import { config } from 'config'

import { Typography } from 'components/Atoms/Typography'
import { IconLib } from 'components/Atoms/IconLib'

import { images } from 'common'
import { switchToNetwork } from 'utils/wallet/switchToNetwork'
import { useUser } from 'hooks/user/useUser'

const DEFAULT_CHAIN_ID = config.DEFAULT_CHAIN_ID

export const ChangeNetworkModal = ({ closeModal }) => {
  const { library } = useUser('wallet')
  const chainInfo = CHAIN_INFO[DEFAULT_CHAIN_ID]
  const chainName = chainInfo?.label

  const onChangeClick = () => {
    const chainId = chainInfo?.chainId
    switchToNetwork({ library, chainId })
  }

  return (
    <Container>
      <ModalBox>
        <Icon id='alert_icon' collection='general' name='error' masking />
        <Title>Wrong network type</Title>
        <Info>{`Please switch to ${chainName} network`}</Info>
        <ConnectButton onClick={onChangeClick}>CONNECT NOW</ConnectButton>
      </ModalBox>
    </Container>
  )
}

const Container = styled.div`
  z-index: 9;
  display: flex;
  justify-content: center;
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
  :after {
    width: 300px;
    height: 200px;
    background: rgba(42,109,255,.2);
    -webkit-filter: blur(50px);
    z-index: -1;
    content: '';
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
  }

  @-moz-document url-prefix() {
		background: rgba(255,255,255, .1) url(${images.FireFoxMenuBg}) center center / cover no-repeat;
	}	
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
const Info = styled(Typography)`
  text-align: center;
  font-size: 0.9rem;
  padding: 5px 5px 0 5px;
`
const ConnectButton = styled.button`
  padding: 6px 14px;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  background: rgba(36, 89, 202, 1);
  display: inline-block;
  flex-direction: row;
  margin: 10px 0 0 0;
  text-decoration: none;
  color: white;
`

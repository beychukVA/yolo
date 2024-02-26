import styled from 'styled-components'

import { IconLib } from 'components/Atoms/IconLib'
import { images } from 'common'
import { useYlpRewardBalance } from 'hooks/ylp/useYlpRewardBalance'
import { ASYNC_STATUS_ID, TIMEOUT } from 'constants/index'
import { SingleDataLoader } from 'components/Atoms/SingleDataLoader'
import { currencyFormatter } from 'utils'
import { useEffect, useState } from 'react'
import { useYlpHarvest } from 'hooks/ylp/useYlpHarvest'
import { ContentSwitcherByState } from 'components/Atoms/ContentSwitcherByState'
import { useUser } from 'hooks/user/useUser'

export const HarvestModal = ({ closeModal }) => {
  const { account } = useUser('wallet')
  const [address, setAddress] = useState(account)

  const { harvestRewards, status, hasStatus } = useYlpHarvest()

  //useYlpRewardBalance
  const { hasStatus: hasYlpRewardStatus, ylpRewardBalance } = useYlpRewardBalance()
  const hasYlpRewardStatusPending = hasYlpRewardStatus(ASYNC_STATUS_ID.PENDING)

  const onHarvestClick = () => {
    if (hasStatus(ASYNC_STATUS_ID.PENDING)) return
    harvestRewards()
  }

  useEffect(() => {
    setAddress(account)
  }, [account])

  useEffect(() => {
    let intervalId
    if (hasStatus(ASYNC_STATUS_ID.CONFIRMED)) {
      intervalId = setInterval(() => closeModal(), TIMEOUT.MODAL_AUTO_CLOSE)
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [hasStatus, closeModal])

  return (
    <ModalOverlay>
      <Modal>
        <ModalWrapper>
          <Close masking onClick={() => closeModal()}>
            &times;
          </Close>
          <ModalHeading>
            <Title> Harvest </Title>
          </ModalHeading>
          <HarvestForm onSubmit={(e) => e.preventDefault()}>
            <fieldset>
              <WalletBalanceWrapper>
                Total YOLO earned:
                <Available>
                  <SingleDataLoader
                    loading={hasYlpRewardStatusPending}
                    data={currencyFormatter(ylpRewardBalance, {
                      noCurrencySign: true
                    })}
                  />
                  <IconYolo></IconYolo>
                </Available>
              </WalletBalanceWrapper>
              <label htmlFor='input_wallet_entry'>Wallet Address</label>
              <InputWrap>
                <WalletInput id='input_wallet_entry' value={address} readOnly></WalletInput>
              </InputWrap>
            </fieldset>
            <ButtonRow>
              <ButtonWrap>
                <HarvestButton onClick={onHarvestClick} disabled={ylpRewardBalance === 0}>
                  <ContentSwitcherByState
                    activeState={status.id}
                    stateObject={{
                      [ASYNC_STATUS_ID.CONFIRMED]: <ConfirmedTick collection='general' name='tick' masking />,
                      [ASYNC_STATUS_ID.ERROR]: 'Transaction failed, retry?',
                      default: <SingleDataLoader loading={status.id === ASYNC_STATUS_ID.PENDING} data={'Harvest'} />
                    }}
                  />
                </HarvestButton>
              </ButtonWrap>
            </ButtonRow>
          </HarvestForm>
        </ModalWrapper>
      </Modal>
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
`
const Modal = styled.div`
  & > div {
    border: none;
    font-size: 13px;
  }
`
const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  padding: 15px;
  position: relative;
  //background: rgba(0, 0, 0, 0.5);

  background: rgba(255, 255, 255, 0.1);
  padding: 30px;
  min-width: 400px;
  white-space: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  -webkit-backdrop-filter: blur(30px);
  backdrop-filter: blur(30px);

  &:before {
    position: absolute;
    top: 50%;
    left: calc(50% - 2vw);
    transform: translate(-50%, -50%);
    -webkit-filter: blur(200px);
    content: '';
    width: 100%;
    height: 100%;
    z-index: -2;
    border-radius: 15px;
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

  @media (max-width: 480px) {
    padding: 20px;
    display: flex;
    width: 90vw;
    min-width: 300px;
  }

  @-moz-document url-prefix() {
    background: rgba(255, 255, 255, 0.2) url(${images.FireFoxMenuBg}) center center / cover no-repeat;
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
const ModalHeading = styled.div`
  font-weight: 700;
  display: flex;
  white-space: nowrap;
  text-align: left;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  flex-direction: row;
  line-height: 100%;
  padding: 0;

  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`
const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  line-height: 100%;
  font-weight: 600;

  @media (max-width: 480px) {
    margin: 0 0 0 10px;
    padding-top: 12px;
  }
`

const HarvestForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 0 0 0;
  width: 100%;

  & * {
    font-weight: 300;
  }

  & fieldset {
    border: 0;
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
  }

  & label {
    font-size: 0.8rem;
    padding: 0 0 5px 0;
  }
`
const WalletBalanceWrapper = styled.div`
  font-size: 0.9rem;
  display: flex;
  font-weight: 700;
  flex-direction: row;
  justify-content: flex-start;
  padding: 0 0 10px 0;
  align-items: center;
`
const Available = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1.7rem;
  letter-spacing: -0.03em;
  font-weight: 100;
  padding: 0 0 0 10px;
  align-items: center;
`
const IconYolo = styled(IconLib).attrs({
  collection: 'yolorekt',
  name: 'YoloTokenIcon',
  dimension: '18px'
})`
  width: 18px;
  height: 18px;
  margin: 0 8px 0 0;
  margin-left: 6px;
`
const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const WalletInput = styled.input`
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
  color: #fff;
  border: 1px solid rgba(42, 109, 255, 0.5);
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: 300;
  width: 100%;
  line-height: 100%;
  text-align: center;

  &::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }

  &:focus {
    -webkit-box-shadow: 0 0 60px 0 rgba(42, 109, 255, 1);
    outline: 0;
  }
`
const ButtonRow = styled.fieldset`
  display: flex;
  flex-direction: row;
  padding: 10px 0 0 0;
  position: relative;
  width: 100%;
  border: 0;
`
const ButtonWrap = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const HarvestButton = styled.button`
  outline: none;
  border: none;
  text-decoration: none;
  cursor: pointer;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 160%;
  border-radius: 10px;
  width: 100%;
  height: 43px;
  padding: 10px;
  font-size: 1rem;
  margin: 0 2px;
  background: rgba(29, 75, 175, 1);
  color: #fff;
`

const ConfirmedTick = styled(IconLib)`
  height: 1.6rem;
`

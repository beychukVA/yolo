import { SingleContentToggle } from 'components/Atoms/SingleContentToggle'
import { config } from 'config'
import { useWalletWithdraw } from 'hooks/yoloWallet/useWalletWithdraw'
import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useConvertAmount } from 'utils/hooks'
import { useToken } from 'utils/hooks/useToken'
import { Zero } from '@ethersproject/constants'
import { isAddress } from 'ethers/lib/utils'
import { API } from 'constants/apiEndPoints'
import { useAPI } from 'utils/hooks/useAPI'
import { notificationActions } from 'redux/actions'
import { useDispatch } from 'react-redux'
import { useYoloModal } from 'lib/yoloModals/useYoloModal'
import { useUser } from 'hooks/user/useUser'

const { DEFAULT_FIAT } = config

export const WithdrawPad = () => {
  const dispatch = useDispatch()
  const { updateModal } = useYoloModal()
  const convert = useConvertAmount()
  const { tokenId, formatToken, parseToken } = useToken()
  const { account, isProxy } = useUser('wallet')
  const { tokenAmountBN } = useUser('balance')
  const { walletWithdraw } = useWalletWithdraw()
  const [, sendWithdrawCodeQuery] = useAPI(API.PROXY_WALLET_WITHDRAW_CODE, {
    controlled: true,
    withJwt: true
  })

  const [formData, setFormData] = useState({
    account,
    amount: {
      value: '',
      valueBN: Zero
    }
  })
  const [error, setError] = useState({})

  const convertFromTokenToUSD = useCallback(
    (amountBN) => convert(formatToken(amountBN), tokenId, DEFAULT_FIAT),
    [tokenId, convert, formatToken]
  )

  useEffect(() => {
    setFormData({
      address: isProxy ? '' : account,
      amount: {
        value: '',
        valueBN: Zero
      }
    })
    setError({})

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  useEffect(() => {
    if (isProxy) return
    setFormData({
      address: account,
      amount: {
        value: '',
        valueBN: Zero
      }
    })
    setError({})

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  const doWithdraw = useCallback(() => {
    console.log(formData.address.toLowerCase() === account.toLowerCase())
    if (isProxy) {
      if (formData.address.toLowerCase() === account.toLowerCase() || !isAddress(formData.address)) {
        setError({ ...error, address: 'Invalid Address' })
        return
      }
    }
    if (isProxy) {
      sendWithdrawCodeQuery()
      const modalObj = {
        id: 'proxyWalletWithdraw',
        show: true,
        backdropClose: false,
        props: { formData }
      }
      updateModal(modalObj)
      const toastObj = {
        show: true,
        id: 'genericInfo',
        props: { message: 'A withdraw verification code has been sent to your email.' }
      }
      dispatch(notificationActions.updateToast(toastObj))
    } else {
      walletWithdraw(formData)
    }
  }, [account, dispatch, error, formData, sendWithdrawCodeQuery, isProxy, walletWithdraw])

  const onAddressChange = (event) => {
    const value = event.target.value
    setFormData({ ...formData, address: value })
    setError({ ...error, address: '' })
  }
  const onAmountChange = (event) => {
    const value = event.target.value.replace(',', '.')
    if (!value) {
      setFormData({ ...formData, amount: { value: '', valueBN: Zero } })
      return
    }
    const amountRegEx = /^(\d+)(\.)?(\d{0,2})$/
    if (amountRegEx.test(value)) {
      const valueBN = parseToken(value)
      valueBN.gt(tokenAmountBN)
        ? setError({ ...error, amount: 'Insufficient Balance' })
        : setError({ ...error, amount: '' })
      setFormData({ ...formData, amount: { value, valueBN } })
    }
  }

  return (
    <div className={`tabbed_section ${isProxy && 'fullWidth'}`}>
      <div className='panel_title'>
        Withdraw <span style={{ color: 'red' }}>(Polygon only)</span>
      </div>
      <div className='panel_desc'>Withdraw USDC on Polygon chain</div>
      <form>
        <div className='widthdraw_app_balance'>
          <label>App balance</label>
          {convertFromTokenToUSD(tokenAmountBN)}
        </div>
        <div className='mm_address_wrapper'>
          <div className='mm_address_top'>
            <div>
              <div className='connected_with'>Address to receive USDC</div>
            </div>
          </div>
          <div className='mm_address_bottom'>
            <SingleContentToggle
              noWrapper
              toggle={isProxy}
              trueContent={
                <input
                  id='usdc_deposit_amount'
                  type='text'
                  name='address'
                  placeholder={'0x000....'}
                  value={formData.address}
                  onChange={onAddressChange}
                />
              }
              falseContent={
                <div className='wallet_id_full'>
                  <span>{account}</span>
                  <div className='copy_icon'></div>
                </div>
              }
            />
            <InputError isError={!!error.address}>{error.address}</InputError>
          </div>
          <div className='withdraw_amount'>
            <div className='label_row'>
              <label>USDC amount to withdraw</label>
              <label className='max_amount'>$1 USDC = $1 USD</label>
            </div>
            <input
              id='usdc_deposit_amount'
              type='tel'
              name='amount'
              placeholder='$'
              value={formData.amount.value}
              onChange={onAmountChange}
            />
            <InputError isError={!!error.amount}>{error.amount}</InputError>
          </div>
        </div>
        <WithdrawButton
          type='button'
          disabled={tokenAmountBN.isZero() || formData.amount.valueBN.isZero() || !formData.address || !!error.amount}
          onClick={doWithdraw}
        >
          Withdraw
        </WithdrawButton>
      </form>
    </div>
  )
}

const WithdrawButton = styled.button`
  min-height: 55px;
  color: #fff;
  display: flex;
  justify-content: center;
`

const InputError = styled.fieldset`
  flex-direction: column;
  position: relative;
  border: 0;
  background: rgba(255, 0, 0, 0.2);
  padding: 4px;
  width: 100%;
  text-align: center;
  border-radius: 5px;
  margin: 4px 0 0 0;
  display: ${({ isError }) => (isError ? 'flex' : 'none')} !important;
`

import transakSDK from '@transak/transak-sdk'
import { config } from 'config'
import { useUser } from 'hooks/user/useUser'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { notificationActions } from 'redux/actions'

const TRANSAK_INIT = {
  //account
  apiKey: config.TRANSAK_APIKEY,
  environment: config.TRANSAK_ENVIRONMENT, // STAGING/PRODUCTION (Required)

  //crypto
  networks: 'polygon',
  defaultCryptoCurrency: 'USDC',
  cryptoCurrencyList: 'USDC,MATIC',
  //fiatCurrency: 'USD',

  //flow
  redirectURL: 'https://www.yolorekt.finance/game', //'https://www.yolorekt.finance/game',
  hostURL: window.location.origin, // Required field

  //visuals
  widgetHeight: '667px',
  widgetWidth: '360px',
  themeColor: '2A6DFF',
  exchangeScreenTitle: 'YOLOREKT Deposit USDC'
}

const transakSuccesfullObj = {
  show: true,
  id: 'transakSuccessful'
}

export const useTransak = () => {
  const { account } = useUser('wallet')
  const dispatch = useDispatch()

  const initTransak = useCallback(
    (fiatAmount, walletAddress) => {
      const transak = new transakSDK({
        ...TRANSAK_INIT,
        fiatAmount,
        walletAddress: walletAddress || account
      })
      transak.init()

      transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
        dispatch(notificationActions.updateToast(transakSuccesfullObj))
        transak.close()
      })
    },
    [account]
  )

  return { initTransak }
}

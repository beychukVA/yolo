import axios from 'axios'
import { API } from 'constants/apiEndPoints'
import { useUser } from 'hooks/user/useUser'
import html2canvas from 'html2canvas'
import { useRef, useState } from 'react'
import { OrderTwitterCardCss } from './OrderTwitterCardCss.styled'
import twitterShare from 'twitter-share'
import { LVG_ASSETS } from 'constants/games/lvg/lvgAssets'
import { capitalizeFirst, currencyFormatter } from 'utils'
import { QRCode } from 'react-qrcode-logo'
import { config } from 'config/index'
import { SingleDataLoader } from 'components/Atoms/SingleDataLoader'
import { useActivePnl } from 'hooks/games/lvg/useActivePnL'
import { useTimeoutWhen } from 'utils/hooks/useTimeoutWhen'
import ms from 'ms.macro'
import { doCopy } from 'utils'
import { ContentSwitcherByState } from 'components/Atoms/ContentSwitcherByState'
import { copyBlobToClipboard } from 'copy-image-clipboard'
import { useChatMessagesManager } from 'hooks/chat/useChatMessagesManager'

export const OrderTwitterCard = ({ order, closeModal }) => {
  const { sendUserMessage } = useChatMessagesManager()
  const cardRef = useRef()
  const [loading, setLoading] = useState()
  const [disableMenu, setDisableMenu] = useState(false)
  const [executedAction, setExecutedAction] = useState()

  const { accessToken } = useUser('wallet')
  const { personalReferralCode } = useUser('profile')
  const { activePnl } = useActivePnl(order)
  const {
    pnl,
    userFillDollarAmount,
    asset: orderAsset,
    leverage,
    exitPrice: orderExitPrice,
    entryPrice: orderEntryPrice
  } = order

  // ROI
  const roiNumber = Number(((pnl || activePnl) * 100) / userFillDollarAmount)
  const roi = `${roiNumber.toFixed(Math.abs(roiNumber) < 1 && Math.abs(roiNumber) !== 0 ? 2 : 0)}%`
  const isWinning = roiNumber >= 0 ? true : false

  //Assets
  const assetData = LVG_ASSETS.find((asset) => asset.orderSymbol === orderAsset)

  //Prices
  const entryPrice = currencyFormatter(orderEntryPrice, { decimalDigits: assetData.fiatDecimals })
  const exitPrice = currencyFormatter(orderExitPrice, { decimalDigits: assetData.fiatDecimals })

  //QR link
  const makeLink = `${config.YOLO_BASE_URL}/game?lvgbetacode=${personalReferralCode}`

  const getShareUrls = async (canvas) => {
    // document.body.appendChild(canvas)
    const image = canvas.toDataURL('image/png', 1.0)
    const blob = await fetch(image).then((res) => res.blob())
    const formData = new FormData()
    formData.append('file', blob, 'test.png')
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'content-type': 'multipart/form-data'
    }
    return axios.post(API.LVG_SHARE_TWITTER, formData, { headers }).then((response) => {
      return response?.data?.body
    })
  }

  const downloadImage = (canvas) => {
    const image = canvas.toDataURL('image/png', 1.0)
    const a = document.createElement('a')
    a.href = image
    a.download = `futures ${orderAsset} ${roi}.png`
    a.click()
    a.remove()
    setExecutedAction('default')
  }

  const shareTwitter = (htmlUrl) => {
    const params = {
      url: htmlUrl
    }
    const tweetLink = twitterShare(params)
    const a = document.createElement('a')
    a.href = "javascript:window.open('" + tweetLink + "','_blank','height=400,width=600');"
    a.click()
    a.remove()
    setExecutedAction('default')
  }
  const shareChat = (imgUrl) => {
    // const gifUrl = `/gif:: ${imgUrl}`
    const bodyMessage = {
      text: '',
      media: [
        {
          type: 'image',
          url: imgUrl
        }
      ]
    }
    sendUserMessage(bodyMessage)
    setExecutedAction('default')
  }

  const copyToClipboard = async (htmlUrl) => {
    const copied = await doCopy(htmlUrl)
    if (copied) setExecutedAction('copy')
    else setExecutedAction('default')
  }

  const copyImageToClipboard = async (canvas) => {
    const image = canvas.toDataURL('image/png', 1.0)
    const blob = await fetch(image).then((res) => res.blob())
    const copied = copyBlobToClipboard(blob)
    if (copied) setExecutedAction('image')
    else setExecutedAction('default')
  }

  const captureCard = (action) => {
    setDisableMenu(true)
    setLoading(true)
    html2canvas(cardRef.current, {
      backgroundColor: '#12203c',
      windowWidth: 1200,
      windowHeight: 675
    }).then(async (canvas) => {
      switch (action) {
        case 'image':
          copyImageToClipboard(canvas)
          break
        case 'download':
          downloadImage(canvas)
          break
        case 'copy':
          const { htmlUrl: copyUrl } = await getShareUrls(canvas)
          copyToClipboard(copyUrl)
          break
        case 'twitter':
          const { htmlUrl: twitterUrl } = await getShareUrls(canvas)
          shareTwitter(twitterUrl)
          break
        case 'chat':
          const { imageUrl } = await getShareUrls(canvas)
          shareChat(imageUrl)
          break
        default:
          break
      }
    })
  }

  useTimeoutWhen(
    () => {
      setLoading(false)
      setExecutedAction('')
      setDisableMenu(false)
    },
    ms`5s`,
    executedAction,
    false
  )

  return (
    <OrderTwitterCardCss assetIcon={assetData.iconPng}>
      <div id='share-card' className='popup'>
        <div className='popUpContainer share-card wide-1200'>
          <article className='full twitter_share'>
            <div onClick={closeModal} className='closePopUp' />
            <div className='card_title'>Share</div>

            <div className='card_wrapper' ref={cardRef}>
              <div className='panel_left'>
                <div className='yolorekt_logo_share'>
                  <svg
                    version='1.1'
                    id='Layer_1'
                    xmlns='http://www.w3.org/2000/svg'
                    xlink='http://www.w3.org/1999/xlink'
                    x='0px'
                    y='0px'
                    viewBox='0 0 609.6 114.4'
                    style={{ enableBackground: 'new 0 0 609.6 114.4' }}
                    space='preserve'
                  >
                    <style type='text/css'>
                      .st0{'fill:#FFFFFF;'}
                      .st1{'clip-path:url(#SVGID_2_);fill:#FFFFFF;'}
                    </style>
                    <g>
                      <g>
                        <path
                          class='st0'
                          d='M112.1,57.5c0,29.9-24.2,54.1-54.1,54.1S3.9,87.4,3.9,57.5S28.1,3.4,58,3.4S112.1,27.6,112.1,57.5z M58,12.8
			c-24.7,0-44.7,20-44.7,44.7s20,44.7,44.7,44.7s44.7-20,44.7-44.7S82.7,12.8,58,12.8z'
                        ></path>
                        <path
                          class='st0'
                          d='M94.3,47.5c0,9.6-8.4,18.2-18.8,18.2c-10.5-0.4-18.8-8.6-18.8-18.2s8.4-18,18.8-18.2
			C85.9,29.6,94.3,37.9,94.3,47.5z M86.8,47.5c0-6.1-5.1-11.1-11.4-11.1c-6.3,0-11.4,5-11.4,11.1s5.1,11.1,11.4,11.1
			C81.7,58.7,86.8,53.7,86.8,47.5z'
                        ></path>
                        <path
                          class='st0'
                          d='M71.2,81.4c0,5.1-4.4,9.3-10.1,9.5c-5.6,0-10.1-4.4-10.1-9.5c0-5.1,4.5-9.5,10.1-9.5
			C66.7,72,71.2,76.3,71.2,81.4z M65,81.4c0-2.1-1.7-3.8-3.9-3.8c-2.1,0-3.9,1.7-3.9,3.8s1.7,3.8,3.9,3.8C63.3,85.2,65,83.5,65,81.4
			z'
                        ></path>
                        <path
                          class='st0'
                          d='M46.4,41.9c-2.3,0-4.4,1.9-4.4,4.1c0,2.2,1.9,4.1,4.4,4.1c2.5,0,4.4-1.8,4.4-4.1
			C50.8,43.8,48.8,41.9,46.4,41.9z'
                        ></path>
                        <path
                          class='st0'
                          d='M31.9,71.3c-2.3,0-4.4,1.9-4.4,4.1c0,2.2,1.9,4.1,4.4,4.1c2.5,0,4.4-1.8,4.4-4.1
			C36.3,73.2,34.3,71.3,31.9,71.3z'
                        ></path>
                        <path
                          class='st0'
                          d='M84.4,76.7c-2.3,0-4.4,1.9-4.4,4.1s1.9,4.1,4.4,4.1c2.5,0,4.4-1.8,4.4-4.1S86.7,76.7,84.4,76.7z'
                        ></path>
                        <g>
                          <defs>
                            <circle id='SVGID_1_' cx='58' cy='57.5' r='44.7'></circle>
                          </defs>
                          <clipPath id='SVGID_2_'>
                            <use href='#SVGID_1_' style={{ overflow: 'visible' }}></use>
                          </clipPath>
                          <path
                            class='st1'
                            d='M42.4,28.5c-0.3,5.1-5,9-10.6,8.9c-5.6-0.3-9.8-5-9.5-10.1s5.1-9.2,10.6-8.9C38.5,18.9,42.7,23.4,42.4,28.5z
				 M36.2,28.1c0.1-2.1-1.5-3.9-3.6-4c-2.1-0.1-4,1.4-4.1,3.5c-0.1,2.1,1.5,3.9,3.6,4C34.2,31.8,36,30.2,36.2,28.1z'
                          ></path>
                        </g>
                      </g>
                      <g>
                        <path
                          class='st0'
                          d='M425,41.6C424.9,41.5,424.7,41.3,425,41.6C424.9,41.5,424.8,40.9,425,41.6L425,41.6c-3-3.1-6.2-4.4-10.3-4.4
			c-4.2,0-7.8,1.5-10.7,4.5c-3,3-4.4,6.6-4.4,10.7v25.2c0,2.8-1,5.2-3,7.1c-2,1.9-4.3,2.9-7.1,2.9c-2.8,0-5.2-1-7.1-2.9
			c-1.9-1.9-2.9-4.3-2.9-7.1V51.6c0.3-9.4,3.8-17.5,10.3-24.1c6.6-6.7,14.9-10.1,24.8-10.3c5.7,0.1,10.9,1.4,15.5,3.7
			c3.4,1.7,4.2,2.3,4.2,2.3c0,0,0,0,0,0C425.8,32,425,41.6,425,41.6z'
                        ></path>
                        <path
                          class='st0'
                          d='M286.5,4.5c2.7,0,5,1,7,3c2,2,3,4.3,3,7v62.3c0,2.8-1,5.1-3,7c-2,1.9-4.3,2.8-7,2.8c-2.8,0-5.1-0.9-7-2.8
			c-1.9-1.9-2.8-4.2-2.8-7V14.4c0-2.7,0.9-5,2.8-7S283.7,4.5,286.5,4.5z'
                        ></path>
                        <path
                          class='st0'
                          d='M172.1,60.6c2.6,0,4.9,0.9,6.9,2.8c2,1.9,3,4.2,3,7c0,2.7-1,5-2.9,6.9s-4.2,2.9-6.9,3
			c-9.8-0.2-24.7-3.5-31.2-10.2c-6.6-6.6-10-14.6-10.3-24V26.8c0-2.8,0.9-5.1,2.8-7s4.2-2.8,7-2.8c2.7,0,5,0.9,7,2.8
			c2,1.9,3,4.2,3,7v18.7c0,4.1,1.5,7.6,4.4,10.6C157.7,59.1,167.9,60.6,172.1,60.6z M159.8,111.6c-2.7-0.1-5-1.1-6.9-3
			c-1.9-1.9-2.9-4.2-2.9-6.9c0-2.8,1-5.1,2.9-7c2-1.9,4.3-2.8,6.9-2.8c4.2,0,7.7-1.5,10.6-4.5s4.4-6.5,4.4-10.6v-50
			c0-2.8,0.9-5.1,2.8-7c1.9-1.9,4.2-2.8,7-2.8c2.7,0,5,0.9,7,2.8c2,1.9,3,4.2,3,7v50.8c-0.3,9.3-3.7,17.2-10.3,23.8
			C177.8,108.1,169.6,111.5,159.8,111.6z'
                        ></path>
                        <path
                          class='st0'
                          d='M235.2,16.6c9.9,0.2,18.2,3.7,24.8,10.4c6.6,6.7,10.1,15,10.4,24.9c-0.3,9.9-3.8,18.2-10.4,24.9
			c-6.6,6.7-14.9,10.1-24.8,10.4c-10-0.2-18.3-3.7-24.9-10.4c-6.6-6.7-10.1-15-10.4-24.9c0.3-9.9,3.8-18.2,10.4-24.9
			C216.9,20.3,225.2,16.8,235.2,16.6z M250.4,51.8c0-4.1-1.5-7.7-4.5-10.7c-3-3-6.5-4.5-10.7-4.5c-4.2,0-7.8,1.5-10.8,4.5
			c-3,3-4.5,6.6-4.5,10.7c0,4.1,1.5,7.7,4.5,10.7c3,3,6.6,4.5,10.8,4.5c4.1,0,7.7-1.5,10.7-4.5C248.9,59.5,250.4,55.9,250.4,51.8z'
                        ></path>
                        <path
                          class='st0'
                          d='M505.5,4.6c2.7,0,5,1,7,3c2,2,3,4.3,3,7v62.3c0,2.8-1,5.1-3,7c-2,1.9-4.3,2.8-7,2.8c-2.8,0-5.1-0.9-7-2.8
			c-1.9-1.9-2.8-4.2-2.8-7V14.5c0-2.7,0.9-5,2.8-7S502.7,4.6,505.5,4.6z M553.6,26.8c-0.2,9.6-3.7,17.9-10.6,24.9
			c6.9,7,10.5,15.4,10.6,25c0,2.8-0.9,5.1-2.8,7c-1.9,1.9-4.2,2.8-7,2.8c-2.7,0-5-0.9-7-2.8c-2-1.9-3-4.2-3-7
			c0-4.1-1.5-7.6-4.4-10.6s-11.3-4.5-15.4-4.5c-2.6,0-4.9-0.9-6.9-2.8c-2-1.9-3-4.2-3-7c0-2.9,1-5.2,3-7.1c2-1.9,4.3-2.8,6.9-2.8
			c4.2,0,12.5-1.5,15.4-4.5c2.9-3,4.4-6.5,4.4-10.6c0-2.8,1-5.1,3-7s4.3-2.8,7-2.8c2.8,0,5.1,0.9,7,2.8
			C552.7,21.7,553.6,24,553.6,26.8z'
                        ></path>
                        <path
                          class='st0'
                          d='M594.6,66.8c2.6,0,4.9,0.9,6.9,2.8c2,1.9,3,4.2,3,7c0,2.7-1,5-2.9,6.9s-4.2,2.9-6.9,3
			c-9.8-0.2-18-3.5-24.5-10.2c-6.6-6.6-10-14.6-10.3-24V14.4c0-2.8,0.9-5.1,2.8-7c1.9-1.9,4.2-2.8,7-2.8c2.7,0,5,0.9,7,2.8
			s3,4.2,3,7V17h14.9c2.7,0,5,0.9,7,2.8s3,4.2,3,7c0,2.7-1,5-3,7s-4.3,3-7,3h-14.9v15c0,4.1,1.5,7.6,4.4,10.6S590.5,66.8,594.6,66.8
			z'
                        ></path>
                        <path
                          class='st0'
                          d='M337.7,17.3c9.9,0.2,18.2,3.7,24.8,10.4c6.6,6.7,10.1,15,10.4,24.9c-0.3,9.9-3.8,18.2-10.4,24.9
			c-6.6,6.7-14.9,10.1-24.8,10.4c-10-0.2-18.3-3.7-24.9-10.4c-6.6-6.7-10.1-15-10.4-24.9c0.3-9.9,3.8-18.2,10.4-24.9
			C319.4,21,327.7,17.6,337.7,17.3z M352.8,52.6c0-4.1-1.5-7.7-4.5-10.7c-3-3-6.5-4.5-10.7-4.5c-4.2,0-7.8,1.5-10.8,4.5
			c-3,3-4.5,6.6-4.5,10.7c0,4.1,1.5,7.7,4.5,10.7c3,3,6.6,4.5,10.8,4.5c4.1,0,7.7-1.5,10.7-4.5S352.8,56.7,352.8,52.6z'
                        ></path>
                        <path
                          class='st0'
                          d='M466,87.7c-9.7-0.2-17.9-3.6-24.6-10.2c-6.7-6.6-10.2-14.8-10.4-24.5c0.2-10.1,3.7-18.4,10.3-25
			c6.6-6.6,14.7-10,24-10.3h13.8c2.8,0,5.1,1,7,2.9s2.9,4.3,2.9,7c0,2.7-1,5.1-2.9,7c-1.9,2-4.3,3-7,3H466c-4.1,0-7.7,1.5-10.7,4.4
			c-3,3-4.5,6.5-4.5,10.6c0,4.2,1.4,7.7,4.3,10.5s6.5,4.3,10.9,4.5h13c2.8,0,5.1,1,7,3s2.9,4.3,2.9,7c0,2.8-1,5.1-2.9,7
			s-4.3,2.9-7,2.9L466,87.7z'
                        ></path>
                        <path
                          class='st0'
                          d='M475.8,52.7c0,2.7-1,5-3,7c-2,2-4.3,3-7,3h-15.1c-2.8,0-5.1-1-7-3c-1.9-2-2.8-4.3-2.8-7c0-2.8,0.9-5.1,2.8-7
			s4.2-2.8,7-2.8h15.1c2.7,0,5,0.9,7,2.8C474.8,47.5,475.8,49.9,475.8,52.7z'
                        ></path>
                      </g>
                    </g>
                  </svg>
                </div>
                <div class='futures_logo_share'>
                  <svg
                    version='1.1'
                    id='Layer_1'
                    xmlns='http://www.w3.org/2000/svg'
                    xlink='http://www.w3.org/1999/xlink'
                    x='0px'
                    y='0px'
                    viewBox='0 0 3527.5 795.8'
                    style={{ enableBackground: 'new 0 0 3527.5 795.8' }}
                    space='preserve'
                  >
                    <style type='text/css'>.st0{'fill:#FFFFFF;'}</style>
                    <path
                      class='st0'
                      d='M3176.9,82c0-22.3,7.8-41.5,23.4-57.7S3235.1,0,3258,0c22.2,0,41.5,8.1,57.7,24.3
	c16.2,16.2,24.3,35.5,24.3,57.7'
                    ></path>
                    <path
                      class='st0'
                      d='M3340,713.7c0,22.3-7.8,41.5-23.4,57.7c-15.6,16.2-34.8,24.3-57.7,24.3c-22.2,0-41.5-8.1-57.7-24.3
	c-16.2-16.2-24.3-35.5-24.3-57.7'
                    ></path>
                    <g>
                      <path
                        class='st0'
                        d='M2424.5,308.6c0-0.2-2-2-0.6-0.7c0,0-0.4-4.8,0,0l0,0c-24.1-24.4-49.8-35.2-83.4-35.2
		c-34.2,0-63.4,12.2-87.5,36.6c-24.1,24.4-36.1,53.4-36.1,87v205.4c0,22.8-8.1,42-24.3,57.5c-16.2,15.5-35.4,23.3-57.5,23.3
		c-22.8,0-42-7.8-57.5-23.3c-15.5-15.5-23.3-34.7-23.3-57.5V390.6c2.5-76.7,30.6-142.2,84.2-196.4c53.6-54.2,120.9-82.3,202.1-84.2
		c46.5,1.1,88.6,11,126.3,29.8c27.9,13.9,34.5,18.8,34.5,18.8c0,0,0.4-0.4,0,0C2431.3,230.8,2424.5,308.6,2424.5,308.6z'
                      ></path>
                      <path
                        class='st0'
                        d='M2758.9,684.3c-79-1.3-145.8-28.9-200.5-83c-54.7-54-83-120.6-84.9-199.6c1.9-82.2,29.9-149.9,83.9-203.4
		c54-53.4,119.3-81.4,195.8-83.9h112.3c22.8,0,41.9,7.8,57.4,23.2s23.2,34.6,23.2,57.4c0,22.1-7.7,41.2-23.2,57.4
		s-34.6,24.2-57.4,24.2h-106.6c-33.5,0-62.4,12-86.7,36c-24.3,24-36.5,52.8-36.5,86.3c0,34.1,11.5,62.7,34.6,85.8
		c23.1,23.1,52.6,35.2,88.6,36.5h105.7c22.8,0,41.9,8.1,57.4,24.2c15.5,16.1,23.2,35.2,23.2,57.4c0,22.8-7.7,41.9-23.2,57.4
		c-15.5,15.5-34.6,23.2-57.4,23.2L2758.9,684.3z'
                      ></path>
                      <path
                        class='st0'
                        d='M2838.2,398.9c0,22-8,41-24,57c-16,16-35,24-57,24h-122.7c-22.6,0-41.6-8-57-24c-15.4-16-23.1-35-23.1-57
		c0-22.6,7.7-41.6,23.1-57c15.4-15.4,34.4-23.1,57-23.1h122.7c22,0,41,7.7,57,23.1C2830.2,357.3,2838.2,376.3,2838.2,398.9z'
                      ></path>
                    </g>
                    <path
                      class='st0'
                      d='M287.1,8c22.3,0.6,41.3,8.9,57.2,24.8c15.9,15.9,23.9,35,23.9,57.2c0,22.9-8.1,42.1-24.3,57.7
	c-16.2,15.6-35.1,23.4-56.7,23.4c-34.3,0-63.6,12.2-87.8,36.7s-36.2,53.6-36.2,87.3v21h123c22.3,0,41.5,8.1,57.7,24.3
	c16.2,16.2,24.3,35.5,24.3,57.7c0,22.9-8.1,42.1-24.3,57.7c-16.2,15.6-35.5,23.4-57.7,23.4h-123v124c0,22.9-8.1,42.1-24.3,57.7
	c-16.2,15.6-35.5,23.4-57.7,23.4c-22.9,0-42.1-7.8-57.7-23.4S0,626.1,0,603.2V289.4C2.5,212.5,30.8,146.6,84.9,92
	C138.9,37.3,206.3,9.3,287.1,8z'
                    ></path>
                    <path
                      class='st0'
                      d='M411.5,397.2l1-205.1c0-22.9,7.8-42.1,23.4-57.7c15.6-15.6,34.8-23.4,57.7-23.4c22.3,0,41.5,7.8,57.7,23.4
	c16.2,15.6,24.3,34.8,24.3,57.7v205.1c1.3,36.9,13.5,66.8,36.7,89.7c23.2,22.9,52,34.3,86.3,34.3c33.7,0,62.6-12.2,86.8-36.7
	c24.2-24.5,36.2-53.6,36.2-87.3v-206c0-22.9,8.1-42.1,24.3-57.7c16.2-15.6,35.4-23.4,57.7-23.4c22.9,0,42.1,7.8,57.7,23.4
	c15.6,15.6,23.4,34.8,23.4,57.7v211.8c-2.5,76.9-30.7,142.6-84.4,197c-53.7,54.4-121.3,82.5-202.7,84.4
	c-80.8-1.9-148.3-30.4-202.7-85.4C440.6,543.9,412.8,476.7,411.5,397.2z'
                    ></path>
                    <path
                      class='st0'
                      d='M1437.7,397.2l1-205.1c0-22.9,7.8-42.1,23.4-57.7c15.6-15.6,34.8-23.4,57.7-23.4c22.3,0,41.5,7.8,57.7,23.4
	c16.2,15.6,24.3,34.8,24.3,57.7v205.1c1.3,36.9,13.5,66.8,36.7,89.7c23.2,22.9,52,34.3,86.3,34.3c33.7,0,62.6-12.2,86.8-36.7
	c24.2-24.5,36.2-53.6,36.2-87.3v-206c0-22.9,8.1-42.1,24.3-57.7c16.2-15.6,35.4-23.4,57.7-23.4c22.9,0,42.1,7.8,57.7,23.4
	c15.6,15.6,23.4,34.8,23.4,57.7v211.8c-2.5,76.9-30.7,142.6-84.4,197c-53.7,54.4-121.3,82.5-202.7,84.4
	c-80.8-1.9-148.3-30.4-202.7-85.4C1466.7,543.9,1438.9,476.7,1437.7,397.2z'
                    ></path>
                    <path
                      class='st0'
                      d='M1319.8,521.2c21.6,0,40.5,7.8,56.8,23.4c16.2,15.6,24.3,34.8,24.3,57.7c0,22.3-8,41.3-23.8,57.2
	c-15.9,15.9-35,24.2-57.2,24.8c-80.8-1.3-148.2-29.2-202.2-83.9c-54.1-54.7-82.4-120.5-84.9-197.4V89.1c0-22.9,7.8-42.1,23.4-57.7
	c15.6-15.6,34.8-23.4,57.7-23.4c22.3,0,41.5,7.8,57.7,23.4c16.2,15.6,24.3,34.8,24.3,57.7v21h123c22.3,0,41.5,7.8,57.7,23.4
	c16.2,15.6,24.3,34.8,24.3,57.7c0,22.3-8.1,41.5-24.3,57.7c-16.2,16.2-35.5,24.3-57.7,24.3h-123v124c0,33.7,12.1,62.8,36.2,87.3
	C1256.2,508.9,1285.5,521.2,1319.8,521.2z'
                    ></path>
                    <g>
                      <path
                        class='st0'
                        d='M2958.6,387.7c1.2-75.6,27.5-139.5,79-191.6c51.4-52,114.4-79.3,188.8-81.7h193.1c21.8,0,40.1,7.4,54.9,22.2
		c14.8,14.8,22.2,33.1,22.2,54.9c0,21.2-7.4,39.5-22.2,54.9c-14.8,15.4-33.1,23.2-54.9,23.2h-187.7c-32.7,0-60.5,11.7-83.5,35
		c-23,23.3-34.5,51-34.5,83.1c0,21.8-7.7,40.1-23.2,54.9c-15.4,14.8-33.7,22.2-54.9,22.2c-21.8,0-40.1-7.4-54.9-22.2
		C2966,427.8,2958.6,409.5,2958.6,387.7z'
                      ></path>
                      <path
                        class='st0'
                        d='M3527.5,411c-1.2,75.7-27.5,139.5-79,191.6c-51.4,52.1-114.4,79.3-188.8,81.7h-193.1
		c-21.8,0-40.1-7.4-54.9-22.2c-14.8-14.8-22.2-33.1-22.2-54.9c0-21.2,7.4-39.5,22.2-54.9c14.8-15.4,33.1-23.1,54.9-23.1h187.7
		c32.7,0,60.5-11.6,83.5-35c23-23.3,34.5-51,34.5-83.1c0-21.8,7.7-40.1,23.1-54.9c15.4-14.8,33.7-22.2,54.9-22.2
		c21.8,0,40.1,7.4,54.9,22.2C3520.1,370.9,3527.5,389.2,3527.5,411z'
                      ></path>
                      <g>
                        <path
                          class='st0'
                          d='M3527.5,398c0,21.1-7.7,39.4-23.1,54.8c-15.4,15.4-33.7,23.1-54.8,23.1h-413.6c-21.7,0-40-7.7-54.8-23.1
			c-14.8-15.4-22.2-33.7-22.2-54.8c0-21.7,7.4-40,22.2-54.8c14.8-14.8,33.1-22.2,54.8-22.2h413.6c21.1,0,39.4,7.4,54.8,22.2
			C3519.8,357.9,3527.5,376.2,3527.5,398z'
                        ></path>
                      </g>
                    </g>
                  </svg>
                </div>

                {/* <div className='futures_logo'>
                  <svg
                    version='1.1'
                    id='Layer_1'
                    xmlns='http://www.w3.org/2000/svg'
                    x='0px'
                    y='0px'
                    viewBox='0 0 3527.5 795.8'
                  >
                    <style type='text/css'>{'.st0{fill:#FFFFFF;}'}</style>
                    <path
                      className='st0'
                      d='M3176.9,82c0-22.3,7.8-41.5,23.4-57.7S3235.1,0,3258,0c22.2,0,41.5,8.1,57.7,24.3
						c16.2,16.2,24.3,35.5,24.3,57.7'
                    ></path>
                    <path
                      className='st0'
                      d='M3340,713.7c0,22.3-7.8,41.5-23.4,57.7c-15.6,16.2-34.8,24.3-57.7,24.3c-22.2,0-41.5-8.1-57.7-24.3
						c-16.2-16.2-24.3-35.5-24.3-57.7'
                    ></path>
                    <g>
                      <path
                        className='st0'
                        d='M2424.5,308.6c0-0.2-2-2-0.6-0.7c0,0-0.4-4.8,0,0l0,0c-24.1-24.4-49.8-35.2-83.4-35.2
						c-34.2,0-63.4,12.2-87.5,36.6c-24.1,24.4-36.1,53.4-36.1,87v205.4c0,22.8-8.1,42-24.3,57.5c-16.2,15.5-35.4,23.3-57.5,23.3
						c-22.8,0-42-7.8-57.5-23.3c-15.5-15.5-23.3-34.7-23.3-57.5V390.6c2.5-76.7,30.6-142.2,84.2-196.4c53.6-54.2,120.9-82.3,202.1-84.2
						c46.5,1.1,88.6,11,126.3,29.8c27.9,13.9,34.5,18.8,34.5,18.8c0,0,0.4-0.4,0,0C2431.3,230.8,2424.5,308.6,2424.5,308.6z'
                      ></path>
                      <path
                        className='st0'
                        d='M2758.9,684.3c-79-1.3-145.8-28.9-200.5-83c-54.7-54-83-120.6-84.9-199.6c1.9-82.2,29.9-149.9,83.9-203.4
						c54-53.4,119.3-81.4,195.8-83.9h112.3c22.8,0,41.9,7.8,57.4,23.2s23.2,34.6,23.2,57.4c0,22.1-7.7,41.2-23.2,57.4
						s-34.6,24.2-57.4,24.2h-106.6c-33.5,0-62.4,12-86.7,36c-24.3,24-36.5,52.8-36.5,86.3c0,34.1,11.5,62.7,34.6,85.8
						c23.1,23.1,52.6,35.2,88.6,36.5h105.7c22.8,0,41.9,8.1,57.4,24.2c15.5,16.1,23.2,35.2,23.2,57.4c0,22.8-7.7,41.9-23.2,57.4
						c-15.5,15.5-34.6,23.2-57.4,23.2L2758.9,684.3z'
                      ></path>
                      <path
                        className='st0'
                        d='M2838.2,398.9c0,22-8,41-24,57c-16,16-35,24-57,24h-122.7c-22.6,0-41.6-8-57-24c-15.4-16-23.1-35-23.1-57
						c0-22.6,7.7-41.6,23.1-57c15.4-15.4,34.4-23.1,57-23.1h122.7c22,0,41,7.7,57,23.1C2830.2,357.3,2838.2,376.3,2838.2,398.9z'
                      ></path>
                    </g>
                    <path
                      className='st0'
                      d='M287.1,8c22.3,0.6,41.3,8.9,57.2,24.8c15.9,15.9,23.9,35,23.9,57.2c0,22.9-8.1,42.1-24.3,57.7
						c-16.2,15.6-35.1,23.4-56.7,23.4c-34.3,0-63.6,12.2-87.8,36.7s-36.2,53.6-36.2,87.3v21h123c22.3,0,41.5,8.1,57.7,24.3
						c16.2,16.2,24.3,35.5,24.3,57.7c0,22.9-8.1,42.1-24.3,57.7c-16.2,15.6-35.5,23.4-57.7,23.4h-123v124c0,22.9-8.1,42.1-24.3,57.7
						c-16.2,15.6-35.5,23.4-57.7,23.4c-22.9,0-42.1-7.8-57.7-23.4S0,626.1,0,603.2V289.4C2.5,212.5,30.8,146.6,84.9,92
						C138.9,37.3,206.3,9.3,287.1,8z'
                    ></path>
                    <path
                      className='st0'
                      d='M411.5,397.2l1-205.1c0-22.9,7.8-42.1,23.4-57.7c15.6-15.6,34.8-23.4,57.7-23.4c22.3,0,41.5,7.8,57.7,23.4
						c16.2,15.6,24.3,34.8,24.3,57.7v205.1c1.3,36.9,13.5,66.8,36.7,89.7c23.2,22.9,52,34.3,86.3,34.3c33.7,0,62.6-12.2,86.8-36.7
						c24.2-24.5,36.2-53.6,36.2-87.3v-206c0-22.9,8.1-42.1,24.3-57.7c16.2-15.6,35.4-23.4,57.7-23.4c22.9,0,42.1,7.8,57.7,23.4
						c15.6,15.6,23.4,34.8,23.4,57.7v211.8c-2.5,76.9-30.7,142.6-84.4,197c-53.7,54.4-121.3,82.5-202.7,84.4
						c-80.8-1.9-148.3-30.4-202.7-85.4C440.6,543.9,412.8,476.7,411.5,397.2z'
                    ></path>
                    <path
                      className='st0'
                      d='M1437.7,397.2l1-205.1c0-22.9,7.8-42.1,23.4-57.7c15.6-15.6,34.8-23.4,57.7-23.4c22.3,0,41.5,7.8,57.7,23.4
						c16.2,15.6,24.3,34.8,24.3,57.7v205.1c1.3,36.9,13.5,66.8,36.7,89.7c23.2,22.9,52,34.3,86.3,34.3c33.7,0,62.6-12.2,86.8-36.7
						c24.2-24.5,36.2-53.6,36.2-87.3v-206c0-22.9,8.1-42.1,24.3-57.7c16.2-15.6,35.4-23.4,57.7-23.4c22.9,0,42.1,7.8,57.7,23.4
						c15.6,15.6,23.4,34.8,23.4,57.7v211.8c-2.5,76.9-30.7,142.6-84.4,197c-53.7,54.4-121.3,82.5-202.7,84.4
						c-80.8-1.9-148.3-30.4-202.7-85.4C1466.7,543.9,1438.9,476.7,1437.7,397.2z'
                    ></path>
                    <path
                      className='st0'
                      d='M1319.8,521.2c21.6,0,40.5,7.8,56.8,23.4c16.2,15.6,24.3,34.8,24.3,57.7c0,22.3-8,41.3-23.8,57.2
						c-15.9,15.9-35,24.2-57.2,24.8c-80.8-1.3-148.2-29.2-202.2-83.9c-54.1-54.7-82.4-120.5-84.9-197.4V89.1c0-22.9,7.8-42.1,23.4-57.7
						c15.6-15.6,34.8-23.4,57.7-23.4c22.3,0,41.5,7.8,57.7,23.4c16.2,15.6,24.3,34.8,24.3,57.7v21h123c22.3,0,41.5,7.8,57.7,23.4
						c16.2,15.6,24.3,34.8,24.3,57.7c0,22.3-8.1,41.5-24.3,57.7c-16.2,16.2-35.5,24.3-57.7,24.3h-123v124c0,33.7,12.1,62.8,36.2,87.3
						C1256.2,508.9,1285.5,521.2,1319.8,521.2z'
                    ></path>
                    <g>
                      <path
                        className='st0'
                        d='M2958.6,387.7c1.2-75.6,27.5-139.5,79-191.6c51.4-52,114.4-79.3,188.8-81.7h193.1c21.8,0,40.1,7.4,54.9,22.2
						c14.8,14.8,22.2,33.1,22.2,54.9c0,21.2-7.4,39.5-22.2,54.9c-14.8,15.4-33.1,23.2-54.9,23.2h-187.7c-32.7,0-60.5,11.7-83.5,35
						c-23,23.3-34.5,51-34.5,83.1c0,21.8-7.7,40.1-23.2,54.9c-15.4,14.8-33.7,22.2-54.9,22.2c-21.8,0-40.1-7.4-54.9-22.2
						C2966,427.8,2958.6,409.5,2958.6,387.7z'
                      ></path>
                      <path
                        className='st0'
                        d='M3527.5,411c-1.2,75.7-27.5,139.5-79,191.6c-51.4,52.1-114.4,79.3-188.8,81.7h-193.1
						c-21.8,0-40.1-7.4-54.9-22.2c-14.8-14.8-22.2-33.1-22.2-54.9c0-21.2,7.4-39.5,22.2-54.9c14.8-15.4,33.1-23.1,54.9-23.1h187.7
						c32.7,0,60.5-11.6,83.5-35c23-23.3,34.5-51,34.5-83.1c0-21.8,7.7-40.1,23.1-54.9c15.4-14.8,33.7-22.2,54.9-22.2
						c21.8,0,40.1,7.4,54.9,22.2C3520.1,370.9,3527.5,389.2,3527.5,411z'
                      ></path>
                      <g>
                        <path
                          className='st0'
                          d='M3527.5,398c0,21.1-7.7,39.4-23.1,54.8c-15.4,15.4-33.7,23.1-54.8,23.1h-413.6c-21.7,0-40-7.7-54.8-23.1
						c-14.8-15.4-22.2-33.7-22.2-54.8c0-21.7,7.4-40,22.2-54.8c14.8-14.8,33.1-22.2,54.8-22.2h413.6c21.1,0,39.4,7.4,54.8,22.2
						C3519.8,357.9,3527.5,376.2,3527.5,398z'
                        ></path>
                      </g>
                    </g>
                  </svg>
                </div> */}

                <div className='data_grid'>
                  <div className='row main'>
                    <label>ROI</label>
                    <div className={`data roi ${isWinning ? 'won' : 'lost'}`}>{roi}</div>
                  </div>

                  <div className='row'>
                    <label>{capitalizeFirst(assetData.type)}</label>

                    <div className='data'>
                      <div className='asset aapl'>
                        <div className='asset_icon'></div>
                        {assetData.name}
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <label>Leverage</label>
                    <div className='data'>{`${leverage}x`}</div>
                  </div>
                  <div className='row'>
                    <label>Entry price</label>
                    <div className='data'>{entryPrice}</div>
                  </div>
                  <div className='row'>
                    <label>Exit price</label>
                    <div className='data'>{exitPrice}</div>
                  </div>
                </div>
              </div>

              <div className='panel_right'>
                {/* <div className='yolorekt_logo'></div> */}
                <div className='referral_message'>
                  Register on YOLOREKT and get 1% of your referrer's profits by using this referral code:
                </div>
                <div className='referral_code'>{personalReferralCode}</div>
                <div className='qr_code'>
                  <QRCode id='qrCode_default' value={makeLink} size={'168'} />
                  <QRCode id='qrCode_1200' value={makeLink} size={'150'} />
                  <QRCode id='qrCode_1000' value={makeLink} size={'130'} />
                  <QRCode id='qrCode_800' value={makeLink} size={'80'} />
                </div>
              </div>
            </div>

            <div className='card_action_area'>
              <ContentSwitcherByState
                noWrapper
                activeState={executedAction}
                stateObject={{
                  default: (
                    <button disabled={loading} className='share_card_button'>
                      {loading && `Please wait `}
                      <SingleDataLoader loading={loading} data={' SHARE & DOWNLOAD IMAGE'} />
                    </button>
                  ),
                  copy: <div className='twitter_link_copied'>Link copied!</div>,
                  image: <div className='twitter_link_copied'>Image copied!</div>,
                  download: <></>,
                  twitter: <></>
                }}
              />
              <nav className={`menu ${disableMenu ? 'hideActionMenu' : ''}`}>
                <ul>
                  <li>
                    <button className='copy_image_button share_menu_button' onClick={() => captureCard('image')}>
                      Copy image to clipboard
                    </button>
                  </li>
                  <li>
                    <button className='download_image_button share_menu_button' onClick={() => captureCard('download')}>
                      Download image
                    </button>
                  </li>
                  <li>
                    <button className='copy_link_button share_menu_button' onClick={() => captureCard('copy')}>
                      Copy link to clipboard
                    </button>
                  </li>
                  <li>
                    <button className='post_to_twitter share_menu_button' onClick={() => captureCard('twitter')}>
                      Post image to Twitter
                    </button>
                  </li>
                  <li>
                    <button className='share_in_chat share_menu_button' onClick={() => captureCard('chat')}>
                      Share in chat
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </article>
        </div>
      </div>
    </OrderTwitterCardCss>
  )
}

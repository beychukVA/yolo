import { localEnvConfig } from './env.config/local.env.config'
import { stagingEnvConfig } from './env.config/staging.env.config'
import { productionEnvConfig } from './env.config/production.env.config'
import { betaEnvConfig } from './env.config/beta.env.config'
import { qaEnvConfig } from './env.config/qa.env.config'
import { devEnvConfig } from './env.config/dev.env.config'
import ms from 'ms'
import { FIAT, TOKEN } from 'constants/index'

const env = process.env.REACT_APP_BUILD_ENV || process.env.NODE_ENV || 'dev'
console.log('env =>', env)

function envSwitch(vals) {
  const res = vals[env]
  if (res === undefined) throw new Error(`No valid specified for env '${env}' in ${JSON.stringify(vals)}`)
  return res
}

const envConfig = envSwitch({
  production: productionEnvConfig,
  beta: betaEnvConfig,
  staging: stagingEnvConfig,
  qa: qaEnvConfig,
  development: stagingEnvConfig,
  local: localEnvConfig,
  dev: devEnvConfig
})

export const config = {
  NODE_ENV: env,
  GA_MEASUREMENT_ID: process.env.REACT_APP_GA4,

  ENABLE_REDUX_DEV_TOOLS: envSwitch({
    production: false,
    beta: false,
    staging: false,
    qa: true,
    development: true,
    local: true,
    dev: true
  }),

  /* prettier-ignore */
  YOLO_SOCIAL_LINKS: [
    // { id:'reddit',  url: 'https://www.reddit.com/user/Yolorekt_Official',      icon: 'reddit',   label: 'Reddit' },
    { id:'twitter',  url: 'https://twitter.com/playyolorekt',                  icon: 'twitter',  label: 'Twitter' },
    { id:'tiktok',  url: 'https://vm.tiktok.com/ZTdmEw6xk/',                   icon: 'tiktok',   label: 'TikTok' },
    { id:'medium',   url: 'https://medium.com/yolorekt',                       icon: 'medium',   label: 'Medium' },
    { id:'telegram', url: 'https://t.me/joinchat/NBBv1hQmV26flFM_5MD4_w',      icon: 'telegram', label: 'Telegram' },
    { id:'discord',  url: 'https://discord.gg/yolorekt',                       icon: 'discord',  label: 'Discord' },
    { id:'email',    url: 'mailto:support@yolorekt.com?Subject=Hello%20again', icon: 'email',    label: 'Email' }
  ],

  //CRYPTO
  DEFAULT_TOKEN: TOKEN.USDC,
  DEFAULT_FIAT: FIAT.USD,
  DEFAULT_CHAIN_ID: envConfig.APPROVED_CHAINS_IDS[0],
  TX_PULLING_INTERVAL: ms('3s'),
  MIN_CONFIRMATIONS: 2,
  UINT256_MAX: '115792089237316195423570985008687907853269984665640564039457584007913129639935',
  EXCHANGE_PULL_INTERVAL: 60 * 1000, //It should be 5 * 1000,
  EXCHANGE_PROVIDER: 'coingecko', //['coinbase', 'coingecko']
  LOCAL_TX_PERSISTANCE: 24 * 60 * 60,

  //NOTIFICATION
  TOAST_TIMEOUT: 5 * 1000, //5 sec

  BOTS_ADDRESS: [
    '0x12b20AE1451141E03eD9c226F3234c2caeFd5C94',
    '0xC7f8FB66853200e5aF2E46B005845aFb5151e5Ba',
    '0x02A47022e479427b97De27a6Dc4cDCc18F539F6F',
    '0x39706F7E75Ff0d993117D49B5A2dDD086DB300eA',
    '0x8498471336D2e8A0221d97104fb2D205a8D257b3',
    '0xdD9289af5E6356cCBdf30DE9A458Ca447F853B81',
    '0x5bECea4D93745317E44d8032409504aae103aD1a',
    '0xA7123594D420c927F3098D2EEF5cFfF371B349b7',
    '0x22dbd6A571Ee4442C94b1b961bECfa2D3461C309',
    '0x046D9C79ccc917B5ba37Beb445C678D72f965280', // Ignored
    '0x3d8EF995A36965f17b4461848A8fBE92789A18dB' // Ignored
  ],

  //TRANSAK
  TRANSAK_APIKEY: process.env.REACT_APP_TRANSAK_APIKEY,
  TRANSAK_ENVIRONMENT: envSwitch({
    production: 'PRODUCTION',
    beta: 'PRODUCTION',
    staging: 'STAGING',
    qa: 'STAGING',
    development: 'STAGING',
    local: 'STAGING',
    dev: 'STAGING'
  }),
  ...envConfig
}

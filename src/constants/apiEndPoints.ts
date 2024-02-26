import { config } from 'config/index'

type EndpointsObj = { [index: string]: string }

const ENDPOINTS: EndpointsObj = {
  BIDS_GET_MULTI_ROUND_BIDS: '/get-multi-round-bids',
  BIDS_GET_MULTI_ROUND_WINNERS_LOSERS: '/get-multi-rounds-winners-losers',

  AUTH_AUTH: '/auth',
  AUTH_IP_CHECK: '/ip-check',

  PROXY_WALLET_REGISTER: '/accounts/create-email-account',
  PROXY_WALLET_LOGIN: '/auth/email',
  PROXY_WALLET_BID: '/proxy/bid',
  PROXY_WALLET_DAILY_BID: '/proxy/daily/bid',
  PROXY_WALLET_WITHDRAW_CODE: '/accounts/send-withdraw-code',
  PROXY_WALLET_WITHDRAW: '/accounts/withdraw',

  ACCOUNTS_CREATE: '/accounts',
  ACCOUNTS_INFO: '/accounts/me',
  ACCOUNTS_GET_SALT: '/accounts/{{address}}/salt/',
  ACCOUNTS_UPDATE: '/accounts/update-account', //body payload: {address, username}
  ACCOUNT_SEND_CODE: '/accounts/send-code',
  ACCOUNT_RESET_PASSWORD: '/accounts/forgot-password',
  ACCOUNT_VALIDATE_EMAIL: '/accounts/validate-email',
  ACCOUNT_SEND_VALIDATION_EMAIL: '/accounts/send-validation-email',
  ACCOUNT_BALANCE: '/accounts/balance',
  ACCOUNT_UPLOAD_AVATAR: '/accounts/upload-avatar',

  REFERRAL_DATA: '/referrals',
  REFERRALS_SEND: '/referrals/send-referral-email',
  REFERRALS_REDEEM: '/referrals/redeem',

  BIDS_GET_STAT: '/get-bid-stats',
  BIDS_GET_USER_STAT: '/get-user-bid-stats',
  BIDS_TO_DATABASE: '/bidstodatabase',

  GET_LP_FEES: '/get-lp-fees',
  GET_LP_BIDING_VOLUMES: '/get-cached-lp-dashboard',

  YOG_NEW_ENDPOINT: '/YogNewEndPoint',

  CONTEST_GET_CACHED: '/get-cached-contest',
  CONTEST_LVG_REWARDS_INFO: '/contest/leverage/rewards-info',
  CONTEST_LVG_WEEKLY_INFO: '/contest/leverage/weekly-info',

  LEADERBOARD_GET_CACHED: '/statistics/user/bid-stats',
  LEADERBOARD_GET_WINNING_STREAK: '/statistics/contest/winning-streak', //?startDate=2022-11-21&endDate=2022-11-27
  LEADERBOARD_GET_HIGHEST_PROFIT: '/orders/highest-profit',

  WITHDRAW_ADD: '/add-withdraw',

  MAIL_LIST_SUBSCRIBE: '/subscribe',

  DASHBOARD_STATICS_BIDS: '/statistics/bid/{{period}}',
  DASHBOARD_STATICS_FEES: '/statistics/fees/{{period}}',

  CHAT_MESSAGES: '/chat/messages',
  SHARE_TWITTER_IMAGE: '/social/share-twitter',
  SOCIAL_IMAGE_UPLOAD: '/social/upload-image',

  PRICE_DATA_SECOND: '/price-data/second-aggregates',
  PRICE_DATA_MINUTE: '/price-data/minute-aggregates',
  PRICE_DATA_OHLC: '/price-data/ohlc',

  GAME_ROUNDS_DATA: '/daily-returns/round-data',
  LIVE_OPEN_ROUNDS_DATA: '/daily-returns/live-open-rounds',
  LIVE_ROUNDS_DATA: '/daily-returns/live-rounds',
  ACTIVE_ROUNDS_DATA: '/daily-returns/active',

  LVG_ORDERS_LIST: '/orders/list-orders',
  LVG_PUBLIC_ORDER_LIST: '/orders/public/list-orders',
  LVG_PUBLIC_CLOSED_ORDER: '/orders/public/closed-orders',
  LVG_PUBLIC_LIVE_ORDERS: '/orders/public/live-orders',
  LVG_SHARE_TWITTER: '/social/leverage-share-twitter',
  ADD_TO_BETA_WAITLIST: '/leverage/beta/add-user-beta-waitlist',

  STATISTICS_LVG_RANKING: '/statistics/leverage/rankings/{{period}}',
  STATISTICS_LVG_REWARDS_POOL: '',

  //TODO: These endpoints are dead, so we need to clean up the code, logic, and redo flows, Good luck!!!
  GET_USER_INVITE_INFO: '/leverage/beta/get-user-invite-info',
  CHECK_USER_BETA_STATUS: '/leverage/beta/check-user-beta-status',
  ADD_BETA_INVITE_CODE: '/leverage/beta/add-beta-invite-code'
}

const EXTERNAL_API: EndpointsObj = { GAS_STATION: 'https://gasstation-mainnet.matic.network/v2' }

export const API: EndpointsObj = Object.keys(ENDPOINTS).reduce(
  (apiObject: EndpointsObj, endPointKey: string) => ({
    ...apiObject,
    [endPointKey]: `${config.YOLO_API_BASE_URL}${ENDPOINTS[endPointKey]}`
  }),
  { ...EXTERNAL_API }
)

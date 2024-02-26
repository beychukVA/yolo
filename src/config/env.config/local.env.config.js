import { TOKEN } from 'constants/index'

export const localEnvConfig = {
  DISABLED_CONSOLE_MSG: false,
  YOLO_BASE_URL: 'http://localhost:300',
  BASE_BRANCH: 'any',

  // CRYPTO
  APPROVED_CHAINS_IDS: [137],
  //DEFAULT_TOKEN: TOKEN.YOLO,

  //BACKEND CONNECTION
  YOLO_API_BASE_URL: 'https://api.dev.yolorekt.finance',
  BACKEND_SOCKET_URL: 'http://localhost:3570',
  CONTRACTS_VERSION: '33'
}

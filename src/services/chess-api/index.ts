import { ChessApiConfig } from './types'
import LichessApi from './lichess'

const init = (apiName: 'lichess', config: ChessApiConfig) => {
  switch (apiName) {
    case 'lichess':
      return new LichessApi(config)
    default:
      throw new Error(`Unsupported API: ${apiName}`)
  }
}

export default { init }

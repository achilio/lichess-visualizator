import { ChessApiConfig, ChessApi, Game } from './types'
import request from 'request'

const baseApi = 'https://lichess.org/api'
const httpParams = {
  method: 'GET',
  headers: {
    Accept: 'application/x-ndjson',
  },
}

export default class LichessApi extends ChessApi {
  constructor(config: ChessApiConfig) {
    super(config)
  }

  /**
   * Start fetching games
   */
  async startFetching(): Promise<void> {
    const username = this.config.username
    const max = this.config.maxGames
    const stream = request(
      `${baseApi}/games/user/${username}?max=${max}`,
      httpParams
    )
      .on('response', (response) => {
        if (response.statusCode !== 200) {
          this.config.onEndFetching()
          throw new Error(`Failed to fetch games ${response}`)
        } else {
          this.config.onStartFetching()
        }
      })
      .on('end', this.config.onEndFetching)
      .on('data', (data: Uint8Array) => {
        // The data is a stream of JSON objects separated by newlines
        // Sometimes, it sends several objects in one chunk
        // To parse the data as a JSON object, split the data by newlines and remove the last empty newline
        const games: string[] = data.toString().split(/[\r\n]/)
        games.pop()
        games.forEach((game: string) => {
          this.config.onGame(JSON.parse(game) as Game)
        })
      })
  }

  /**
   * Stop fetching games
   */
  async stopFetching(): Promise<void> {
    // TODO: Implement this
  }
}

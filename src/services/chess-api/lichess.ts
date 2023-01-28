import { ChessApiConfig } from './types'
import { ChessApi, Game } from './types'
import ndjson from 'ndjson'
import fetch from 'node-fetch'

const baseApi = 'https://lichess.org/api'
const httpParams = {
  method: 'GET',
  headers: {
    Accept: 'application/x-ndjson',
  },
}

export default class LichessApi extends ChessApi {
  private stream: any
  constructor(config: ChessApiConfig) {
    super(config)
  }

  /**
   * Start fetching games
   */
  async startFetching(): Promise<void> {
    const username = this.config.username
    const max = this.config.maxGames
    const stream = await fetch(
      `${baseApi}/games/user/${username}?max=${max}`,
      httpParams
    )
    this.stream = stream.body
      ?.pipe(ndjson.parse())
      .on('resume', this.config.onStartFetching)
      .on('end', this.config.onEndFetching)
      .on('data', (data: any) => {
        const game: Game = { id: data.id }
        this.config.onGame(game)
      })
  }

  /**
   * Stop fetching games
   */
  async stopFetching(): Promise<void> {
    this.stream.destroy()
  }
}

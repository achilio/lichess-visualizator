import { ChessApiConfig, ChessApi, GameDefinition, Game } from './types'
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
    const playerName = this.config.playerName
    const max = this.config.maxGames
    const onGame = this.config.onGame
    const onStartFetching = this.config.onStartFetching
    const onEndFetching = this.config.onEndFetching
    return new Promise((resolve, reject) =>
      request(`${baseApi}/games/user/${playerName}?max=${max}`, httpParams)
        .on('response', (response) => {
          if (response.statusCode !== 200) {
            onEndFetching && onEndFetching()
            if (response.statusCode === 404) {
              console.error('Player not found')
              reject(`Player ${playerName} not found`)
            }
            reject(`Failed to fetch games ${response.statusCode}`)
          }
          onStartFetching && onStartFetching()
          resolve()
        })
        .on('end', () => onEndFetching && onEndFetching())
        .on('data', (data: Uint8Array) => {
          // The data is a stream of JSON objects separated by newlines
          // Sometimes, it sends several objects in one chunk
          // To parse the data as a JSON object, split the data by newlines and remove the last empty newline
          const games: string[] = data.toString().split(/[\r\n]/)
          games.pop()
          games.forEach((game: string) => {
            onGame && onGame(new Game(JSON.parse(game) as GameDefinition))
          })
        })
    )
  }

  /**
   * Stop fetching games
   */
  async stopFetching(): Promise<void> {
    // TODO: Implement this
  }
}

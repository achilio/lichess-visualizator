export abstract class ChessApi {
  protected config: ChessApiConfig

  constructor(config: ChessApiConfig) {
    this.config = config
  }

  abstract startFetching(): Promise<void>
  abstract stopFetching(): Promise<void>
}

export interface ChessApiConfig {
  username: string
  maxGames: number
  onGame: (game: Game) => void
  onStartFetching: () => void
  onEndFetching: () => void
}

export interface CallbackOnGame {
  (game: Game): void
}

export interface Game {
  id: string
  // rated: boolean
  // variant: string
  // speed: string
  // perf: string
  // createdAt: number
  // lastMoveAt: number
  // turns: number
  // color: string
  // status: string
  // winner: string
  // players: {
  //   white: {
  //     userId: string
  //     rating: number
  //     ratingDiff: number
  //   }
  //   black: {
  //     userId: string
  //     rating: number
  //     ratingDiff: number
  //   }
  // }
  // moves: string
  // opening: {
  //   code: string
  //   name: string
  //   ply: number
  // }
  // clock: {
  //   initial: number
  //   increment: number
  //   totalTime: number
  // }
  // url: string
}

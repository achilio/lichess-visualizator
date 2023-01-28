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

export interface Player {
  user: {
    name: string
    id: string
  }
  rating: number
  ratingDiff: number
}

export interface Game {
  id: string
  rated: boolean
  variant: string
  speed: string
  perf: string
  createdAt: number
  lastMoveAt: number
  status: string
  players: {
    white: Player
    black: Player
  }
  winner: string
  moves: string
  clock: {
    initial: number
    increment: number
    totalTime: number
  }
}

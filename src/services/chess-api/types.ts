export abstract class ChessApi {
  protected config: ChessApiConfig

  constructor(config: ChessApiConfig) {
    this.config = config
  }

  abstract startFetching(): Promise<void>
  abstract stopFetching(): Promise<void>
}

export interface ChessApiConfig {
  playerName: string
  maxGames: number
  onGame?: (game: Game) => void
  onStartFetching?: () => void
  onEndFetching?: () => void
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

export interface GameDefinition {
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

export class Game implements GameDefinition {
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

  constructor(game: GameDefinition) {
    this.id = game.id
    this.rated = game.rated
    this.variant = game.variant
    this.speed = game.speed
    this.perf = game.perf
    this.createdAt = game.createdAt
    this.lastMoveAt = game.lastMoveAt
    this.status = game.status
    this.players = game.players
    this.winner = game.winner
    this.moves = game.moves
    this.clock = game.clock
  }

  /**
   * Returns the color of the player in the game
   * @param playerName - The name of the player
   * @returns - The color of the player
   */
  playerColor(playerName: string): 'white' | 'black' {
    if (this.players.white.user.name === playerName) {
      return 'white'
    } else if (this.players.black.user.name === playerName) {
      return 'black'
    } else {
      throw new Error(`Player ${playerName} not found in game ${this.id}`)
    }
  }

  /**
   * Returns true if the player is the winner
   * @param playerName - The name of the player
   * @returns - True if the player is the winner
   */
  isWinner(playerName: string): boolean {
    return this.winner === this.playerColor(playerName)
  }

  /**
   * Returns the move at the given turn for the given player
   * @param moveNumber - The number of the move
   * @returns - The move at the given turn
   */
  moveAtTurn(playerName: string, turn: number): string {
    const color = this.playerColor(playerName)
    const moves = this.moves.split(' ')
    const moveNumber = Math.floor(turn / 2)
    if (moveNumber >= moves.length) {
      throw new Error(`Move number ${moveNumber} not found in game ${this.id}`)
    }
    return color === 'white' ? moves[moveNumber] : moves[moveNumber + 1]
  }
}

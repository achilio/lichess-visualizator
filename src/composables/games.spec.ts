import { useGames } from './games'
import { describe, expect, it } from 'vitest'
import { Game, GameDefinition, Player } from '@/services/chess-api/types'

describe('Games', () => {
  it('Should fetch games', async () => {
    const { games, loadGames } = useGames()
    loadGames('JeNeSuisPasKasparov', 10)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    expect(games.value.length).toBe(10)
  })
  it('Should returns the correct player color', async () => {
    const game = new Game(GAME_1)
    expect(game.playerColor('JeNeSuisPasKasparov')).toBe('white')
    expect(game.playerColor('NicoBladeWing')).toBe('black')
  })
  it('Should returns true if the player is the winner', async () => {
    const game = new Game(GAME_1)
    expect(game.isWinner('JeNeSuisPasKasparov')).toBe(true)
    expect(game.isWinner('NicoBladeWing')).toBe(false)
  })
  it('Should returns the move at the given turn', async () => {
    const game = new Game(GAME_1)
    expect(game.moveAtTurn('JeNeSuisPasKasparov', 1)).toBe('e5')
    expect(game.moveAtTurn('NicoBladeWing', 1)).toBe('e4')
  })
  it('Should fail if the player is not in the game', async () => {
    const game = new Game(GAME_1)
    expect(() => game.playerColor('NotInGame')).toThrow(
      'Player NotInGame not found in game game1'
    )
  })
  it('Should fail if the move number is not in the game', async () => {
    const game = new Game(GAME_1)
    expect(() => game.moveAtTurn('JeNeSuisPasKasparov', 10)).toThrow(
      'Move number 5 not found in game game1'
    )
  })
})

const GAME_1: GameDefinition = {
  id: 'game1',
  rated: true,
  variant: 'standard',
  speed: 'blitz',
  perf: 'blitz',
  createdAt: 1610000000000,
  lastMoveAt: 0,
  status: '',
  players: {
    white: {
      user: {
        name: 'JeNeSuisPasKasparov',
        id: 'JeNeSuisPasKasparov',
      },
      rating: 0,
      ratingDiff: 0,
    },
    black: {
      user: {
        name: 'NicoBladeWing',
        id: 'NicoBladeWing',
      },
      rating: 0,
      ratingDiff: 0,
    },
  },
  winner: 'white',
  moves: 'e5 e4',
  clock: {
    initial: 0,
    increment: 0,
    totalTime: 0,
  },
}

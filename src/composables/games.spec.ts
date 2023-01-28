import { useGames } from './games'
import { describe, expect, it } from 'vitest'

describe('Games', () => {
  it('Should fetch games', async () => {
    const { games, loadGames } = useGames()
    loadGames('JeNeSuisPasKasparov', 10)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    expect(games.value.length).toBe(10)
  })
})

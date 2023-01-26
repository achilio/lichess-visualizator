import { fetchGames } from './games'
import { describe, it } from 'vitest'

describe('Games', () => {
  it('Should fetch games', async () => {
    await fetchGames('NicoBladeWing', 10)
  })
})

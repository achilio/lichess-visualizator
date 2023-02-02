import { ref } from 'vue'
import chessApi from '@/services/chess-api'
import { Game } from '@/services/chess-api/types'

const games = ref<Game[]>([])
const loading = ref<boolean>(false)

export const useGames = () => {
  const loadGames = async (username: string, max: number) => {
    const api = chessApi.init('lichess', {
      username: username,
      maxGames: max,
      onGame: (game) => {
        // The callback is called for each game fetched
        // games.value.push(game)
        games.value.unshift(game)
      },
      onStartFetching: () => {
        // The callback is called when the fetching starts
        games.value = []
        console.log(`Fetching starts`)
        loading.value = true
      },
      onEndFetching: () => {
        // The callback is called when the fetching is done
        console.log(`Fetching is done`)
        loading.value = false
        api.stopFetching()
      },
    })
    // Start fetching games
    api.startFetching()
  }
  const isLoading = () => loading.value
  const getGames = (days?: number) => {
    if (!days) return games.value
    return games.value.filter((game) => {
      const date = new Date(game.lastMoveAt)
      const diff = new Date().getTime() - date.getTime()
      const daysAgo = Math.floor(diff / (1000 * 60 * 60 * 24))
      return daysAgo < days
    })
  }
  const isWin = (game: Game, username: string): boolean => {
    const player = game.players.black.user.name === username ? 'black' : 'white'
    return game.winner === player
  }
  return { games, loadGames, isLoading, getGames, isWin }
}

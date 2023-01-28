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
        games.value.push(game)
      },
      onStartFetching: () => {
        // The callback is called when the fetching starts
        games.value = []
        loading.value = true
      },
      onEndFetching: () => {
        // The callback is called when the fetching is done
        loading.value = false
        api.stopFetching()
      },
    })
    // Start fetching games
    api.startFetching()
  }
  return { games, loadGames }
}

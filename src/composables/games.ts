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
        console.log(`A new game is fetched id=${game.id}`)
        games.value.push(game)
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
  return { games, loadGames }
}

import { ref } from 'vue'
import chessApi from '@/services/chess-api'
import { Game } from '@/services/chess-api/types'

const games = ref<Game[]>([])
const loading = ref<boolean>(false)
const currentPlayer = ref<string>('')

export const useGames = () => {
  const loadGames = async (playerName: string, max: number) => {
    // Reset the games
    games.value = []
    currentPlayer.value = playerName
    const api = chessApi.init('lichess', {
      playerName,
      maxGames: max,
      onGame: (game) => {
        // The callback is called for each game fetched
        games.value.unshift(game)
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

  return { games, loadGames, currentPlayer }
}

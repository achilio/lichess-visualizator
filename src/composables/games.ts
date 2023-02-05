import { ref } from 'vue'
import chessApi from '@/services/chess-api'
import { Game } from '@/services/chess-api/types'

const games = ref<Game[]>([])
const loading = ref<boolean>(false)
const currentPlayer = ref<string>('')
const errorMessage = ref<string>('')

export interface LoadContext {
  website: 'lichess'
  playerName: string
  maxGames: number
}

export const useGames = () => {
  const loadGames = async (context: LoadContext) => {
    // Reset the games
    currentPlayer.value = context.playerName
    const api = chessApi.init(context.website, {
      playerName: context.playerName,
      maxGames: context.maxGames,
      onGame: (game) => games.value.unshift(game),
      onStartFetching: () => (games.value = []) && (loading.value = true),
      onEndFetching: () => (loading.value = false),
    })
    // Start fetching games
    try {
      await api.startFetching()
    } catch (error: any) {
      errorMessage.value = error
      loading.value = false
    }
  }

  return { games, loadGames, currentPlayer, loading, errorMessage }
}

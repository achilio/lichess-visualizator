<template>
  <v-card :title="'Winrate'" :text="winrate + ' %'"> </v-card>
</template>

<script setup lang="ts">
import { useGames } from '@/composables/games'
import { computed } from 'vue'
const { games, currentPlayer } = useGames()

// compute the winrate of all games fetched
const winrate = computed(() => {
  const wins = games.value.filter((game) =>
    game.isWinner(currentPlayer.value)
  ).length
  const wr: string = ((wins / games.value.length) * 100).toFixed(0)
  return wr
})
</script>
<style scoped>
.v-card {
  height: 100%;
}
</style>

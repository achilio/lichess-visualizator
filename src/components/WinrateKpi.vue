<template>
  <v-card
    :title="'Winrate'"
    :text="winrate + ' %'"
    :max-width="120"
    :max-height="120"
  >
  </v-card>
</template>

<script setup lang="ts">
import { useGames } from '@/composables/games'
import { computed } from 'vue'
const { games } = useGames()

// compute the winrate of all games fetched
const winrate = computed(() => {
  const wins = games.value.filter((game) => {
    const player =
      game.players.black.user.name === 'JeNeSuisPasKasparov' ? 'black' : 'white'
    return game.winner === player
  }).length
  const wr: string = ((wins / games.value.length) * 100).toFixed(0)
  return wr
})
</script>

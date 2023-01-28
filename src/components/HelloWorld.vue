<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Loaded games {{ games.length }}
        </h1>
        <winrate-kpi />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useGames } from '@/composables/games'
import WinrateKpi from './WinrateKpi.vue'

const { games, loadGames } = useGames()
loadGames('JeNeSuisPasKasparov', 20)
</script>

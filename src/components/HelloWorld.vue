<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="font-weight-bold mb-3">Loaded games {{ games.length }}</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <WinsOverTimeLineChart />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useGames } from '@/composables/games'
import WinsOverTimeLineChart from './WinsOverTimeLineChart.vue'
const { games, loadGames } = useGames()
loadGames('JeNeSuisPasKasparov', 500)
</script>

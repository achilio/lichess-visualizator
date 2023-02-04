<template>
  <v-container class="px-5">
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Loaded games {{ games.length }}
        </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" style="height: 400px">
        <winrate-kpi />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" style="height: 400px">
        <openings-bar-chart />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <wins-over-time-line-chart />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useGames } from '@/composables/games'
import WinrateKpi from './WinrateKpi.vue'
import OpeningsBarChart from './OpeningsBarChart.vue'
import WinsOverTimeLineChart from './WinsOverTimeLineChart.vue'

const name = 'HomePage'

const { games, loadGames } = useGames()
loadGames('NicoBladeWing', 100000)
</script>
<style scoped>
.v-container {
  max-width: 70%;
}
</style>

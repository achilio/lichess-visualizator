<template>
  <v-chart class="chart" :option="options" />
  <p>{{ winrate }}</p>
</template>

<script setup lang="ts">
import { useGames } from '@/composables/games'
import { computed, ComputedRef } from 'vue'
import { CanvasRenderer } from 'echarts/renderers'
import { GaugeChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from 'echarts/components'
import VChart from 'vue-echarts'
import { EChartsOption } from 'echarts'
import { use } from 'echarts/core'
const { games, currentPlayer } = useGames()

use([
  GaugeChart,
  CanvasRenderer,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
])

// compute the winrate of all games fetched
const winrate = computed(() => {
  const wins = games.value.filter((game) =>
    game.isWinner(currentPlayer.value)
  ).length
  const wr: number = wins / games.value.length
  return wr
})

// options for the chart
const options: ComputedRef<EChartsOption> = computed(() => {
  return {
    tooltip: { formatter: '{a} <br/>{b} : {c}' },
    stateAnimation: { duration: 1000, easing: 'cubicOut' },
    animation: true,
    series: [
      {
        name: 'Winrate',
        type: 'gauge',
        progress: {
          show: true,
          width: 18,
        },
        detail: {
          formatter: function (value) {
            return Math.round(value * 100) + ''
          },
          valueAnimation: true,
          offsetCenter: [0, '50%'],
        },
        data: [{ value: winrate.value, name: 'Winrate (%)' }],
      },
    ],
  }
})
</script>
<style>
.chart {
  width: 100%;
  height: 300px;
}
</style>

<template>
  <v-chart class="chart" :option="options" />
  <p>{{ winrate }}</p>
</template>

<script setup lang="ts">
import { useGames } from '@/composables/games'
import { computed, ComputedRef, ref, Ref } from 'vue'
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

const winrates: Ref<number[]> = ref([])

// compute the winrate of all games fetched
const winrate = computed(() => {
  const wins = games.value.filter((game) =>
    game.isWinner(currentPlayer.value)
  ).length
  const wr: number = wins / games.value.length
  return wr
})

const wr: Ref<number> = ref(0.5)
setInterval(() => {
  winrates.value.push(winrate.value)
  wr.value = winrate.value
}, 500)

// options for the chart
const options: ComputedRef<EChartsOption> = computed(() => {
  return {
    tooltip: { formatter: '{a} <br/>{b} : {c}' },
    animation: true,
    series: [
      {
        name: 'Winrate',
        min: Math.min(...winrates.value) - 0.05,
        max: Math.max(...winrates.value) + 0.05,
        type: 'gauge',
        axisLabel: {
          formatter: function (value) {
            return Math.round(value * 100) + ''
          },
        },
        detail: {
          formatter: function (value) {
            return (value * 100).toFixed(2)
          },
          valueAnimation: true,
          offsetCenter: [0, '50%'],
        },
        data: [{ value: wr.value, name: 'Winrate (%)' }],
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

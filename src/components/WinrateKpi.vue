<template>
  <v-chart class="chart" :option="options" style="height: 100%; width: 100%" />
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
import { ecoComputed } from '@/utils/eco-computed'
const { games, currentPlayer } = useGames()

const name = 'WinrateKpi'

use([
  GaugeChart,
  CanvasRenderer,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
])

const winrates: Ref<number[]> = ref([0.5])
let i = 0
// compute the winrate of all games fetched
const winrate = ecoComputed(() => {
  const wins = games.value.filter((game) =>
    game.isWinner(currentPlayer.value)
  ).length
  const wr: number = wins / games.value.length
  i++
  if (i > 10 && wr) {
    // ignore the first 10 games
    winrates.value.push(wr)
  }
  return wr
}, 250)

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
        },
        data: [{ value: winrate.value, name: 'Winrate (%)' }],
      },
    ],
  }
})

// onMounted(() => {
//   setTimeout(() => {
//     // trigger a resize event to force the chart to redraw
//     window.dispatchEvent(new Event('resize'))
//     window.dispatchEvent(new Event('onload'))
//   }, 1000)
// })
</script>
<style>
.chart {
  /* width: 100%;
  height: 100%; */
}
</style>

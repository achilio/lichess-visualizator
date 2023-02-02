<template>
  <v-chart class="chart" :option="chartOption" />
</template>

<script setup lang="ts">
import * as echarts from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { EChartsOption } from 'echarts'
import { CanvasRenderer } from 'echarts/renderers'
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  AxisPointerComponent,
} from 'echarts/components'
import { useGames } from '@/composables/games'
import { Game } from '@/services/chess-api/types'
import { computed, ComputedRef } from 'vue'

echarts.use([
  LineChart,
  CanvasRenderer,
  GridComponent,
  AxisPointerComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
])

const { games, isWin } = useGames()

const gamesLast30Days = computed(() => {
  return games.value.filter((game: Game) => {
    const date = new Date(game.lastMoveAt)
    const diff = new Date().getTime() - date.getTime()
    const daysAgo = Math.floor(diff / (1000 * 60 * 60 * 24))
    return daysAgo < 30
  })
})

// gamesLast30Days.value.reverse()

const gameTimestampsLastThirtyDays = computed(() =>
  gamesLast30Days.value.map((game: Game) => game.lastMoveAt)
)

const winsLastThirtyDays = computed(() => {
  let winCount: number = 0
  return gamesLast30Days.value.map((game: Game) => {
    if (isWin(game, 'JeNeSuisPasKasparov')) {
      winCount++
    }
    return winCount
  })
})

const dataSeries = computed(() => {
  return winsLastThirtyDays.value.map((winCount, index) => {
    return [gameTimestampsLastThirtyDays.value[index], winCount]
  })
})

const chartOption: ComputedRef<EChartsOption> = computed(() => {
  return {
    title: {
      text: 'Wins over time (last 30 days)',
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'time',
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: dataSeries.value,
        type: 'line',
        showSymbol: false,
      },
    ],
  }
})
</script>

<style>
.chart {
  height: 300px;
  width: 100%;
}
</style>

<template>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script setup>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  AxisPointerComponent,
  GridComponent,
} from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
import { ref, provide, computed } from 'vue'
import { useGames } from '@/composables/games'
import lodash from 'lodash'

const name = 'OpeningsBarChart'

const { games } = useGames()
// Find and sort openings by frequency with lodash and reverse the array to get the most frequent openings first

const openings = computed(() =>
  lodash
    .chain(games.value)
    .map((game) => game.moves.split(' ')[0])
    .countBy()
    .toPairs()
    .sortBy(1)
    .reverse()
    .value()
)

const yAxisData = computed(() => openings.value.map((opening) => opening[0]))
const seriesData = computed(() => openings.value.map((opening) => opening[1]))

use([
  GridComponent,
  CanvasRenderer,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  BarChart,
])
const data = []
const option = computed(() => ({
  xAxis: {
    max: 'dataMax',
  },
  yAxis: {
    type: 'category',
    data: yAxisData.value,
    inverse: true,
    animationDuration: 300,
    animationDurationUpdate: 300,
    max: 2, // only the largest 3 bars will be displayed
  },
  series: [
    {
      realtimeSort: true,
      name: 'X',
      type: 'bar',
      data: seriesData.value,
      label: {
        show: true,
        position: 'right',
        valueAnimation: true,
      },
    },
  ],
  legend: {
    show: true,
  },
  animationDuration: 0,
  animationDurationUpdate: 3000,
  animationEasing: 'linear',
  animationEasingUpdate: 'linear',
}))
</script>

<style scoped>
.chart {
  height: 100%;
}
</style>

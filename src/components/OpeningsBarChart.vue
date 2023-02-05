<template>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script setup lang="ts">
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
import VChart from 'vue-echarts'
import { ref, provide, computed } from 'vue'
import { useGames } from '@/composables/games'
import { Game } from '@/services/chess-api/types'
import _ from 'lodash'
import { EChartsOption } from 'echarts'
import { ecoComputed } from '@/utils/eco-computed'

const name = 'OpeningsBarChart'

const { games, currentPlayer } = useGames()

// Group games by current player color and first move. Sort by count
const openings = ecoComputed(() => {
  const colorMove = new Map()
  const openings = _.chain(games.value)
    .map((g: Game) => {
      const move = g.moveAtTurn(currentPlayer.value, 0)
      const color = g.playerColor(currentPlayer.value)
      colorMove.set(move, color)
      return {
        move,
        color,
      }
    })
    .value()

  const final = _.map(_.countBy(openings, 'move'), (val, key) => ({
    move: key,
    value: val,
    color: colorMove.get(key),
    itemStyle: {
      color: colorMove.get(key) === 'black' ? 'black' : '#ededed',
      borderColor: '#dbdbdb',
    },
  }))

  return _.orderBy(final, 'value', 'desc')
}, 500)

const yAxisData = computed(() => openings.value.map((o: any) => o.move))

use([
  GridComponent,
  CanvasRenderer,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  BarChart,
])
const data = []
const option = computed(
  () =>
    ({
      title: {
        text: 'First move on opening',
      },
      xAxis: {
        max: 'dataMax',
      },
      yAxis: {
        type: 'category',
        data: yAxisData.value,
        inverse: true,
        animationDuration: 300,
        animationDurationUpdate: 300,
        max: 8,
      },
      series: [
        {
          realtimeSort: true,
          type: 'bar',
          data: openings.value,
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
      tooltip: {
        trigger: 'axis',
      },
      animationDuration: 0,
      animationDurationUpdate: 3000,
      animationEasing: 'linear',
      animationEasingUpdate: 'linear',
    } as EChartsOption)
)
</script>

<style scoped>
.chart {
  height: 100%;
}
</style>

<template>
  <v-container class="ma-4">
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Loaded games {{ games.length }}
        </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="grid-stack">
          <div
            v-for="(component, key, index) in components"
            :key="'component' + index"
            :gs-id="key"
            class="grid-stack-item"
            :gs-h="component.gridPos.h"
            :gs-w="component.gridPos.w"
            gs-auto-position="true"
          >
            <div class="grid-stack-item-content">
              <component :is="component.name" v-bind="component.props" />
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useGames } from '@/composables/games'
import { onMounted, shallowRef } from 'vue'
import 'gridstack/dist/gridstack.min.css'
import { GridStack } from 'gridstack'
import WinrateKpi from './WinrateKpi.vue'
const name = 'HomePage'

const { games, loadGames } = useGames()
loadGames('NicoBladeWing', 100000)

let grid: GridStack | null = null
let components = shallowRef([
  {
    name: WinrateKpi,
    props: {},
    gridPos: {
      w: 4,
      h: 4,
    },
  },
])

onMounted(() => {
  grid = GridStack.init({
    alwaysShowResizeHandle:
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ),
    resizable: {
      handles: 'se',
    },
    cellHeight: 80,
    minRow: 1,
  })
})
</script>

<style>
.v-container {
  width: 100%;
  margin-right: 0;
}

.grid-stack {
  background-color: lightgray;
  min-width: 100vh;
}
</style>

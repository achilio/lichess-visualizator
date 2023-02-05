<template>
  <v-toolbar>
    <v-toolbar-title>Chessolytics</v-toolbar-title>
    <fetching-menu />
  </v-toolbar>
</template>

<script setup lang="ts">
import { useGames } from '../composables/games'
import FetchingMenu from './FetchingMenu.vue'
const { games } = useGames()
</script>

<style scoped>
.v-toolbar {
  padding-left: 20vw;
  padding-right: 20vw;
}
</style>

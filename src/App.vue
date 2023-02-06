<template>
  <v-app>
    <top-bar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import TopBar from './components/TopBar.vue'
const name = 'App'
</script>

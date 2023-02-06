<template>
  <v-menu location="bottom right" :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" class="text-none"
        >{{ games.length || 'LOAD' }} GAMES
        {{ games.length > 0 ? `(${currentPlayer})` : '' }}</v-btn
      >
    </template>
    <v-card min-width="300">
      <v-card-title>Load games</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="() => loadGames(context)">
          <v-select
            v-model="context.website"
            :items="['lichess']"
            label="Website"
            :disabled="true"
          />
          <v-text-field
            :error="!!errorMessage"
            :details="errorMessage"
            :error-messages="errorMessage ? [errorMessage] : []"
            v-model="context.playerName"
            label="Player Name"
            placeholder="Player name"
            outlined
          />

          <v-text-field
            v-model="context.maxGames"
            label="Max Games"
            placeholder="Max games"
            outlined
          />
          <v-btn
            style="width: 100%"
            color="primary"
            type="submit"
            :disabled="loading"
            :loading="loading"
            >Load games</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useGames, LoadContext } from '../composables/games'
const { loadGames, loading, errorMessage, games, currentPlayer } = useGames()
const context: LoadContext = reactive({
  website: 'lichess',
  playerName: 'NicoBladeWing',
  maxGames: 100,
})
</script>

<style scoped></style>

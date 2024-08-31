<template>
  <section class="favorite-list">
    <FavoritePreview
      v-for="favorite in favorites"
      :key="favorite.locationKey"
      :favorite="favorite"
    />
  </section>
</template>

<script setup lang="ts">
import FavoritePreview from './FavoritePreview.vue'
import { Favorite } from '../types'

const { favorites } = defineProps<{
  favorites: Favorite[]
}>()

</script>

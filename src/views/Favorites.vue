<template>
  <section class="favorites">
    <FavoviteList v-if="favorites.length" :favorites="favorites" />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { weatherService } from '../services/weather.service'
import FavoviteList from '../components/FavoviteList.vue'
import type { Favorite } from '../types'
import { useMainStore } from '../stores/mainStore'

const store = useMainStore()

const favorites = ref<Favorite[]>([])

const getFavorites = async () => {
  const storedFavorites: Favorite[] = JSON.parse(localStorage.getItem('favorites') || '[]')
  const promises = storedFavorites.map(({ locationKey }) =>
    weatherService.getCurrWeather(locationKey)
  )

  try {
    const results = await Promise.all(promises)
    const mergedData = storedFavorites.map((favorite, idx) => ({
      ...favorite,
      weatherData: results[idx],
    }))
    favorites.value = mergedData
  } catch (error) {
    console.error('Error fetching weather data:', error)
    store.setMessage({ text: 'Error fetching weather data', type: 'error' })
  }
}

onMounted(getFavorites)
</script>

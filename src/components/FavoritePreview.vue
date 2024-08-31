<template>
  <section class="favorite-preview" @click="goToWeather">
    <h2>{{ favorite.city }}, {{ favorite.country }}</h2>
    <h3>{{ favorite.weatherData[0].WeatherText }}</h3>
    <img :src="weatherIcon" alt="" />
    <h2>{{ temperature }}°{{ isFahrenheit ? 'F' : 'C' }}</h2>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMainStore } from '../stores/mainStore'
import { useRouter } from 'vue-router'
import { Favorite } from '../types'

const { favorite } = defineProps<{ favorite: Favorite }>()

const router = useRouter()
const store = useMainStore()

const temperature = computed(() => {
  const temp = favorite.weatherData[0].Temperature.Metric.Value
  if (!isFahrenheit.value) return temp.toFixed(0)
  else {
    const fahrenheit = (temp * 9) / 5 + 32
    return fahrenheit.toFixed(0)
  }
})

const isFahrenheit = computed(() => store.isFahrenheit)

const weatherIcon = computed(() => {
  const weatherText = favorite.weatherData[0].WeatherText.toLowerCase()
  if (weatherText.includes('clear') || weatherText.includes('sunny'))
    return '/day.svg'
  if (weatherText.includes('cloudy')) return '/cloudy.svg'
  if (weatherText.includes('rain')) return '/rainy-1.svg'
  if (weatherText.includes('snow')) return '/snowy-1.svg'
  if (weatherText.includes('thunder')) return '/thunder.svg'
})

const goToWeather = () => {
  router.push(
    `/${favorite.locationKey}/${favorite.city}/${favorite.country}`
  )
}
</script>

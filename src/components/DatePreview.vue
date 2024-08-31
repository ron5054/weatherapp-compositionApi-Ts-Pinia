<template>
  <div class="date-preview">
    <h1>{{ dayName }}</h1>
    <img :src="weatherIcon" alt="" />
    <p>{{ date.Day.IconPhrase }}</p>
    <p>{{ minTemp }}° - {{ maxTemp }}°{{ isFahrenheit ? 'F' : 'C' }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMainStore } from '../stores/mainStore'
import { DateInfo } from '../types'

const { date } = defineProps<{ date: DateInfo }>()

const store = useMainStore()

const dayName = computed(() => {
  const day = new Date(date.Date)
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  return days[day.getUTCDay()]
})

const isFahrenheit = computed(() => store.isFahrenheit)

const minTemp = computed(() => {
  const temp = date.Temperature.Minimum.Value
  if (!isFahrenheit.value) return temp.toFixed(0)
  else {
    const fahrenheit = (temp * 9) / 5 + 32
    return fahrenheit.toFixed(0)
  }
})

const maxTemp = computed(() => {
  const temp = date.Temperature.Maximum.Value
  if (!isFahrenheit.value) return temp.toFixed(0)
  else {
    const fahrenheit = (temp * 9) / 5 + 32
    return fahrenheit.toFixed(0)
  }
})

const weatherIcon = computed(() => {
  const weatherText = date.Day.IconPhrase.toLowerCase()
  if (weatherText.includes('mostly sunny'))
    return '/cloudy-day-2.svg'
  if (weatherText.includes('t-storms')) return '/thunder.svg'
  if (
    weatherText.includes('clear') ||
    weatherText.includes('sunny') ||
    weatherText.includes('dreary')
  ) {
    return '/day.svg'
  }
  if (weatherText.includes('storms') || weatherText.includes('thunder'))
    return '/thunder.svg'
  if (weatherText.includes('cloud')) return '/cloudy.svg'
  if (weatherText.includes('rain')) return '/rainy-6.svg'
  if (weatherText.includes('snow')) return '/snowy-1.svg'
  return ''
})
</script>

<template>
  <section class="city-list">
    <CityPreview v-for="city in cities" :key="city.Key" :city="city" />
  </section>
</template>

<script setup lang="ts">
import CityPreview from './CityPreview.vue'
import { City } from '../types'

const { cities } = defineProps<{
  cities: City[]
}>()
</script>

<template>
  <section class="city-preview" @click="goToWeather">
    <h1>{{ city.LocalizedName }}</h1>
    <span>{{ city.Country.LocalizedName }}</span>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { City } from '../types'

const { city } = defineProps<{ city: City }>()

const router = useRouter()

const goToWeather = () => {
  router.push(
    `/${city.Key}/${city.LocalizedName}/${city.Country.LocalizedName}`
  )
}
</script>

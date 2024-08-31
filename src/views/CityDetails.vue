<template>
  <section
    class="city-details"
    :style="{ backgroundColor: isDarkMode ? '#6d6363' : 'aliceblue' }"
  >
    <section class="search-bar">
      <input
        type="text"
        placeholder="Enter city"
        v-model="searchTerm"
        ref="searchInput"
      />
      <button @click="searchCity" :disabled="!searchTerm">Search</button>
    </section>

    <section class="city-list-container" v-if="cities">
      <button @click="cities = null">❌</button>
      <CityList :cities="cities" />
    </section>

    <section class="city" v-if="city && dates?.length">
      <div class="city-header">
        <h1 v-if="city">{{ city }}, {{ country }}</h1>
        <img
          v-if="isFavorite"
          src="/heart-flat-icon.svg"
          alt="Remove from favorites"
          @click="toggleFavorites(locationKey, city, country)"
        />
        <img
          v-else
          src="/heart-outline-icon.svg"
          alt="Add to favorites"
          @click="toggleFavorites(locationKey, city, country)"
        />
      </div>
      <DateList v-if="dates?.length" :dates="dates" />
    </section>
  </section>
  <Message-Modal :message="message" v-if="message" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRouter , useRoute } from 'vue-router'
import { useMainStore } from '../stores/mainStore'
import { weatherService } from '../services/weather.service'
import { DateInfo, City } from '../types'
import DateList from '../components/DateList.vue'
import CityList from '../components/CityList.vue'
import MessageModal from '../components/MessageModal.vue'

const store = useMainStore()
const router = useRouter()
const route = useRoute()

const dates = ref<DateInfo[]>([])
const favorites = ref<any[]>(
  JSON.parse(localStorage.getItem('favorites') || '[]')
)
const searchTerm = ref<string>('')
const cities = ref<City[] | null>(null)
const message = ref<string | null>(null)

const locationKey = computed(() => route.params.locationKey as string)
const city = computed(() => route.params.city as string)
const country = computed(() => route.params.country as string)
const isFavorite = computed(() =>
  favorites.value.some((favorite) => favorite.locationKey === locationKey.value)
)
const isDarkMode = computed(() => store.isDarkMode)
const searchInput = ref<HTMLInputElement | null>(null)

const goToUserLocation = async () => {
  const userLocation = await weatherService.getUserLocation()
  const lat = userLocation.coords.latitude
  const lon = userLocation.coords.longitude

  if (lat && lon) {
    const { locationKey, city, country } =
      await weatherService.getLocationData(lat, lon)
    router.push(`/${locationKey}/${city}/${country}`)
  }
}

const loadWeather = async () => {
  if (!locationKey.value) return
  try {
    dates.value = await weatherService.getWeatherForcast(locationKey.value)
  } catch (error) {
    console.error('Error fetching weather data:', error)
    store.setMessage({
      text: 'Error fetching weather data',
      type: 'error',
    })
  }
}

const toggleFavorites = (
  locationKey: string,
  city: string,
  country: string
) => {
  const existingFavoriteIndex = favorites.value.findIndex(
    (favorite) => favorite.locationKey === locationKey
  )

  if (existingFavoriteIndex !== -1)
    favorites.value.splice(existingFavoriteIndex, 1)
  else favorites.value.push({ locationKey, city, country })

  localStorage.setItem('favorites', JSON.stringify(favorites.value))
}

const searchCity = async () => {
  if (!searchTerm.value) return
  try {
    cities.value = await weatherService.searchCity(searchTerm.value)
  } catch (error) {
    console.error('Error fetching weather data:', error)
    store.setMessage({
      text: 'Error fetching weather data',
      type: 'error',
    })
  }
}

const handleKeydown = ({ key }: KeyboardEvent) => {
  if (key === 'Escape') cities.value = null
  if (key === 'Enter') searchCity()
}

onMounted(() => {
  if (!locationKey.value) goToUserLocation()
  loadWeather()
  if (searchInput.value) searchInput.value.focus()
  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
})

watch(locationKey, () => {
  if (!locationKey.value) goToUserLocation()
  loadWeather()
})

watch(searchTerm, (newVal) => {
  if (!/^[\x00-\x7F]*$/.test(newVal)) {
    store.setMessage({
      text: 'please type in english only',
      type: 'error',
    })
    searchTerm.value = ''
  }
})
</script>

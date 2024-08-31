<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/Favorites">Favorites</RouterLink>
    </nav>
    <section class="toggles">
      <div class="temperature-toggle">
        <span>°C</span>
        <label class="switch">
          <input
            type="checkbox"
            v-model="isFahrenheit"
            @change="toggleTemperature"
          />
          <span class="slider round"></span>
        </label>
        <span>°F</span>
      </div>
      <div class="temperature-toggle dark-mode-toggle">
        <span>💡</span>
        <label class="switch">
          <input
            type="checkbox"
            v-model="isDarkMode"
            @change="toggleDarkMode"
          />
          <span class="slider round"></span>
        </label>
        <span>🌙</span>
      </div>
    </section>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMainStore } from '../stores/mainStore'

const store = useMainStore()
const isFahrenheit = ref<boolean | null>(null)
const isDarkMode = ref<boolean>(true)

const setUserTemperatureUnit = () => {
  const temperatureUnit = localStorage.getItem('temperatureUnit')
  isFahrenheit.value = temperatureUnit === 'f'
  store.setTempUnit(isFahrenheit.value)
}

const setUserDarkMode = () => {
  const storedDarkMode = localStorage.getItem('isDarkMode')
  if (storedDarkMode) isDarkMode.value = storedDarkMode === 'true'
  store.setDarkMode(isDarkMode.value)
}

const toggleTemperature = () => {
  if (isFahrenheit.value !== null) {
    store.setTempUnit(isFahrenheit.value)
    localStorage.setItem('temperatureUnit', isFahrenheit.value ? 'f' : 'c')
  }
}

const toggleDarkMode = () => {
  store.setDarkMode(isDarkMode.value)
  localStorage.setItem('isDarkMode', isDarkMode.value ? 'true' : 'false')
}

onMounted(() => {
  setUserTemperatureUnit()
  setUserDarkMode()
})
</script>

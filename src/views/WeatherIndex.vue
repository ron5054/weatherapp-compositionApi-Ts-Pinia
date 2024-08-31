<template>
  <div
    class="weather-index"
    :style="{ backgroundColor: isDarkMode ? '#6d6363' : 'aliceblue' }"
  >
    <Header />
    <RouterView />
    <Footer />
    <MessageModal />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import MessageModal from '../components/MessageModal.vue'
import { useMainStore } from '../stores/mainStore'

const store = useMainStore()
const isDarkMode = computed(() => store.isDarkMode)
</script>

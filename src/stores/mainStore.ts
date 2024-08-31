import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    isFahrenheit: false,
    isDarkMode: true,
    message: null as { text: string; type: string } | null,
  }),
  actions: {
    setTempUnit(isFahrenheit: boolean) {
      this.isFahrenheit = isFahrenheit
    },
    setDarkMode(isDarkMode: boolean) {
      this.isDarkMode = isDarkMode
    },
    setMessage(message: { text: string; type: string } | null) {
      this.message = message
    },
  },
})

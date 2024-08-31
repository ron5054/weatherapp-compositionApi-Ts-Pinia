<template>
  <dialog
    v-if="message"
    ref="messageModal"
    class="message-modal"
    :style="{ backgroundColor: message?.type === 'error' ? 'brown' : 'green' }"
  >
    <p>{{ message?.text }}</p>
  </dialog>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useMainStore } from '../stores/mainStore'

const messageModal = ref<HTMLDialogElement | null>(null)
const store = useMainStore()

const message = computed(() => store.message)

const showMessage = () => {
  if (messageModal.value) {
    messageModal.value.showModal()
    setTimeout(() => {
      messageModal.value?.close()
    }, 2500)
  }
}

onMounted(() => {
  showMessage()
})

watch(message, () => {
  showMessage()
})
</script>

<style scoped>
.message-modal {
  border-radius: 0.5rem;
  border: none;
  outline: none;
  box-shadow: 0 0 0.5rem 0.5rem rgba(0, 0, 0, 0.3);
}

p {
  color: aliceblue;
}
</style>

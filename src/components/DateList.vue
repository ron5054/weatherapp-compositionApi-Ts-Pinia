<template>
  <section class="date-list">
    <DatePreview v-for="(date, idx) in dates" :key="idx" :date="date" />
  </section>
</template>

<script setup lang="ts">
import DatePreview from './DatePreview.vue'
import { DateInfo } from '../types';

const { dates } = defineProps<{
  dates: DateInfo[],
}>()
</script>

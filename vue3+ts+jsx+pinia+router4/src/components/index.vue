<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import ContentLoader from './Skeleton/ContentLoader.vue'

// 骨架屏
const Skeleton = defineAsyncComponent(() => import('./Skeleton/index.vue'))

const count = ref(0)
</script>

<template>
  <Suspense>
    <template #default>
      <Skeleton></Skeleton>
    </template>
    <template #fallback> <ContentLoader></ContentLoader></template>
  </Suspense>
</template>

<style scoped></style>

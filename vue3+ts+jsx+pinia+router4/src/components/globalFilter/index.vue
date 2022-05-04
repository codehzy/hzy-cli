<template>
  <div>{{ $filters.format(title) }}</div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, ComponentInternalInstance } from 'vue'
const title = ref('我是一条狗')

const { appContext } = <ComponentInternalInstance>getCurrentInstance()
// console.log(appContext.config.globalProperties.$filters)
</script>

<style lang="scss" scoped></style>

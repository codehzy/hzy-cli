<template>
  <button @click="showLoading">切换</button>
</template>

<script lang="ts" setup>
import { getCurrentInstance, ComponentInternalInstance } from 'vue'

const { appContext } = getCurrentInstance() as ComponentInternalInstance

const showLoading = () => {
  appContext.config.globalProperties.$loading.show()

  setTimeout(() => {
    appContext.config.globalProperties.$loading.hide()
  }, 3000)
}
</script>

<style lang="scss" scoped></style>

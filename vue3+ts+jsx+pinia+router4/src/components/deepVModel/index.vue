<template>
  <button @click="show = !show" v-if="!show">控制弹框显示</button>
  <Dialog v-model.hello="show" v-model:title.aaa="title">
    <VideoPlayer></VideoPlayer>
  </Dialog>
</template>

<script lang="ts" setup>
import Dialog from './components/index.vue'
import VideoPlayer from '../video/index.vue'
const show = ref(false)
const title = ref('熊出没')
</script>

<style lang="scss" scoped></style>

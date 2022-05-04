<template>
  <el-row class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
    <el-button>中文</el-button>
  </el-row>

  <el-input v-model="input" placeholder="Please input" class="finalInput" />
</template>

<script lang="ts" setup>
const input = ref('')
</script>

<style lang="scss" scoped>
.finalInput {
  :deep(input) {
    background-color: skyblue;
  }
}
</style>

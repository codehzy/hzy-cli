<template>
  <div>A</div>
  <button @click="emit">我是A 要派发</button>
</template>

<script lang="ts" setup>
import { getCurrentInstance } from "vue";

const instance = getCurrentInstance();
const emit = () => {
  instance?.proxy?.$Bus.emit("xiao-ming", "hello");
  instance?.proxy?.$Bus.emit("xiao-hong", "hello-two");
};
</script>

<style lang="scss" scoped></style>

<template>
  <div>B</div>
</template>

<script lang="ts" setup>
import { getCurrentInstance } from "vue";

const instance = getCurrentInstance();

// 监听单个
// instance?.proxy?.$Bus.on("xiao-ming", (str) => {
//   console.log(`小明 ==========================> ${str}`);
// });

// 监听多个
// instance?.proxy?.$Bus.on("*", (type, str) => {
//   console.log(type, str, "============+> B");
// });

const Bus = (str: any) => {
  console.log(`B ==========================> ${str}`);
};

instance?.proxy?.$Bus.on("xiao-ming", Bus);
instance?.proxy?.$Bus.off("xiao-ming", Bus);
instance?.proxy?.$Bus.all.clear();
</script>

<style lang="scss" scoped></style>

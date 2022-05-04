<template>
  <div>
    <input v-model="num.current" step="20" type="number" />
    <div>
      {{ num.tweenedNumber.toFixed(0) }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch } from "vue";
import gsap from "gsap";
const num = reactive({
  current: 0,
  tweenedNumber: 0,
});

watch(
  () => num.current,
  (newVal, oldVal) => {
    gsap.to(num, {
      duration: 2,
      tweenedNumber: newVal,
    });
  }
);
</script>

<style lang="scss" scoped></style>

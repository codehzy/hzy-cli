<template>
  <div>
    <img
      :src="imgUrl"
      style="display: inline-block; width: 200px; height: 180px"
      v-for="i in 100"
    />
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import { ref } from "vue";
const imgUrl = ref("");

const { data } = await axios({
  method: "get",
  url: "https://dog.ceo/api/breeds/image/random",
  timeout: 5000,
});

imgUrl.value = data.message;
</script>

<style lang="scss" scoped>
div {
  height: 100%;
  width: 100%;
}
</style>

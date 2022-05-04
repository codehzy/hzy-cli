<template>
  <div>
    <button @click="random">打散</button>
    <transition-group class="wrap" move-class="move" tag="div">
      <div :key="item.id" v-for="item in list" class="items">
        {{ item.number }}
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import _ from "lodash";

const list = ref(
  Array.apply(null, { length: 81 } as number[]).map((_, index) => {
    return {
      id: index,
      number: (index % 9) + 1,
    };
  })
);

console.log(list.value);

const random = () => {
  list.value = _.shuffle(list.value);
};
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-wrap: wrap;
  width: calc(30 * 9) + 10px;
  .items {
    width: 30px;
    height: 30px;
    box-sizing: border-box;
    border: 1px solid black;
  }
}

.move {
  transition: all 1.5s ease;
}
</style>

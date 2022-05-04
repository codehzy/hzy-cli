<template>
  <div>
    <input type="text" v-model="value" />
    <FnVDirective v-move="{ background: value }"></FnVDirective>
  </div>
</template>

<script lang="ts" setup>
import { Directive, DirectiveBinding } from '@vue/runtime-core'
import FnVDirective from './component/index.vue'
const value = ref<string>('')

type Dir = {
  background: string
}

const vMove: Directive = (el: HTMLElement, binDing: DirectiveBinding<Dir>) => {
  el.style.background = binDing.value.background
}
</script>

<style lang="scss" scoped></style>

<template>
  <button @click="show = !show">切换</button>
  <customVDirective
    v-if="show"
    v-move-directive:aaa.xiaoming="{ background: 'red', show: show }"
  ></customVDirective>
</template>

<script lang="ts" setup>
import customVDirective from './component/index.vue'
import { Directive, DirectiveBinding } from '@vue/runtime-core'
const show = ref(false)

type Value = {
  background: string
}

const vMoveDirective: Directive = {
  created: () => {
    console.log('created')
  },
  beforeMount: (...args: Array<any>) => {
    console.log(`初始化一次`)
  },

  mounted(el: HTMLElement, dir: DirectiveBinding<Value>) {
    el.style.background = dir.value.background
    console.log('初始化========>')
  },
  beforeUpdate() {
    console.log('更新之前')
  },
  updated() {
    console.log('更新结束')
  },
  beforeUnmount() {
    console.log('======>卸载之前')
  },
  unmounted() {
    console.log('======>卸载完成')
  }
}
</script>

<style lang="scss" scoped></style>

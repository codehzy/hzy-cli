<template>
  <div v-if="modelValue" class="dialog">
    <div class="dialog-header">
      <div>{{ title }}</div>
      <div @click="close">x</div>
    </div>
    <div class="dialog-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  modelValue: boolean
  title: string
  modelModifiers?: {
    hello: boolean
  }
  titleModifiers?: {
    aaa: boolean
  }
}

const props = defineProps<Props>()

const emits = defineEmits(['update:modelValue', 'update:title'])

const close = () => {
  console.log(props.titleModifiers)

  if (props.titleModifiers?.aaa) {
    emits('update:title', '我是一直小松鼠')
  } else {
    emits('update:title', '我是一个小花花')
  }

  emits('update:modelValue', false)
}
</script>

<style lang="scss" scoped>
.dialog {
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba($color: #000000, $alpha: 0.4);
  &-header {
    height: 10%;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }
  &-content {
    margin-left: calc(50% - 300px);
    padding: 10px;
  }
}
</style>

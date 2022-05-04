<template>
  <div>
    <button @click="Add">修改Store值</button>
    <button @click="commAndAsync">异步和同步</button>
    <button @click="resetMainStore">重置pinia库</button>
    <div>{{ MainStore.current }}</div>
    <div>{{ MainStore.age }}</div>
    <div>user: {{ MainStore.user }}</div>
    <div>name: {{ MainStore.name }}</div>
    <div>getter-price: {{ MainStore.newPrice }}</div>
    <div>getter-newCurrent: {{ MainStore.newCurrent }}</div>
  </div>
</template>

<script lang="ts" setup>
import { useMainStore } from '../../store/index'

const MainStore = useMainStore()

// 函数形式加载
// const Add = () => {
//   MainStore.$patch((state) => {
//     state.current++
//     state.age += 2
//   })
// }

// 修改整个实例，缺点是每个属性都需要修改
// const Add = () => {
//   MainStore.$state = {
//     current: 1000,
//     age: 2000
//   }
// }

// action修改数据
const Add = () => {
  MainStore.setCurrent()
}

const commAndAsync = () => {
  MainStore.getLoginInfo()
  MainStore.setName('my name is kobe')
}

/** 重置store的修改 */
const resetMainStore = () => {
  MainStore.$reset()
}

/** 订阅state改变触发的函数 */
MainStore.$subscribe(
  (args, state) => {
    // console.log('args', args)
    // console.log('state', state)
  },
  {
    detached: true
  }
)

/** 订阅action被调用就走的函数 */
MainStore.$onAction((args) => {
  // args.after(() => {
  //   console.log(`after`)
  // })
  // console.log(args)
  // args.onError((error) => {
  //   console.log(error)
  // })
}, true)
</script>

<style lang="scss" scoped></style>

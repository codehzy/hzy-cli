<template>
  <div id="clock">
    <p class="time">{{ clock.time }}</p>
  </div>
</template>

<script lang="ts" setup>
import moment from 'moment'

const clock = ref({
  time: ''
})

let timerClock: any

/** 获得最新日期 */
const getNowDate = () => {
  clock.value.time = moment(new Date()).format('dddd, MMMM Do YYYY, h:mm:ss a')
}

onMounted(() => {
  timerClock = setInterval(() => {
    getNowDate()
  }, 500)
})

onBeforeUnmount(() => {
  clearTimeout(timerClock)
})
</script>

<style lang="scss" scoped>
p {
  color: #fff;
  font-size: 30px;
  text-align: center;
}
</style>

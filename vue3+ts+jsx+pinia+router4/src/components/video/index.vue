<template>
  <!-- 要传送的小视屏播放窗口 -->
  <div id="small"></div>

  <!-- 被监听出入视口的站位元素 -->
  <div class="observerContainer" id="videoContainer"></div>

  <!-- 初始化播放的大视频窗口 -->
  <!-- <div class="bigBox">
    <teleport to="#small" :disabled="isVisibleTarget">
      <div id="mse"></div>
    </teleport>
  </div> -->
  <div class="bigBox">
    <div id="mse"></div>
  </div>

  <!-- 模拟滚动 -->
  <div style="height: 2000px"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import Player from 'xgplayer'
import { useIntersectionObserver } from '@vueuse/core'

const isVisibleTarget = ref(true)

// const getVideo = (): string => {
//   return new Promise((resolve, reject) => {
//     resolve("https://media.w3.org/2010/05/sintel/trailer.mp4");
//   }) as unknown as string;
// };

onMounted(() => {
  new Player({
    id: 'mse',
    url: `https://media.w3.org/2010/05/sintel/trailer.mp4`,
    poster: 'https://i.ytimg.com/vi/lK2ZbbQSHww/hqdefault.jpg',
    playbackRate: [0.5, 0.75, 1, 1.5, 2] //传入倍速可选数组
  })

  const { stop } = useIntersectionObserver(
    document.getElementById('videoContainer'),
    ([{ isIntersecting }]) => {
      isVisibleTarget.value = isIntersecting
    }
  )
})
</script>

<style lang="scss" scoped>
#mse {
  height: 600px;
  width: 500px;
  border: 1px solid black;
}

#small {
  height: 100px;
  width: 200px;
  position: fixed;
  bottom: 50px;
  right: 50px;
  // border: 1px solid black;
}
</style>

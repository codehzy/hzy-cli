<template>
  <div v-drag-directive class="box">
    <div class="header">标题</div>
    <div class="footer">
      <DVideo></DVideo>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Directive } from '@vue/runtime-core'
import DVideo from '../../video/index.vue'

const VDragDirective: Directive = {
  mounted(el: HTMLElement) {
    let dMoveEl = el.firstChild as HTMLElement

    const mouseDown = (e: MouseEvent) => {
      //鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
      console.log(e.clientX, e.clientY, '-----起始', el.offsetLeft)
      let X = e.clientX - el.offsetLeft
      let Y = e.clientY - el.offsetTop
      const move = (e: MouseEvent) => {
        el.style.left = e.clientX - X + 'px'
        el.style.top = e.clientY - Y + 'px'
        console.log(e.clientX, e.clientY, '---改变')
      }
      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', move)
      })
    }
    dMoveEl.addEventListener('mousedown', mouseDown)
  }
}
</script>

<style lang="scss" scoped>
.box {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 600px;
  height: 650px;
  transform: translate(-50%, -50%);

  border: 1px solid #ccc;
  .header {
    width: 600px;
    background: skyblue;
    cursor: move;
  }
  .footer {
    width: 600px;
    height: 450px;
  }
}
</style>

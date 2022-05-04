import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import mitt from 'mitt'
import { createHead } from '@vueuse/head' // <--
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Loading from './components/pluginDialog/component/index'
import { createPinia } from 'pinia'
import { piniaPlugin } from './piniaPlugin/index'

const Mitt = mitt()
const head = createHead()
const store = createPinia()
const app = createApp(App)

store.use(
  piniaPlugin({
    key: 'pinia'
  })
)

// 全局挂在Mitt
app.config.globalProperties.$Bus = Mitt
app.config.globalProperties.$filters = {
  format<T extends any>(str: T): string {
    if (String(str).length < 5) {
      return '你的字符串是小于5的'
    }
    return `${str}`
  }
}

type Filter = {
  format<T extends any>(str: T): string
}

type Load = {
  show: () => void
  hide: () => void
}

declare module 'vue' {
  export interface ComponentCustomProperties {
    $Bus: typeof Mitt
    $filters: Filter
    $loading: Load
  }
}

app.use(router).use(head).use(Loading).use(ElementPlus).use(store).mount('#app')

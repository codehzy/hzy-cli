import { PiniaPluginContext } from 'pinia'

const __piniaKey = '__PINIAKEY__'
type Option = {
  key: string
}

type OptPinia = Partial<Option>

const setStorage = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value))
}

const getStorage = (key: string) => {
  return localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key) as string)
    : {}
}

export const piniaPlugin = (options: OptPinia) => {
  return (context: PiniaPluginContext) => {
    const { store } = context

    const data = getStorage(`${options?.key ?? __piniaKey}-${store.$id}`)

    store.$subscribe(() => {
      setStorage(
        `${options?.key ?? __piniaKey}-${store.$id}`,
        toRaw(store.$state)
      )
    })

    return {
      ...store.$state,

      ...data
    }
  }
}

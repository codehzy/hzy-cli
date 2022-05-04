import { defineStore } from 'pinia'
import { Names } from './store-namespace'

type Result = {
  name: string
  isChu: boolean
  price: string
}

const login = (): Promise<Result> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'hzy',
        isChu: true,
        price: '$99999'
      })
    }, 3000)
  })
}

export const useMainStore = defineStore(Names.Main, {
  state: () => {
    return {
      current: 1,
      age: 30,
      user: <Result>{},
      name: 'default'
    }
  },
  getters: {
    newPrice: (state): string => state.user.price,
    newCurrent(): string | number {
      return ++this.current + this.newName
    },
    newName(): string {
      return `$$$$$$$$-${this.name}`
    }
  },
  actions: {
    setCurrent() {
      this.current += 100
      this.age -= 2
    },
    randDomCounter() {
      this.current = Math.round(100 * Math.random())
    },
    async getLoginInfo() {
      const result = await login()
      this.user = result
    },
    setName(name: string) {
      this.name = name
    }
  }
})

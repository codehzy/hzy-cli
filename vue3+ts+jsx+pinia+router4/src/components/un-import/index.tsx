const flag = ref<string>('123')

const randomNumberFunction = () => {
  flag.value = Number(Math.random() * 10 + flag.value).toFixed(0)
}

const list = reactive([
  {
    name: 'hzy',
    age: '21'
  },
  {
    name: 'xiaoming',
    age: 18
  },
  {
    name: 'xiao红',
    age: 16
  }
])

const renderImport = () => {
  return (
    <div>
      <button onClick={randomNumberFunction}>随机数字</button>
      <div>{flag.value}</div>
      <ul>
        {list.map((item) => {
          return (
            <>
              <li>{item.name}</li>
              <li>{item.age > 16 ? item.age : 'xxxx'}</li>
            </>
          )
        })}
      </ul>
    </div>
  )
}

export default renderImport

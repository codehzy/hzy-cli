import axios from 'axios'

const server = axios.create({
  baseURL: 'http://106.13.37.227:9999'
})

export const getApiList = () => server.get('/covid19').then((res) => res.data)

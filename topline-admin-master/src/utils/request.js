import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 3000
})
// 请求拦截
request.interceptors.request.use(
  response => {
    console.log(response)
    return response // 请求拦截器，要求返回response，拿到数据
  },
  error => {
    console.log(error)
  }
)
// 响应拦截
request.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    console.log(error)
  }
)
export default request

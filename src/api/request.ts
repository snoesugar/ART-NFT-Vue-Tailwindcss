import axios from 'axios'

// 建立一個 Axios 實例 (大水管)
const request = axios.create({
  // 這裡就填你剛剛測試成功的 JSON Server 基礎網址
  baseURL: 'http://localhost:3003',
  timeout: 5000, // 超時時間 5 秒
  headers: {
    'Content-Type': 'application/json',
  },
})

// 回應攔截器：後端回傳資料後，會先經過這裡
request.interceptors.response.use(
  response => {
    // 業界標準：直接把後端的 data 拿出來給前端，這樣元件就不用每次都打 .data
    return response.data
  },
  error => {
    // 統一管理錯誤，可以在這裡做全域的錯誤跳窗
    console.error('API 發生錯誤:', error.response?.status || error.message)
    return Promise.reject(error)
  },
)

export default request

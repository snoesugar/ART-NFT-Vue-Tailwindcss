import axios from 'axios'

// 建立一個 Axios 實例 (大水管)
const request = axios.create({
  // 💡 請把原本的 localhost 網址，直接替換成你熱騰騰的 Render 雲端網址
  baseURL: 'https://art-nft-backend.onrender.com/',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
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

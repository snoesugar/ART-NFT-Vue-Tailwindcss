import request from './request'

// 1. 定義從後端拿到的步驟流程型別
// (配合 json-server，將 id 定義為 string)
export interface Step {
  id: string // json-server 的唯一識別碼
  icon: string // FontAwesome 的 class 字串 (例如: 'fa-solid fa-wallet')
  title: string // 步驟標題
  description: string // 步驟描述內容 (後端若有換行字串 \n 會由前端解析)
}

// 2. 封裝步驟流程的 API 請求
export const stepApi = {
  getAll: async (): Promise<Step[]> => {
    // 💡 先把回傳值當成 unknown，再斷言為 Step[]
    const response = (await request.get('/steps')) as unknown
    return response as Step[]
  },
}

import request from './request'

// 1. 定義從後端拿到的市值排行型別
// (配合 json-server，將 id 定義為 string)
export interface Market {
  id: string
  name: string
  imgUrl: string
  marketCap: string
  change24h: number
  change7d: number
  floorPrice: string
  hasIcon: boolean
  owners: string
  totalSupply: string
  isOpen: boolean // 用於手機版控制折疊狀態
}

// 2. 封裝市值的 API 請求
export const marketApi = {
  // 【查】取得所有 NFT 市值排行列表 (GET /markets)
  getAll() {
    return request.get<Market[]>('/markets')
  },
}

import request from './request'

// （注意：因為 json-server 的 id 會自動生成字串，我們改成 string）
export interface Artist {
  id: string
  firstName: string
  lastName: string
  walletAddress: string // 💡 新增：錢包地址
  img: string
  desc: string
  description: string
  marketStats: MarketStats // 💡 新增：市場數據統計
}

export interface MarketStats {
  status: string
  itemCount: number
  floorPrice: MarketPrice
  volume7d: MarketPrice
  volume30d: MarketPrice
}

// 宣告市場數據的巢狀結構型別
export interface MarketPrice {
  value: number
  currency: string
}

// 宣告一個「新增時專用」的型別，利用 Omit 排除掉自動生成的 id
// (這裡會自動繼承上面新增的 walletAddress 與 marketStats 喔！)
export type CreateArtistInput = Omit<Artist, 'id'>

// 2. 封裝藝術家的 CRUD 請求
export const artistApi = {
  // 撈取所有藝術家
  getAll: async (): Promise<Artist[]> => {
    // 💡 先把回傳值當成 unknown，再斷言為 Artist[]
    const response = (await request.get('/artists')) as unknown
    return response as Artist[]
  },

  // 撈取單一藝術家
  getById: async (id: string): Promise<Artist> => {
    // 💡 同理，先轉 unknown，再轉 Artist
    const response = (await request.get(`/artists/${id}`)) as unknown
    return response as Artist
  },

  // 【增】新增藝術家 (POST /artists)
  create(data: CreateArtistInput) {
    return request.post('/artists', data)
  },

  // 【改】完整更新藝術家資料 (PUT /artists/:id)
  update(id: string, data: Artist) {
    return request.put(`/artists/${id}`, data)
  },

  // 【刪】刪除藝術家 (DELETE /artists/:id)
  delete(id: string) {
    return request.delete(`/artists/${id}`)
  },
}

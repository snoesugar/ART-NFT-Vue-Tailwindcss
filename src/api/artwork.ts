import request from './request'

export interface Artwork {
  id: string
  artistId: string
  title: string
  price: number
  description: string
  imgUrl: string
  categories: string[]
  markets: Market
}

export interface Market {
  marketCap: string
  change24h: number
  change7d: number
  floorPrice: string
  hasIcon: boolean
  owners: string
  totalSupply: string
  isOpen: boolean // 用於手機版控制折疊狀態
}

// 未來如果需要擴充 Artwork CRUD 的寫法範例：
export const artworkApi = {
  // 查全部 (目前已有)
  // 💡 加上 async 與強制定型，紅線退散
  async getAll(): Promise<Artwork[]> {
    const res = await request.get('/artworks')
    return res as unknown as Artwork[]
  },

  // 查單一作品 (未來做作品詳細頁 router 傳入 id 時會用到)
  getById(id: string) {
    return request.get<Artwork>(`/artworks/${id}`)
  },

  // 增 (未來做上傳 NFT 功能時會用到)
  create(data: Omit<Artwork, 'id'>) {
    return request.post<Artwork>('/artworks', data)
  },

  // 改 (未來做修改作品價格或敘述時會用到)
  update(id: string, data: Artwork) {
    return request.put<Artwork>(`/artworks/${id}`, data)
  },

  // 刪 (未來做下架作品功能時會用到)
  delete(id: string) {
    return request.delete<void>(`/artworks/${id}`)
  },
}

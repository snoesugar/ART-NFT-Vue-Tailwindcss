import request from './request'

// ==========================================
// 1. 型別與介面宣告 (Interfaces & Types)
// ==========================================
export interface Artist {
  id: string
  firstName: string
  lastName: string
  walletAddress: string // 錢包地址
  img: string
  desc: string
  description: string
  marketStats: MarketStats // 市場數據統計
  artworks: Artwork[] // 💡 完美對齊新 JSON 結構：藝術家內嵌的作品陣列
}

export interface MarketPrice {
  value: number
  currency: string
}

export interface MarketStats {
  status: string
  itemCount: number
  floorPrice: MarketPrice
  volume7d: MarketPrice
  volume30d: MarketPrice
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

export interface Artwork {
  id: string
  artistId?: string // 💡 巢狀結構下可選，若用不到可直接刪除
  title: string
  price: number
  description: string
  imgUrl: string
  categories: string[]
  markets: Market
}

// 宣告「新增時專用」的型別，利用 Omit 排除掉自動生成的 id
export type CreateArtistInput = Omit<Artist, 'id'>
export type CreateArtworkInput = Omit<Artwork, 'id'>

// ==========================================
// 2. 封裝 API 請求 (API Services)
// ==========================================

export const nftApi = {
  // ----------------------------------------
  // 藝術家相關 (Artist CRUD)
  // ----------------------------------------

  // 撈取所有藝術家（包含各自的作品）
  getAllArtists: async (): Promise<Artist[]> => {
    const response = await request.get('/artists')
    return response as unknown as Artist[]
  },

  // 撈取單一藝術家
  getArtistById: async (id: string): Promise<Artist> => {
    const response = await request.get(`/artists/${id}`)
    return response as unknown as Artist
  },

  // 【增】新增藝術家
  createArtist(data: CreateArtistInput) {
    return request.post<Artist>('/artists', data)
  },

  // 【改】完整更新藝術家資料
  updateArtist(id: string, data: Artist) {
    return request.put<Artist>(`/artists/${id}`, data)
  },

  // 【刪】刪除藝術家
  deleteArtist(id: string) {
    return request.delete<void>(`/artists/${id}`)
  },

  // ----------------------------------------
  // 藝術品相關 (Artwork CRUD)
  // 💡 備註：因為改為巢狀結構，若是要單獨對作品做增刪查改，
  // 實務上會依據你的後端 API 設計（例如：/artists/:artistId/artworks）
  // 以下先保留原有的獨立路由寫法，你可以根據 json-server 的實際路徑微調
  // ----------------------------------------

  // 查全部作品
  getAllArtworks: async (): Promise<Artwork[]> => {
    const res = await request.get('/artworks')
    return res as unknown as Artwork[]
  },

  // 查單一作品
  getArtworkById(id: string) {
    return request.get<Artwork>(`/artworks/${id}`)
  },

  // 【增】新增作品
  createArtwork(data: CreateArtworkInput) {
    return request.post<Artwork>('/artworks', data)
  },

  // 【改】修改作品
  updateArtwork(id: string, data: Artwork) {
    return request.put<Artwork>(`/artworks/${id}`, data)
  },

  // 【刪】下架/刪除作品
  deleteArtwork(id: string) {
    return request.delete<void>(`/artworks/${id}`)
  },
}

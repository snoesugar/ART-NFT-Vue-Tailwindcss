import request from './request'

// ==========================================
// 1. 型別與介面宣告 (Interfaces & Types)
// ==========================================

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

// 單一藝術品型別
export interface Artwork {
  id: string
  title: string
  price: number
  description: string
  imgUrl: string
  categories: string[]
  markets: Market
}

// 藝術品系列型別 (對應 JSON 中的 artworks 陣列元素)
export interface ArtworkSeries {
  id: string // 例如: "series-abstract-01"
  name: string // 例如: "靈魂的抽象維度"
  description: string
  artworkIds: Artwork[] // 真正存放該系列所有作品的陣列
}

// 藝術家型別
export interface Artist {
  id: string
  firstName: string
  lastName: string
  walletAddress: string
  img: string
  desc: string
  description: string
  marketStats: MarketStats
  artworks: ArtworkSeries[] // 完美對齊新 JSON 結構
}

// 宣告「新增時專用」的型別，利用 Omit 排除掉自動生成的 id
export type CreateArtistInput = Omit<Artist, 'id'>
export type CreateArtworkSeriesInput = Omit<ArtworkSeries, 'id'>
export type CreateArtworkInput = Omit<Artwork, 'id'>

// ==========================================
// 2. 封裝 API 請求 (API Services)
// ==========================================

export const nftApi = {
  // ----------------------------------------
  // 藝術家相關 (Artist CRUD)
  // ----------------------------------------

  // 撈取所有藝術家（包含各自的作品系列與作品）
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
  createArtist: async (data: CreateArtistInput): Promise<Artist> => {
    const response = await request.post('/artists', data)
    return response as unknown as Artist
  },

  // 【改】完整更新藝術家資料 (💡 巢狀結構下，增刪查改作品通常都靠這個 API 更新整包)
  updateArtist: async (id: string, data: Artist): Promise<Artist> => {
    const response = await request.put(`/artists/${id}`, data)
    return response as unknown as Artist
  },

  // 【刪】刪除藝術家
  deleteArtist: async (id: string): Promise<void> => {
    await request.delete(`/artists/${id}`)
  },

  // ----------------------------------------
  // 💡 備註：以下獨立路由只有在你的 db.json 根目錄
  // 同時擁有 "artworkSeries": [] 與 "artworks": [] 時才有效。
  // 若資料全內嵌在 artists 裡，請改用上面的 `updateArtist` 進行全量更新。
  // ----------------------------------------

  // 查全部系列
  getAllArtworkSeries: async (): Promise<ArtworkSeries[]> => {
    const response = await request.get('/artworkSeries')
    return response as unknown as ArtworkSeries[]
  },

  // 查全部作品
  getAllArtworks: async (): Promise<Artwork[]> => {
    const response = await request.get('/artworks')
    return response as unknown as Artwork[]
  },

  // 查單一作品
  getArtworkById: async (id: string): Promise<Artwork> => {
    const response = await request.get(`/artworks/${id}`)
    return response as unknown as Artwork
  },

  // 【增】新增作品
  createArtwork: async (data: CreateArtworkInput): Promise<Artwork> => {
    const response = await request.post('/artworks', data)
    return response as unknown as Artwork
  },

  // 【改】修改作品
  updateArtwork: async (id: string, data: Artwork): Promise<Artwork> => {
    const response = await request.put(`/artworks/${id}`, data)
    return response as unknown as Artwork
  },

  // 【刪】下架/刪除作品
  deleteArtwork: async (id: string): Promise<void> => {
    await request.delete(`/artworks/${id}`)
  },
}

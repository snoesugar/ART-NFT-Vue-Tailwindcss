// --- 必須補上這兩行，告訴 TS 這些東西在哪裡 ---
import { defineStore } from 'pinia'
import { nftApi, type Artwork, type CreateArtworkInput } from '@/api/artist'
// ------------------------------------------

export const useArtworkStore = defineStore('artwork', {
  state: () => ({
    allArtworks: [] as Artwork[],
  }),
  getters: {
    // 原始排序邏輯集中管理
    rankedArtworks: (state): Artwork[] => {
      return [...state.allArtworks].sort((a, b) => {
        const valA = a.markets?.marketCap || 0
        const valB = b.markets?.marketCap || 0
        return valB - valA // 降冪排序
      })
    },
    // 將前 N 名的切片也變成 getter，讓元件直接呼叫
    topArtworks: state => (start: number, end: number) => {
      return [...state.allArtworks]
        .sort((a, b) => (b.markets?.marketCap || 0) - (a.markets?.marketCap || 0))
        .slice(start, end)
    },
  },
  actions: {
    async fetchAll() {
      // 現在這裡的 nftApi 就會被正確識別了
      this.allArtworks = await nftApi.getAllArtworks()
    },
    async create(data: CreateArtworkInput) {
      await nftApi.createArtwork(data)
      await this.fetchAll()
    },
  },
})

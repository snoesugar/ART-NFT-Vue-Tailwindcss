import { defineStore } from 'pinia'
import { nftApi, type Artist, type Artwork } from '@/api/artist'

export const useArtistStore = defineStore('artist', {
  state: () => ({
    artists: [] as Artist[],
    currentArtistId: 'qtwvbe' as string, // 必須定義這個狀態
  }),
  getters: {
    // 攤平所有作品，並注入藝術家名字，供首頁直接使用
    allArtworksWithArtist: state => {
      return state.artists.flatMap(artist => {
        const seriesList = artist.artworks || []
        return seriesList.flatMap(series => {
          const artworkList = series.artworkIds || []
          return artworkList.map(artwork => ({
            ...artwork,
            artistName: `${artist.firstName} ${artist.lastName}`,
            // 這裡可以處理 markets 的預設值
            markets: artwork.markets ?? { marketCap: 0, change24h: 0, change7d: 0, floorPrice: 0 },
          }))
        })
      })
    },
    // 依照市場價值排序的排行榜
    rankedArtworks: state => {
      const all = useArtistStore().allArtworksWithArtist // 呼叫上面的 getter
      return [...all].sort((a, b) => (b.markets?.marketCap || 0) - (a.markets?.marketCap || 0))
    },
    // 透過 ID 取得作品及其對應的藝術家
    getArtworkDetail: state => (id: string) => {
      const artist = state.artists.find(a =>
        a.artworks.some(s => s.artworkIds.some(art => art.id === id)),
      )
      if (!artist) return null

      const artwork = artist.artworks.flatMap(s => s.artworkIds).find(art => art.id === id)

      return { artwork, artist }
    },
    // 根據 currentArtistId 自動計算當前藝術家
    currentArtist: state => {
      return state.artists.find(a => a.id === state.currentArtistId) || state.artists[0] || null
    },
    // 統一所有的作品攤平邏輯，並加上狀態 filter
    allListedArtworks: state => {
      // 檢查 artists 是否有資料
      if (!state.artists || state.artists.length === 0) return []

      return state.artists
        .flatMap(artist => (artist.artworks || []).flatMap(series => series.artworkIds || []))
        .filter(art => art && art.isListed === true)
    },
    // 用於排行榜的 Top 10
    topTenArtworks(): Artwork[] {
      return [...this.allListedArtworks]
        .sort((a, b) => {
          const capA = a.markets?.marketCap ?? 0
          const capB = b.markets?.marketCap ?? 0
          return capB - capA
        })
        .slice(0, 10)
    },
  },
  actions: {
    async fetchAll() {
      if (this.artists.length > 0) return // 已有資料則跳過
      this.artists = await nftApi.getAllArtists()
    },
    getArtworkDetail(id: string) {
      const artist = this.artists.find(a =>
        a.artworks.some(s => s.artworkIds.some(art => art.id === id)),
      )
      const artwork = artist?.artworks.flatMap(s => s.artworkIds).find(a => a.id === id)
      return { artist, artwork }
    },
  },
})

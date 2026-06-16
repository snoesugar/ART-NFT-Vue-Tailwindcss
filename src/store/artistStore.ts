import { defineStore } from 'pinia'
import { nftApi, type Artist, type Artwork } from '@/api/artist'

export const useArtistStore = defineStore('artist', {
  state: () => ({
    artists: [] as Artist[],
    currentArtistId: 'qtwvbe' as string, // 必須定義這個狀態
    cachedAllArtworks: [] as Artwork[],
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
    currentArtist(state): Artist | null {
      return state.artists.find(a => a.id === state.currentArtistId) || state.artists[0] || null
    },
    // 統一所有的作品攤平邏輯，並加上狀態 filter
    allListedArtworks(state): Artwork[] {
      return state.artists
        .flatMap(artist =>
          (artist.artworks || []).flatMap(series =>
            (series.artworkIds || []).map(art => ({
              ...art,
              markets: {
                marketCap: Number(art.markets?.marketCap ?? 0),
                change24h: art.markets?.change24h ?? 0,
                change7d: art.markets?.change7d ?? 0,
                floorPrice: art.markets?.floorPrice ?? 0,
                hasIcon: art.markets?.hasIcon ?? false,
                owners: Number(art.markets?.owners ?? 0),
                totalSupply: art.markets?.totalSupply ?? 0,
                isOpen: art.markets?.isOpen ?? false,
              },
            })),
          ),
        )
        .filter(art => art.isListed === true)
    },

    // 這裡使用 this 存取上面的 getter，完全不需要 any
    topTenArtworks(): Artwork[] {
      return [...this.allListedArtworks]
        .sort((a, b) => b.markets!.marketCap - a.markets!.marketCap)
        .slice(0, 10)
    },
  },
  actions: {
    async fetchAll() {
      if (this.artists.length > 0) return

      this.artists = await nftApi.getAllArtists()

      // 統一將處理邏輯放在這裡，之後 getAllListedArtworks 就能直接用 cachedAllArtworks
      this.cachedAllArtworks = this.artists
        .flatMap(artist =>
          (artist.artworks || []).flatMap(series =>
            (series.artworkIds || []).map(art => ({
              ...art,
              markets: {
                marketCap: Number(art.markets?.marketCap ?? 0),
                change24h: art.markets?.change24h ?? 0,
                change7d: art.markets?.change7d ?? 0,
                floorPrice: art.markets?.floorPrice ?? 0,
                hasIcon: art.markets?.hasIcon ?? false,
                owners: Number(art.markets?.owners ?? 0),
                totalSupply: art.markets?.totalSupply ?? 0,
                isOpen: art.markets?.isOpen ?? false,
              },
            })),
          ),
        )
        .filter(art => art.isListed === true)
    },

    // 取得分頁資料的 Action
    getArtworksByPage(page: number, limit: number): Artwork[] {
      const start = (page - 1) * limit
      return this.cachedAllArtworks.slice(start, start + limit)
    },

    // 取得總數，方便組件判斷是否載入完畢
    getTotalArtworkCount(): number {
      return this.cachedAllArtworks.length
    },
  },
})

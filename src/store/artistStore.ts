import { defineStore } from 'pinia'
import { nftApi, type Artist } from '@/api/artist'

export const useArtistStore = defineStore('artist', {
  state: () => ({
    artists: [] as Artist[],
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
  },
  actions: {
    async fetchAll() {
      this.artists = await nftApi.getAllArtists()
    },
  },
})

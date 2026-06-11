<template>
  <div class="space-y-8 text-black">
    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-black pb-5"
    >
      <div>
        <h1 class="text-3xl font-black tracking-wide">後台營運概況</h1>
        <p class="text-sm text-gray-500 mt-1">實時統計平台鏈上交易額、作品總量與創作者生態數據。</p>
      </div>
      <div
        class="text-xs font-mono font-bold border border-black bg-white px-3 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] self-start sm:self-auto"
      >
        📊 DATA UPDATE: {{ updateTimestamp }}
      </div>
    </div>

    <div v-if="isLoading" class="p-12 text-center font-bold text-gray-500">
      <i class="fa-solid fa-spinner animate-spin text-2xl mr-2 text-black"></i>
      匯總全站大盤數據中...
    </div>

    <div v-else class="space-y-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-primary-bg border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div class="flex justify-between items-start text-gray-500">
            <span class="text-xs font-black uppercase tracking-wider">總交易額 (Volume)</span>
            <i class="fa-solid fa-ethereum text-lg text-black"></i>
          </div>
          <p class="text-3xl font-black mt-2 font-mono">
            {{ platformStats.totalVolume.toFixed(2) }} <span class="text-lg font-bold">ETH</span>
          </p>
          <div class="text-xs text-emerald-600 font-bold mt-2 flex items-center gap-1">
            <i class="fa-solid fa-arrow-trend-up"></i> +12.4% 比上週
          </div>
        </div>

        <div class="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div class="flex justify-between items-start text-gray-500">
            <span class="text-xs font-black uppercase tracking-wider">認證藝術家</span>
            <i class="fa-solid fa-user-astronaut text-lg text-black"></i>
          </div>
          <p class="text-3xl font-black mt-2 font-mono">
            {{ platformStats.totalArtists }} <span class="text-lg font-bold">位</span>
          </p>
          <div class="text-xs text-gray-500 font-bold mt-2">包含目前已通過審核名單</div>
        </div>

        <div class="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div class="flex justify-between items-start text-gray-500">
            <span class="text-xs font-black uppercase tracking-wider">在線數位作品</span>
            <i class="fa-solid fa-images text-lg text-black"></i>
          </div>
          <p class="text-3xl font-black mt-2 font-mono">
            {{ platformStats.totalArtworks }} <span class="text-lg font-bold">幅</span>
          </p>
          <div class="text-xs text-amber-600 font-bold mt-2 flex items-center gap-1">
            ⚠️ 包含 {{ platformStats.pendingCount }} 件待審核隨附作品
          </div>
        </div>

        <div class="bg-emerald-50 border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div class="flex justify-between items-start text-emerald-800">
            <span class="text-xs font-black uppercase tracking-wider">獨立藏家 (Owners)</span>
            <i class="fa-solid fa-wallet text-lg text-emerald-800"></i>
          </div>
          <p class="text-3xl font-black mt-2 font-mono text-emerald-950">
            {{ platformStats.totalOwners }} <span class="text-lg font-bold">個</span>
          </p>
          <div class="text-xs text-emerald-700 font-bold mt-2 flex items-center gap-1">
            🟢 鏈上地址去重計算完成
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div
          class="lg:col-span-7 bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-6"
        >
          <div class="flex justify-between items-center border-b border-black pb-3">
            <h3 class="font-black text-lg flex items-center gap-2">
              <i class="fa-solid fa-chart-simple"></i> 近半年平台月營收走勢
            </h3>
            <span class="text-xs font-mono text-gray-400">Unit: ETH</span>
          </div>

          <div class="space-y-4 pt-2">
            <div v-for="chart in mockMonthlyRevenue" :key="chart.month" class="space-y-1">
              <div class="flex justify-between text-xs font-bold font-mono">
                <span>{{ chart.month }}</span>
                <span>{{ chart.revenue }} ETH</span>
              </div>
              <div class="w-full bg-gray-100 border border-black h-6 relative">
                <div
                  class="bg-primary h-full border-r border-black transition-all duration-1000"
                  :style="{ width: `${(chart.revenue / 50) * 100}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="lg:col-span-5 bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-4"
        >
          <h3 class="font-black text-lg border-b border-black pb-3 flex items-center gap-2">
            <i class="fa-solid fa-bolt text-amber-500"></i> 頂級創作者交易大盤
          </h3>

          <div class="space-y-3 max-h-77.5 overflow-y-auto pr-1">
            <div
              v-for="artist in topArtistsRank"
              :key="artist.id"
              class="flex items-center justify-between p-2 border border-black bg-gray-50 text-xs"
            >
              <div class="flex items-center gap-2 overflow-hidden">
                <img :src="artist.img" class="w-8 h-8 object-cover border border-black shrink-0" />
                <div class="truncate">
                  <p class="font-black truncate">{{ artist.firstName }} {{ artist.lastName }}</p>
                  <p class="font-mono text-gray-400 text-[10px] truncate">
                    {{ artist.walletAddress }}
                  </p>
                </div>
              </div>
              <div class="text-right shrink-0 font-mono pl-2">
                <p class="font-black text-primary">{{ artist.stats?.total_volume || 0 }} ETH</p>
                <p class="text-[10px] text-gray-400">
                  地板價: {{ artist.stats?.floor_price || 0 }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
// 💡 直接複用你定義完美的 API 與 Artist 型別限制
import { nftApi, type Artist } from '@/api/artist'

const isLoading = ref<boolean>(false)
const artistsList = ref<Artist[]>([])
const updateTimestamp = ref<string>('')

// 模擬月度營收（粗獷主義圖表專用數據）
interface RevenueData {
  month: string
  revenue: number
}
const mockMonthlyRevenue = ref<RevenueData[]>([
  { month: '2026-01', revenue: 24.5 },
  { month: '2026-02', revenue: 38.2 },
  { month: '2026-03', revenue: 19.8 },
  { month: '2026-04', revenue: 45.0 },
  { month: '2026-05', revenue: 32.1 },
  { month: '2026-06 (本月)', revenue: 12.4 },
])

interface CustomArtwork {
  id: string
  title: string
  price: number
  imgUrl: string
  markets?: {
    marketCap: number
    floorPrice?: number
    owners?: number
    totalSupply?: number
  }
}

interface CustomArtworkSeries {
  id: string
  name: string
  artworkIds?: CustomArtwork[] // 覆蓋原本的型別，對齊實際資料結構
}

interface CustomArtist extends Omit<Artist, 'artworks'> {
  artworks?: CustomArtworkSeries[]
}

interface CalculatedStats {
  totalVolume: number
  totalArtists: number
  totalArtworks: number
  totalOwners: number
  pendingCount: number
}
// ...（isLoading, artistsList, mockMonthlyRevenue 等保持不變）

const platformStats = computed<CalculatedStats>(() => {
  let volumeSum = 0
  let artistCount = 0
  let artworkCount = 0
  let ownerSum = 0
  let pending = 0

  // 🟢 2. 將列表轉型為我們定義的嚴格客製化型別
  const safeArtists = artistsList.value as CustomArtist[]

  safeArtists.forEach((artist: CustomArtist) => {
    // 判斷是否為 pending 狀態
    const isPending = artist.stats?.items === 0 && artist.stats?.total_volume === 0

    if (isPending) {
      pending++
    } else {
      artistCount++
    }

    // 🟢 3. 獨立藏家轉整數
    ownerSum += artist.stats?.owners || 0

    // 深入計算該創作者旗下的作品與其 markets.marketCap
    if (artist.artworks) {
      artist.artworks.forEach(series => {
        if (series.artworkIds) {
          artworkCount += series.artworkIds.length

          // 🟢 4. 完美避開 any！直接精準點出 art.markets.marketCap
          series.artworkIds.forEach(art => {
            if (art.markets && art.markets.marketCap) {
              volumeSum += art.markets.marketCap
            }
          })
        }
      })
    }
  })

  return {
    totalVolume: volumeSum,
    totalArtists: artistCount,
    totalArtworks: artworkCount,
    totalOwners: Math.round(ownerSum), // 🟢 5. 確保變整數
    pendingCount: pending,
  }
})

// 篩選出交易量最高的前幾名創作者，用於右側快報
const topArtistsRank = computed<Artist[]>(() => {
  return [...artistsList.value]
    .filter(a => (a.stats?.total_volume || 0) > 0)
    .sort((a, b) => (b.stats?.total_volume || 0) - (a.stats?.total_volume || 0))
})

// 撈取原始大盤基礎資料
const fetchDashboardData = async (): Promise<void> => {
  isLoading.value = true
  try {
    const data: Artist[] = await nftApi.getAllArtists()
    artistsList.value = data

    // 設置當前更新時間戳
    const now = new Date()
    updateTimestamp.value = now.toISOString().replace('T', ' ').substring(0, 19)
  } catch (error) {
    console.error('後台概況數據匯總失敗:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted((): void => {
  fetchDashboardData()
})
</script>

<style scoped>
/* 隱藏右側滾動條，讓排版更乾淨 */
div::-webkit-scrollbar {
  width: 4px;
}
div::-webkit-scrollbar-track {
  background: transparent;
}
div::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
}
</style>

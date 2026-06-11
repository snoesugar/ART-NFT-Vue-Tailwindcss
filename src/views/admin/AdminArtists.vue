<template>
  <div class="space-y-6 text-black">
    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-black pb-5"
    >
      <div>
        <h1 class="text-3xl font-black tracking-wide">藝術家入駐審核</h1>
        <p class="text-sm text-gray-500 mt-1">管理與驗證創作者的入駐申請、合約地址與作品系列。</p>
      </div>

      <div
        class="flex border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] self-start sm:self-auto"
      >
        <button
          @click="setFilter('pending')"
          class="px-4 py-2 font-bold text-sm transition-all focus:outline-none"
          :class="
            currentFilter === 'pending' ? 'bg-primary text-white font-black' : 'hover:bg-primary-bg'
          "
        >
          待審核 ({{ pendingCount }})
        </button>
        <button
          @click="setFilter('approved')"
          class="px-4 py-2 font-bold text-sm border-l-2 border-black transition-all focus:outline-none"
          :class="
            currentFilter === 'approved'
              ? 'bg-emerald-500 text-white font-black'
              : 'hover:bg-primary-bg'
          "
        >
          已通過 ({{ approvedCount }})
        </button>
      </div>
    </div>

    <div v-if="isLoading" class="p-12 text-center font-bold text-gray-500">
      <i class="fa-solid fa-spinner animate-spin text-2xl mr-2 text-black"></i> 讀取申請資料中...
    </div>

    <div
      v-else-if="filteredArtists.length === 0"
      class="border-2 border-dashed border-gray-300 rounded-none p-12 text-center text-gray-400 font-bold bg-white"
    >
      目前沒有任何{{ currentFilter === 'pending' ? '待審核的申請' : '已通過的藝術家' }}。
    </div>

    <!-- 右邊詳細資訊 -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <div class="lg:col-span-4 space-y-3 pr-2">
        <div
          v-for="artist in filteredArtists"
          :key="artist.id"
          @click="selectArtist(artist)"
          class="p-4 bg-white border-2 border-black cursor-pointer transition-all flex items-center justify-between"
          :class="
            selectedArtist?.id === artist.id
              ? 'shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] translate-x-0.5 translate-y-0.5 bg-primary-bg'
              : 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-50'
          "
        >
          <div class="flex items-center gap-3 overflow-hidden">
            <img
              :src="artist.img || 'https://placehold.co/150'"
              class="w-12 h-12 border border-black object-cover shrink-0"
              alt="avatar"
            />
            <div class="truncate text-sm">
              <h3 class="text-base truncate">{{ artist.firstName }} {{ artist.lastName }}</h3>
              <p class="text-gray-500 font-mono truncate mt-0.5">{{ artist.walletAddress }}</p>
            </div>
          </div>
          <i class="fa-solid fa-chevron-right text-gray-400 pl-2"></i>
        </div>
      </div>

      <div
        v-if="selectedArtist"
        class="lg:col-span-8 bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-6"
      >
        <div
          class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border-b border-black pb-4"
        >
          <div class="flex items-center gap-4">
            <img
              :src="selectedArtist.img"
              class="w-16 h-16 border-2 border-black object-cover"
              alt="artist big avatar"
            />
            <div>
              <h2 class="text-2xl font-black">
                {{ selectedArtist.firstName }} {{ selectedArtist.lastName }}
              </h2>
              <span
                class="inline-block text-xs font-bold px-2 py-0.5 mt-1 border border-black"
                :class="
                  selectedArtist.stats && selectedArtist.stats.items > 0
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                "
              >
                {{
                  selectedArtist.stats && selectedArtist.stats.items > 0
                    ? '已有作品系列'
                    : '全新申請'
                }}
              </span>
            </div>
          </div>

          <div v-if="currentFilter === 'pending'" class="flex gap-2 w-full sm:w-auto">
            <button
              @click="handleReject(selectedArtist.id)"
              class="flex-1 sm:flex-none px-4 py-2 border border-black font-bold text-sm bg-white hover:bg-red-50 text-red-600 transition"
            >
              拒絕申請
            </button>
            <button
              @click="handleApprove(selectedArtist)"
              class="flex-1 sm:flex-none px-4 py-2 border-2 border-black font-black text-sm bg-primary text-white hover:bg-opacity-90 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition"
            >
              通過審核
            </button>
          </div>
          <div
            v-else
            class="text-emerald-600 font-black flex items-center gap-1 text-sm border border-emerald-600 px-3 py-1 bg-emerald-50"
          >
            <i class="fa-solid fa-circle-check"></i> 已認證創作者
          </div>
        </div>

        <div class="space-y-4 text-sm">
          <div>
            <h4 class="font-bold text-gray-500 uppercase tracking-wider text-xs">
              錢包地址 (Wallet Address)
            </h4>
            <p class="font-mono bg-gray-50 border border-gray-300 p-2 mt-1 break-all select-all">
              {{ selectedArtist.walletAddress }}
            </p>
          </div>

          <div>
            <h4 class="font-bold text-gray-500 uppercase tracking-wider text-xs">
              合約地址 (Contract Address)
            </h4>
            <p class="font-mono bg-gray-50 border border-gray-300 p-2 mt-1 break-all select-all">
              {{ selectedArtist.contractAddress || '尚未部署合約' }}
            </p>
          </div>

          <div>
            <h4 class="font-bold text-gray-500 uppercase tracking-wider text-xs">
              藝術家簡介 (Description)
            </h4>
            <p
              class="text-gray-700 leading-relaxed mt-1 whitespace-pre-line bg-primary-bg/30 p-3 border border-black border-dashed"
            >
              {{
                selectedArtist.description || selectedArtist.desc || '該藝術家尚未填寫詳細介紹。'
              }}
            </p>
          </div>
        </div>

        <div class="border-t border-black pt-4">
          <h4 class="font-black text-md mb-3 flex items-center gap-2">
            <i class="fa-solid fa-images"></i>
            申請隨附系列作品 ({{ selectedArtist.artworks?.length || 0 }})
          </h4>

          <div
            v-if="!selectedArtist.artworks || selectedArtist.artworks.length === 0"
            class="text-gray-400 text-sm italic"
          >
            此申請未夾帶任何預收錄系列。
          </div>

          <div v-else class="space-y-4">
            <div
              v-for="series in selectedArtist.artworks"
              :key="series.id"
              class="border border-black p-3 bg-gray-50"
            >
              <h5 class="font-bold text-sm text-black flex items-center justify-between">
                <span>🎨 系列名稱：{{ series.name }}</span>
                <span class="text-xs text-gray-500"
                  >共 {{ series.artworkIds?.length || 0 }} 幅作品</span
                >
              </h5>
              <p class="text-xs text-gray-500 mt-1 line-clamp-2">{{ series.description }}</p>

              <div
                v-if="series.artworkIds && series.artworkIds.length > 0"
                class="grid grid-cols-4 sm:grid-cols-6 gap-2 mt-3"
              >
                <div
                  v-for="art in series.artworkIds"
                  :key="art.id"
                  class="aspect-square border border-black relative group overflow-hidden bg-white"
                  :title="art.title"
                >
                  <img :src="art.imgUrl" class="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-else
        class="lg:col-span-7 border-2 border-dashed border-gray-300 p-12 text-center text-gray-400 font-bold bg-white"
      >
        請從左側點擊選擇一位藝術家以檢視詳細審核資料。
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
// 💡 正確載入定義好的型別與 API
import { nftApi, type Artist, type ArtworkSeries } from '@/api/artist'

// 定義頁籤型別限制
type FilterType = 'pending' | 'approved'

const currentFilter = ref<FilterType>('pending')
const artistsList = ref<Artist[]>([])
const selectedArtist = ref<Artist | null | undefined>(null)
const isLoading = ref<boolean>(false)

// 切換頁籤的 Function
const setFilter = (filter: FilterType): void => {
  currentFilter.value = filter
}

// 選擇單一藝術家的 Function
const selectArtist = (artist: Artist): void => {
  selectedArtist.value = artist
}

// 💡 根據你的 TS 限制安全篩選列表
const filteredArtists = computed<Artist[]>(() => {
  return artistsList.value.filter((artist: Artist) => {
    // 判定是否為待審核 (項目數為 0 且 交易量為 0)
    const isPending: boolean = artist.stats?.items === 0 && artist.stats?.total_volume === 0
    return currentFilter.value === 'pending' ? isPending : !isPending
  })
})

// 計算待審核總數
const pendingCount = computed<number>(() => {
  return artistsList.value.filter((artist: Artist) => {
    return artist.stats?.items === 0 && artist.stats?.total_volume === 0
  }).length
})

// 💡 新增：計算已通過總數
const approvedCount = computed<number>(() => {
  return artistsList.value.filter((artist: Artist) => {
    // 與 pending 邏輯完全相反，代表已通過審核
    return !(artist.stats?.items === 0 && artist.stats?.total_volume === 0)
  }).length
})

// 💡 優化：封裝「預設選中過濾後第一筆資料」的重複邏輯，型別宣告為 void
const autoSelectFirst = (): void => {
  if (filteredArtists.value.length > 0) {
    selectedArtist.value = filteredArtists.value[0]
  } else {
    selectedArtist.value = null
  }
}

// 當切換頁籤時，自動更新選中的藝術家
watch(currentFilter, (): void => {
  autoSelectFirst()
})

// 撈取資料
const fetchArtists = async (): Promise<void> => {
  isLoading.value = true
  try {
    const data: Artist[] = await nftApi.getAllArtists()
    artistsList.value = data

    // 💡 呼叫封裝好的優化函式
    autoSelectFirst()
  } catch (error) {
    console.error('撈取藝術家資料失敗:', error)
  } finally {
    // 💡 已將原本手誤打錯的 final 修正為標準的 finally
    isLoading.value = false
  }
}

// 【按鈕事件】通過審核
const handleApprove = async (artist: Artist) => {
  if (!confirm(`確定要通過 ${artist.firstName} ${artist.lastName} 的入駐申請嗎？`)) return

  try {
    // 計算隨附作品總數，用以寫入更新
    const totalArtworksCount: number =
      artist.artworks?.reduce(
        (acc: number, cur: ArtworkSeries) => acc + (cur.artworkIds?.length || 0),
        0,
      ) || 1

    // 建立完全符合 Artist 型別的更新資料
    const updatedData: Artist = {
      ...artist,
      stats: {
        items: totalArtworksCount,
        owners: 1,
        floor_price: 0.1,
        total_volume: 0.1, // 更新大於 0 的數值使其脫離 pending
      },
    }

    await nftApi.updateArtist(artist.id, updatedData)
    alert('審核通過！已成功將該創作者加入平台認證名單。')
    await fetchArtists()
  } catch (error) {
    console.error(error)
    alert('更新審核狀態失敗，請稍後再試。')
  }
}

// 【按鈕事件】拒絕申請
const handleReject = async (id: string): Promise<void> => {
  if (!confirm('確定要拒絕並刪除這筆入駐申請嗎？此操作無法復原。')) return

  try {
    await nftApi.deleteArtist(id)
    alert('已拒絕該申請，並移出審核序列。')
    await fetchArtists()
  } catch (error) {
    console.error(error)
    alert('刪除申請失敗。')
  }
}

onMounted((): void => {
  fetchArtists()
})
</script>

<style scoped>
div::-webkit-scrollbar {
  width: 6px;
}
div::-webkit-scrollbar-track {
  background: transparent;
}
div::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 0px;
}
</style>

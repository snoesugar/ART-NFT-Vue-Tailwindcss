<template>
  <div class="bg-primary-bg min-h-screen text-black">
    <!-- 藝術家介紹 -->
    <div class="container mx-auto px-3 md:px-8 pt-6 md:pt-10 pb-10 md:pb-20">
      <!-- 💡 加上 v-if 確保 API 資料撈回來了才渲染，避免噴 undefined 錯誤 -->
      <div
        v-if="currentArtist"
        class="flex flex-col md:flex-row gap-4 md:gap-6 mx-auto items-stretch"
      >
        <div
          class="flex-1 flex flex-col sm:flex-row border border-black bg-white overflow-hidden shadow-sm"
        >
          <div class="w-full sm:w-[42%] min-h-60 md:min-h-full relative">
            <!-- 💡 圖片路徑改吃 API 的動態網址 -->
            <img
              v-if="currentArtist.img"
              :src="getImageUrl(currentArtist.img)"
              :alt="currentArtist?.firstName"
              class="w-full h-full object-cover absolute inset-0"
            />
          </div>

          <div class="p-4 md:p-6 flex-1 flex flex-col justify-between">
            <div>
              <div class="flex justify-between items-center mb-2 md:mb-4">
                <!-- 💡 名字改吃動態資料 -->
                <h2 class="text-3xl md:text-5xl">{{ currentArtist.firstName }}</h2>
                <div class="flex gap-2 md:text-lg">
                  <i class="fab fa-discord cursor-pointer hover:opacity-70"></i>
                  <i class="fab fa-facebook cursor-pointer hover:opacity-70"></i>
                  <i class="fas fa-globe cursor-pointer hover:opacity-70"></i>
                  <i class="fab fa-twitter cursor-pointer hover:opacity-70"></i>
                </div>
              </div>

              <p class="mb-6">{{ currentArtist.walletAddress }}</p>

              <!-- 💡 簡介改吃動態資料 -->
              <p class="leading-relaxed font-normal font-display">
                {{ currentArtist.description }}
              </p>
            </div>
          </div>
        </div>

        <div
          class="w-full md:w-76.5 flex flex-col justify-between bg-white border border-black divide-y divide-black"
        >
          <div class="flex justify-between items-center py-4 px-6">
            <span class="font-bold">{{ currentArtist.marketStats.status }}</span>
            <span class="text-3xl">{{ currentArtist.marketStats.itemCount }}</span>
          </div>

          <div class="flex justify-between items-center py-4 px-6">
            <span class="font-bold">地板價格</span>
            <div class="flex items-baseline gap-1">
              <span class="text-3xl">{{ currentArtist.marketStats.floorPrice.value }}</span>
              <span class="text-2xl">{{ currentArtist.marketStats.floorPrice.currency }}</span>
            </div>
          </div>

          <div class="flex justify-between items-center py-4 px-6">
            <span class="font-bold">7 日成交</span>
            <div class="flex items-baseline gap-1">
              <span class="text-3xl">{{ currentArtist.marketStats.volume7d.value }}</span>
              <span class="text-2xl">{{ currentArtist.marketStats.volume7d.currency }}</span>
            </div>
          </div>

          <div class="flex justify-between items-center py-4 px-6">
            <span class="font-bold">30 日成交</span>
            <div class="flex items-baseline gap-1">
              <span class="text-3xl">{{ currentArtist.marketStats.volume30d.value }}</span>
              <span class="text-2xl">{{ currentArtist.marketStats.volume30d.currency }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 藝術家作品 -->
    <div class="container mx-auto px-3 md:px-8">
      <!-- 按鈕 -->
      <div class="relative flex items-end border-b border-black">
        <button
          @click="activeTab = 'art'"
          class="flex items-baseline px-4 md:px-12 py-4 focus:outline-none"
          :class="[
            activeTab === 'art'
              ? 'bg-primary-bg border-x border-t border-black relative -mb-px rounded-t'
              : 'text-secondary hover:text-black',
          ]"
        >
          <span
            class="text-3xl md:text-5xl"
            :class="activeTab === 'art' ? 'text-black' : 'text-secondary'"
            >Art Works</span
          >
          <span
            class="ml-3 font-bold text-xl hidden md:block"
            :class="activeTab === 'art' ? 'text-black' : 'text-secondary'"
            >系列作品</span
          >
        </button>

        <button
          @click="activeTab = 'collection'"
          class="flex items-baseline px-4 md:px-12 py-4 focus:outline-none"
          :class="[
            activeTab === 'collection'
              ? 'bg-primary-bg border-x border-t border-black relative -mb-px rounded-t'
              : 'text-secondary hover:text-black',
          ]"
        >
          <span
            class="text-3xl md:text-5xl"
            :class="activeTab === 'collection' ? 'text-black' : 'text-secondary'"
            >Collection</span
          >
          <span
            class="ml-3 font-bold text-xl hidden md:block"
            :class="activeTab === 'collection' ? 'text-black' : 'text-secondary'"
            >收藏品</span
          >
        </button>
      </div>

      <!-- 藝術家原生系列作品區 (保持原樣) -->
      <div v-if="activeTab === 'art'">
        <div class="pt-6 md:pt-10 pb-10 md:pb-20">
          <div class="flex flex-col gap-4 md:gap-10">
            <div
              v-for="(series, index) in currentArtist?.artworks || []"
              :key="series.id || index"
              class="relative flex flex-col"
            >
              <div
                class="relative bg-white border border-black px-4 md:px-28 pt-8 md:pt-12 pb-8 md:pb-58 z-10"
              >
                <div class="absolute top-0 left-0 w-6 h-6 bg-black clip-triangle-tl"></div>
                <div class="absolute top-0 right-0 w-6 h-6 bg-black clip-triangle-tr"></div>

                <div
                  class="flex flex-col md:flex-row justify-between items-center md:items-end gap-4 md:gap-6"
                >
                  <div class="max-w-190">
                    <h2 class="text-2xl font-bold mb-4">{{ series.name }}</h2>
                    <p>
                      {{ series.description }}
                    </p>
                  </div>
                  <div
                    class="block md:hidden border-10 bg-white aspect-square overflow-hidden shadow-md group cursor-pointer"
                  >
                    <img
                      src="../../public/the-new-york-public-library-vBejyCBXZBY-unsplash.jpg"
                      alt="Flower 1"
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <Button
                    :to="{
                      path: '/filter',
                      query: {
                        seriesId: series.id,
                        artistId: currentArtist?.id,
                      },
                    }"
                  ></Button>
                </div>
              </div>

              <div
                v-if="series.artworkIds && series.artworkIds.length > 0"
                class="hidden md:grid grid-cols-4 gap-4 px-4 md:px-28 -mt-8 md:-mt-45 z-20"
              >
                <div
                  v-for="art in series.artworkIds.slice(0, 4)"
                  :key="art.id"
                  class="border-10 bg-white aspect-square overflow-hidden shadow-md group cursor-pointer"
                >
                  <img
                    :src="getImageUrl(art.imgUrl)"
                    :alt="art.title"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 收藏品區 (已改為動態循環) -->
      <div v-if="activeTab === 'collection'">
        <div class="pt-6 md:pt-10 pb-10 md:pb-20">
          <div class="columns-2 md:columns-4 gap-6">
            <div
              v-for="item in artworks"
              :key="item.id"
              class="break-inside-avoid mb-6 cursor-pointer"
            >
              <div
                class="relative bg-white p-2 md:p-4 border border-gray-200 shadow-sm overflow-hidden"
              >
                <img
                  :src="getImageUrl(item.imgUrl)"
                  :alt="item.title"
                  class="w-full min-h-34.75 md:min-h-63.5 h-auto object-cover"
                />

                <div
                  class="absolute inset-0 bg-black/70 opacity-0 hover:opacity-100 transition duration-300 flex flex-col justify-between p-4 m-4"
                >
                  <div class="border border-white p-4 h-full flex flex-col">
                    <div class="text-white">
                      <p class="mb-4 whitespace-pre-line">
                        {{ item.description }}
                      </p>

                      <div class="flex gap-2">
                        <i class="fa-brands fa-ethereum"></i>
                        {{ item.price }}
                      </div>
                    </div>

                    <Button
                      :to="{ name: 'ArtworkIntroduction', params: { id: item.id } }"
                      class="mt-auto ml-auto"
                    />
                  </div>
                </div>
              </div>

              <div class="mt-2 md:mt-4 md:border-b border-black md:font-bold pb-2 md:pb-4">
                {{ item.title }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue' // ⭕ 拿掉沒用到的 onMounted
import { useRoute } from 'vue-router'
import { nftApi, type Artist, type Artwork } from '@/api/artist' // 💡 統一改從全新的 api/artist 引入
import { useLoadingStore } from '@/store/loading'
import Button from '@/components/Button.vue'

const baseUrl = import.meta.env.VITE_BASE_URL || '/ART-NFT-Vue-Tailwindcss/'

// 安全拼接圖片網址的 function
const getImageUrl = (imgName: string | undefined) => {
  if (!imgName) return ''
  const base = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
  const name = imgName.startsWith('/') ? imgName.slice(1) : imgName
  return `${base}/${name}`
}

const route = useRoute()
const activeTab = ref('art')

const currentArtist = ref<Artist | null>(null)
const artworks = ref<Artwork[]>([])
const { show, hide } = useLoadingStore()

// 💡 預設的藝術家 ID（如果網址沒傳，預設看第一位）
const DEFAULT_ARTIST_ID = 'qtwvbe'

// 🛠️ 核心邏輯：從新的巢狀結構中抓取對應藝術家與其作品
const fetchArtistData = async (artistId: string) => {
  try {
    show()
    // 1. 一口氣撈取所有藝術家大陣列
    const allArtists = await nftApi.getAllArtists()

    // 2. 找到目前網址對應的藝術家
    const foundArtist = allArtists.find(artist => artist.id === artistId)

    if (foundArtist) {
      currentArtist.value = foundArtist

      // 3. 直接從藝術家身上把作品陣列（artworks）拿給收藏品區（Collection）渲染
      artworks.value = foundArtist.artworks.flatMap(series => series.artworkIds)
    } else {
      console.warn(`找不到 ID 為 ${artistId} 的藝術家，載入防呆首位藝術家...`)
      // 防呆：如果找不到該 ID，預設拿第一筆藝術家
      if (allArtists.length > 0) {
        currentArtist.value = allArtists[0] || null
        artworks.value = allArtists[0]?.artworks.flatMap(series => series.artworkIds) || []
      }
    }
  } catch (error) {
    console.error('切換藝術家資料失敗:', error)
  } finally {
    hide() // 💡 4. 無論成功或失敗，結束時關閉 Loading
  }
}

// 💡 監聽路由變化（有 immediate: true，所以元件掛載時會自動跑第一次，不需寫 onMounted）
watch(
  () => route.params.id,
  newId => {
    const targetId = (newId as string) || DEFAULT_ARTIST_ID

    // 每次路由改變時先清空，優雅觸發 Skeleton Loading 動畫
    currentArtist.value = null
    artworks.value = []

    // 重新撈取新藝術家的完整資料
    fetchArtistData(targetId)
  },
  { immediate: true },
)
</script>

<style scoped>
.clip-triangle-tl {
  clip-path: polygon(0 0, 100% 0, 0 100%);
}
.clip-triangle-tr {
  clip-path: polygon(0 0, 100% 0, 100% 100%);
}
</style>

<template>
  <div class="bg-primary-bg min-h-screen text-black">
    <!-- 藝術家介紹 -->
    <div class="container mx-auto px-3 lg:px-8 pt-6 lg:pt-10 pb-10 lg:pb-20">
      <!-- 💡 加上 v-if 確保 API 資料撈回來了才渲染，避免噴 undefined 錯誤 -->
      <div
        v-if="currentArtist"
        class="flex flex-col lg:flex-row gap-4 lg:gap-6 mx-auto items-stretch"
      >
        <div
          class="flex-1 flex flex-col sm:flex-row border border-black bg-white overflow-hidden shadow-sm"
        >
          <div class="w-full sm:w-[42%] min-h-60 lg:min-h-full relative">
            <!-- 💡 圖片路徑改吃 API 的動態網址 -->
            <img
              v-if="currentArtist.img"
              :src="getImageUrl(currentArtist.img)"
              :alt="currentArtist?.firstName"
              class="w-full h-full object-cover absolute inset-0"
            />
          </div>

          <div class="p-4 lg:p-6 flex-1 flex flex-col justify-between">
            <div>
              <div class="flex justify-between items-center mb-2 lg:mb-4">
                <!-- 💡 名字改吃動態資料 -->
                <h2 class="text-3xl lg:text-5xl">{{ currentArtist.firstName }}</h2>
                <div class="flex gap-2 lg:text-lg">
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
          class="w-full lg:w-76.5 flex flex-col justify-between bg-white border border-black divide-y divide-black"
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
    <div class="container mx-auto px-3 lg:px-8">
      <!-- 按鈕 -->
      <div class="relative flex items-end border-b border-black">
        <button
          @click="activeTab = 'art'"
          class="flex items-baseline px-4 lg:px-12 py-4 focus:outline-none"
          :class="[
            activeTab === 'art'
              ? 'bg-primary-bg border-x border-t border-black relative -mb-px rounded-t'
              : 'text-secondary hover:text-black',
          ]"
        >
          <span
            class="text-3xl lg:text-5xl"
            :class="activeTab === 'art' ? 'text-black' : 'text-secondary'"
            >Art Works</span
          >
          <span
            class="ml-3 font-bold text-xl hidden lg:block"
            :class="activeTab === 'art' ? 'text-black' : 'text-secondary'"
            >系列作品</span
          >
        </button>

        <button
          @click="activeTab = 'collection'"
          class="flex items-baseline px-4 lg:px-12 py-4 focus:outline-none"
          :class="[
            activeTab === 'collection'
              ? 'bg-primary-bg border-x border-t border-black relative -mb-px rounded-t'
              : 'text-secondary hover:text-black',
          ]"
        >
          <span
            class="text-3xl lg:text-5xl"
            :class="activeTab === 'collection' ? 'text-black' : 'text-secondary'"
            >Collection</span
          >
          <span
            class="ml-3 font-bold text-xl hidden lg:block"
            :class="activeTab === 'collection' ? 'text-black' : 'text-secondary'"
            >收藏品</span
          >
        </button>
      </div>

      <!-- 藝術家原生系列作品區 (保持原樣) -->
      <div v-if="activeTab === 'art'">
        <div class="pt-6 lg:pt-10 pb-10 lg:pb-20">
          <div class="flex flex-col gap-4 lg:gap-10">
            <div
              v-for="(series, index) in currentArtist?.artworks || []"
              :key="series.id || index"
              class="relative flex flex-col"
            >
              <div
                class="relative bg-white border border-black px-4 lg:px-28 pt-8 lg:pt-12 pb-8 lg:pb-58 z-10"
              >
                <div class="absolute top-0 left-0 w-6 h-6 bg-black clip-triangle-tl"></div>
                <div class="absolute top-0 right-0 w-6 h-6 bg-black clip-triangle-tr"></div>

                <div
                  class="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-4 lg:gap-6"
                >
                  <div class="max-w-190">
                    <h2 class="text-2xl font-bold mb-4">{{ series.name }}</h2>
                    <p>
                      {{ series.description }}
                    </p>
                  </div>
                  <div
                    v-for="art in series.artworkIds.slice(0, 1)"
                    :key="art.id"
                    class="block lg:hidden border-10 bg-white aspect-square overflow-hidden shadow-lg group cursor-pointer"
                  >
                    <img
                      :src="getImageUrl(art.imgUrl)"
                      :alt="art.title"
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
                class="hidden lg:grid grid-cols-4 gap-4 px-4 lg:px-28 -mt-8 lg:-mt-45 z-20"
              >
                <div
                  v-for="art in series.artworkIds.slice(0, 4)"
                  :key="art.id"
                  class="border-10 bg-white aspect-square overflow-hidden shadow-lg group cursor-pointer"
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
        <div class="pt-6 lg:pt-10 pb-10 lg:pb-20">
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 items-start">
            <div
              v-for="(col, colIndex) in collectionColumns"
              :key="colIndex"
              class="flex flex-col gap-6"
            >
              <div
                v-for="item in col"
                :key="item.id"
                class="cursor-pointer fade-in-up"
                :style="{ '--animation-order': item.globalIndex }"
              >
                <div
                  class="relative bg-white p-2 lg:p-4 border border-gray-200 shadow-sm overflow-hidden"
                >
                  <img
                    :src="getImageUrl(item.imgUrl)"
                    :alt="item.title"
                    class="w-full h-auto min-h-34.75 lg:min-h-70 object-cover"
                  />

                  <div class="hidden lg:block">
                    <div
                      class="absolute inset-0 bg-black/70 opacity-0 hover:opacity-100 transition duration-300 flex flex-col justify-between p-4 m-4"
                    >
                      <div class="border border-white p-4 h-full flex flex-col">
                        <div class="text-white">
                          <p class="mb-4 whitespace-pre-line">{{ item.description }}</p>
                          <div class="flex gap-2">
                            <i class="fa-brands fa-ethereum"></i> {{ item.price }}
                          </div>
                        </div>
                        <Button
                          :to="{ name: 'ArtworkIntroduction', params: { id: item.id } }"
                          class="mt-auto ml-auto"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="block lg:hidden">
                    <router-link
                      :to="{ name: 'ArtworkIntroduction', params: { id: item.id } }"
                      class="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    >
                      <span class="text-white text-lg font-black tracking-tighter">MORE</span>
                      <div
                        class="absolute bottom-0 right-0 h-0 w-0 border-8 border-l-transparent border-t-transparent border-b-primary border-r-primary group-hover:border-b-primary group-hover:border-r-primary transition-colors duration-300 ease-in-out"
                      ></div>
                    </router-link>
                  </div>
                </div>

                <div class="mt-2 lg:mt-4 lg:border-b border-black lg:font-bold pb-2 lg:pb-4">
                  {{ item.title }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useArtistStore } from '@/store/artistStore'
import { useLoadingStore } from '@/store/loading'
import Button from '@/components/Button.vue'
import type { Artwork } from '@/api/artist'

const route = useRoute()
const artistStore = useArtistStore()
const { show, hide } = useLoadingStore()
// 從 store 中取出 currentArtist，並確保其響應性
const { currentArtist } = storeToRefs(artistStore)

const activeTab = ref('art')
const baseUrl = import.meta.env.VITE_BASE_URL || '/ART-NFT-Vue-Tailwindcss/'

const getImageUrl = (imgName: string | undefined) => {
  if (!imgName) return ''
  const base = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
  const name = imgName.startsWith('/') ? imgName.slice(1) : imgName
  return `${base}/${name}`
}

// 監聽路由變化，驅動 Store 同步
watch(
  () => route.params.id,
  async newId => {
    show()
    try {
      // 1. 確保所有資料已載入
      await artistStore.fetchAll()
      // 2. 更新 Store 內的 ID，Getter 會自動更新 currentArtist
      artistStore.currentArtistId = (newId as string) || 'qtwvbe'
    } catch (error) {
      console.error('資料載入失敗:', error)
    } finally {
      hide()
    }
  },
  { immediate: true },
)

// --- 排列卡片邏輯 ---
const isMobile = ref(false)
const checkScreenSize = () => (isMobile.value = window.innerWidth < 768)

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})
onUnmounted(() => window.removeEventListener('resize', checkScreenSize))

// 定義帶有動畫索引的型別
interface AnimatedArtwork extends Artwork {
  globalIndex: number
}

// 使用 computed 從 store 的當前藝術家衍生出作品列表
const collectionColumns = computed(() => {
  const colCount = isMobile.value ? 2 : 4
  const columns: AnimatedArtwork[][] = Array.from({ length: colCount }, () => [])

  // 透過 currentArtist 取得作品
  const list = currentArtist.value?.artworks.flatMap(s => s.artworkIds) || []

  list.forEach((item, index) => {
    const colIndex = index % colCount
    const animatedItem = {
      ...item,
      globalIndex: index,
    } as AnimatedArtwork

    // 使用驚嘆號或預設值確保 TypeScript 不會報 undefined 紅線
    columns[colIndex]?.push(animatedItem)
  })
  return columns
})
</script>

<style scoped>
.clip-triangle-tl {
  clip-path: polygon(0 0, 100% 0, 0 100%);
}
.clip-triangle-tr {
  clip-path: polygon(0 0, 100% 0, 100% 100%);
}
</style>

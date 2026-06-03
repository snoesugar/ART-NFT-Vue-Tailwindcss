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
              :src="`${baseUrl}${currentArtist.img}`"
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

      <!-- 💡 資料載入中的骨架屏或提示（選填，體驗更好） -->
      <div v-else class="text-center py-10">
        <p class="text-secondary animate-pulse">正在與區塊鏈藝術家連線中...</p>
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
            <div class="relative flex flex-col">
              <div
                class="relative bg-white border border-black px-4 md:px-28 pt-8 md:pt-12 pb-8 md:pb-58 z-10"
              >
                <div class="absolute top-0 left-0 w-6 h-6 bg-black clip-triangle-tl"></div>
                <div class="absolute top-0 right-0 w-6 h-6 bg-black clip-triangle-tr"></div>

                <div
                  class="flex flex-col md:flex-row justify-between items-center md:items-end gap-4 md:gap-6"
                >
                  <div class="max-w-190">
                    <h2 class="text-2xl font-bold mb-4">追求者送我的花</h2>
                    <p>
                      我又沒有特別喜歡花，為什麼不給我現金就好，擺在那也不知道要幹嘛，只好畫起來看有沒有人要買，阿不然如果真的喜歡我，把這些都買回去八。
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
                  <Button></Button>
                </div>
              </div>

              <div class="hidden md:grid grid-cols-4 gap-4 px-4 md:px-28 -mt-8 md:-mt-45 z-20">
                <div
                  class="border-10 bg-white aspect-square overflow-hidden shadow-md group cursor-pointer"
                >
                  <img
                    src="../../public/the-new-york-public-library-vBejyCBXZBY-unsplash.jpg"
                    alt="Flower 1"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div
                  class="border-10 bg-white aspect-square overflow-hidden shadow-md group cursor-pointer"
                >
                  <img
                    src="../../public/art30.jpg"
                    alt="Flower 2"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div
                  class="border-10 bg-white aspect-square overflow-hidden shadow-md group cursor-pointer"
                >
                  <img
                    src="../../public/art14.jpg"
                    alt="Flower 3"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div
                  class="border-10 bg-white aspect-square overflow-hidden shadow-md group cursor-pointer"
                >
                  <img
                    src="../../public/art29.jpg"
                    alt="Flower 4"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>

            <!-- 第二個作品區 -->
            <div class="relative flex flex-col">
              <div
                class="relative bg-white border border-black px-4 md:px-28 pt-8 md:pt-12 pb-8 md:pb-58 z-10"
              >
                <div class="absolute top-0 left-0 w-6 h-6 bg-black clip-triangle-tl"></div>
                <div class="absolute top-0 right-0 w-6 h-6 bg-black clip-triangle-tr"></div>

                <div
                  class="flex flex-col md:flex-row justify-between items-center md:items-end gap-4 md:gap-6"
                >
                  <div class="max-w-190">
                    <h2 class="text-2xl font-bold mb-4">我家窗前的鳥</h2>
                    <p>
                      家門前每天都有不同的小鳥，大多數的小鳥都有特殊能力，特殊能力是什麼我就不說了，希望大家能從作品感受到小鳥的快樂。
                    </p>
                  </div>
                  <div
                    class="block md:hidden border-10 bg-white aspect-square overflow-hidden shadow-md group cursor-pointer"
                  >
                    <img
                      src="../../public/art27.jpg"
                      alt="Bird 1"
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <Button to="/filter"></Button>
                </div>
              </div>

              <div class="hidden md:grid grid-cols-4 gap-4 px-4 md:px-28 -mt-8 md:-mt-45 z-20">
                <div
                  class="border-10 bg-white aspect-square overflow-hidden shadow-md group cursor-pointer"
                >
                  <img
                    src="../../public/art27.jpg"
                    alt="Bird 1"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div
                  class="border-10 bg-white aspect-square overflow-hidden shadow-md group cursor-pointer"
                >
                  <img
                    src="../../public/art20.jpg"
                    alt="Bird 2"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div
                  class="border-10 bg-white aspect-square overflow-hidden shadow-md group cursor-pointer"
                >
                  <img
                    src="../../public/art26.jpg"
                    alt="Bird 3"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div
                  class="border-10 bg-white aspect-square overflow-hidden shadow-md group cursor-pointer"
                >
                  <img
                    src="../../public/art22.jpg"
                    alt="Bird 4"
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
                  :src="`${baseUrl}${item.imgUrl}`"
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

                    <Button class="mt-auto ml-auto" />
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
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { artistApi, type Artist } from '@/api/artist'
import { artworkApi, type Artwork } from '@/api/artwork'
import Button from '@/components/Button.vue'

const baseUrl = import.meta.env.VITE_BASE_URL || '/ART-NFT-Vue-Tailwindcss/'

const route = useRoute()
const activeTab = ref('art')

const currentArtist = ref<Artist | null>(null)
const artworks = ref<Artwork[]>([])

// 💡 定義一個預設的 ID（改用你新對應的英文字串，例如第一個藝術家 Antony）
const DEFAULT_ARTIST_ID = 'qtwvbe'

const fetchArtistData = async (artistId: string) => {
  try {
    // 1. 撈取該藝術家資料
    const artistData = await artistApi.getById(artistId)
    currentArtist.value = artistData

    // 2. 撈取所有作品，並過濾出該藝術家的作品
    const allArtworks = await artworkApi.getAll()
    artworks.value = allArtworks.filter(art => art.artistId === artistId)
  } catch (error) {
    console.error('切換藝術家資料失敗:', error)
  }
}

onMounted(() => {
  // 💡 將原本的 '1' 改為新英文字串預設值
  const id = (route.params.id as string) || DEFAULT_ARTIST_ID
  fetchArtistData(id)
})

// 💡 監聽路由變化
watch(
  () => route.params.id,
  newId => {
    // 💡 將原本的 '1' 改為新英文字串預設值
    const targetId = (newId as string) || (route.params.id as string) || DEFAULT_ARTIST_ID

    // 每次路由改變或重新整理時，先將舊資料清空，避免畫面殘留前一個藝術家的圖片
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

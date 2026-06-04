<template>
  <div class="bg-primary-bg">
    <!-- 💡 加上 v-if 確保作品與藝術家資料都從 API 載入完成才渲染 -->
    <div v-if="currentArtwork && currentArtist" class="container px-3 md:px-8 pt-6 md:pt-10 pb-4">
      <!-- 藝術品介紹 -->
      <div class="flex flex-col md:flex-row gap-6">
        <div class="basis-1/2">
          <!-- 💡 圖片改吃 API 動態網址 -->
          <img
            class="w-full h-72 md:h-136.5 object-cover"
            :src="getImageUrl(currentArtwork.imgUrl)"
            :alt="currentArtwork.title"
          />
        </div>
        <div class="basis-1/2">
          <div class="bg-white h-full">
            <div class="p-4 md:p-10 border-b">
              <div class="flex flex-col-reverse md:flex-row justify-between gap-2 md:gap-6 mb-4">
                <!-- 💡 標題改吃動態資料 -->
                <h1 class="text-3xl md:text-5xl font-bold">{{ currentArtwork.title }}</h1>
                <div class="flex flex-row items-center gap-2">
                  <!-- 💡 創作者大頭貼與名字動態化 -->
                  <img
                    class="w-8 h-8 object-cover rounded-full"
                    :src="getImageUrl(currentArtist.img)"
                    :alt="currentArtist.firstName"
                  />
                  <p>{{ currentArtist.firstName }}</p>
                </div>
              </div>
              <p class="text-secondary text-sm mb-2">最高出價</p>
              <div class="flex flex-row justify-between">
                <div class="flex flex-row items-center gap-2">
                  <img
                    class="w-8 h-8 object-cover rounded-full"
                    :src="getImageUrl(currentArtist.img)"
                    alt=""
                  />
                  <i class="fa-solid fa-arrow-right"></i>
                  <span>0.044Eth</span>
                </div>
                <button class="bg-primary text-white px-12 py-2 border border-black">出價</button>
              </div>
            </div>
            <!-- 💡 敘述改吃動態資料，並用 whitespace-pre-line 處理換行 -->
            <div
              class="font-display p-4 md:p-10 space-y-4 whitespace-pre-line text-base leading-relaxed"
            >
              {{ currentArtwork.description }}
            </div>
          </div>
        </div>
      </div>

      <!-- 藝術品資料 -->
      <div class="pt-6">
        <div class="md:columns-2 gap-6 space-y-6 [column-fill:balance]">
          <!-- 屬性 -->
          <div class="bg-white border break-inside-avoid inline-block w-full mb-6">
            <button
              @click="isOpenProperty = !isOpenProperty"
              class="flex w-full justify-between items-center font-bold p-4 md:p-6 focus:outline-none"
            >
              <span>屬性</span>
              <i
                class="fa-solid fa-angle-down transition-transform duration-300"
                :class="{ 'rotate-180': isOpenProperty }"
              ></i>
            </button>
            <div
              class="grid transition-[grid-template-rows] duration-300 ease-in-out"
              :class="isOpenProperty ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
            >
              <div class="overflow-hidden min-h-0">
                <div class="px-4 md:px-6 py-6 border-t">
                  <div class="flex flex-col gap-2">
                    <!-- 💡 屬性分類動態讀取 (若 API 含有 categories 陣列則渲染，否則顯示預設) -->
                    <div class="flex justify-between items-center pb-2 border-b border-primary-bg">
                      <span>品種</span>
                      <span class="text-secondary">{{
                        currentArtwork.categories?.[0] || '青藍金剛鸚鵡'
                      }}</span>
                    </div>
                    <div class="flex justify-between items-center pb-2 border-b border-primary-bg">
                      <span>鳥的數量</span>
                      <span class="text-secondary font-display">2隻</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span>鳥的顏色</span>
                      <span class="text-secondary">{{
                        currentArtwork.categories?.[1] || '藍色'
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 基本資訊 -->
          <div class="bg-white border break-inside-avoid inline-block w-full mb-6">
            <button
              @click="isOpenData = !isOpenData"
              class="flex w-full justify-between items-center font-bold p-4 md:p-6 focus:outline-none"
            >
              <span>基本資訊</span>
              <i
                class="fa-solid fa-angle-down transition-transform duration-300"
                :class="{ 'rotate-180': isOpenData }"
              ></i>
            </button>
            <div
              class="grid transition-[grid-template-rows] duration-300 ease-in-out"
              :class="isOpenData ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
            >
              <div class="overflow-hidden min-h-0">
                <div class="px-4 md:px-6 py-6 border-t">
                  <div class="flex flex-col gap-2">
                    <div class="flex justify-between items-center pb-2 border-b border-primary-bg">
                      <span>擁有者</span><span class="text-secondary">0xa543x…1283</span>
                    </div>
                    <div class="flex justify-between items-center pb-2 border-b border-primary-bg">
                      <span>代幣ID</span
                      ><span class="text-secondary font-display">#{{ currentArtwork.id }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span>合約地址</span><span class="text-secondary">青藍金剛鸚鵡</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 出價歷史 (維持原樣) -->
          <div class="bg-white border break-inside-avoid inline-block w-full mb-6">
            <button
              @click="isOpenPrice = !isOpenPrice"
              class="flex w-full justify-between items-center font-bold p-4 md:p-6 focus:outline-none"
            >
              <span>出價</span>
              <i
                class="fa-solid fa-angle-down transition-transform duration-300"
                :class="{ 'rotate-180': isOpenPrice }"
              ></i>
            </button>
            <div
              class="grid transition-[grid-template-rows] duration-300 ease-in-out"
              :class="isOpenPrice ? 'grid-rows-[1fr] border-t' : 'grid-rows-[0fr]'"
            >
              <div class="overflow-hidden min-h-0">
                <div class="px-4 md:px-6 py-6">
                  <div class="flex flex-col gap-2">
                    <div
                      class="flex flex-row items-center bg-primary-bg text-center md:text-start text-sm px-4 py-2 gap-4"
                    >
                      <p class="basis-1/2">價格</p>
                      <p class="basis-1/2">期限</p>
                    </div>
                    <div
                      class="flex flex-row items-center px-4 pb-2 gap-4 border-b border-primary-bg"
                    >
                      <div class="basis-1/2">
                        <div class="flex flex-row items-center gap-2">
                          <img
                            class="w-8 h-8 object-cover rounded-full"
                            src="../../public/artist03.jpg"
                            alt=""
                          />
                          <i class="fa-solid fa-arrow-right"></i>
                          <span>0.044Eth</span>
                        </div>
                      </div>
                      <p class="basis-1/2 text-secondary font-display text-end md:text-start">
                        3個月後
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 交易歷史 (維持原樣) -->
          <div class="bg-white border break-inside-avoid inline-block w-full mb-6">
            <button
              @click="isOpenTrade = !isOpenTrade"
              class="flex w-full justify-between items-center font-bold p-4 md:p-6 focus:outline-none"
            >
              <span>交易歷史</span>
              <i
                class="fa-solid fa-angle-down transition-transform duration-300"
                :class="{ 'rotate-180': isOpenTrade }"
              ></i>
            </button>
            <div
              class="grid transition-[grid-template-rows] duration-300 ease-in-out"
              :class="isOpenTrade ? 'grid-rows-[1fr] border-t' : 'grid-rows-[0fr]'"
            >
              <div class="overflow-hidden min-h-0">
                <div class="px-4 md:px-6 py-6">
                  <div class="flex flex-col gap-2 text-center md:text-start">
                    <div class="flex flex-row items-center bg-primary-bg px-4 py-2 gap-4">
                      <p class="basis-1/5 md:basis-1/7">事件</p>
                      <p class="basis-1/5 md:basis-1/7">價格</p>
                      <p class="basis-1/5 md:basis-3/7">從</p>
                      <p class="basis-2/5 md:basis-2/7">時間</p>
                    </div>
                    <div
                      class="flex flex-row items-center px-4 pb-2 gap-4 border-b border-primary-bg"
                    >
                      <p class="basis-1/5 md:basis-1/7">上架</p>
                      <p class="basis-1/5 md:basis-1/7 font-display">2nb</p>
                      <div class="basis-1/5 md:basis-3/7">
                        <div
                          class="flex flex-row justify-center md:justify-start items-center gap-2"
                        >
                          <img
                            class="w-6 h-6 object-cover rounded-full"
                            src="../../public/artist02.jpg"
                            alt="artist02"
                          />
                          <span class="hidden md:block">Antony WU</span>
                        </div>
                      </div>
                      <p class="basis-2/5 md:basis-2/7 text-secondary font-display">14小時前</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 💡 資料讀取中的優雅 Skeleton -->
    <div v-else class="text-center py-20 bg-white">
      <p class="text-secondary animate-bounce text-lg">載入藝術品星系中...</p>
    </div>

    <!-- other 其餘作品區 -->
    <div class="container px-4 md:px-8">
      <div class="flex flex-row items-end border-b border-black pb-2 md:pb-4">
        <h2 class="text-3xl md:text-5xl mr-4 leading-none">Other</h2>
        <span class="text-xl font-bold leading-none hidden md:block">其餘作品</span>
        <Button class="ml-auto -mb-2 md:-mb-4" :isPrimaryBg="true" :hasBorder="false">MORE</Button>
      </div>
      <div class="pt-6 md:pt-10 pb-10 md:pb-20">
        <!-- 💡 輪播資料改吃動態篩選後的 otherArtworks -->
        <swiper
          v-if="otherArtworks.length"
          :modules="modules"
          :breakpoints="{
            0: { slidesPerView: 2 },
            768: { slidesPerView: 4 },
          }"
          :space-between="24"
          :loop="otherArtworks.length >= 4"
          :autoplay="{ delay: 4000, disableOnInteraction: false }"
          :pagination="{ clickable: true }"
          class="artist-swiper pb-4! md:pb-14!"
        >
          <swiper-slide v-for="item in otherArtworks" :key="item.id">
            <div class="mb-6 cursor-pointer">
              <div
                class="relative bg-white p-2 md:p-6 border border-gray-200 shadow-sm overflow-hidden"
              >
                <img
                  :src="getImageUrl(item.imgUrl)"
                  :alt="item.title"
                  class="w-full h-41 md:h-81.75 object-cover"
                />
                <div
                  class="absolute inset-0 bg-black/70 opacity-0 hover:opacity-100 transition duration-300 flex flex-col justify-between p-4 m-4"
                >
                  <div class="border border-white p-4 h-full flex flex-col">
                    <div class="text-white">
                      <p class="mb-4 whitespace-pre-line text-sm leading-snug">
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
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue' // ⭕ 補上 watch
import { useRoute } from 'vue-router'
import { artistApi, type Artist } from '@/api/artist'
import { artworkApi, type Artwork } from '@/api/artwork'
import Button from '@/components/Button.vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

const modules = [Autoplay, Pagination]
const route = useRoute()

// 折疊面板狀態
const isOpenProperty = ref(true)
const isOpenPrice = ref(true)
const isOpenData = ref(true)
const isOpenTrade = ref(true)

// 響應式資料狀態
const currentArtwork = ref<Artwork | undefined>(undefined)
const currentArtist = ref<Artist | undefined>(undefined)
const otherArtworks = ref<Artwork[]>([])

// GitHub Pages 或是環境變數路徑
const baseUrl = import.meta.env.VITE_BASE_URL || '/ART-NFT-Vue-Tailwindcss/'

// 安全拼接圖片網址的 function
const getImageUrl = (imgName: string | undefined) => {
  if (!imgName) return ''
  const base = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
  const name = imgName.startsWith('/') ? imgName.slice(1) : imgName
  return `${base}/${name}`
}

// 💡 預設的作品 ID（如果網址沒傳，預設看第 1 件）
const DEFAULT_ARTWORK_ID = '1'

// 💡 核心邏輯：根據作品 ID 撈取所有關聯資料
const loadPageData = async (artworkId: string) => {
  try {
    // 1. 撈取全部作品資料
    const allArtworks = await artworkApi.getAll()

    // 2. 找到目前點擊的這件作品
    const foundArtwork = allArtworks.find(art => art.id === artworkId)

    if (foundArtwork) {
      currentArtwork.value = foundArtwork

      // 3. 根據這件作品的 artistId，撈出對應的藝術家資料
      if (foundArtwork.artistId) {
        currentArtist.value = await artistApi.getById(foundArtwork.artistId)

        // 4. 同時找出「這位藝術家的其他作品」放在底下的 Swiper 輪播（排除掉當前畫面上這件）
        otherArtworks.value = allArtworks.filter(
          art => art.artistId === foundArtwork.artistId && art.id !== artworkId,
        )
      }
    } else {
      console.warn(`找不到 ID 為 ${artworkId} 的作品，嘗試載入防呆資料...`)
      // 防呆：如果找不到該 ID，預設拿第一筆
      if (allArtworks.length > 0) {
        currentArtwork.value = allArtworks[0]
        otherArtworks.value = allArtworks.slice(1)
        if (allArtworks[0]?.artistId) {
          currentArtist.value = await artistApi.getById(allArtworks[0].artistId)
        }
      }
    }
  } catch (error) {
    console.error('資料載入失敗:', error)
  }
}

// 💡 監聽路由變化：當使用者在 Other 區點擊其他作品切換路由時，重新撈資料
watch(
  () => route.params.id,
  newId => {
    const targetId = (newId as string) || DEFAULT_ARTWORK_ID

    // 清空舊狀態，觸發 Template 的優雅 Skeleton 讀取畫面
    currentArtwork.value = undefined
    currentArtist.value = undefined
    otherArtworks.value = []

    loadPageData(targetId)
  },
  { immediate: true }, // 這裡設定 true，元件掛載時（onMounted 階段）就會自動執行第一次
)
</script>

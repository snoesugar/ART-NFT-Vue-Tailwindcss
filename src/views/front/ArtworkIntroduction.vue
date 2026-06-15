<template>
  <div class="bg-primary-bg">
    <!-- 💡 加上 v-if 確保作品與藝術家資料都從 API 載入完成才渲染 -->
    <div v-if="currentArtwork && currentArtist" class="container px-3 lg:px-8 pt-6 lg:pt-10 pb-4">
      <!-- 藝術品介紹 -->
      <div class="flex flex-col lg:flex-row gap-6">
        <div class="basis-1/2">
          <!-- 💡 圖片改吃 API 動態網址 -->
          <img
            class="w-full h-72 lg:h-136.5 object-cover"
            :src="getImageUrl(currentArtwork.imgUrl)"
            :alt="currentArtwork.title"
          />
        </div>
        <div class="basis-1/2">
          <div class="bg-white h-full">
            <div class="p-4 lg:p-10 border-b">
              <div class="flex flex-col-reverse lg:flex-row justify-between gap-2 lg:gap-6 mb-4">
                <!-- 💡 標題改吃動態資料 -->
                <h1 class="text-3xl lg:text-5xl font-bold">{{ currentArtwork.title }}</h1>
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
              class="font-display p-4 lg:p-10 space-y-4 whitespace-pre-line text-base leading-relaxed"
            >
              {{ currentArtwork.description }}
            </div>
          </div>
        </div>
      </div>

      <!-- 藝術品資料 -->
      <div class="pt-6">
        <div class="lg:columns-2 gap-6 space-y-6 [column-fill:balance]">
          <!-- 屬性 -->
          <div
            v-if="currentArtwork.attributes && currentArtwork.attributes.length > 0"
            class="bg-white border break-inside-avoid inline-block w-full mb-6"
          >
            <button
              @click="isOpenProperty = !isOpenProperty"
              class="flex w-full justify-between items-center font-bold p-4 lg:p-6 focus:outline-none"
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
                <div class="px-4 lg:px-6 py-6 border-t">
                  <div class="flex flex-col gap-2">
                    <!-- 💡 屬性分類動態讀取 (若 API 含有 categories 陣列則渲染，否則顯示預設) -->
                    <div
                      v-for="(attr, index) in currentArtwork.attributes"
                      :key="index"
                      class="flex justify-between items-center pb-2 border-b border-primary-bg"
                    >
                      <span>{{ attr.trait_type }}</span>
                      <span class="text-secondary">{{ attr.value }}</span>
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
              class="flex w-full justify-between items-center font-bold p-4 lg:p-6 focus:outline-none"
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
                <div class="px-4 lg:px-6 py-6 border-t">
                  <div class="flex flex-col gap-2">
                    <div class="flex justify-between items-center pb-2 border-b border-primary-bg">
                      <span>擁有者</span
                      ><span class="text-secondary">{{ currentArtist.walletAddress }}</span>
                    </div>
                    <div class="flex justify-between items-center pb-2 border-b border-primary-bg">
                      <span>代幣ID</span
                      ><span class="text-secondary font-display">#{{ currentArtwork.id }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span>合約地址</span>
                      <span
                        :class="{ 'truncate-text': !isExpanded }"
                        @click="isExpanded = !isExpanded"
                      >
                        {{ currentArtist.contractAddress }}
                      </span>
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
              class="flex w-full justify-between items-center font-bold p-4 lg:p-6 focus:outline-none"
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
                <div class="px-4 lg:px-6 py-6">
                  <div class="flex flex-col gap-2">
                    <div
                      class="flex flex-row items-center bg-primary-bg text-center lg:text-start text-sm px-4 py-2 gap-4"
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
                            src="/artist03.jpg"
                            alt=""
                          />
                          <i class="fa-solid fa-arrow-right"></i>
                          <span>0.044Eth</span>
                        </div>
                      </div>
                      <p class="basis-1/2 text-secondary font-display text-end lg:text-start">
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
              class="flex w-full justify-between items-center font-bold p-4 lg:p-6 focus:outline-none"
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
                <div class="px-4 lg:px-6 py-6">
                  <div class="flex flex-col gap-2 text-center lg:text-start">
                    <div class="flex flex-row items-center bg-primary-bg px-4 py-2 gap-4">
                      <p class="basis-1/5 lg:basis-1/7">事件</p>
                      <p class="basis-1/5 lg:basis-1/7">價格</p>
                      <p class="basis-1/5 lg:basis-3/7">從</p>
                      <p class="basis-2/5 lg:basis-2/7">時間</p>
                    </div>
                    <div
                      class="flex flex-row items-center px-4 pb-2 gap-4 border-b border-primary-bg"
                    >
                      <p class="basis-1/5 lg:basis-1/7">上架</p>
                      <p class="basis-1/5 lg:basis-1/7 font-display">2nb</p>
                      <div class="basis-1/5 lg:basis-3/7">
                        <div
                          class="flex flex-row justify-center lg:justify-start items-center gap-2"
                        >
                          <img
                            class="w-6 h-6 object-cover rounded-full"
                            src="/artist02.jpg"
                            alt="artist02"
                          />
                          <span class="hidden lg:block">Antony WU</span>
                        </div>
                      </div>
                      <p class="basis-2/5 lg:basis-2/7 text-secondary font-display">14小時前</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="isNotFound" class="container text-center py-20">
      <h2 class="text-2xl">找不到此藝術品</h2>
      <router-link to="/" class="text-primary underline">返回首頁</router-link>
    </div>

    <!-- other 其餘作品區 -->
    <div class="container px-4 lg:px-8">
      <div class="flex flex-row items-end border-b border-black pb-2 lg:pb-4">
        <h2 class="text-3xl lg:text-5xl mr-4 leading-none">Other</h2>
        <span class="text-xl font-bold leading-none hidden lg:block">其餘作品</span>
        <Button class="ml-auto -mb-2 lg:-mb-4" :isPrimaryBg="true" :hasBorder="false">MORE</Button>
      </div>
      <div class="pt-6 lg:pt-10 pb-10 lg:pb-20">
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
          class="artist-swiper pb-4! lg:pb-14!"
        >
          <swiper-slide v-for="item in otherArtworks" :key="item.id">
            <div class="mb-6 cursor-pointer">
              <div
                class="relative bg-white p-2 lg:p-6 border border-gray-200 shadow-sm overflow-hidden"
              >
                <img
                  :src="getImageUrl(item.imgUrl)"
                  :alt="item.title"
                  class="w-full h-41 lg:h-81.75 object-cover"
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
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useArtistStore } from '@/store/artistStore'
import { type Artist, type Artwork } from '@/api/artist'
import { useLoadingStore } from '@/store/loading'
import Button from '@/components/Button.vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

const modules = [Autoplay, Pagination]
const route = useRoute()
const artistStore = useArtistStore()
const { show, hide } = useLoadingStore()

// 折疊面板狀態
const isOpenProperty = ref(true)
const isOpenPrice = ref(true)
const isOpenData = ref(true)
const isOpenTrade = ref(true)
const isExpanded = ref(false) // 預設為縮合狀態

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

// 預設的作品 ID
const DEFAULT_ARTWORK_ID = '1'
const isNotFound = ref(false)

// 🛠️ 核心邏輯：從新的巢狀結構中撈取並比對資料
const loadPageData = async (id: string) => {
  show()
  isNotFound.value = false // 重置狀態
  try {
    // 1. 確保資料已在 Store 中
    if (artistStore.artists.length === 0) {
      await artistStore.fetchAll()
    }

    // 2. 透過 Getter 查找
    const data = artistStore.getArtworkDetail(id)

    if (data && data.artwork && data.artist) {
      currentArtwork.value = data.artwork
      currentArtist.value = data.artist

      // 3. 篩選其他作品，明確轉型以符合型別
      otherArtworks.value = data.artist.artworks
        .flatMap(s => s.artworkIds)
        .filter(art => art.id !== id)
    } else {
      isNotFound.value = true // 設定為失敗
      console.error(`找不到作品 ID: ${id}`)
      // 若找不到，建議跳轉回首頁或顯示錯誤訊息
    }
  } catch (error) {
    console.error('載入失敗:', error)
  } finally {
    hide()
  }
}

// 監聽路由變化：點擊下方 Swiper 切換作品時，自動清空並重新撈取
watch(
  () => route.params.id,
  newId => {
    const targetId = (newId as string) || DEFAULT_ARTWORK_ID

    // 清空舊狀態，順利觸發 Template 的 Loading 動畫
    currentArtwork.value = undefined
    currentArtist.value = undefined
    otherArtworks.value = []

    loadPageData(targetId)
  },
  { immediate: true },
)
</script>

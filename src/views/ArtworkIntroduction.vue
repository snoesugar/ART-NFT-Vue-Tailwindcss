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
            :src="currentArtwork.imgUrl"
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
                    :src="currentArtist.img"
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
                    src="../../public/user01.jpg"
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
                  :src="item.imgUrl"
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
                    <Button to="/artworkIntroduction" class="mt-auto ml-auto" />
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
import { ref, onMounted } from 'vue'
import { artistApi, type Artist } from '@/api/artist'
import { artworkApi, type Artwork } from '@/api/artwork'
import Button from '@/components/Button.vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

const modules = [Autoplay, Pagination]

// 折疊面板狀態
const isOpenProperty = ref(true)
const isOpenPrice = ref(true)
const isOpenData = ref(true)
const isOpenTrade = ref(true)

// 響應式資料狀態
const currentArtwork = ref<Artwork | undefined>(undefined)
const currentArtist = ref<Artist | undefined>(undefined)
const otherArtworks = ref<Artwork[]>([])

onMounted(async () => {
  try {
    // 1. 同步獲取所有作品資料
    const artworksData = await artworkApi.getAll()
    console.log('1. 後端回傳的所有作品清單:', artworksData)

    // 💡 防呆調整：如果陣列有資料，就直接抓第一件作品當作當前主角
    if (artworksData && artworksData.length > 0) {
      currentArtwork.value = artworksData[0] // 拿資料庫第一件（例如："區塊戀-他的私生活"）

      // 💡 剩下的作品（第 2 件到最後一件）全部塞給底下的「其餘作品」Swiper 輪播
      otherArtworks.value = artworksData.slice(1)
    } else {
      console.warn('警告：資料庫中沒有任何藝術品資料！')
    }

    // 2. 同步獲取所有藝術家資料
    const artistsData = await artistApi.getAll()
    console.log('2. 後端回傳的所有藝術家清單:', artistsData)

    // 💡 尋找創作者 Michael
    const targetArtist = artistsData.find(a => a.firstName === 'Michael')
    if (targetArtist) {
      currentArtist.value = targetArtist
    } else if (artistsData && artistsData.length > 0) {
      // 備用防呆：如果找不到 Michael，就先抓第一個藝術家頂替，避免畫面卡死
      currentArtist.value = artistsData[0]
    }

    // 3. 最終檢查確認狀態
    console.log('3. 最終檢查狀態:', {
      currentArtwork: currentArtwork.value,
      currentArtist: currentArtist.value,
      otherArtworksCount: otherArtworks.value.length,
    })
  } catch (error) {
    console.error('資料載入失敗，請檢查 JSON Server 是否啟動（Port 3003）：', error)
  }
})
</script>

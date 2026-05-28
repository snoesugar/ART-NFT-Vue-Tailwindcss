<template>
  <div class="bg-primary-bg">
    <div class="container px-8 pt-10 pb-4">
      <!-- 藝術品介紹 -->
      <div class="flex flex-row gap-6">
        <div class="basis-1/2">
          <img class="w-full h-136.5 object-cover" src="../../public/art21.jpg" alt="art21" />
        </div>
        <div class="basis-1/2">
          <div class="bg-white border h-full">
            <div class="py-10 px-10 border-b">
              <div class="flex flex-row justify-between gap-6 mb-4">
                <h1 class="text-5xl fond-bold">兩情相悅</h1>
                <div class="flex flex-row items-center gap-2">
                  <img
                    class="w-8 h-8 object-cover rounded-full"
                    src="../../public/artist01.jpg"
                    alt="artist01"
                  />
                  <p>Michael</p>
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
            <ul class="font-display py-10 px-10 space-y-4">
              <li>3/14情人節外面剛好有兩隻鳥，也在過情人節。</li>
              <li>
                而且其中一隻竟然有梳油頭，不知道是不是有用定型液，他們感情真好，出門還會特別打扮，看著看著不禁思考，我怎麼會變這樣？
              </li>
              <li>好羨慕啊，我也要有這樣兩情相悅的另一半。</li>
            </ul>
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
              class="flex w-full justify-between items-center font-bold p-6 focus:outline-none"
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
                <div class="px-6 py-6 border-t border-primary-bg">
                  <div class="flex flex-col gap-2">
                    <div class="flex justify-between items-center pb-2 border-b border-primary-bg">
                      <span>品種</span><span class="text-secondary">青藍金剛鸚鵡</span>
                    </div>
                    <div class="flex justify-between items-center pb-2 border-b border-primary-bg">
                      <span>鳥的數量</span><span class="text-secondary font-display">2隻</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span>鳥的顏色</span><span class="text-secondary">藍色</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 基本機訊 -->
          <div class="bg-white border break-inside-avoid inline-block w-full mb-6">
            <button
              @click="isOpenData = !isOpenData"
              class="flex w-full justify-between items-center font-bold p-6 focus:outline-none"
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
                <div class="px-6 py-6 border-t border-primary-bg">
                  <div class="flex flex-col gap-2">
                    <div class="flex justify-between items-center pb-2 border-b border-primary-bg">
                      <span>擁有者</span><span class="text-secondary">0xa543x…1283</span>
                    </div>
                    <div class="flex justify-between items-center pb-2 border-b border-primary-bg">
                      <span>代幣ID</span><span class="text-secondary font-display">#1234</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span>合約地址</span><span class="text-secondary">青藍金剛鸚鵡</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 出價 -->
          <div class="bg-white border break-inside-avoid inline-block w-full mb-6">
            <button
              @click="isOpenPrice = !isOpenPrice"
              class="flex w-full justify-between items-center font-bold p-6 focus:outline-none"
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
                <div class="px-6 py-6">
                  <div class="flex flex-col gap-2">
                    <div class="flex flex-row items-center bg-primary-bg text-sm px-4 py-2 gap-4">
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
                      <p class="basis-1/2 text-secondary font-display">3個月後</p>
                    </div>
                    <div
                      class="flex flex-row items-center px-4 pb-2 gap-4 border-b border-primary-bg"
                    >
                      <div class="basis-1/2">
                        <div class="flex flex-row items-center gap-2">
                          <img
                            class="w-8 h-8 object-cover rounded-full"
                            src="../../public/user02.jpg"
                            alt=""
                          />
                          <i class="fa-solid fa-arrow-right"></i>
                          <span>0.054Eth</span>
                        </div>
                      </div>
                      <p class="basis-1/2 text-secondary font-display">1個月後</p>
                    </div>
                    <div class="flex flex-row items-center px-4 pb-2 gap-4">
                      <div class="basis-1/2">
                        <div class="flex flex-row items-center gap-2">
                          <img
                            class="w-8 h-8 object-cover rounded-full"
                            src="../../public/user03.jpg"
                            alt=""
                          />
                          <i class="fa-solid fa-arrow-right"></i>
                          <span>0.054Eth</span>
                        </div>
                      </div>
                      <p class="basis-1/2 text-secondary font-display">2個月後</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 交易歷史 -->
          <div class="bg-white border break-inside-avoid inline-block w-full mb-6">
            <button
              @click="isOpenTrade = !isOpenTrade"
              class="flex w-full justify-between items-center font-bold p-6 focus:outline-none"
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
                <div class="px-6 py-6">
                  <div class="flex flex-col gap-2">
                    <div class="flex flex-row items-center bg-primary-bg px-4 py-2 gap-4">
                      <p class="basis-1/7">事件</p>
                      <p class="basis-1/7">價格</p>
                      <p class="basis-3/7">從</p>
                      <p class="basis-2/7">時間</p>
                    </div>
                    <div
                      class="flex flex-row items-center px-4 pb-2 gap-4 border-b border-primary-bg"
                    >
                      <p class="basis-1/7">上架</p>
                      <p class="basis-1/7 font-display">2nb</p>
                      <div class="basis-3/7">
                        <div class="flex flex-row items-center gap-2">
                          <img
                            class="w-6 h-6 object-cover rounded-full"
                            src="../../public/artist02.jpg"
                            alt="artist02"
                          />
                          <span>Antony WU</span>
                        </div>
                      </div>
                      <p class="basis-2/7 text-secondary font-display">14小時前</p>
                    </div>
                    <div class="flex flex-row items-center px-4 gap-4">
                      <p class="basis-1/7">出價</p>
                      <p class="basis-1/7 font-display">2nb</p>
                      <div class="basis-3/7">
                        <div class="flex flex-row items-center gap-2">
                          <img
                            class="w-6 h-6 object-cover rounded-full"
                            src="../../public/artist01.jpg"
                            alt="artist01"
                          />
                          <span>Antony WU</span>
                        </div>
                      </div>
                      <p class="basis-2/7 text-secondary font-display">2天前</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container px-8">
      <div class="flex flex-row items-end border-b border-black pb-2 md:pb-4">
        <h2 class="text-3xl md:text-5xl mr-4 leading-none">Other</h2>
        <span class="text-xl font-bold leading-none hidden md:block">其餘作品</span>
        <Button class="ml-auto -mb-2 md:-mb-4" :isPrimaryBg="true" :hasBorder="false">MORE</Button>
      </div>
      <div class="pt-10 pb-20">
        <swiper
          v-if="artworks.length"
          :modules="modules"
          :breakpoints="{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 4,
            },
          }"
          :space-between="24"
          :loop="true"
          :autoplay="{ delay: 4000, disableOnInteraction: false }"
          :pagination="{ clickable: true }"
          class="artist-swiper pb-40! md:pb-14!"
        >
          <swiper-slide v-for="item in artworks" :key="item.id">
            <div class="mb-6 cursor-pointer">
              <div
                class="relative bg-white p-2 md:p-6 border border-gray-200 shadow-sm overflow-hidden"
              >
                <img :src="item.imgUrl" :alt="item.title" class="w-full h-81.75 object-cover" />

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
import { ref } from 'vue'
import Button from '@/components/Button.vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'

// 引入 Swiper 核心與所需模組的 CSS
import 'swiper/css'
import 'swiper/css/pagination'

const modules = [Autoplay, Pagination]

const isOpenProperty = ref(true)
const isOpenPrice = ref(true)
const isOpenData = ref(true)
const isOpenTrade = ref(true)

const artworks = ref([
  {
    id: 1,
    title: '區塊戀-他的私生活',
    price: 300,
    description: '唯一想擁有的人，\n唯一不可以擁有的。',
    imgUrl: new URL('/art20.jpg', import.meta.url).href,
  },
  {
    id: 2,
    title: '與你分享的快樂勝過獨自擁有',
    price: 200,
    description: '如果悲傷可以變現，\n我早已是這座城市最富有的人。',
    imgUrl: new URL('/art23.jpg', import.meta.url).href,
  },
  {
    id: 3,
    title: '兩情相悅',
    price: 300,
    description: '禁果不是她摘的，\n但罪名往往留給最美的人。',
    imgUrl: new URL('/art21.jpg', import.meta.url).href,
  },
  {
    id: 4,
    title: '會唱metal的鳥',
    price: 200,
    description: '這句話跟「下次約吃飯」一樣，\n都是當代最大的謊言。',
    imgUrl: new URL('/art24.jpg', import.meta.url).href,
  },
  {
    id: 5,
    title: '群聚的小鳥們',
    price: 150,
    description: '把憂鬱倒進杯子裡，\n今晚我們在泡沫裡滅頂。',
    imgUrl: new URL('/art22.jpg', import.meta.url).href,
  },
  {
    id: 6,
    title: '一大一小兩個恰恰好',
    price: 200,
    description: '在被世界觀看之前，\n我早就對鏡子彩排了無數次。',
    imgUrl: new URL('/art25.jpg', import.meta.url).href,
  },
])
</script>

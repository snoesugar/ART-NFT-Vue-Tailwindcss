<template>
  <div class="bg-primary-bg min-h-screen text-black">
    <div class="relative container mx-auto px-3 md:px-8 pt-6 md:pt-10">
      <div class="flex flex-row gap-6 items-start">
        <div
          class="basis-1/4 bg-white font-display border border-black hidden md:flex flex-col select-none"
        >
          <!-- 網路 -->
          <div class="border-b border-secondary">
            <button
              @click="isOpenInternet = !isOpenInternet"
              class="flex w-full justify-between items-center font-bold px-6 py-4 focus:outline-none"
            >
              <span>網路</span>
              <i
                class="fa-solid fa-angle-down transition-transform duration-300"
                :class="{ 'rotate-180': isOpenInternet }"
              ></i>
            </button>
            <div v-show="isOpenInternet" class="px-6 pb-6 -mt-1">
              <div class="flex flex-col gap-2">
                <label class="flex justify-between items-center cursor-pointer group">
                  <span class="group-hover:text-gray-600">以太坊</span>
                  <input
                    type="checkbox"
                    value="ethereum"
                    v-model="selectedNetworks"
                    class="w-4 h-4 accent-black cursor-pointer"
                  />
                </label>
                <label class="flex justify-between items-center cursor-pointer group">
                  <span class="group-hover:text-gray-600">BNB 智能鏈</span>
                  <input
                    type="checkbox"
                    value="bsc"
                    v-model="selectedNetworks"
                    class="w-4 h-4 accent-black cursor-pointer"
                  />
                </label>
              </div>
            </div>
          </div>

          <!-- 狀態 -->
          <div class="border-b border-secondary">
            <button
              @click="isOpenState = !isOpenState"
              class="flex w-full justify-between items-center font-bold px-6 py-4 focus:outline-none"
            >
              <span>狀態</span>
              <i
                class="fa-solid fa-angle-down transition-transform duration-300"
                :class="{ 'rotate-180': isOpenState }"
              ></i>
            </button>

            <div v-show="isOpenState" class="px-6 pb-6 -mt-1">
              <div class="flex flex-col gap-2">
                <label class="flex justify-between items-center cursor-pointer group">
                  <span class="group-hover:text-gray-600">僅展示</span>
                  <input
                    type="checkbox"
                    value="showingOnly"
                    v-model="selectedState"
                    class="w-4 h-4 accent-black cursor-pointer"
                  />
                </label>
                <label class="flex justify-between items-center cursor-pointer group">
                  <span class="group-hover:text-gray-600">拍賣中</span>
                  <input
                    type="checkbox"
                    value="auction"
                    v-model="selectedState"
                    class="w-4 h-4 accent-black cursor-pointer"
                  />
                </label>
              </div>
            </div>
          </div>

          <!-- 價格 -->
          <div class="border-b border-secondary">
            <button
              @click="isOpenPrice = !isOpenPrice"
              class="flex w-full justify-between items-center font-bold px-6 py-4 focus:outline-none"
            >
              <span>價格</span>
              <i
                class="fa-solid fa-angle-down transition-transform duration-300"
                :class="{ 'rotate-180': isOpenPrice }"
              ></i>
            </button>

            <div v-show="isOpenPrice" class="px-6 pb-6 -mt-1">
              <div class="flex items-center gap-2 h-10">
                <div class="relative min-w-18.5 h-full">
                  <select
                    v-model="priceCurrency"
                    class="w-full h-full bg-white border border-secondary rounded-none pl-2 pr-6 appearance-none focus:outline-none cursor-pointer"
                  >
                    <option value="ETH">ETH</option>
                    <option value="WETH">WETH</option>
                  </select>
                  <i
                    class="fa-solid fa-angle-down text-xs absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
                  ></i>
                </div>

                <input
                  type="number"
                  placeholder="最小"
                  v-model="priceMin"
                  class="w-full h-full border border-secondary rounded-none px-2 text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />

                <span class="text-black flex items-center">─</span>

                <input
                  type="number"
                  placeholder="最大"
                  v-model="priceMax"
                  class="w-full h-full border border-secondary rounded-none px-2 text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>
          </div>

          <!-- 屬性 -->
          <div class="flex flex-col select-none">
            <div class="font-bold text-secondary px-6 pt-5 pb-2">屬性</div>

            <div>
              <button
                @click="isOpenBreed = !isOpenBreed"
                class="flex w-full justify-between items-center font-bold px-6 pt-4 pb-2 focus:outline-none"
              >
                <span>品種</span>
                <i
                  class="fa-solid fa-angle-down transition-transform duration-300"
                  :class="{ 'rotate-180': isOpenBreed }"
                ></i>
              </button>
              <div v-show="isOpenBreed" class="px-6 pb-4">
                <div class="flex flex-col gap-2">
                  <label class="flex justify-between items-center cursor-pointer group">
                    <span class="group-hover:text-gray-600">八哥</span>
                    <input
                      type="checkbox"
                      value="八哥"
                      v-model="selectedBreeds"
                      class="w-4 h-4 accent-black cursor-pointer"
                    />
                  </label>
                  <label class="flex justify-between items-center cursor-pointer group">
                    <span class="group-hover:text-gray-600">虎皮鸚鵡</span>
                    <input
                      type="checkbox"
                      value="虎皮鸚鵡"
                      v-model="selectedBreeds"
                      class="w-4 h-4 accent-black cursor-pointer"
                    />
                  </label>
                  <label class="flex justify-between items-center cursor-pointer group">
                    <span class="group-hover:text-gray-600">太平洋鳥</span>
                    <input
                      type="checkbox"
                      value="太平洋鳥"
                      v-model="selectedBreeds"
                      class="w-4 h-4 accent-black cursor-pointer"
                    />
                  </label>
                  <label class="flex justify-between items-center cursor-pointer group">
                    <span class="group-hover:text-gray-600">畫眉鳥</span>
                    <input
                      type="checkbox"
                      value="畫眉鳥"
                      v-model="selectedBreeds"
                      class="w-4 h-4 accent-black cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div>
              <button
                @click="isOpenBirdCount = !isOpenBirdCount"
                class="flex w-full justify-between items-center font-bold px-6 py-3 focus:outline-none"
              >
                <span>鳥的數量</span>
                <i
                  class="fa-solid fa-angle-down transition-transform duration-300"
                  :class="{ 'rotate-180': isOpenBirdCount }"
                ></i>
              </button>
              <div v-show="isOpenBirdCount" class="px-6 pb-4">
                <div class="flex flex-col gap-2">
                  <label class="flex justify-between items-center cursor-pointer group">
                    <span class="group-hover:text-gray-600">單隻</span>
                    <input
                      type="checkbox"
                      value="1"
                      v-model="selectedBirdCounts"
                      class="w-4 h-4 accent-black cursor-pointer"
                    />
                  </label>
                  <label class="flex justify-between items-center cursor-pointer group">
                    <span class="group-hover:text-gray-600">兩隻</span>
                    <input
                      type="checkbox"
                      value="2"
                      v-model="selectedBirdCounts"
                      class="w-4 h-4 accent-black cursor-pointer"
                    />
                  </label>
                  <label class="flex justify-between items-center cursor-pointer group">
                    <span class="group-hover:text-gray-600">三隻以上</span>
                    <input
                      type="checkbox"
                      value="3+"
                      v-model="selectedBirdCounts"
                      class="w-4 h-4 accent-black cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div>
              <button
                @click="isOpenHasPlants = !isOpenHasPlants"
                class="flex w-full justify-between items-center font-bold px-6 py-3 focus:outline-none"
              >
                <span>是否有花草</span>
                <i
                  class="fa-solid fa-angle-down transition-transform duration-300"
                  :class="{ 'rotate-180': isOpenHasPlants }"
                ></i>
              </button>
              <div v-show="isOpenHasPlants" class="px-6 pb-4">
                <div class="flex flex-col gap-2">
                  <label class="flex justify-between items-center cursor-pointer group">
                    <span class="group-hover:text-gray-600">有花草</span>
                    <input
                      type="checkbox"
                      value="yes"
                      v-model="selectedHasPlants"
                      class="w-4 h-4 accent-black cursor-pointer"
                    />
                  </label>
                  <label class="flex justify-between items-center cursor-pointer group">
                    <span class="group-hover:text-gray-600">純鳥類無花草</span>
                    <input
                      type="checkbox"
                      value="no"
                      v-model="selectedHasPlants"
                      class="w-4 h-4 accent-black cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div class="pb-4">
              <button
                @click="isOpenBirdColor = !isOpenBirdColor"
                class="flex w-full justify-between items-center font-bold px-6 py-3 focus:outline-none"
              >
                <span>鳥的顏色</span>
                <i
                  class="fa-solid fa-angle-down transition-transform duration-300"
                  :class="{ 'rotate-180': isOpenBirdColor }"
                ></i>
              </button>
              <div v-show="isOpenBirdColor" class="px-6 pb-4">
                <div class="flex flex-col gap-2">
                  <label class="flex justify-between items-center cursor-pointer group">
                    <span class="group-hover:text-gray-600">彩色 / 斑斕</span>
                    <input
                      type="checkbox"
                      value="colorful"
                      v-model="selectedColors"
                      class="w-4 h-4 accent-black cursor-pointer"
                    />
                  </label>
                  <label class="flex justify-between items-center cursor-pointer group">
                    <span class="group-hover:text-gray-600">單色 / 純白</span>
                    <input
                      type="checkbox"
                      value="monochrome"
                      v-model="selectedColors"
                      class="w-4 h-4 accent-black cursor-pointer"
                    />
                  </label>
                  <label class="flex justify-between items-center cursor-pointer group">
                    <span class="group-hover:text-gray-600">藍綠色系</span>
                    <input
                      type="checkbox"
                      value="blue-green"
                      v-model="selectedColors"
                      class="w-4 h-4 accent-black cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="basis-full md:basis-3/4">
          <div class="flex flex-row items-center mb-1">
            <img
              class="h-8 w-8 object-cover rounded-full"
              src="../../public/artist01.jpg"
              alt="artist01"
            />
            <span class="ml-4">Michael</span>
          </div>
          <div class="flex flex-col md:flex-row gap-4 md:gap-6 mb-10">
            <div class="basis-3/5">
              <h1 class="text-3xl font-bold mb-2">我家外面的鳥</h1>
              <p>
                家門前每天都有不同的小鳥，大多數的小鳥都有特殊能力，特殊能力是什麼我就不說了，希望大家能從作品感受到小鳥的快樂。
              </p>
            </div>
            <div class="basis-2/5">
              <div class="flex bg-white border">
                <div class="relative flex-1 py-4 px-2 border-r text-center">
                  <p>項目</p>
                  <p class="text-2xl">6.4 k</p>
                  <div
                    class="absolute bg-white px-1 py-6 top-1/2 right-0 -translate-y-1/2 translate-x-1/2"
                  ></div>
                </div>
                <div class="relative flex-1 py-4 px-2 border-r text-center">
                  <p>擁有者</p>
                  <p class="text-2xl">2.5 k</p>
                  <div
                    class="absolute bg-white px-1 py-6 top-1/2 right-0 -translate-y-1/2 translate-x-1/2"
                  ></div>
                </div>
                <div class="relative flex-1 py-4 px-2 border-r text-center">
                  <p>底價</p>
                  <p class="text-2xl"><i class="text-lg mr-1 fa-brands fa-ethereum"></i>1.38 k</p>
                  <div
                    class="absolute bg-white px-1 py-6 top-1/2 right-0 -translate-y-1/2 translate-x-1/2"
                  ></div>
                </div>
                <div class="relative flex-1 py-4 px-2 text-center">
                  <p>總額</p>
                  <p class="text-2xl">2.8 k</p>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-end">
            <button class="bg-white py-2 px-6 w-fit border">
              最新上架<i class="ml-2 fa-solid fa-sort"></i>
            </button>
          </div>
          <!-- 篩選最新上架 -->
          <div class="pt-6 md:pt-10 pb-10 md:pb-20">
            <div class="columns-2 md:columns-3 gap-6">
              <div
                v-for="item in artworks"
                :key="item.id"
                class="break-inside-avoid mb-6 cursor-pointer"
              >
                <div
                  class="relative bg-white p-2 md:p-6 border border-gray-200 shadow-sm overflow-hidden"
                >
                  <img
                    :src="item.imgUrl"
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
      <button class="block md:hidden fixed bottom-4 right-1/2 translate-x-1/2">
        <div class="bg-black text-white px-12 py-2">篩選條件2</div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/Button.vue'
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

// 控制各個風琴下拉選單的開關（按照設計圖：前四個預設打開，後三個預設關閉）
const isOpenInternet = ref(true)
const isOpenState = ref(true)
const isOpenPrice = ref(true)
const isOpenBreed = ref(true)

const isOpenBirdCount = ref(false)
const isOpenHasPlants = ref(false)
const isOpenBirdColor = ref(false)

// 資料綁定變數
const selectedNetworks = ref<string[]>([])
const selectedState = ref<string[]>([])
const selectedBreeds = ref<string[]>(['虎皮鸚鵡']) // 依據設計圖，預設勾選虎皮鸚鵡
const selectedBirdCounts = ref<string[]>([])
const selectedHasPlants = ref<string[]>([])
const selectedColors = ref<string[]>([])

const priceCurrency = ref('ETH')
const priceMin = ref<number | null>(null)
const priceMax = ref<number | null>(null)
</script>

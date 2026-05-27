<template>
  <div class="bg-primary-bg min-h-screen text-black">
    <!-- 藝術家介紹 -->
    <div class="container mx-auto px-3 md:px-8 pt-6 md:pt-10 pb-10 md:pb-20">
      <div class="flex flex-col md:flex-row gap-4 md:gap-6 mx-auto items-stretch">
        <div
          class="flex-1 flex flex-col sm:flex-row border border-black bg-white overflow-hidden shadow-sm"
        >
          <div class="w-full sm:w-[42%] min-h-60 md:min-h-full relative">
            <img
              src="../../public/artist01.jpg"
              alt="Michael"
              class="w-full h-full object-cover absolute inset-0"
            />
          </div>

          <div class="p-4 md:p-6 flex-1 flex flex-col justify-between">
            <div>
              <div class="flex justify-between items-center mb-2 md:mb-4">
                <h2 class="text-3xl md:text-5xl">Michael</h2>
                <div class="flex gap-2 md:text-lg">
                  <i class="fab fa-discord cursor-pointer hover:opacity-70"></i>
                  <i class="fab fa-facebook cursor-pointer hover:opacity-70"></i>
                  <i class="fas fa-globe cursor-pointer hover:opacity-70"></i>
                  <i class="fab fa-twitter cursor-pointer hover:opacity-70"></i>
                </div>
              </div>

              <p class="mb-6">0x3ya666...88ef</p>

              <p class="leading-relaxed font-normal font-display">
                Michael自小在山林長大，能夠與花草樹木大自然進行靈體溝通，創作題材常見大山、大水、花草與樹木，從日常生活出發，擁有個人獨樹一格的創作風格，作品觸及靈魂深處、探索未知宇宙，透過與大自然的溝通，探討著存在的本質。
              </p>
            </div>
          </div>
        </div>

        <div
          class="w-full md:w-76.5 flex flex-col justify-between bg-white border border-black divide-y divide-black"
        >
          <div class="flex justify-between items-center py-4 px-6">
            <span class="font-bold">販售中</span>
            <span class="text-3xl">168</span>
          </div>

          <div class="flex justify-between items-center py-4 px-6">
            <span class="font-bold">地板價格</span>
            <div class="flex items-baseline gap-1">
              <span class="text-3xl">0.6</span>
              <span class="text-2xl">ETH</span>
            </div>
          </div>

          <div class="flex justify-between items-center py-4 px-6">
            <span class="font-bold">7 日成交</span>
            <div class="flex items-baseline gap-1">
              <span class="text-3xl">8.8</span>
              <span class="text-2xl">ETH</span>
            </div>
          </div>

          <div class="flex justify-between items-center py-4 px-6">
            <span class="font-bold">30 日成交</span>
            <div class="flex items-baseline gap-1">
              <span class="text-3xl">23.1</span>
              <span class="text-2xl">ETH</span>
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
              ? 'bg-primary-bg border-x border-t border-black relative -mb-px rounded-t' // Active Styles
              : 'text-secondary hover:text-black', // Inactive Styles
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
              ? 'bg-primary-bg border-x border-t border-black relative -mb-px rounded-t' // Active Styles
              : 'text-secondary hover:text-black', // Inactive Styles
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

      <!-- 藝術家 -->
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
                    class="blcok md:hidden border-10 bg-white aspect-square overflow-hidden shadow-md group cursor-pointer"
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
                    class="blcok md:hidden border-10 bg-white aspect-square overflow-hidden shadow-md group cursor-pointer"
                  >
                    <img
                      src="../../public/art27.jpg"
                      alt="Flower 1"
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
                    alt="Flower 1"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div
                  class="border-10 bg-white aspect-square overflow-hidden shadow-md group cursor-pointer"
                >
                  <img
                    src="../../public/art20.jpg"
                    alt="Flower 2"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div
                  class="border-10 bg-white aspect-square overflow-hidden shadow-md group cursor-pointer"
                >
                  <img
                    src="../../public/art26.jpg"
                    alt="Flower 3"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div
                  class="border-10 bg-white aspect-square overflow-hidden shadow-md group cursor-pointer"
                >
                  <img
                    src="../../public/art22.jpg"
                    alt="Flower 4"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 收藏品 -->
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { artworksData } from '@/data/artworks'
import Button from '@/components/Button.vue'

const activeTab = ref('art')

const artworks = ref(artworksData)
</script>

<style scoped>
/* 這裡利用 CSS clip-path 來精準切出卡片左上、右上角的三角形切角 */
.clip-triangle-tl {
  clip-path: polygon(0 0, 100% 0, 0 100%);
}
.clip-triangle-tr {
  clip-path: polygon(0 0, 100% 0, 100% 100%);
}
</style>

<template>
  <div class="bg-primary-bg">
    <div class="container lg:px-8 mx-auto">
      <div class="flex flex-col lg:pt-10 pb-10 lg:pb-20">
        <div
          v-for="artwork in displayedArtworks1st"
          :key="artwork.id"
          class="flex flex-col lg:flex-row border border-black bg-white"
        >
          <div class="flex basis-1/2 lg:basis-2/3">
            <div
              class="w-24 bg-black text-white hidden lg:flex flex-col gap-4 items-center p-6 justify-start shrink-0"
            >
              <span class="text-5xl rotate-[-270deg] origin-center my-20 whitespace-nowrap">
                Recommend
              </span>
              <span
                class="text-xl tracking-[0.3em] [writing-mode:vertical-rl] text-orientation-upright font-bold"
              >
                推薦系列
              </span>
            </div>

            <div class="relative flex-1">
              <img :src="artwork.imgUrl" class="w-full h-full object-cover" :alt="artwork.title" />
            </div>
          </div>

          <div class="basis-1/2 lg:basis-1/3 px-3 py-8 lg:p-6">
            <div class="flex flex-col justify-center h-full">
              <span class="text-lg mb-2 lg:mt-14">
                {{ artwork.artistName }}
              </span>
              <p class="text-2xl lg:text-5xl font-bold mb-6">{{ artwork.title }}</p>
              <p class="mb-6 lg:mb-0">{{ artwork.description }}</p>
              <Button
                :to="{ name: 'ArtworkIntroduction', params: { id: artwork.id } }"
                class="self-end mt-auto"
              ></Button>
            </div>
          </div>
        </div>

        <div
          class="flex flex-col lg:flex-row border border-t-0 border-black w-full bg-white lg:h-85"
        >
          <div
            v-for="artwork in displayedArtworks2to3"
            :key="artwork.id"
            class="flex flex-col-reverse lg:flex-row flex-1 border-b border-black lg:border-b-0 lg:border-r"
          >
            <div class="flex-1 px-3 py-8 lg:p-6 flex flex-col justify-between h-full lg:min-h-0">
              <div class="mt-0 lg:mt-4">
                <span class="text-lg font-medium block mb-2">{{ artwork.artistName }}</span>
                <p class="text-3xl font-bold mb-6">{{ artwork.title }}</p>
                <p class="mb-6 lg:mb-0">{{ artwork.description }}</p>
              </div>
              <Button
                :to="{ name: 'ArtworkIntroduction', params: { id: artwork.id } }"
                class="self-end lg:mt-auto"
              ></Button>
            </div>

            <div class="w-full lg:w-85 h-full shrink-0 border-t border-black lg:border-t-0">
              <img :src="artwork.imgUrl" class="w-full h-full object-cover" :alt="artwork.title" />
            </div>
          </div>
        </div>
      </div>

      <div class="px-3 lg:px-0">
        <div class="flex flex-row items-end border-b border-black pb-2 lg:pb-4">
          <h2 class="text-3xl lg:text-5xl font-black mr-4 leading-none">Ranking</h2>
          <span class="text-xl font-bold leading-none hidden lg:block">市價排行榜</span>
          <Button
            to="/capitalization"
            class="ml-auto -mb-2 lg:-mb-4"
            :isPrimaryBg="true"
            :hasBorder="false"
          >
            MORE
          </Button>
        </div>
        <div class="pt-6 lg:pt-10 pb-10 lg:pb-22">
          <div class="hidden lg:block">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6.25 items-start">
              <div
                v-for="(artwork, index) in rankingArtworks1to3"
                :key="artwork.id"
                class="border border-black bg-white flex flex-col relative"
              >
                <div
                  class="absolute top-0 left-0 z-20 bg-white border-b border-r border-black px-4 py-2 text-xl aspect-square font-paytone"
                >
                  {{ index + 1 }}
                </div>

                <div class="relative h-93.5 w-full overflow-hidden shrink-0">
                  <img
                    :src="artwork.imgUrl"
                    class="w-full h-full object-cover border-b"
                    :alt="artwork.title"
                  />
                  <div
                    class="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  >
                    <Button
                      :to="{ name: 'ArtworkIntroduction', params: { id: artwork.id } }"
                      class="ml-auto mt-auto"
                    ></Button>
                  </div>
                </div>

                <div class="flex-1 flex flex-col divide-y divide-black justify-between bg-white">
                  <div class="p-4">
                    <p class="text-xl font-bold">{{ artwork.title }}</p>
                  </div>
                  <div class="px-4 py-2 flex flex-row justify-between items-center bg-white">
                    <p>{{ artwork.artistName }}</p>
                    <div class="flex items-center gap-2">
                      <i class="fa-brands fa-ethereum"></i> <span>{{ artwork.price }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-6.25 lg:hidden">
            <div
              v-for="(artwork, index) in rankingArtworks1to3"
              :key="artwork.id"
              class="border border-black bg-white flex flex-row h-22.5 relative"
            >
              <div
                class="bg-white border-r border-black h-full w-9.5 flex items-center justify-center px-2 lg:px-4 py-6 text-2xl font-paytone"
              >
                {{ index + 1 }}
              </div>
              <div class="relative w-21.75 h-full shrink-0 border-r border-black group">
                <img
                  :src="artwork.imgUrl"
                  class="w-full h-full object-cover"
                  :alt="artwork.title"
                />
                <router-link
                  :to="{ name: 'ArtworkIntroduction', params: { id: artwork.id } }"
                  class="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                >
                  <span class="text-white text-lg font-black tracking-tighter">MORE</span>
                  <div
                    class="absolute bottom-0 right-0 h-0 w-0 border-8 border-l-transparent border-t-transparent border-b-primary border-r-primary group-hover:border-b-primary group-hover:border-r-primary transition-colors duration-300 ease-in-out"
                  ></div>
                </router-link>
              </div>
              <div class="flex-1 flex flex-col divide-y divide-black h-full">
                <div class="p-4 flex-1 flex items-center">
                  <p class="text-lg font-bold leading-none">{{ artwork.title }}</p>
                </div>
                <div
                  class="px-4 py-2 leading-none flex flex-row justify-between items-center bg-white"
                >
                  <p>{{ artwork.artistName }}</p>
                  <div class="flex items-center gap-2">
                    <i class="fa-brands fa-ethereum"></i> <span>{{ artwork.price }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6.25 items-start mt-6.25">
            <div
              v-for="(artwork, index) in rankingArtworks4to6"
              :key="artwork.id"
              class="border border-black bg-white flex flex-row h-22.5 relative"
            >
              <div
                class="bg-white w-9.5 border-r border-black h-full flex items-center justify-center px-2 lg:px-4 py-6 text-2xl font-paytone"
              >
                {{ index + 4 }}
              </div>
              <div class="relative w-21.75 h-full shrink-0 border-r border-black group">
                <img
                  :src="artwork.imgUrl"
                  class="w-full h-full object-cover"
                  :alt="artwork.title"
                />
                <router-link
                  :to="{ name: 'ArtworkIntroduction', params: { id: artwork.id } }"
                  class="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                >
                  <span class="text-white text-lg font-black tracking-tighter">MORE</span>
                  <div
                    class="absolute bottom-0 right-0 h-0 w-0 border-8 border-l-transparent border-t-transparent border-b-primary border-r-primary group-hover:border-b-primary group-hover:border-r-primary transition-colors duration-300 ease-in-out"
                  ></div>
                </router-link>
              </div>
              <div class="flex-1 flex flex-col divide-y divide-black h-full">
                <div class="p-4 flex-1 flex items-center">
                  <p class="text-lg font-bold leading-none">{{ artwork.title }}</p>
                </div>
                <div
                  class="px-4 py-2 leading-none flex flex-row justify-between items-center bg-white"
                >
                  <p>{{ artwork.artistName }}</p>
                  <div class="flex items-center gap-2">
                    <i class="fa-brands fa-ethereum"></i> <span>{{ artwork.price }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="px-3 lg:px-8">
        <div class="flex flex-row items-end border-b border-black pb-2 lg:pb-4">
          <h2 class="text-3xl lg:text-5xl mr-4 leading-none">Artist</h2>
          <span class="text-xl font-bold leading-none hidden lg:block">熱門藝術家</span>
          <Button class="ml-auto -mb-2 lg:-mb-4" :isPrimaryBg="true" :hasBorder="false"
            >MORE</Button
          >
        </div>
      </div>
      <div class="px-3 lg:px-0">
        <div class="pt-6 lg:pt-12 pb-10 lg:pb-20 w-full">
          <swiper
            v-if="artistStore.artists && artistStore.artists.length > 0"
            :modules="modules"
            :breakpoints="{
              0: { slidesPerView: 1 },
              1024: { slidesPerView: 3 },
            }"
            :space-between="24"
            :centered-slides="true"
            :centered-slides-bounds="true"
            :loop="true"
            :autoplay="{ delay: 4000, disableOnInteraction: false }"
            :pagination="{ clickable: true }"
            class="artist-swiper pb-40! lg:pb-14!"
          >
            <swiper-slide v-for="item in artistStore.artists" :key="item.id" class="artist-slide">
              <div class="card-wrapper relative w-full h-109.75 bg-white">
                <div class="overflow-hidden w-full h-full">
                  <img
                    :src="item.img"
                    class="card-img w-full h-full object-cover"
                    :alt="`${item.firstName} ${item.lastName}`"
                  />
                </div>
                <div class="card-info absolute inset-0 p-6 flex flex-col justify-between z-10">
                  <h2
                    class="text-white text-2xl lg:text-7xl font-paytone tracking-wide drop-shadow-lg"
                  >
                    {{ item.firstName }}<br />{{ item.lastName }}
                  </h2>
                  <div class="flex flex-col lg:flex-row justify-between items-end gap-4 mt-auto">
                    <p class="hidden lg:block bg-white/85 p-6 max-w-xs font-medium">
                      {{ item.desc }}
                    </p>
                    <Button :to="`/artistIntroduction/${item.id}`" class="ml-auto mt-auto"></Button>
                  </div>
                </div>
                <div class="block lg:hidden">
                  <p class="bg-white/85 p-6 mt-4">{{ item.desc }}</p>
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>

    <div class="container lg:px-8 mx-auto">
      <div class="px-3 lg:px-0">
        <div class="flex flex-row items-end border-b border-black pb-2 lg:pb-4">
          <h2 class="text-3xl lg:text-5xl mr-4 leading-none">Artwork</h2>
          <span class="text-xl font-bold leading-none hidden lg:block">最新藝術品</span>
          <Button class="ml-auto -mb-2 lg:-mb-4" :isPrimaryBg="true" :hasBorder="false"
            >MORE</Button
          >
        </div>

        <div class="pt-6 lg:pt-12 pb-10 lg:pb-20">
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 items-start">
            <div
              v-for="(col, colIndex) in artworkColumns"
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
                    :src="item.imgUrl"
                    :alt="item.title"
                    class="w-full min-h-34.75 lg:min-h-70 h-auto object-cover"
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
                  <div class="blcok lg:hidden">
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

    <div class="border-b pb-2">
      <div class="flex flex-col items-center text-center pb-8 lg:pb-10 border-b-4">
        <h2 class="text-3xl lg:text-5xl mb-4">Join Us</h2>
        <p class="text-xl font-bold lg:mb-6">創建並出售你的藝術品</p>
      </div>
    </div>
    <div class="py-12 lg:py-20 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-y-12 lg:gap-x-6 max-w-7xl mx-auto">
        <div
          v-for="step in stepStore.steps"
          :key="step.id"
          class="flex flex-col items-center text-center"
        >
          <div class="text-primary text-5xl mb-4">
            <i :class="step.icon"></i>
          </div>
          <h3 class="text-lg font-bold text-black font-display mb-6 tracking-wider">
            {{ step.title }}
          </h3>
          <p class="font-display leading-relaxed whitespace-pre-line">
            {{ step.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { type Artwork } from '@/api/artist'
import { useArtistStore } from '@/store/artistStore'
import { useStepStore } from '@/store/stepStore'
import { useLoadingStore } from '@/store/loading'
import Button from '@/components/Button.vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

const artistStore = useArtistStore()
const stepStore = useStepStore()
const { show, hide } = useLoadingStore()

const modules = [Autoplay, Pagination]

// 排行榜區塊切片 - 確保 store 資料為空時也給予預設陣列
const rankingArtworks1to3 = computed(() => (artistStore.rankedArtworks || []).slice(0, 3))
const rankingArtworks4to6 = computed(() => (artistStore.rankedArtworks || []).slice(3, 6))

// 下方最新藝術品區塊
const displayedArtworks1st = computed(() => (artistStore.allArtworksWithArtist || []).slice(0, 1))
const displayedArtworks2to3 = computed(() => (artistStore.allArtworksWithArtist || []).slice(1, 3))
const displayedArtworks1to8 = computed(() => (artistStore.allArtworksWithArtist || []).slice(0, 8))

// 處理瀑布流
const isMobile = ref(false)
const checkScreenSize = () => (isMobile.value = window.innerWidth < 768)

// 定義帶有動畫索引的型別
interface AnimatedArtwork extends Artwork {
  globalIndex: number
}
const artworkColumns = computed(() => {
  const colCount = isMobile.value ? 2 : 4
  const columns: AnimatedArtwork[][] = Array.from({ length: colCount }, () => [])

  // 安全地確保 data 存在再執行行
  const list = displayedArtworks1to8.value || []

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

onMounted(async () => {
  show()
  try {
    // 統一由 Store 處理資料獲取
    await Promise.all([artistStore.fetchAll(), stepStore.fetchSteps()])
  } catch (error) {
    console.error('資料獲取失敗:', error)
  } finally {
    hide()
  }

  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => window.removeEventListener('resize', checkScreenSize))
</script>

<style scoped>
/* 原有的 Swiper 樣式保持不變... */
.artist-slide .card-wrapper {
  transform: scale(1);
  filter: grayscale(100%);
  transition: all 0.5s ease-in-out;
}
@media (max-width: 767px) {
  .artist-slide .card-wrapper {
    height: 232px;
  }
}
@media (min-width: 768px) {
  .artist-slide .card-wrapper {
    transform: scale(0.48);
  }
}
.artist-slide .card-info {
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}
.artist-slide.swiper-slide-active .card-wrapper {
  filter: grayscale(0%);
}
.artist-slide.swiper-slide-active .card-info {
  opacity: 1;
  visibility: visible;
  transition: opacity 0.5s ease 0.2s;
}
:deep(.artist-swiper .swiper-wrapper) {
  align-items: stretch;
}
:deep(.artist-swiper .swiper-slide) {
  display: flex;
  justify-content: center;
  width: 100%;
}
:deep(.artist-swiper .swiper-slide .card-wrapper) {
  width: 100%;
}
@media (min-width: 768px) {
  :deep(.artist-swiper .swiper-slide-active .card-wrapper) {
    position: absolute;
    left: 50%;
    top: 0;
    width: 636px;
    max-width: 636px;
    transform: translateX(-50%) scale(1);
    z-index: 20;
  }
}
</style>

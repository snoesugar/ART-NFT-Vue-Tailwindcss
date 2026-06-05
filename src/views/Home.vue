<template>
  <div class="bg-primary-bg">
    <div class="container md:px-8 mx-auto">
      <div class="flex flex-col md:pt-10 pb-10 md:pb-20">
        <div
          v-for="artwork in rankingArtworks1st"
          :key="artwork.id"
          class="flex flex-col md:flex-row border border-black bg-white"
        >
          <div class="flex basis-1/2 md:basis-2/3">
            <div
              class="w-24 bg-black text-white hidden md:flex flex-col gap-4 items-center p-6 justify-start shrink-0"
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

          <div class="basis-1/2 md:basis-1/3 px-3 py-8 md:p-6">
            <div class="flex flex-col justify-center h-full">
              <span class="text-lg mb-2 md:mt-14">
                {{ artwork.artistName }}
              </span>
              <p class="text-2xl md:text-5xl font-bold mb-6">{{ artwork.title }}</p>
              <p class="mb-6 md:mb-0">{{ artwork.description }}</p>
              <Button
                :to="{ name: 'ArtworkIntroduction', params: { id: artwork.id } }"
                class="self-end mt-auto"
              ></Button>
            </div>
          </div>
        </div>

        <div
          class="flex flex-col md:flex-row border border-t-0 border-black w-full bg-white md:h-85"
        >
          <div
            v-for="artwork in rankingArtworks2to3"
            :key="artwork.id"
            class="flex flex-col-reverse md:flex-row flex-1 border-b border-black md:border-b-0 md:border-r"
          >
            <div class="flex-1 px-3 py-8 md:p-6 flex flex-col justify-between h-full md:min-h-0">
              <div class="mt-0 md:mt-4">
                <span class="text-lg font-medium block mb-2">{{ artwork.artistName }}</span>
                <p class="text-3xl font-bold mb-6">{{ artwork.title }}</p>
                <p class="mb-6 md:mb-0">{{ artwork.description }}</p>
              </div>
              <Button
                :to="{ name: 'ArtworkIntroduction', params: { id: artwork.id } }"
                class="self-end md:mt-auto"
              ></Button>
            </div>

            <div class="w-full md:w-85 h-full shrink-0 border-t border-black md:border-t-0">
              <img :src="artwork.imgUrl" class="w-full h-full object-cover" :alt="artwork.title" />
            </div>
          </div>
        </div>
      </div>

      <div class="px-3 md:px-0">
        <div class="flex flex-row items-end border-b border-black pb-2 md:pb-4">
          <h2 class="text-3xl md:text-5xl font-black mr-4 leading-none">Ranking</h2>
          <span class="text-xl font-bold leading-none hidden md:block">市價排行榜</span>
          <Button
            to="/capitalization"
            class="ml-auto -mb-2 md:-mb-4"
            :isPrimaryBg="true"
            :hasBorder="false"
          >
            MORE
          </Button>
        </div>
        <div class="pt-6 md:pt-10 pb-10 md:pb-22">
          <div class="hidden md:block">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6.25 items-start">
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

          <div class="flex flex-col gap-6.25 md:hidden">
            <div
              v-for="(artwork, index) in rankingArtworks1to3"
              :key="artwork.id"
              class="border border-black bg-white flex flex-row h-22.5 relative"
            >
              <div
                class="bg-white border-r border-black h-full w-9.5 flex items-center justify-center px-2 md:px-4 py-6 text-2xl font-paytone"
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

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6.25 items-start mt-6.25">
            <div
              v-for="(artwork, index) in rankingArtworks4to6"
              :key="artwork.id"
              class="border border-black bg-white flex flex-row h-22.5 relative"
            >
              <div
                class="bg-white w-9.5 border-r border-black h-full flex items-center justify-center px-2 md:px-4 py-6 text-2xl font-paytone"
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
      <div class="px-3 md:px-8">
        <div class="flex flex-row items-end border-b border-black pb-2 md:pb-4">
          <h2 class="text-3xl md:text-5xl mr-4 leading-none">Artist</h2>
          <span class="text-xl font-bold leading-none hidden md:block">熱門藝術家</span>
          <Button class="ml-auto -mb-2 md:-mb-4" :isPrimaryBg="true" :hasBorder="false"
            >MORE</Button
          >
        </div>
      </div>
      <div class="px-3 md:px-0">
        <div class="pt-6 md:pt-12 pb-10 md:pb-20 w-full">
          <swiper
            v-if="artists.length"
            :modules="modules"
            :breakpoints="{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 3 },
            }"
            :space-between="24"
            :centered-slides="true"
            :centered-slides-bounds="true"
            :loop="true"
            :autoplay="{ delay: 4000, disableOnInteraction: false }"
            :pagination="{ clickable: true }"
            class="artist-swiper pb-40! md:pb-14!"
          >
            <swiper-slide v-for="item in artists" :key="item.id" class="artist-slide">
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
                    class="text-white text-2xl md:text-7xl font-paytone tracking-wide drop-shadow-md"
                  >
                    {{ item.firstName }}<br />{{ item.lastName }}
                  </h2>
                  <div class="flex flex-col md:flex-row justify-between items-end gap-4 mt-auto">
                    <p class="hidden md:block bg-white/85 p-6 max-w-xs font-medium">
                      {{ item.desc }}
                    </p>
                    <Button :to="`/artistIntroduction/${item.id}`" class="ml-auto mt-auto"></Button>
                  </div>
                </div>
                <div class="block md:hidden">
                  <p class="bg-white/85 p-6 mt-4">{{ item.desc }}</p>
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>

    <div class="container md:px-8 mx-auto">
      <div class="px-3 md:px-0">
        <div class="flex flex-row items-end border-b border-black pb-2 md:pb-4">
          <h2 class="text-3xl md:text-5xl mr-4 leading-none">Artwork</h2>
          <span class="text-xl font-bold leading-none hidden md:block">最新藝術品</span>
          <Button class="ml-auto -mb-2 md:-mb-4" :isPrimaryBg="true" :hasBorder="false"
            >MORE</Button
          >
        </div>
        <div class="pt-6 md:pt-12 pb-10 md:pb-20">
          <div class="columns-2 md:columns-4 gap-6">
            <div
              v-for="item in displayedArtworks1to8"
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
              <div class="mt-2 md:mt-4 md:border-b border-black md:font-bold pb-2 md:pb-4">
                {{ item.title }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="border-b pb-2">
      <div class="flex flex-col items-center text-center pb-8 md:pb-10 border-b-4">
        <h2 class="text-3xl md:text-5xl mb-4">Join Us</h2>
        <p class="text-xl font-bold md:mb-6">創建並出售你的藝術品</p>
      </div>
    </div>
    <div class="py-12 md:py-20 md:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-y-12 md:gap-x-6 max-w-7xl mx-auto">
        <div v-for="step in steps" :key="step.id" class="flex flex-col items-center text-center">
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
import { ref, onMounted, computed } from 'vue'
import { nftApi, type Artist, type Artwork } from '@/api/artist' // 💡 請根據你實際的檔案路徑微調
import { stepApi, type Step } from '@/api/steps'
import { useLoadingStore } from '@/store/loading'
import Button from '@/components/Button.vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

// 擴充型別定義，讓作品物件直接自帶藝術家名字
interface ArtworkWithName extends Artwork {
  artistName: string
}

const artists = ref<Artist[]>([])
const artworks = ref<ArtworkWithName[]>([]) // 💡 直接改用帶有名字的型別
const steps = ref<Step[]>([])
const { show, hide } = useLoadingStore()

const modules = [Autoplay, Pagination]

// 🌟 排行榜與區塊切片邏輯（直接對 artworks 做切片，不用再透過 computed 轉一手）
const rankings = computed(() => {
  const list = artworks.value
  return {
    first: list.slice(0, 1),
    twoToThree: list.slice(1, 3),
    topThree: list.slice(0, 3),
    fourToSix: list.slice(3, 6),
  }
})

// 對接 Template 內部的所有區塊變數
const displayedArtworks1to8 = computed(() => artworks.value.slice(0, 8))
const rankingArtworks1st = computed(() => rankings.value.first)
const rankingArtworks2to3 = computed(() => rankings.value.twoToThree)
const rankingArtworks1to3 = computed(() => rankings.value.topThree)
const rankingArtworks4to6 = computed(() => rankings.value.fourToSix)

onMounted(async () => {
  try {
    show()
    // 1. 獲取所有藝術家資料
    const allArtists = await nftApi.getAllArtists()
    artists.value = allArtists

    // 2. 關鍵改動：在攤平的「當下」直接把名字組合好塞進去！
    artworks.value = allArtists.flatMap(artist => {
      const artworkList = artist.artworks || []
      return artworkList.map(artwork => ({
        ...artwork,
        // 💡 直接在這裡把名字綁定好，Template 就能直接用 {{ artwork.artistName }} 了！
        artistName: `${artist.firstName} ${artist.lastName}`,
      }))
    })
  } catch (error) {
    console.error('首頁獲取藝術家與作品失敗:', error)
  }
  // 3. 獲取步驟流程
  try {
    const data = await stepApi.getAll()
    steps.value = data
  } catch (error) {
    console.error('首頁獲取步驟失敗:', error)
  } finally {
    hide()
  }
})
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

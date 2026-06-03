<template>
  <div class="bg-primary-bg">
    <div class="container md:px-8 mx-auto">
      <div class="flex flex-col md:pt-10 pb-10 md:pb-20">
        <div class="flex flex-col md:flex-row border border-black bg-white">
          <div class="basis-1/2 md:basis-2/3">
            <img src="../../public/art01.jpg" class="w-full h-full object-cover" alt="art01" />
          </div>
          <div class="basis-1/2 md:basis-1/3 px-3 py-8 md:p-6">
            <div class="flex flex-col justify-center h-full">
              <span class="text-lg mb-2 md:mt-14">Kemus Wu</span>
              <p class="text-2xl md:text-5xl font-bold mb-6">瞳孔:流動的脈絡</p>
              <p class="mb-6 md:mb-0">
                眼睛，總是吸引著我們的注意力，看、被看，也許眼睛裡有著從另一個世界看我們的世界。
              </p>
              <Button class="self-end mt-auto"></Button>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col md:flex-row border border-t-0 border-black w-full bg-white md:h-85"
        >
          <div
            class="flex flex-col-reverse md:flex-row flex-1 border-b border-black md:border-b-0 md:border-r"
          >
            <div class="flex-1 px-3 py-8 md:p-6 flex flex-col justify-between h-full md:min-h-0">
              <div class="mt-0 md:mt-4">
                <span class="text-lg font-medium block mb-2">Joanne</span>
                <p class="text-3xl font-bold mb-6">海洋波度</p>
                <p class="mb-6 md:mb-0">
                  海洋的奧秘向我們揭示了深不可測的一面，它的深度——反映了我們的恐懼、同時也吸引著我們。
                </p>
              </div>
              <Button class="self-end md:mt-auto"></Button>
            </div>

            <div class="w-full md:w-85 h-full shrink-0 border-t border-black md:border-t-0">
              <img src="../../public/art02.jpg" class="w-full h-full object-cover" alt="art02" />
            </div>
          </div>

          <div class="flex flex-col-reverse md:flex-row flex-1">
            <div class="flex-1 px-3 py-8 md:p-6 flex flex-col justify-between h-full md:min-h-0">
              <div class="mt-0 md:mt-4">
                <span class="text-lg font-medium block mb-2">Michael</span>
                <p class="text-3xl font-bold mb-6">我家窗前的鳥</p>
                <p class="mb-6 md:mb-0">
                  家門前每天都有不同的小鳥，大多數的小鳥都有特殊能力，特殊能力是什麼我就不說了，希望大家能從作品感受到小鳥的快樂。
                </p>
              </div>
              <Button to="/artworkIntroduction" class="self-end md:mt-auto"></Button>
            </div>

            <div class="w-full md:w-85 h-full md:h-full shrink-0">
              <img src="../../public/art21.jpg" class="w-full h-full object-cover" alt="art21" />
            </div>
          </div>
        </div>
      </div>
      <!-- Ranking -->
      <div class="px-3 md:px-0">
        <div class="flex flex-row items-end border-b border-black pb-2 md:pb-4">
          <h2 class="text-3xl md:text-5xl font-black mr-4 leading-none">Ranking</h2>
          <span class="text-xl font-bold leading-none hidden md:block">市價排行榜</span>
          <Button
            to="/capitalization"
            class="ml-auto -mb-2 md:-mb-4"
            :isPrimaryBg="true"
            :hasBorder="false"
            >MORE</Button
          >
        </div>
        <div class="pt-6 md:pt-10 pb-10 md:pb-22">
          <!-- 電腦版 -->
          <div class="hidden md:block">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6.25 items-start">
              <!-- 第一名 -->
              <div class="border border-black bg-white flex flex-col relative">
                <div
                  class="absolute top-0 left-0 z-20 bg-white border-b border-r border-black px-4 py-2 text-xl aspect-square font-paytone"
                >
                  1
                </div>

                <div class="relative h-93.5 w-full overflow-hidden shrink-0">
                  <img
                    src="../../public/art04.jpg"
                    class="w-full h-full object-cover border-b"
                    alt="art04"
                  />
                  <div
                    class="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  >
                    <Button class="ml-auto mt-auto"></Button>
                  </div>
                </div>

                <div class="flex-1 flex flex-col divide-y divide-black justify-between bg-white">
                  <div class="p-4">
                    <p class="text-xl font-bold">散步遇到的女人</p>
                  </div>
                  <div class="px-4 py-2 flex flex-row justify-between items-center bg-white">
                    <p>Zoe Jiang</p>
                    <div class="flex items-center gap-2 font-bold">
                      <i class="fa-brands fa-ethereum"></i> <span>300</span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 第二名 -->
              <div class="border border-black bg-white flex flex-col relative">
                <div
                  class="absolute top-0 left-0 z-20 bg-white border-b border-r border-black px-4 py-2 text-xl aspect-square font-paytone"
                >
                  2
                </div>

                <div class="relative h-93.5 w-full overflow-hidden shrink-0">
                  <img
                    src="../../public/art05.jpg"
                    class="w-full h-full object-cover border-b"
                    alt="art05"
                  />
                  <div
                    class="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  >
                    <Button class="ml-auto mt-auto"></Button>
                  </div>
                </div>

                <div class="flex-1 flex flex-col divide-y divide-black justify-between bg-white">
                  <div class="p-4">
                    <p class="text-xl font-bold">爆炸頭的母親</p>
                  </div>
                  <div class="px-4 py-2 flex flex-row justify-between items-center bg-white">
                    <p>Yui</p>
                    <div class="flex items-center gap-2 font-bold">
                      <i class="fa-brands fa-ethereum"></i> <span>300</span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 第三名 -->
              <div class="border border-black bg-white flex flex-col relative">
                <div
                  class="absolute top-0 left-0 z-20 bg-white border-b border-r border-black px-4 py-2 text-xl aspect-square font-paytone"
                >
                  3
                </div>

                <div class="relative h-93.5 w-full overflow-hidden shrink-0">
                  <img
                    src="../../public/art06.jpg"
                    class="w-full h-full object-cover border-b"
                    alt="art06"
                  />
                  <div
                    class="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  >
                    <Button class="ml-auto mt-auto"></Button>
                  </div>
                </div>

                <div class="flex-1 flex flex-col divide-y divide-black justify-between bg-white">
                  <div class="p-4">
                    <p class="text-xl font-bold">夏天的時候</p>
                  </div>
                  <div class="px-4 py-2 flex flex-row justify-between items-center bg-white">
                    <p>Bug Lin</p>
                    <div class="flex items-center gap-2 font-bold">
                      <i class="fa-brands fa-ethereum"></i> <span>300</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 手機板 -->
          <div class="flex flex-col gap-6.25 md:hidden">
            <!-- 第一名 -->
            <div class="border border-black bg-white flex flex-row h-22.5 relative">
              <div
                class="bg-white border-r border-black h-full w-9.5 flex items-center justify-center px-2 md:px-4 py-6 text-2xl font-paytone"
              >
                1
              </div>
              <div class="relative w-21.75 h-full shrink-0 border-r border-black group">
                <img src="../../public/art04.jpg" class="w-full h-full object-cover" alt="art04" />
                <div
                  class="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                >
                  <span class="text-white text-lg font-black tracking-tighter">MORE</span>
                  <div
                    class="absolute bottom-0 right-0 h-0 w-0 border-8 border-l-transparent border-t-transparent border-b-primary border-r-primary group-hover:border-b-primary group-hover:border-r-primary transition-colors duration-300 ease-in-out"
                  ></div>
                </div>
              </div>
              <div class="flex-1 flex flex-col divide-y divide-black h-full">
                <div class="p-4 flex-1 flex items-center">
                  <p class="text-lg font-bold leading-none">散步遇到的女人</p>
                </div>
                <div
                  class="px-4 py-2 leading-none flex flex-row justify-between items-center bg-white"
                >
                  <p>Zoe Jiang</p>
                  <div class="flex items-center gap-2">
                    <i class="fa-brands fa-ethereum"></i>
                    <span>300</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 第二名 -->
            <div class="border border-black bg-white flex flex-row h-22.5 relative">
              <div
                class="bg-white border-r border-black h-full w-9.5 flex items-center justify-center px-2 md:px-4 py-6 text-2xl font-paytone"
              >
                2
              </div>
              <div class="relative w-21.75 h-full shrink-0 border-r border-black group">
                <img src="../../public/art05.jpg" class="w-full h-full object-cover" alt="art05" />
                <div
                  class="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                >
                  <span class="text-white text-lg font-black tracking-tighter">MORE</span>
                  <div
                    class="absolute bottom-0 right-0 h-0 w-0 border-8 border-l-transparent border-t-transparent border-b-primary border-r-primary group-hover:border-b-primary group-hover:border-r-primary transition-colors duration-300 ease-in-out"
                  ></div>
                </div>
              </div>
              <div class="flex-1 flex flex-col divide-y divide-black h-full">
                <div class="p-4 flex-1 flex items-center">
                  <p class="text-lg font-bold leading-none">爆炸頭的母親</p>
                </div>
                <div
                  class="px-4 py-2 leading-none flex flex-row justify-between items-center bg-white"
                >
                  <p>Yui</p>
                  <div class="flex items-center gap-2">
                    <i class="fa-brands fa-ethereum"></i>
                    <span>300</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 第三名 -->
            <div class="border border-black bg-white flex flex-row h-22.5 relative">
              <div
                class="bg-white border-r border-black h-full w-9.5 flex items-center justify-center px-2 md:px-4 py-6 text-2xl font-paytone"
              >
                3
              </div>
              <div class="relative w-21.75 h-full shrink-0 border-r border-black group">
                <img src="../../public/art06.jpg" class="w-full h-full object-cover" alt="art06" />
                <div
                  class="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                >
                  <span class="text-white text-lg font-black tracking-tighter">MORE</span>
                  <div
                    class="absolute bottom-0 right-0 h-0 w-0 border-8 border-l-transparent border-t-transparent border-b-primary border-r-primary group-hover:border-b-primary group-hover:border-r-primary transition-colors duration-300 ease-in-out"
                  ></div>
                </div>
              </div>
              <div class="flex-1 flex flex-col divide-y divide-black h-full">
                <div class="p-4 flex-1 flex items-center">
                  <p class="text-lg font-bold leading-none">夏天的時候</p>
                </div>
                <div
                  class="px-4 py-2 leading-none flex flex-row justify-between items-center bg-white"
                >
                  <p>Bug Lin</p>
                  <div class="flex items-center gap-2">
                    <i class="fa-brands fa-ethereum"></i>
                    <span>300</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6.25 items-start mt-6.25">
            <!-- 第四名 -->
            <div class="border border-black bg-white flex flex-row h-22.5 relative">
              <div
                class="bg-white w-9.5 border-r border-black h-full flex items-center justify-center px-2 md:px-4 py-6 text-2xl font-paytone"
              >
                4
              </div>
              <div class="relative w-21.75 h-full shrink-0 border-r border-black group">
                <img src="../../public/art13.jpg" class="w-full h-full object-cover" alt="art13" />
                <div
                  class="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                >
                  <span class="text-white text-lg font-black tracking-tighter">MORE</span>
                  <div
                    class="absolute bottom-0 right-0 h-0 w-0 border-8 border-l-transparent border-t-transparent border-b-primary border-r-primary group-hover:border-b-primary group-hover:border-r-primary transition-colors duration-300 ease-in-out"
                  ></div>
                </div>
              </div>
              <div class="flex-1 flex flex-col divide-y divide-black h-full">
                <div class="p-4 flex-1 flex items-center">
                  <p class="text-lg font-bold leading-none">追求者送我的花</p>
                </div>
                <div
                  class="px-4 py-2 leading-none flex flex-row justify-between items-center bg-white"
                >
                  <p>Michael</p>
                  <div class="flex items-center gap-2">
                    <i class="fa-brands fa-ethereum"></i>
                    <span>300</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 第五名 -->
            <div class="border border-black bg-white flex flex-row h-22.5 relative">
              <div
                class="bg-white border-r border-black h-full w-9.5 flex items-center justify-center px-2 md:px-4 py-6 text-2xl font-paytone"
              >
                5
              </div>
              <div class="relative w-21.75 h-full shrink-0 border-r border-black group">
                <img src="../../public/art07.jpg" class="w-full h-full object-cover" alt="art07" />
                <div
                  class="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                >
                  <span class="text-white text-lg font-black tracking-tighter">MORE</span>
                  <div
                    class="absolute bottom-0 right-0 h-0 w-0 border-8 border-l-transparent border-t-transparent border-b-primary border-r-primary group-hover:border-b-primary group-hover:border-r-primary transition-colors duration-300 ease-in-out"
                  ></div>
                </div>
              </div>
              <div class="flex-1 flex flex-col divide-y divide-black h-full">
                <div class="p-4 flex-1 flex items-center">
                  <p class="text-lg font-bold leading-none">今天釣到的魚</p>
                </div>
                <div
                  class="px-4 py-2 leading-none flex flex-row justify-between items-center bg-white"
                >
                  <p>Wei JJ</p>
                  <div class="flex items-center gap-2">
                    <i class="fa-brands fa-ethereum"></i>
                    <span>300</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 第六名 -->
            <div class="border border-black bg-white flex flex-row h-22.5 relative">
              <div
                class="bg-white border-r border-black h-full w-9.5 flex items-center justify-center px-2 md:px-4 py-6 text-2xl font-paytone"
              >
                6
              </div>
              <div class="relative w-21.75 h-full shrink-0 border-r border-black group">
                <img src="../../public/art08.jpg" class="w-full h-full object-cover" alt="art08" />
                <div
                  class="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                >
                  <span class="text-white text-lg font-black tracking-tighter">MORE</span>
                  <div
                    class="absolute bottom-0 right-0 h-0 w-0 border-8 border-l-transparent border-t-transparent border-b-primary border-r-primary group-hover:border-b-primary group-hover:border-r-primary transition-colors duration-300 ease-in-out"
                  ></div>
                </div>
              </div>
              <div class="flex-1 flex flex-col divide-y divide-black h-full">
                <div class="p-4 flex-1 flex items-center">
                  <p class="text-lg font-bold leading-none">人生中的貓咪們</p>
                </div>
                <div
                  class="px-4 py-2 leading-none flex flex-row justify-between items-center bg-white"
                >
                  <p>Even Lai</p>
                  <div class="flex items-center gap-2">
                    <i class="fa-brands fa-ethereum"></i>
                    <span>300</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Artist-->
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
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 3,
              },
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
                    {{ item.firstName }}<br />
                    {{ item.lastName }}
                  </h2>
                  <div class="flex flex-col md:flex-row justify-between items-end gap-4 mt-auto">
                    <p class="hidden md:block bg-white/85 p-6 max-w-xs font-medium">
                      {{ item.desc }}
                    </p>

                    <Button :to="`/artistIntroduction/${item.id}`" class="ml-auto mt-auto"></Button>
                  </div>
                </div>
                <div class="block md:hidden">
                  <p class="bg-white/85 p-6 mt-4">
                    {{ item.desc }}
                  </p>
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
    <!-- Artwork -->
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
    <!-- Join us -->
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
import { ref, onMounted } from 'vue' // 💡 引入 onMounted
import { artworksData } from '@/data/artworks'
import { stepsData } from '@/data/steps'
import Button from '@/components/Button.vue'
// 💡 1. 引入你寫好的 artistApi 和型別
import { artistApi, type Artist } from '@/api/artist'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

const artworks = ref(artworksData)
const steps = ref(stepsData)

// 💡 2. 初始化把 artists 改成空陣列，並定義型別
const artists = ref<Artist[]>([])

const modules = [Autoplay, Pagination]

// 💡 3. 組件掛載時，打 API 撈取真正的 db.json 資料
onMounted(async () => {
  try {
    const data = await artistApi.getAll()
    artists.value = data // 這樣首頁就能拿到最新、有英文字串 id 的資料了！
  } catch (error) {
    console.error('首頁獲取藝術家失敗:', error)
  }
})
</script>

<style scoped>
/* ==================== Swiper 特效核心 ==================== */
.artist-slide .card-wrapper {
  transform: scale(1);
  filter: grayscale(100%);
  transition: all 0.5s ease-in-out;

  /* 📱 手機版限制高度 */
  @media (max-width: 767px) {
    height: 232px;
  }

  /* 💻 桌機版未 active 時縮小 */
  @media (min-width: 768px) {
    transform: scale(0.48);
  }
}

/* 隱藏非主卡片的文字資訊 */
.artist-slide .card-info {
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

/* 2. 啟動狀態（中間被置中的那張卡片） */
.artist-slide.swiper-slide-active .card-wrapper {
  filter: grayscale(0%);
  /* 註：scale(1)、width: 100%、opacity: 1 都在這裡被拔除了，因為預設已具備 */
}

/* 顯示主卡片的文字資訊 */
.artist-slide.swiper-slide-active .card-info {
  opacity: 1;
  visibility: visible;
  transition: opacity 0.5s ease 0.2s;
}

/* Swiper 結構樣式優化 */
:deep(.artist-swiper .swiper-wrapper) {
  align-items: stretch;
}

:deep(.artist-swiper .swiper-slide) {
  display: flex;
  justify-content: center;
  width: 100%;
}

/* 直接在這裡統一卡片預設寬度為 100% */
:deep(.artist-swiper .swiper-slide .card-wrapper) {
  width: 100%;
}

/* 💻 桌機版 Active 卡片排版 */
@media (min-width: 768px) {
  :deep(.artist-swiper .swiper-slide-active .card-wrapper) {
    position: absolute;
    left: 50%;
    top: 0;
    width: 636px;
    max-width: 636px;
    transform: translateX(-50%) scale(1); /* 💡 注意：桌機版 active 時要還原成放大狀態，加在 transform 內最安全 */
    z-index: 20;
  }
}
</style>

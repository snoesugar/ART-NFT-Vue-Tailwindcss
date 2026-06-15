<template>
  <div v-if="!isInitialLoading" class="bg-primary-bg">
    <div class="container px-3 lg:px-8 pt-6 lg:pt-12 pb-10 lg:pb-20">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        <div v-for="(col, colIndex) in currentColumns" :key="colIndex" class="flex flex-col gap-6">
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
        </div>
      </div>

      <div v-if="isMoreLoading" class="text-center py-6 col-span-full">
        <Loading
          enText="Connecting with Blockchain Artwork"
          chText="正在與區塊鏈藝術作品連線中..."
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { nftApi, type Artwork } from '@/api/artist'
import { useLoadingStore } from '@/store/loading'
import Button from '@/components/Button.vue'
import Loading from '@/components/Loading.vue'

// 擴充型別：為了計算動畫順序，我們在 computed 內幫卡片加上全局索引
interface AnimatedArtwork extends Artwork {
  globalIndex: number
}

// 狀態控制
const isInitialLoading = ref(true)
const isMoreLoading = ref(false)

const artworks = ref<Artwork[]>([])
let allLoadedArtworks: Artwork[] = []

// 分頁控制
const itemsPerPage = 12
let currentPage = 1

const { show, hide } = useLoadingStore()
const isMobile = ref(false)

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 768
}

// 💡 關鍵修改 2：在分發直欄時，順便附帶 globalIndex 算出全網頁卡片的相對順序
const currentColumns = computed(() => {
  const colCount = isMobile.value ? 2 : 4
  const columns: AnimatedArtwork[][] = Array.from({ length: colCount }, () => [])

  artworks.value.forEach((item, index) => {
    const colIndex = index % colCount

    // 將原本的 item 加上 globalIndex 屬性
    const animatedItem: AnimatedArtwork = {
      ...item,
      globalIndex: index,
    }

    const targetColumn = columns[colIndex] || []
    targetColumn.push(animatedItem)
  })

  return columns
})

// 載入下一頁資料
const loadMoreArtworks = () => {
  if (artworks.value.length >= allLoadedArtworks.length || isMoreLoading.value) return

  isMoreLoading.value = true

  setTimeout(() => {
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage

    const nextBatch = allLoadedArtworks.slice(start, end)
    artworks.value = [...artworks.value, ...nextBatch]

    currentPage++
    isMoreLoading.value = false
  }, 500)
}

// 監聽滾動
const handleScroll = () => {
  const scrollHeight = document.documentElement.scrollHeight
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const clientHeight = window.innerHeight

  if (scrollHeight - scrollTop <= clientHeight + 300) {
    loadMoreArtworks()
  }
}

onMounted(async () => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
  window.addEventListener('scroll', handleScroll)

  try {
    show()
    const allArtists = await nftApi.getAllArtists()
    //  修改後：加上 .filter() 排除未上架作品
    allLoadedArtworks = allArtists
      .flatMap(artist => {
        const seriesList = artist.artworks || []
        return seriesList.flatMap(series => series.artworkIds || [])
      })
      .filter((item: Artwork) => item.isListed === true) // 👈 只有上架的才能進來！

    loadMoreArtworks()
  } catch (error) {
    console.error('探索頁面獲取藝術品失敗:', error)
  } finally {
    hide()
    isInitialLoading.value = false
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  /* 使用 2026 當前主流原生 CSS 補間動畫，並根據 --animation-order 產生 0.08 秒的階梯式延遲 */
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: calc(var(--animation-order) * 0.08s);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

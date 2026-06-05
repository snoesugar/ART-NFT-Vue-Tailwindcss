<template>
  <div v-if="!isLoading" class="bg-primary-bg">
    <div class="container px-3 md:px-8 pt-6 md:pt-12 pb-10 md:pb-20">
      <div class="columns-2 md:columns-4 gap-6">
        <div v-for="item in artworks" :key="item.id" class="break-inside-avoid mb-6 cursor-pointer">
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
      </div>
    </div>
  </div>

  <Loading
    v-else
    enText="Connecting with Blockchain Artwork"
    chText="正在與區塊鏈藝術作品連線中..."
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { nftApi, type Artwork } from '@/api/artist' // 💡 引入 Artist 型別
import { useLoadingStore } from '@/store/loading'
import Button from '@/components/Button.vue'

// 載入狀態變數
const isLoading = ref(true)
const artworks = ref<Artwork[]>([])
const { show, hide } = useLoadingStore()

onMounted(async () => {
  try {
    show() // 🛠️ 1. 改為撈取所有藝術家資料（因為作品現在藏在藝術家物件裡）
    const allArtists = await nftApi.getAllArtists()

    // 🛠️ 2. 使用 flatMap 將每位藝術家底下的 artworks 陣列抽出來，結合成一隻大陣列
    artworks.value = allArtists.flatMap(artist => {
      return artist.artworks || []
    })

    // 除錯檢查用，可以在瀏覽器 Console 看看作品有沒有順利攤平
    console.log('探索頁面攤平後的作品：', artworks.value)
  } catch (error) {
    console.error('探索頁面獲取藝術品失敗:', error)
  } finally {
    // 無論成功或失敗，結束後關閉 Loading 狀態
    hide()
    isLoading.value = false
  }
})
</script>

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
              class="w-full min-h-[139px] md:min-h-[254px] h-auto object-cover"
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

  <div v-else class="flex flex-col bg-primary-bg items-center justify-center py-20 min-h-75">
    <div class="relative flex items-center justify-center mb-6">
      <div class="absolute w-12 h-12 bg-secondary rounded-full animate-ping"></div>
      <div
        class="relative w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/50"
      >
        <div class="w-3 h-3 bg-white rounded-full animate-pulse"></div>
      </div>
    </div>

    <p class="text-sm tracking-widest text-border font-medium uppercase animate-pulse">
      Connecting with Blockchain Artist
    </p>
    <p class="text-xs text-secondary mt-1 tracking-wider">正在與區塊鏈藝術作品連線中...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { artworkApi, type Artwork } from '@/api/artwork'
import Button from '@/components/Button.vue'

// 新增一個明確的載入狀態變數
const isLoading = ref(true)
const artworks = ref<Artwork[]>([])

onMounted(async () => {
  try {
    const data = await artworkApi.getAll()
    artworks.value = data
  } catch (error) {
    console.error('首頁獲取藝術品失敗:', error)
  } finally {
    // 無論成功或失敗，API 請求結束後關閉 Loading 狀態
    isLoading.value = false
  }
})
</script>

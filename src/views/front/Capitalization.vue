<template>
  <div class="bg-primary-bg">
    <div
      v-if="artists.length > 0"
      class="container text-center px-3 lg:px-8 pt-6 lg:pt-10 pb-10 lg:pb-20"
    >
      <h1 class="text-3xl lg:text-5xl font-bold mb-4 lg:mb-6">市價排行榜</h1>
      <p class="font-display mb-8 lg:mb-6">NFT系列藝術作品排行榜！全球注目指標</p>

      <div class="hidden lg:block">
        <table class="w-full border-collapse border-b border-black text-left">
          <thead>
            <tr class="font-display">
              <th class="py-3 px-2 text-center w-14"></th>
              <th class="py-3 px-4 font-normal">系列作品名稱</th>
              <th class="py-3 px-4 font-normal text-right">價值</th>
              <th class="py-3 px-4 font-normal text-right">24h%</th>
              <th class="py-3 px-4 font-normal text-right">7d%</th>
              <th class="py-3 px-4 font-normal text-right">地板價</th>
              <th class="py-3 px-4 font-normal text-right">擁有者</th>
              <th class="py-3 px-4 font-normal text-right">作品數量</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in topTenArtworks"
              :key="index"
              class="border-t border-x border-black bg-white hover:bg-gray-50 transition-colors"
            >
              <td class="py-6 px-4 text-center text-2xl font-paytone border-r border-black w-14">
                {{ index + 1 }}
              </td>

              <td class="p-4">
                <div class="flex items-center gap-4">
                  <img
                    :src="getImageUrl(item.imgUrl)"
                    class="w-12 h-12 rounded-full object-cover"
                    :alt="item.title"
                  />
                  <span class="font-bold">{{ item.title }}</span>
                </div>
              </td>

              <td class="py-4 px-4 text-right">
                <span class="inline-flex items-center gap-1">
                  <i class="fa-brands fa-ethereum mr-2"></i>
                  {{ formatMarketCap(item.markets?.marketCap) }}
                </span>
              </td>

              <td
                class="py-4 px-4 text-right"
                :class="(item.markets?.change24h ?? 0) >= 0 ? 'text-[#53C139]' : 'text-[#E6553B]'"
              >
                {{ (item.markets?.change24h ?? 0) >= 0 ? '+' : '' }}{{ item.markets?.change24h }}%
              </td>

              <td
                class="py-4 px-4 text-right"
                :class="(item.markets?.change7d ?? 0) >= 0 ? 'text-[#53C139]' : 'text-[#E6553B]'"
              >
                {{ (item.markets?.change7d ?? 0) >= 0 ? '+' : '' }}{{ item.markets?.change7d }}%
              </td>

              <td class="py-4 px-4 text-right">
                <span class="inline-flex items-center gap-1">
                  <i v-if="item.markets?.hasIcon" class="fa-brands fa-ethereum mr-2"></i>
                  {{ item.markets?.floorPrice }}
                </span>
              </td>

              <td class="py-4 px-4 text-right">
                {{ formatOwners(item.markets?.owners) }}
              </td>

              <td class="py-4 px-6 text-right">
                {{ item.markets?.totalSupply }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 手機板 -->
      <div class="block lg:hidden border-b border-black">
        <div
          v-for="(item, index) in topTenArtworks"
          :key="'mobile-' + index"
          class="border-t border-x border-black bg-white"
        >
          <div
            @click="toggleMobileMenu(index)"
            class="flex items-center relative cursor-pointer select-none min-h-20"
          >
            <div
              class="font-paytone w-10 text-center text-2xl border-r border-black self-stretch flex items-center justify-center"
            >
              {{ index + 1 }}
            </div>

            <div class="flex items-center gap-3 px-2 py-4 flex-1">
              <img
                :src="getImageUrl(item.imgUrl)"
                class="w-12 h-12 rounded-full object-cover"
                :alt="item.title"
              />
              <span class="font-bold text-sm line-clamp-1">{{ item.title }}</span>
            </div>

            <div class="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-right pr-2">
              <i class="fa-brands fa-ethereum mr-2"></i>
              {{ formatMarketCap(item.markets?.marketCap) }}
            </div>

            <div
              class="absolute bottom-0 right-0 w-8 h-8 flex items-end justify-end text-white transition-colors overflow-hidden"
              :class="mobileMenuStates[index] ? 'bg-primary' : 'bg-black'"
              style="clip-path: polygon(100% 0, 0 100%, 100% 100%)"
            >
              <i
                class="fa-solid text-[10px] absolute right-1 bottom-1"
                :class="mobileMenuStates[index] ? 'fa-minus' : 'fa-plus'"
              ></i>
            </div>
          </div>

          <div v-show="mobileMenuStates[index]" class="border-t bg-white p-4 transition-all">
            <div class="grid grid-cols-3 gap-2 text-center mb-4">
              <div>
                <div class="font-display text-sm mb-2">24h%</div>
                <div
                  class="text-xl"
                  :class="(item.markets?.change24h ?? 0) >= 0 ? 'text-[#53C139]' : 'text-[#E6553B]'"
                >
                  {{ (item.markets?.change24h ?? 0) >= 0 ? '+' : '' }}{{ item.markets?.change24h }}%
                </div>
              </div>
              <div>
                <div class="font-display text-sm mb-2">7d%</div>
                <div
                  class="text-xl"
                  :class="(item.markets?.change7d ?? 0) >= 0 ? 'text-[#53C139]' : 'text-[#E6553B]'"
                >
                  {{ (item.markets?.change7d ?? 0) >= 0 ? '+' : '' }}{{ item.markets?.change7d }}%
                </div>
              </div>
              <div>
                <div class="font-display text-sm mb-2">地板價</div>
                <div class="text-xl">
                  <i class="fa-brands fa-ethereum mr-2"></i> {{ item.markets?.floorPrice ?? 0 }}
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-2 text-center">
              <div>
                <div class="font-display text-sm mb-2">擁有者</div>
                <div class="text-xl">{{ formatOwners(item.markets?.owners) }}</div>
              </div>
              <div>
                <div class="font-display text-sm mb-2">作品數量</div>
                <div class="text-xl">{{ item.markets?.totalSupply }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useArtistStore } from '@/store/artistStore'
import { useLoadingStore } from '@/store/loading'
import { storeToRefs } from 'pinia'

const artistStore = useArtistStore()
const { topTenArtworks, artists } = storeToRefs(artistStore)

const baseUrl = import.meta.env.VITE_BASE_URL || '/ART-NFT-Vue-Tailwindcss/'

// 💡 6. 加上安全拼接圖片網址的 function
const getImageUrl = (imgName: string | undefined) => {
  if (!imgName) return ''
  const base = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
  const name = imgName.startsWith('/') ? imgName.slice(1) : imgName
  return `${base}/${name}`
}

const { show, hide } = useLoadingStore()

// 🔧 新增：專門管理手機版下拉選單開關狀態的 reactive 物件 (Key 為作品 index)
const mobileMenuStates = reactive<Record<number, boolean>>({})

// 🔧 新增：切換選單開關的方法
const toggleMobileMenu = (index: number) => {
  mobileMenuStates[index] = !mobileMenuStates[index]
}

// 專門處理價值（marketCap）的千分位
const formatMarketCap = (val: number | undefined): string => {
  if (val === undefined || val === null) return '0.00'
  return val.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

// 專門處理擁有者人數（owners）的 K 縮寫
const formatOwners = (val: number | undefined): string => {
  const num = val ?? 0
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`
  }
  return num.toLocaleString('en-US')
}

onMounted(async () => {
  try {
    show() //3. 發送 API 前，開啟全螢幕 Loading
    // 撈取「所有藝術家」，因為作品現在藏在裡面
    show()
    await artistStore.fetchAll()
  } catch (error) {
    console.error('排行榜獲取資料失敗:', error)
  } finally {
    hide() // 💡 4. 無論成功或失敗，結束時關閉 Loading
  }
})
</script>

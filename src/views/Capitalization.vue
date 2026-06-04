<template>
  <div class="bg-primary-bg">
    <div class="container text-center px-3 md:px-8 pt-6 md:pt-10 pb-10 md:pb-20">
      <h1 class="text-3xl md:text-5xl font-bold mb-4 md:mb-6">市價排行榜</h1>
      <p class="font-display mb-8 md:mb-6">NFT系列藝術作品排行榜！全球注目指標</p>
      <!-- 電腦版 -->
      <div class="hidden md:block">
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
                    :src="item.imgUrl"
                    class="w-12 h-12 rounded-full object-cover"
                    :alt="item.title"
                  />
                  <span class="font-bold">{{ item.title }}</span>
                </div>
              </td>

              <td class="py-4 px-4 text-right">
                <span class="inline-flex items-center gap-1">
                  <i class="fa-brands fa-ethereum mr-2"></i> {{ item.markets?.marketCap }}
                </span>
              </td>

              <td
                class="py-4 px-4 text-right"
                :class="item.markets?.change24h >= 0 ? 'text-[#53C139]' : 'text-[#E6553B]'"
              >
                {{ item.markets?.change24h >= 0 ? '+' : '' }}{{ item.markets?.change24h }}%
              </td>

              <td
                class="py-4 px-4 text-right"
                :class="item.markets?.change7d >= 0 ? 'text-[#53C139]' : 'text-[#E6553B]'"
              >
                {{ item.markets?.change7d >= 0 ? '+' : '' }}{{ item.markets?.change7d }}%
              </td>

              <td class="py-4 px-4 text-right">
                <span class="inline-flex items-center gap-1">
                  <i v-if="item.markets?.hasIcon" class="fa-brands fa-ethereum mr-2"></i>
                  {{ item.markets?.floorPrice }}
                </span>
              </td>

              <td class="py-4 px-4 text-right">
                {{ item.markets?.owners }}
              </td>

              <td class="py-4 px-6 text-right">
                {{ item.markets?.totalSupply }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 手機板 -->
      <div class="block md:hidden border-b border-black">
        <div
          v-for="(item, index) in topTenArtworks"
          :key="'mobile-' + index"
          class="border-t border-x border-black bg-white"
        >
          <div
            @click="item.markets.isOpen = !item.markets.isOpen"
            class="flex items-center relative cursor-pointer select-none min-h-20"
          >
            <div
              class="font-paytone w-10 text-center text-2xl border-r border-black self-stretch flex items-center justify-center"
            >
              {{ index + 1 }}
            </div>

            <div class="flex items-center gap-3 px-2 py-4 flex-1">
              <img
                :src="item.imgUrl"
                class="w-12 h-12 rounded-full object-cover"
                :alt="item.title"
              />
              <span class="font-bold text-sm line-clamp-1">{{ item.title }}</span>
            </div>

            <div class="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-right pr-2">
              <i class="fa-brands fa-ethereum mr-2"></i> {{ item.markets?.marketCap }}
            </div>

            <div
              class="absolute bottom-0 right-0 w-8 h-8 flex items-end justify-end text-white transition-colors overflow-hidden"
              :class="item.markets.isOpen ? 'bg-primary' : 'bg-black'"
              style="clip-path: polygon(100% 0, 0 100%, 100% 100%)"
            >
              <i
                class="fa-solid text-[10px] absolute right-1 bottom-1"
                :class="item.markets.isOpen ? 'fa-minus' : 'fa-plus'"
              ></i>
            </div>
          </div>

          <!-- 下拉式資訊 -->
          <div v-show="item.markets.isOpen" class="border-t bg-white p-4 transition-all">
            <div class="grid grid-cols-3 gap-2 text-center mb-4">
              <div>
                <div class="font-display text-sm mb-2">24h%</div>
                <div
                  class="text-xl"
                  :class="item.markets?.change24h >= 0 ? 'text-[#53C139]' : 'text-[#E6553B]'"
                >
                  {{ item.markets?.change24h >= 0 ? '+' : '' }}{{ item.markets?.change24h }}%
                </div>
              </div>
              <div>
                <div class="font-display text-sm mb-2">7d%</div>
                <div
                  class="text-xl"
                  :class="item.markets?.change7d >= 0 ? 'text-[#53C139]' : 'text-[#E6553B]'"
                >
                  {{ item.markets?.change7d >= 0 ? '+' : '' }}{{ item.markets?.change7d }}%
                </div>
              </div>
              <div>
                <div class="font-display text-sm mb-2">地板價</div>
                <div class="text-xl">
                  <i class="fa-brands fa-ethereum mr-2"></i> {{ item.markets?.floorPrice }}
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-2 text-center">
              <div>
                <div class="font-display text-sm mb-2">擁有者</div>
                <div class="text-xl">{{ item.markets?.owners }}</div>
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
import { ref, onMounted, computed } from 'vue'
import { artworkApi, type Artwork } from '@/api/artwork'

const artworks = ref<Artwork[]>([])

// 2. 新增一個 computed，只切出前 10 筆資料 🌟
const topTenArtworks = computed(() => {
  return artworks.value.slice(0, 10)
})

onMounted(async () => {
  try {
    const data = await artworkApi.getAll()

    // 在寫入前，幫每個項目做預設值防禦，確保 markets 絕對不是 undefined
    artworks.value = data.map(item => ({
      ...item,
      markets: item.markets || {
        marketCap: '0',
        change24h: 0,
        change7d: 0,
        floorPrice: '0',
        hasIcon: false,
        owners: '0',
        totalSupply: '0',
        isOpen: false, // 預設關閉狀態
      },
    }))
  } catch (error) {
    console.error('首頁獲取藝術品失敗:', error)
  }
})
</script>

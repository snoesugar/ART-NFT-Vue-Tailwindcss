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
              v-for="(item, index) in capitalizationData"
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
                    :alt="item.name"
                  />
                  <span class="font-bold">{{ item.name }}</span>
                </div>
              </td>

              <td class="py-4 px-4 text-right">
                <span class="inline-flex items-center gap-1">
                  <i class="fa-brands fa-ethereum mr-2"></i> {{ item.marketCap }}
                </span>
              </td>

              <td
                class="py-4 px-4 text-right"
                :class="item.change24h >= 0 ? 'text-[#53C139]' : 'text-[#E6553B]'"
              >
                {{ item.change24h >= 0 ? '+' : '' }}{{ item.change24h }}%
              </td>

              <td
                class="py-4 px-4 text-right"
                :class="item.change7d >= 0 ? 'text-[#53C139]' : 'text-[#E6553B]'"
              >
                {{ item.change7d >= 0 ? '+' : '' }}{{ item.change7d }}%
              </td>

              <td class="py-4 px-4 text-right">
                <span class="inline-flex items-center gap-1">
                  <i v-if="item.hasIcon" class="fa-brands fa-ethereum mr-2"></i>
                  {{ item.floorPrice }}
                </span>
              </td>

              <td class="py-4 px-4 text-right">
                {{ item.owners }}
              </td>

              <td class="py-4 px-6 text-right">
                {{ item.totalSupply }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 手機板 -->
      <div class="block md:hidden border-b border-black">
        <div
          v-for="(item, index) in capitalizationData"
          :key="'mobile-' + index"
          class="border-t border-x border-black bg-white"
        >
          <div
            @click="item.isOpen = !item.isOpen"
            class="flex items-center relative cursor-pointer select-none min-h-[80px]"
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
                :alt="item.name"
              />
              <span class="font-bold text-sm line-clamp-1">{{ item.name }}</span>
            </div>

            <div class="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-right pr-2">
              <i class="fa-brands fa-ethereum mr-2"></i> {{ item.marketCap }}
            </div>

            <div
              class="absolute bottom-0 right-0 w-8 h-8 flex items-end justify-end text-white transition-colors overflow-hidden"
              :class="item.isOpen ? 'bg-primary' : 'bg-black'"
              style="clip-path: polygon(100% 0, 0 100%, 100% 100%)"
            >
              <i
                class="fa-solid text-[10px] absolute right-1 bottom-1"
                :class="item.isOpen ? 'fa-minus' : 'fa-plus'"
              ></i>
            </div>
          </div>

          <!-- 下拉式資訊 -->
          <div v-show="item.isOpen" class="border-t bg-white p-4 transition-all">
            <div class="grid grid-cols-3 gap-2 text-center mb-4">
              <div>
                <div class="font-display text-sm mb-2">24h%</div>
                <div
                  class="text-xl"
                  :class="item.change24h >= 0 ? 'text-[#53C139]' : 'text-[#E6553B]'"
                >
                  {{ item.change24h >= 0 ? '+' : '' }}{{ item.change24h }}%
                </div>
              </div>
              <div>
                <div class="font-display text-sm mb-2">7d%</div>
                <div
                  class="text-xl"
                  :class="item.change7d >= 0 ? 'text-[#53C139]' : 'text-[#E6553B]'"
                >
                  {{ item.change7d >= 0 ? '+' : '' }}{{ item.change7d }}%
                </div>
              </div>
              <div>
                <div class="font-display text-sm mb-2">地板價</div>
                <div class="text-xl">
                  <i class="fa-brands fa-ethereum mr-2"></i> {{ item.floorPrice }}
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-2 text-center">
              <div>
                <div class="font-display text-sm mb-2">擁有者</div>
                <div class="text-xl">{{ item.owners }}</div>
              </div>
              <div>
                <div class="font-display text-sm mb-2">作品數量</div>
                <div class="text-xl">{{ item.totalSupply }}</div>
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
const capitalizationData = ref([
  {
    id: 1,
    name: '追求者送我的花',
    imgUrl: new URL('/art29.jpg', import.meta.url).href,
    marketCap: '1,774.19',
    change24h: 220.49, // 正數自動變綠、加 + 號
    change7d: -2.43, // 負數自動變紅
    floorPrice: '2.90',
    hasIcon: true, // 用來判斷地板價前面要不要加符號
    owners: '32.1K',
    totalSupply: '1000',
    isOpen: false, // 👈 核心：預設手機版是不展開的
  },
  {
    name: '夏天的時候',
    imgUrl: new URL('/art06.jpg', import.meta.url).href,
    marketCap: '1,524.89',
    change24h: 80.49,
    change7d: -2.43,
    floorPrice: '90.23',
    hasIcon: false,
    owners: '32.1K',
    totalSupply: '1000',
    isOpen: false,
  },
  {
    name: '海洋波度',
    imgUrl: new URL('/art02.jpg', import.meta.url).href,
    marketCap: '1,400.59',
    change24h: -3.92,
    change7d: -13.43,
    floorPrice: '2.90',
    hasIcon: true,
    owners: '32.1K',
    totalSupply: '1000',
    isOpen: false,
  },
  {
    name: '賴床真的很不好',
    imgUrl: new URL('/art03.jpg', import.meta.url).href,
    marketCap: '1,224.88',
    change24h: -9.23,
    change7d: -20.43,
    floorPrice: '2.90',
    hasIcon: true,
    owners: '32.1K',
    totalSupply: '1000',
    isOpen: true,
  },
  {
    name: '瞳孔:流動的脈絡',
    imgUrl: new URL('/art01.jpg', import.meta.url).href,
    marketCap: '1,021.09',
    change24h: 83.49,
    change7d: -1.43,
    floorPrice: '2.90',
    hasIcon: true,
    owners: '32.1K',
    totalSupply: '1000',
    isOpen: false,
  },
  {
    name: '哭泣的時候',
    imgUrl: new URL('/art12.jpg', import.meta.url).href,
    marketCap: '921.42',
    change24h: -9.43,
    change7d: 183.49,
    floorPrice: '2.90',
    hasIcon: true,
    owners: '32.1K',
    totalSupply: '1000',
    isOpen: false,
  },
  {
    name: '破碎的菠蘿麵包',
    imgUrl: new URL('/art14.jpg', import.meta.url).href,
    marketCap: '888.88',
    change24h: 20.49,
    change7d: -0.43,
    floorPrice: '2.90',
    hasIcon: true,
    owners: '32.1K',
    totalSupply: '1000',
    isOpen: false,
  },
  {
    name: '人生中的貓咪們',
    imgUrl: new URL('/art08.jpg', import.meta.url).href,
    marketCap: '770.23',
    change24h: 23.49,
    change7d: 30.23,
    floorPrice: '2.90',
    hasIcon: true,
    owners: '32.1K',
    totalSupply: '1000',
    isOpen: false,
  },
  {
    name: '髒兮兮的家',
    imgUrl: new URL('/art28.jpg', import.meta.url).href,
    marketCap: '502.31',
    change24h: 13.49,
    change7d: 50.23,
    floorPrice: '2.90',
    hasIcon: true,
    owners: '32.1K',
    totalSupply: '1000',
    isOpen: false,
  },
  {
    name: '細胞小將',
    imgUrl: new URL('/art16.jpg', import.meta.url).href,
    marketCap: '420.20',
    change24h: 54.49,
    change7d: -12.43,
    floorPrice: '2.90',
    hasIcon: true,
    owners: '32.1K',
    totalSupply: '1000',
    isOpen: false,
  },
])
</script>

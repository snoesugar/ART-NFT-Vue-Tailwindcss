<template>
  <nav class="border-b border-black bg-primary-bg sticky top-0 z-50 h-16 md:h-24">
    <div class="container mx-auto flex justify-between items-stretch h-full">
      <template v-if="!isSearchOpen">
        <router-link to="/" class="flex items-center border-black py-4 md:py-8">
          <img src="/logo.svg" class="px-3 md:px-8 h-4.5 md:h-8 w-auto object-contain" alt="logo" />
        </router-link>

        <ul class="hidden md:flex flex-1 justify-end items-stretch">
          <li class="flex items-stretch border-l border-black">
            <div class="flex items-center h-full">
              <input
                type="text"
                placeholder="搜尋作品名稱、藝術家名稱"
                class="w-64 bg-primary-bg text-secondary placeholder:text-secondary focus:outline-none pl-12 pr-6 py-2 text-sm transition"
              />
              <i class="text-xl mr-12 fa-solid fa-magnifying-glass text-black"></i>
            </div>
          </li>
          <li class="flex items-stretch border-l border-black">
            <router-link
              to="/explore"
              class="text-black font-bold hover:text-primary transition px-10 h-full flex items-center"
              >探索</router-link
            >
          </li>
          <li class="flex items-stretch border-l border-black">
            <router-link
              to="/capitalization"
              class="text-black font-black hover:text-primary transition px-10 h-full flex items-center"
              >市值</router-link
            >
          </li>
          <li class="flex items-stretch border-l border-black">
            <button
              @click="isModalOpen = true"
              class="text-black text-2xl hover:text-primary transition px-10 h-full flex items-center focus:outline-none"
            >
              <i class="fa-solid fa-wallet"></i>
            </button>
          </li>
        </ul>

        <div class="md:hidden flex items-center">
          <button @click="openSearch" class="focus:outline-none">
            <i class="text-lg px-4 fa-solid fa-magnifying-glass text-black"></i>
          </button>
          <button @click="isMenuOpen = !isMenuOpen" class="focus:outline-none">
            <i
              class="text-lg px-4 fa-solid text-black transition-transform duration-300"
              :class="isMenuOpen ? 'fa-xmark rotate-90' : 'fa-bars'"
            ></i>
          </button>
        </div>
      </template>

      <template v-else>
        <div class="md:hidden flex flex-1 items-center px-3 bg-primary-bg w-full animate-fade-in">
          <button @click="isSearchOpen = false" class="focus:outline-none px-4">
            <i class="text-lg fa-solid fa-chevron-left text-black"></i>
          </button>

          <div class="flex-1 flex items-center relative">
            <input
              type="text"
              placeholder="搜尋作品名稱、藝術家名稱"
              class="w-full bg-primary-bg text-black placeholder:text-secondary focus:outline-none text-lg py-2.75 pr-10"
              autofocus
            />
            <i class="text-lg absolute right-2 fa-solid fa-magnifying-glass text-black"></i>
          </div>
        </div>
      </template>
    </div>
  </nav>

  <div
    class="md:hidden w-full bg-white border-b border-black transition-all duration-300 ease-in-out fixed top-16 left-0 z-40 shadow-lg"
    :class="
      isMenuOpen && !isSearchOpen
        ? 'translate-y-0 opacity-100'
        : '-translate-y-full opacity-0 pointer-events-none'
    "
  >
    <div class="flex flex-col items-center pb-6 px-3 text-lg text-center">
      <router-link
        to="/explore"
        class="w-full py-6 text-black font-bold hover:text-primary transition"
      >
        探索
      </router-link>

      <hr class="w-full border-black" />

      <router-link
        to="/capitalization"
        class="w-full py-6 text-black font-black hover:text-primary transition"
      >
        市值
      </router-link>

      <div class="w-full border border-black">
        <button
          @click="openModalFromMenu"
          class="w-full py-3 bg-primary hover:bg-opacity-90 text-white transition tracking-wide"
        >
          連結錢包
        </button>
      </div>
    </div>
  </div>

  <div
    v-if="isMenuOpen && !isSearchOpen"
    @click="isMenuOpen = false"
    class="md:hidden fixed inset-0 bg-black/65 z-30 transition-opacity"
  ></div>

  <!-- 錢包 modal -->
  <Teleport to="body">
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-100 flex items-center justify-center bg-black/65 md:p-4 animate-fade-in"
      @click.self="isModalOpen = false"
    >
      <div
        class="w-full h-full md:h-auto md:max-w-125 bg-white md:border border-black text-center overflow-y-auto"
      >
        <div class="border-b border-black py-4 relative">
          <h3 class="text-xl text-black">連結你的錢包</h3>
          <button
            @click="isModalOpen = false"
            class="block md:hidden absolute right-4 top-1/2 -translate-y-1/2 text-xl text-black hover:text-gray-600 focus:outline-none"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div class="py-6 md:py-6 px-3 md:px-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <button
              v-for="wallet in wallets"
              :key="wallet.id"
              @click="selectedWallet = wallet.id"
              class="flex items-center justify-between p-3 bg-white transition-all"
              :class="selectedWallet === wallet.id ? 'ring-2 ring-primary' : 'ring-1 ring-black'"
            >
              <div class="flex items-center gap-4">
                <img :src="wallet.icon" class="w-6 h-6 object-contain" :alt="wallet.name" />
                <span class="font-medium">{{ wallet.name }}</span>
              </div>
              <i v-if="selectedWallet === wallet.id" class="fa-solid fa-check text-primary"></i>
            </button>
          </div>
        </div>
        <button
          @click="handleConnect"
          class="px-12 py-2 md:mb-6 bg-primary hover:bg-opacity-90 text-white w-full md:w-auto border border-black transition tracking-wider"
        >
          連結錢包
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const isSearchOpen = ref(false)
const isMenuOpen = ref(false)

// 控制 Modal 顯示狀態
const isModalOpen = ref(false)
// 紀錄當前選中的錢包（依據截圖，預設選中 Phantom）
const selectedWallet = ref('Phantom')

const openSearch = () => {
  isSearchOpen.value = true
  isMenuOpen.value = false
}

// 手機版選單點擊「連結錢包」時的邏輯
const openModalFromMenu = () => {
  isMenuOpen.value = false // 關閉手機版選單
  isModalOpen.value = true // 打開錢包 Modal
}

// 點擊最下方確認連結按鈕
const handleConnect = () => {
  alert(`準備連結錢包: ${selectedWallet.value}`)
  isModalOpen.value = false
}

// 監聽選單或 Modal 開啟，鎖定背景滾動
watch([isMenuOpen, isModalOpen], ([menuOpen, modalOpen]) => {
  if (menuOpen || modalOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

const wallets = [
  {
    id: 'MetaMask',
    name: 'MetaMask',
    icon: new URL('/connect01.png', import.meta.url).href,
  },
  {
    id: 'Coinbase Wallet',
    name: 'Coinbase Wallet',
    icon: new URL('/connect02.png', import.meta.url).href,
  },
  {
    id: 'WalletConnect',
    name: 'WalletConnect',
    icon: new URL('/connect03.png', import.meta.url).href,
  },
  {
    id: 'Phantom',
    name: 'Phantom',
    icon: new URL('/connect04.png', import.meta.url).href,
  },
  {
    id: 'Glow',
    name: 'Glow',
    icon: new URL('/connect05.png', import.meta.url).href,
  },
  {
    id: 'Fortmatic',
    name: 'Fortmatic',
    icon: new URL('/connect06.png', import.meta.url).href,
  },
]
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-2px);
  }
  to {
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

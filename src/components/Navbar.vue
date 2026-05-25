<template>
  <nav class="border-b border-black bg-primary-bg sticky top-0 z-50 h-16 md:h-24">
    <div class="container mx-auto flex justify-between items-stretch h-full">
      <template v-if="!isSearchOpen">
        <a href="/" class="flex items-center border-black py-4 md:py-8">
          <img src="/logo.svg" class="px-3 md:px-8 h-4.5 md:h-8 w-auto object-contain" alt="logo" />
        </a>

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
            <a
              href="#"
              class="text-black font-bold hover:text-primary transition px-10 h-full flex items-center"
              >探索</a
            >
          </li>
          <li class="flex items-stretch border-l border-black">
            <a
              href="#"
              class="text-black font-black hover:text-primary transition px-10 h-full flex items-center"
              >市值</a
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
      <a href="#" class="w-full py-6 text-black font-bold hover:text-primary transition"> 探索 </a>

      <hr class="w-full border-black" />

      <a href="#" class="w-full py-6 text-black font-black hover:text-primary transition"> 市值 </a>

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
              class="flex items-center justify-between p-3 border-2 transition-all"
              :class="
                selectedWallet === wallet.id ? 'border-primary border-2' : 'border-black bg-white'
              "
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
    icon: 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg',
  },
  {
    id: 'Coinbase Wallet',
    name: 'Coinbase Wallet',
    icon: 'https://avatars.githubusercontent.com/u/18060234?s=280&v=4',
  },
  {
    id: 'WalletConnect',
    name: 'WalletConnect',
    icon: 'https://www.nuget.org/profiles/WalletConnect/avatar?imageSize=512',
  },
  {
    id: 'Phantom',
    name: 'Phantom',
    icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkjnGt1pvNFJOGlxKfQXK5BEaJgfhE1_9GRg&s',
  },
  {
    id: 'Glow',
    name: 'Glow',
    icon: 'https://cdn.prod.website-files.com/66e480f0e9eccea9c231ce92/6898019b9ff6dc57f7c56c76_Glow%20logo.png',
  },
  {
    id: 'Fortmatic',
    name: 'Fortmatic',
    icon: 'data:image/png;base64,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',
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

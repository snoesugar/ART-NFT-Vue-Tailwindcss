<template>
  <!-- 導覽列本體 -->
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
            <a
              href="#"
              class="text-black text-2xl hover:text-primary transition px-10 h-full flex items-center"
            >
              <i class="fa-solid fa-wallet"></i>
            </a>
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

  <!-- 修正點 1：將選單移到 nav 外面，獨立出來 -->
  <!-- 修正點 2：使用 fixed 定位，並設定 top-16（對齊手機版 nav 的高度 h-16） -->
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
          class="w-full py-3 bg-primary hover:bg-opacity-90 text-white transition tracking-wide"
        >
          連結錢包
        </button>
      </div>
    </div>
  </div>

  <!-- 遮罩層：選單打開時，點擊下方空白處可以自動關閉選單，體驗更好 -->
  <div
    v-if="isMenuOpen && !isSearchOpen"
    @click="isMenuOpen = false"
    class="md:hidden fixed inset-0 bg-black/65 z-30 transition-opacity"
  ></div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const isSearchOpen = ref(false)
const isMenuOpen = ref(false)

const openSearch = () => {
  isSearchOpen.value = true
  isMenuOpen.value = false
}

watch(isMenuOpen, newVal => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
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
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

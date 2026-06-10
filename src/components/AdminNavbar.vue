<template>
  <div class="min-h-screen bg-gray-50 flex text-black">
    <aside
      class="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-black flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0"
      :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div
        class="h-16 md:h-20 border-b border-black flex items-center justify-between px-6 bg-primary-bg"
      >
        <router-link to="/admin" class="flex items-center">
          <img src="/logo.svg" class="h-6 w-auto object-contain" alt="logo" />
          <span
            class="ml-2 font-black text-sm tracking-wider border border-black bg-white px-1.5 py-0.5"
            >後台管理</span
          >
        </router-link>
        <button @click="isSidebarOpen = false" class="md:hidden text-xl focus:outline-none">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <nav class="flex-1 p-4 space-y-1 overflow-y-auto">
        <div class="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 mb-2">
          數據大盤
        </div>
        <router-link
          to="/admin/dashboard"
          class="flex items-center gap-3 px-3 py-3 font-bold border border-transparent hover:border-black hover:bg-primary-bg transition"
          active-class="bg-primary-bg border-black font-black"
        >
          <i class="fa-solid fa-chart-pie w-5 text-center text-lg"></i>
          <span>營運概況</span>
        </router-link>

        <div class="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 pt-4 mb-2">
          內容管理
        </div>
        <router-link
          to="/admin/artworks"
          class="flex items-center gap-3 px-3 py-3 font-bold border border-transparent hover:border-black hover:bg-primary-bg transition"
          active-class="bg-primary-bg border-black font-black"
        >
          <i class="fa-solid fa-palette w-5 text-center text-lg"></i>
          <span>作品管理</span>
        </router-link>
        <router-link
          to="/admin/artists"
          class="flex items-center gap-3 px-3 py-3 font-bold border border-transparent hover:border-black hover:bg-primary-bg transition"
          active-class="bg-primary-bg border-black font-black"
        >
          <i class="fa-solid fa-user-astronaut w-5 text-center text-lg"></i>
          <span>藝術家審核</span>
        </router-link>
      </nav>

      <div class="p-4 border-t border-black bg-gray-50 flex items-center justify-between">
        <div class="flex items-center gap-2 overflow-hidden">
          <div
            class="w-8 h-8 rounded-full border border-black bg-primary flex items-center justify-center text-white font-bold shrink-0"
          >
            A
          </div>
          <div class="truncate text-sm">
            <p class="font-bold truncate">Admin_01</p>
            <p class="text-xs text-gray-500 truncate">最高管理員</p>
          </div>
        </div>
        <button
          @click="handleLogout"
          class="text-gray-500 hover:text-red-600 p-2 transition"
          title="登出系統"
        >
          <i class="fa-solid fa-right-from-bracket text-lg"></i>
        </button>
      </div>
    </aside>

    <div class="flex-1 flex flex-col md:pl-64 min-w-0">
      <header
        class="h-16 md:h-20 bg-primary-bg border-b border-black sticky top-0 z-40 flex items-center justify-between px-4 md:px-8"
      >
        <div class="flex items-center gap-4">
          <button
            @click="isSidebarOpen = true"
            class="md:hidden text-xl p-2 border border-black bg-white focus:outline-none"
          >
            <i class="fa-solid fa-bars"></i>
          </button>

          <div class="hidden sm:flex items-center gap-2 text-sm font-medium">
            <span class="text-gray-500">後台系統</span>
            <i class="fa-solid fa-chevron-right text-xs text-gray-400"></i>
            <span class="font-bold">當頁名稱</span>
          </div>
        </div>

        <div class="flex items-center h-full">
          <router-link
            to="/"
            class="hidden sm:flex items-center gap-1.5 px-3 h-full border-l border-black text-sm font-bold hover:bg-white transition"
          >
            <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
            回到前台
          </router-link>

          <div class="relative h-full border-l border-black flex items-center">
            <button
              @click="isNotifyOpen = !isNotifyOpen"
              class="px-5 h-full text-xl hover:bg-white transition relative focus:outline-none"
            >
              <i class="fa-regular fa-bell"></i>
              <span
                class="absolute top-5 right-5 w-2 h-2 bg-red-500 rounded-full ring-1 ring-white"
              ></span>
            </button>

            <div
              v-if="isNotifyOpen"
              class="absolute right-0 top-full mt-1 w-80 bg-white border border-black shadow-lg py-2 animate-fade-in text-sm"
            >
              <div
                class="px-4 py-2 font-bold border-b border-gray-200 flex justify-between items-center"
              >
                <span>系統通知</span>
                <span class="text-xs text-primary cursor-pointer">全部已讀</span>
              </div>
              <div class="max-h-60 overflow-y-auto">
                <div class="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                  <p class="font-semibold text-xs text-gray-500">5 分鐘前</p>
                  <p class="text-gray-800 mt-0.5">有新的藝術家申請入駐，等待審核。</p>
                </div>
                <div class="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                  <p class="font-semibold text-xs text-gray-500">1 小時前</p>
                  <p class="text-gray-800 mt-0.5">系統將於明日凌晨 02:00 進行例行維護。</p>
                </div>
              </div>
            </div>
          </div>

          <div class="border-l border-black h-full"></div>
        </div>
      </header>

      <main class="flex-1 p-4 md:p-8">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>

    <div
      v-if="isSidebarOpen"
      @click="isSidebarOpen = false"
      class="md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const isSidebarOpen = ref(false)
const isNotifyOpen = ref(false)

// 監聽手機版側邊欄狀態，鎖定背景滾動
watch(isSidebarOpen, isOpen => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

const handleLogout = () => {
  if (confirm('確定要登出後台管理系統嗎？')) {
    alert('執行登出邏輯...')
  }
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.2s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

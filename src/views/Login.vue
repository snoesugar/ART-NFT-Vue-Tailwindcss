<template>
  <div class="min-h-screen bg-primary-bg flex items-center justify-center p-4 text-black">
    <div
      class="w-full max-w-md bg-white border-2 border-black p-6 md:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
    >
      <div class="text-center mb-8">
        <router-link to="/" class="inline-block mb-4">
          <img src="/logo.svg" class="h-8 w-auto mx-auto object-contain" alt="logo" />
        </router-link>
        <h2 class="text-2xl font-black tracking-wide">管理員登入系統</h2>
        <p class="text-sm text-gray-500 mt-1">INTERNAL ART MANAGEMENT SYSTEM</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <div class="space-y-1.5">
          <label class="block text-sm font-bold tracking-wide">管理員帳號</label>
          <div class="relative flex items-center">
            <span class="absolute left-4 text-gray-400">
              <i class="fa-solid fa-user"></i>
            </span>
            <input
              v-model="username"
              type="text"
              placeholder="請輸入帳號"
              required
              class="w-full bg-white border border-black pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
          </div>
        </div>

        <div class="space-y-1.5">
          <label class="block text-sm font-bold tracking-wide">安全密碼</label>
          <div class="relative flex items-center">
            <span class="absolute left-4 text-gray-400">
              <i class="fa-solid fa-lock"></i>
            </span>
            <input
              v-model="password"
              :type="isPasswordVisible ? 'text' : 'password'"
              placeholder="請輸入密碼"
              required
              class="w-full bg-white border border-black pl-11 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
            <button
              type="button"
              @click="isPasswordVisible = !isPasswordVisible"
              class="absolute right-4 text-gray-400 hover:text-black focus:outline-none"
            >
              <i :class="isPasswordVisible ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
            </button>
          </div>
        </div>

        <div class="flex items-center justify-between text-xs font-bold pt-1">
          <label class="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              v-model="rememberMe"
              class="w-4 h-4 accent-primary border-black rounded-none focus:ring-0"
            />
            <span>記住登入狀態</span>
          </label>
          <a
            href="#"
            @click.prevent="handleForgotPassword"
            class="text-gray-500 hover:text-primary transition"
          >
            忘記密碼？
          </a>
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full py-3 bg-primary hover:bg-opacity-95 text-white font-black border-2 border-black transition tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50"
        >
          <span v-if="isLoading">
            <i class="fa-solid fa-spinner animate-spin mr-2"></i>驗證密鑰中...
          </span>
          <span v-else>確認登入系統</span>
        </button>
      </form>

      <div class="mt-8 text-center border-t border-black pt-4">
        <router-link
          to="/"
          class="text-xs font-bold text-gray-500 hover:text-black transition inline-flex items-center gap-1.5"
        >
          <i class="fa-solid fa-arrow-left-long"></i> 放棄登入，返回前台首頁
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const password = ref('')
const rememberMe = ref(false)
const isPasswordVisible = ref(false)
const isLoading = ref(false)

const handleLogin = () => {
  isLoading.value = true

  // 模擬後台 API 驗證機制
  setTimeout(() => {
    isLoading.value = false

    // 這裡實作你的登入成功邏輯 (存取 Token、Pinia 狀態等)
    alert(`登入成功！歡迎回來，${username.value}`)

    // 成功後直接導向至先前修正好的後台大盤首頁
    router.push('/admin/dashboard')
  }, 1200)
}

const handleForgotPassword = () => {
  alert('請聯繫系統技術主管理重設安全驗證密鑰。')
}
</script>

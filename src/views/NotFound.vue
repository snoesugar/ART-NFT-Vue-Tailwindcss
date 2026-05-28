<template>
  <div
    class="min-h-screen bg-primary-bg flex items-center justify-center p-4 md:p-8 select-none font-sans overflow-hidden relative"
  >
    <div
      class="absolute font-paytone text-[15rem] md:text-[32rem] text-black/5 pointer-events-none select-none tracking-tighter font-black -bottom-10 -right-10 md:-bottom-20 md:-right-20 leading-none"
    >
      404
    </div>

    <div
      class="w-full max-w-2xl border-4 border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative flex flex-col md:flex-row overflow-hidden z-10"
    >
      <div
        class="bg-black text-white p-6 flex flex-col justify-between items-center md:items-start md:w-1/3 border-b-4 md:border-b-0 md:border-r-4 border-black"
      >
        <div
          class="flex items-center gap-2 border border-white/30 px-2 py-1 text-xs tracking-widest font-mono text-primary"
        >
          <span class="animate-ping inline-block w-2 h-2 rounded-full bg-primary"></span>
          STATUS: 404
        </div>

        <div
          class="my-8 md:my-0 font-paytone text-6xl md:text-7xl leading-none text-center md:text-left tracking-tighter"
        >
          ART<br class="hidden md:block" />VOID
        </div>

        <div class="text-[10px] font-mono text-secondary tracking-tight hidden md:block">
          SYS_ERR_CRITICAL_<br />PAGE_NOT_FOUND
        </div>
      </div>

      <div class="p-6 md:p-10 flex-1 flex flex-col justify-between bg-white relative">
        <div>
          <div
            class="inline-block bg-primary text-white font-black text-xs px-3 py-1 uppercase tracking-wider mb-4 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            ERROR // LOST IN SPACE
          </div>

          <h1 class="text-3xl md:text-4xl font-black text-black leading-tight tracking-tight mb-4">
            此數位藝術品<br />
            尚未被瀏覽器「鑄造」
          </h1>

          <p class="text-secondary font-medium text-sm md:text-base leading-relaxed mb-8">
            您探索的區塊鏈節點不存在，或者該藝術品已被收藏家秘密下架。系統即將重新同步回主展廳。
          </p>
        </div>

        <div class="space-y-4">
          <div
            class="border-2 border-black p-3 flex items-center justify-between bg-primary-bg/50 relative overflow-hidden"
          >
            <div
              class="absolute left-0 top-0 bottom-0 bg-primary/10 transition-all duration-1000 ease-linear"
              :style="{ width: `${(countdown / 3) * 100}%` }"
            ></div>

            <div class="flex items-center gap-2 font-black text-xs md:text-sm text-black z-10">
              <i class="fa-solid fa-rotate text-primary animate-spin"></i>
              <span>正在跳轉回主展廳...</span>
            </div>
            <div class="font-paytone text-xl text-black z-10">0:0{{ countdown }}</div>
          </div>

          <router-link
            to="/"
            class="group w-full bg-black text-white text-center py-4 font-black text-sm tracking-widest border-2 border-black flex items-center justify-center gap-2 transition-all hover:bg-primary hover:text-white active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            <span>立即返回主展廳</span>
            <i class="fa-solid fa-arrow-right transition-transform group-hover:translate-x-1"></i>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const countdown = ref<number>(3)
let timer: number | null = null

onMounted(() => {
  timer = window.setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      router.push('/')
    }
  }, 1000)
})

onUnmounted(() => {
  if (timer !== null) {
    clearInterval(timer)
  }
})
</script>

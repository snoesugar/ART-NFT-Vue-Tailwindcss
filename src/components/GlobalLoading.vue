<template>
  <Transition name="fade">
    <div
      v-if="isLoading"
      class="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-primary-bg bg-opacity-95 backdrop-blur-sm select-none pointer-events-auto"
    >
      <div
        class="relative p-8 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center max-w-xs w-full mx-4"
      >
        <div
          class="absolute top-0 left-0 w-4 h-4 bg-black"
          style="clip-path: polygon(0 0, 100% 0, 0 100%)"
        ></div>
        <div
          class="absolute top-0 right-0 w-4 h-4 bg-black"
          style="clip-path: polygon(0 0, 100% 0, 100% 100%)"
        ></div>

        <div class="relative w-16 h-16 mb-6 flex items-center justify-center">
          <div
            class="absolute inset-0 border-4 border-dashed border-black rounded-full animate-[spin_4s_linear_infinite]"
          ></div>
          <div
            class="w-8 h-8 border-2 border-black bg-primary animate-[ping_1.5s_ease-in-out_infinite] opacity-20"
          ></div>
          <div
            class="absolute w-6 h-6 border-2 border-black bg-white transform rotate-45 animate-[pulse_1.5s_ease-in-out_infinite] flex items-center justify-center"
          >
            <i class="fa-brands fa-ethereum text-black text-xs"></i>
          </div>
        </div>

        <h3 class="text-sm tracking-[0.2em] text-black font-bold uppercase mb-1">
          Decentralized Loading
        </h3>

        <div class="w-full flex justify-between items-end mt-2 px-1">
          <p class="text-xs text-secondary font-display tracking-wider">區塊鏈資料同步中...</p>
          <span class="font-mono font-extrabold text-sm text-black">{{ progress }}%</span>
        </div>

        <div
          class="w-full h-5 bg-gray-100 border-2 border-black mt-2 overflow-hidden relative p-0.5"
        >
          <div
            class="h-full bg-primary transition-all duration-75 ease-out"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import { useLoadingStore } from '@/store/loading'

const { isLoading } = useLoadingStore()

// 💡 建立進度條狀態
const progress = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

// 💡 開始跑 0 到 100 的計時器函式
const startProgress = () => {
  progress.value = 0
  if (timer) clearInterval(timer)

  // 每 25 毫秒運算一次，大約 1.5 ~ 2 秒內會跑完
  timer = setInterval(() => {
    if (progress.value < 100) {
      // 隨機增加 1~4，營造區塊鏈節點正在運算的真實數位跳動感
      progress.value += Math.floor(Math.random() * 4) + 1
      if (progress.value > 100) progress.value = 100
    } else {
      if (timer) clearInterval(timer)
    }
  }, 25)
}

// 💡 核心機制：監聽全局 Loading 狀態
watch(
  () => isLoading.value,
  newVal => {
    if (newVal) {
      // 當打開 Loading 時，重新觸發跑條
      startProgress()
    } else {
      // 當關閉 Loading 時，清除計時器，並把數值歸零防殘留
      if (timer) clearInterval(timer)
      progress.value = 0
    }
  },
  { immediate: true }, // 確保如果一進網頁就是 true 也能觸發
)

// 組件銷毀時安全清除計時器
onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
/* 遮罩淡入淡出 Transition */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

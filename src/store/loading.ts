// src/store/loading.ts
import { ref } from 'vue'

const isLoading = ref(false)

export const useLoadingStore = () => {
  const show = () => {
    isLoading.value = true
  }

  const hide = () => {
    // 稍微延遲 300ms 關閉，讓動畫有個完整的收尾，體驗更平滑
    setTimeout(() => {
      isLoading.value = false
    }, 300)
  }

  return {
    isLoading,
    show,
    hide,
  }
}

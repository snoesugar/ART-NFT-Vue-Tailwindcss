import { defineStore } from 'pinia'
import { stepApi, type Step } from '@/api/steps' // 假設你的步驟 API 在這裡

export const useStepStore = defineStore('step', {
  state: () => ({
    steps: [] as Step[],
    loading: false,
  }),

  actions: {
    async fetchSteps() {
      // 💡 效能優化：如果已經抓過資料，就不要再發 API
      if (this.steps.length > 0) return

      this.loading = true
      try {
        this.steps = await stepApi.getAll()
      } catch (error) {
        console.error('無法載入流程步驟:', error)
      } finally {
        this.loading = false
      }
    },
  },
})

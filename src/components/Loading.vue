<template>
  <div class="flex flex-col bg-primary-bg items-center justify-center py-20 min-h-75">
    <div class="relative flex items-center justify-center mb-6">
      <div class="absolute w-12 h-12 bg-secondary rounded-full animate-ping"></div>
      <div
        class="relative w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/50"
      >
        <div class="w-3 h-3 bg-white rounded-full animate-pulse"></div>
      </div>
    </div>

    <p class="text-sm tracking-widest text-border font-medium uppercase animate-pulse">
      {{ enText }}
    </p>

    <p class="text-xs text-secondary mt-1 tracking-wider">
      {{ chText }}
    </p>
  </div>
</template>

<script setup lang="ts">
// 💡 定義 Props，讓每個頁面可以自己決定要顯示什麼連線文字
interface Props {
  enText?: string
  chText?: string
}

// 帶入預設值（Default Props）
withDefaults(defineProps<Props>(), {
  enText: 'Connecting with Blockchain',
  chText: '正在與區塊鏈連線中...',
})
</script>

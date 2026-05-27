<template>
  <component
    :is="to ? 'RouterLink' : 'button'"
    :to="to"
    class="group relative flex items-center justify-center w-fit px-12 py-2 text-center tracking-wider transition-colors duration-300 ease-in-out"
    :class="[
      hasBorder
        ? 'border border-black'
        : 'border border-transparent hover:border hover:border-black',
      isPrimaryBg ? 'bg-primary-bg hover:bg-primary' : 'bg-white hover:bg-primary',
    ]"
  >
    <span class="text-black group-hover:text-white z-10 transition-colors duration-300 ease-in-out">
      <slot>MORE</slot>
    </span>

    <div
      class="absolute bottom-0 right-0 h-4 w-4 transition-colors duration-300 ease-in-out"
      :class="
        isPrimaryBg ? 'bg-primary-bg group-hover:bg-primary' : 'bg-white group-hover:bg-primary'
      "
    ></div>

    <div
      class="absolute bottom-0 right-0 h-0 w-0 border-8 border-l-transparent border-t-transparent border-b-primary border-r-primary group-hover:border-b-black group-hover:border-r-black transition-colors duration-300 ease-in-out"
    ></div>
  </component>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
// 定義精簡後的 Props
interface Props {
  to?: RouteLocationRaw // 新增 to 屬性，支援字串或物件路徑
  hasBorder?: boolean // 是否有外框 (預設 true)
  isPrimaryBg?: boolean // 平常狀態是否為 primary 橘底 (預設 false，即白底)
}

// 設定預設值，完全不用填任何 `#Hex` 色碼！
withDefaults(defineProps<Props>(), {
  hasBorder: true,
  isPrimaryBg: false,
})
</script>

<style scoped>
/* 這裡不需要額外寫 CSS，全靠 Tailwind 完成 */
</style>

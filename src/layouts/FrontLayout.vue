<template>
  <FrontNavbar />
  <RouterView />
  <FrontFooter />
  <GlobalLoading />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import FrontNavbar from '@/components/FrontNavbar.vue'
import FrontFooter from '@/components/FrontFooter.vue'
import GlobalLoading from '@/components/GlobalLoading.vue'
</script>

<template>
  <AdminNavbar />
  <RouterView />
  <GlobalLoading />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import AdminNavbar from '@/components/AdminNavbar.vue'
import GlobalLoading from '@/components/GlobalLoading.vue'
</script>

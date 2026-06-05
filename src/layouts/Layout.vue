<template>
  <Navbar />
  <RouterView />
  <Footer />
  <GlobalLoading />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import GlobalLoading from '@/components/GlobalLoading.vue'
</script>

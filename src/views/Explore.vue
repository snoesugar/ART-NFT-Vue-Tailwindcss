<template>
  <div class="bg-primary-bg">
    <div class="container px-3 md:px-8 pt-6 md:pt-12 pb-10 md:pb-20">
      <div class="columns-2 md:columns-4 gap-6">
        <div
          v-for="item in ArtworkAll"
          :key="item.id"
          class="break-inside-avoid mb-6 cursor-pointer"
        >
          <div
            class="relative bg-white p-2 md:p-4 border border-gray-200 shadow-sm overflow-hidden"
          >
            <img
              :src="item.imgUrl"
              :alt="item.title"
              class="w-full min-h-34.75 md:min-h-63.5 h-auto object-cover"
            />

            <div
              class="absolute inset-0 bg-black/70 opacity-0 hover:opacity-100 transition duration-300 flex flex-col justify-between p-4 m-4"
            >
              <div class="border border-white p-4 h-full flex flex-col">
                <div class="text-white">
                  <p class="mb-4 whitespace-pre-line">
                    {{ item.description }}
                  </p>

                  <div class="flex gap-2">
                    <i class="fa-brands fa-ethereum"></i>
                    {{ item.price }}
                  </div>
                </div>

                <Button class="mt-auto ml-auto" />
              </div>
            </div>
          </div>

          <div class="mt-2 md:mt-4 md:border-b border-black md:font-bold pb-2 md:pb-4">
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ArtworkAllData } from '@/data/artworks'
import Button from '@/components/Button.vue'

const ArtworkAll = ref(ArtworkAllData)
</script>

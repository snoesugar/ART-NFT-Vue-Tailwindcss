<template>
  <div class="bg-primary-bg">
    <div class="container px-3 md:px-8 pt-6 md:pt-12 pb-10 md:pb-20">
      <div class="columns-2 md:columns-4 gap-6">
        <div v-for="item in artworks" :key="item.id" class="break-inside-avoid mb-6 cursor-pointer">
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
import Button from '@/components/Button.vue'
// 模擬資料，故意給予不同的圖片高度或比例
const artworks = ref([
  {
    id: 1,
    title: '區塊戀-他的私生活',
    price: 300,
    description: '唯一想擁有的人，\n唯一不可以擁有的。',
    imgUrl: new URL('/art09.jpg', import.meta.url).href,
  },
  {
    id: 2,
    title: '不哭不哭眼淚是珍珠',
    price: 200,
    description: '如果悲傷可以變現，\n我早已是這座城市最富有的人。',
    imgUrl: new URL('/art12.jpg', import.meta.url).href,
  },
  {
    id: 3,
    title: '野小孩——叫你不要玩那個',
    price: 300,
    description: '聽話的小孩得到了乖巧，\n野小孩得到了整個世界。',
    imgUrl: new URL('/art19.jpg', import.meta.url).href,
  },
  {
    id: 4,
    title: '夏娃的醜聞',
    price: 300,
    description: '禁果不是她摘的，\n但罪名往往留給最美的人。',
    imgUrl: new URL('/art10.jpg', import.meta.url).href,
  },
  {
    id: 5,
    title: '十分鐘就到',
    price: 200,
    description: '這句話跟「下次約吃飯」一樣，\n都是當代最大的謊言。',
    imgUrl: new URL('/art03.jpg', import.meta.url).href,
  },
  {
    id: 6,
    title: '柔美的細胞小將',
    price: 200,
    description: '體內的理性細胞早就全數陣亡，\n現在掌管大腦的是「想太多」和「算了」。',
    imgUrl: new URL('/art16.jpg', import.meta.url).href,
  },
  {
    id: 7,
    title: '藍色啤酒海',
    price: 150,
    description: '把憂鬱倒進杯子裡，\n今晚我們在泡沫裡滅頂。',
    imgUrl: new URL('/art02.jpg', import.meta.url).href,
  },
  {
    id: 8,
    title: '我這樣有美嗎',
    price: 200,
    description: '在被世界觀看之前，\n我早就對鏡子彩排了無數次。',
    imgUrl: new URL('/art04.jpg', import.meta.url).href,
  },
  {
    id: 9,
    title: '心如止水——今天吃素',
    price: 200,
    description: '嘴上說著一切隨緣，\n心裡其實是誰也看不上眼。',
    imgUrl: new URL('/art15.jpg', import.meta.url).href,
  },
  {
    id: 10,
    title: '沒有人愛我',
    price: 500,
    description: '孤獨是神話，\n也是現代靈魂唯一的奢侈品。',
    imgUrl: new URL('/art11.jpg', import.meta.url).href,
  },
  {
    id: 11,
    title: '我真的受傷了',
    price: 200,
    description: '不是心碎的聲音，\n是期待再次被摔碎的鈍痛。',
    imgUrl: new URL('/art27.jpg', import.meta.url).href,
  },
  {
    id: 12,
    title: '每當夏天我吹著溫暖的風',
    price: 200,
    description: '明知道那陣風吹完就走，\n我還是把襯衫扣子多解開了兩顆。',
    imgUrl: new URL('/art06.jpg', import.meta.url).href,
  },
])
</script>

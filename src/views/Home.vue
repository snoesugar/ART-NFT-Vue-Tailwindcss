<template>
  <div class="bg-primary-bg">
    <div class="container mx-auto">
      <div class="flex flex-col pt-10 pb-20">
        <div class="flex flex-row border border-black">
          <div class="basis-2/3">
            <img src="../../public/art01.jpg" class="w-full h-full object-cover" alt="art01" />
          </div>
          <div class="basis-1/3 p-6">
            <div class="flex flex-col justify-center h-full">
              <span class="text-lg mb-2 mt-14">Kemus Wu</span>
              <p class="text-5xl font-bold mb-6">瞳孔:流動的脈絡</p>
              <p>
                眼睛，總是吸引著我們的注意力，看、被看，也許眼睛裡有著從另一個世界看我們的世界。
              </p>
              <Button class="self-end mt-auto"></Button>
            </div>
          </div>
        </div>
        <div class="flex flex-row border border-black h-85 w-full bg-white">
          <div class="flex-1 p-6">
            <div class="flex flex-col justify-between h-full">
              <div class="mt-4">
                <span class="text-lg font-medium block mb-2">Joanne</span>
                <p class="text-3xl font-bold mb-6">海洋波度</p>
                <p>
                  海洋的奧秘向我們揭示了深不可測的一面，它的深度——反映了我們的恐懼、同時也吸引著我們。
                </p>
              </div>
              <Button class="self-end mt-auto"></Button>
            </div>
          </div>

          <div class="w-85 h-full shrink-0 border-r">
            <img src="../../public/art02.jpg" class="w-full h-full object-cover" alt="art02" />
          </div>

          <div class="flex-1 p-6">
            <div class="flex flex-col justify-between h-full">
              <div class="mt-4">
                <span class="text-lg font-medium block mb-2">Michael</span>
                <p class="text-3xl font-bold mb-6">我家窗前的鳥</p>
                <p>
                  家門前每天都有不同的小鳥，大多數的小鳥都有特殊能力，特殊能力是什麼我就不說了，希望大家能從作品感受到小鳥的快樂。
                </p>
              </div>
              <Button class="self-end mt-auto"></Button>
            </div>
          </div>

          <div class="w-85 h-full shrink-0">
            <img src="../../public/art21.jpg" class="w-full h-full object-cover" alt="art21" />
          </div>
        </div>
      </div>
      <!-- Ranking -->
      <div class="flex flex-row items-end border-b border-black pb-4">
        <h2 class="text-5xl font-black mr-4 leading-none">Ranking</h2>
        <span class="text-xl font-bold leading-none">市價排行榜</span>
        <Button class="ml-auto -mb-4" :isPrimaryBg="true" :hasBorder="false">MORE</Button>
      </div>
      <div class="pt-10 pb-22">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6.25 items-start">
          <div class="border border-black bg-white flex flex-col relative">
            <div
              class="absolute top-0 left-0 z-20 bg-white border-b border-r border-black px-4 py-2 text-xl aspect-square font-paytone"
            >
              1
            </div>

            <div class="relative h-93.5 w-full overflow-hidden shrink-0">
              <img
                src="../../public/art04.jpg"
                class="w-full h-full object-cover border-b"
                alt="art04"
              />
              <div
                class="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
              >
                <Button class="ml-auto mt-auto"></Button>
              </div>
            </div>

            <div class="flex-1 flex flex-col divide-y divide-black justify-between bg-white">
              <div class="p-4">
                <p class="text-xl font-bold">散步遇到的女人</p>
              </div>
              <div class="px-4 py-2 flex flex-row justify-between items-center bg-white">
                <p>Zoe Jiang</p>
                <div class="flex items-center gap-2 font-bold">
                  <i class="fa-brands fa-ethereum"></i> <span>300</span>
                </div>
              </div>
            </div>
          </div>

          <div class="border border-black bg-white flex flex-col relative">
            <div
              class="absolute top-0 left-0 z-20 bg-white border-b border-r border-black px-4 py-2 text-xl aspect-square font-paytone"
            >
              2
            </div>

            <div class="relative h-93.5 w-full overflow-hidden shrink-0">
              <img
                src="../../public/art05.jpg"
                class="w-full h-full object-cover border-b"
                alt="art05"
              />
              <div
                class="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
              >
                <Button class="ml-auto mt-auto"></Button>
              </div>
            </div>

            <div class="flex-1 flex flex-col divide-y divide-black justify-between bg-white">
              <div class="p-4">
                <p class="text-xl font-bold">爆炸頭的母親</p>
              </div>
              <div class="px-4 py-2 flex flex-row justify-between items-center bg-white">
                <p>Yui</p>
                <div class="flex items-center gap-2 font-bold">
                  <i class="fa-brands fa-ethereum"></i> <span>300</span>
                </div>
              </div>
            </div>
          </div>

          <div class="border border-black bg-white flex flex-col relative">
            <div
              class="absolute top-0 left-0 z-20 bg-white border-b border-r border-black px-4 py-2 text-xl aspect-square font-paytone"
            >
              3
            </div>

            <div class="relative h-93.5 w-full overflow-hidden shrink-0">
              <img
                src="../../public/art06.jpg"
                class="w-full h-full object-cover border-b"
                alt="art06"
              />
              <div
                class="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
              >
                <Button class="ml-auto mt-auto"></Button>
              </div>
            </div>

            <div class="flex-1 flex flex-col divide-y divide-black justify-between bg-white">
              <div class="p-4">
                <p class="text-xl font-bold">夏天的時候</p>
              </div>
              <div class="px-4 py-2 flex flex-row justify-between items-center bg-white">
                <p>Bug Lin</p>
                <div class="flex items-center gap-2 font-bold">
                  <i class="fa-brands fa-ethereum"></i> <span>300</span>
                </div>
              </div>
            </div>
          </div>

          <div class="border border-black bg-white flex flex-row h-22.5 relative">
            <div
              class="bg-white border-r border-black h-full flex items-center justify-center px-4 py-6 text-2xl font-black font-paytone"
            >
              4
            </div>
            <div class="relative w-21.75 h-full shrink-0 border-r border-black group">
              <img src="../../public/art06.jpg" class="w-full h-full object-cover" alt="art06" />
              <div
                class="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
              >
                <span class="text-white text-lg font-black tracking-tighter">MORE</span>
                <div
                  class="absolute bottom-0 right-0 h-0 w-0 border-8 border-l-transparent border-t-transparent border-b-primary border-r-primary group-hover:border-b-primary group-hover:border-r-primary transition-colors duration-300 ease-in-out"
                ></div>
              </div>
            </div>
            <div class="flex-1 flex flex-col divide-y divide-black h-full">
              <div class="p-4 flex-1 flex items-center">
                <p class="text-lg font-bold leading-none">追求者送我的花</p>
              </div>
              <div
                class="px-4 py-2 leading-none flex flex-row justify-between items-center bg-white"
              >
                <p>Michael</p>
                <div class="flex items-center gap-2">
                  <i class="fa-brands fa-ethereum"></i>
                  <span>300</span>
                </div>
              </div>
            </div>
          </div>

          <div class="border border-black bg-white flex flex-row h-22.5 relative">
            <div
              class="bg-white border-r border-black h-full flex items-center justify-center px-4 py-6 text-2xl font-black font-paytone"
            >
              5
            </div>
            <div class="relative w-21.75 h-full shrink-0 border-r border-black group">
              <img src="../../public/art07.jpg" class="w-full h-full object-cover" alt="art07" />
              <div
                class="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
              >
                <span class="text-white text-lg font-black tracking-tighter">MORE</span>
                <div
                  class="absolute bottom-0 right-0 h-0 w-0 border-8 border-l-transparent border-t-transparent border-b-primary border-r-primary group-hover:border-b-primary group-hover:border-r-primary transition-colors duration-300 ease-in-out"
                ></div>
              </div>
            </div>
            <div class="flex-1 flex flex-col divide-y divide-black h-full">
              <div class="p-4 flex-1 flex items-center">
                <p class="text-lg font-bold leading-none">今天釣到的魚</p>
              </div>
              <div
                class="px-4 py-2 leading-none flex flex-row justify-between items-center bg-white"
              >
                <p>Wei JJ</p>
                <div class="flex items-center gap-2">
                  <i class="fa-brands fa-ethereum"></i>
                  <span>300</span>
                </div>
              </div>
            </div>
          </div>

          <div class="border border-black bg-white flex flex-row h-22.5 relative">
            <div
              class="bg-white border-r border-black h-full flex items-center justify-center px-4 py-6 text-2xl font-black font-paytone"
            >
              6
            </div>
            <div class="relative w-21.75 h-full shrink-0 border-r border-black group">
              <img src="../../public/art08.jpg" class="w-full h-full object-cover" alt="art08" />
              <div
                class="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
              >
                <span class="text-white text-lg font-black tracking-tighter">MORE</span>
                <div
                  class="absolute bottom-0 right-0 h-0 w-0 border-8 border-l-transparent border-t-transparent border-b-primary border-r-primary group-hover:border-b-primary group-hover:border-r-primary transition-colors duration-300 ease-in-out"
                ></div>
              </div>
            </div>
            <div class="flex-1 flex flex-col divide-y divide-black h-full">
              <div class="p-4 flex-1 flex items-center">
                <p class="text-lg font-bold leading-none">人生中的貓咪們</p>
              </div>
              <div
                class="px-4 py-2 leading-none flex flex-row justify-between items-center bg-white"
              >
                <p>Even Lai</p>
                <div class="flex items-center gap-2">
                  <i class="fa-brands fa-ethereum"></i>
                  <span>300</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Artist-->
      <div class="flex flex-row items-end border-b border-black pb-4">
        <h2 class="text-5xl font-black mr-4 leading-none">Artist</h2>
        <span class="text-xl font-bold leading-none">熱門藝術家</span>
        <Button class="ml-auto -mb-4" :isPrimaryBg="true" :hasBorder="false">MORE</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/Button.vue'
</script>

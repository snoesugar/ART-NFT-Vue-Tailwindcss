<template>
  <div class="bg-primary-bg min-h-screen text-black">
    <div class="relative container mx-auto px-3 md:px-8 pt-6 md:pt-10">
      <div class="flex flex-row gap-6 items-start">
        <div
          class="basis-1/4 bg-white font-display border border-black hidden md:flex flex-col select-none"
        >
          <!-- 網路 -->
          <div class="border-b border-secondary">
            <button
              @click="isOpenInternet = !isOpenInternet"
              class="flex w-full justify-between items-center font-bold px-6 py-4 focus:outline-none"
            >
              <span>網路</span>
              <i
                class="fa-solid fa-angle-down transition-transform duration-300"
                :class="{ 'rotate-180': isOpenInternet }"
              ></i>
            </button>
            <div v-show="isOpenInternet" class="px-6 pb-6 -mt-1">
              <div class="flex flex-col gap-2">
                <label class="flex justify-between items-center cursor-pointer group">
                  <span class="group-hover:text-gray-600">以太坊</span>
                  <input
                    type="checkbox"
                    value="ethereum"
                    v-model="selectedNetworks"
                    class="w-4 h-4 accent-black cursor-pointer"
                  />
                </label>
                <label class="flex justify-between items-center cursor-pointer group">
                  <span class="group-hover:text-gray-600">BNB 智能鏈</span>
                  <input
                    type="checkbox"
                    value="bsc"
                    v-model="selectedNetworks"
                    class="w-4 h-4 accent-black cursor-pointer"
                  />
                </label>
              </div>
            </div>
          </div>

          <!-- 狀態 -->
          <div class="border-b border-secondary">
            <button
              @click="isOpenState = !isOpenState"
              class="flex w-full justify-between items-center font-bold px-6 py-4 focus:outline-none"
            >
              <span>狀態</span>
              <i
                class="fa-solid fa-angle-down transition-transform duration-300"
                :class="{ 'rotate-180': isOpenState }"
              ></i>
            </button>

            <div v-show="isOpenState" class="px-6 pb-6 -mt-1">
              <div class="flex flex-col gap-2">
                <label class="flex justify-between items-center cursor-pointer group">
                  <span class="group-hover:text-gray-600">僅展示</span>
                  <input
                    type="checkbox"
                    value="showingOnly"
                    v-model="selectedState"
                    class="w-4 h-4 accent-black cursor-pointer"
                  />
                </label>
                <label class="flex justify-between items-center cursor-pointer group">
                  <span class="group-hover:text-gray-600">拍賣中</span>
                  <input
                    type="checkbox"
                    value="auction"
                    v-model="selectedState"
                    class="w-4 h-4 accent-black cursor-pointer"
                  />
                </label>
              </div>
            </div>
          </div>

          <!-- 價格 -->
          <div class="border-b border-secondary">
            <button
              @click="isOpenPrice = !isOpenPrice"
              class="flex w-full justify-between items-center font-bold px-6 py-4 focus:outline-none"
            >
              <span>價格</span>
              <i
                class="fa-solid fa-angle-down transition-transform duration-300"
                :class="{ 'rotate-180': isOpenPrice }"
              ></i>
            </button>

            <div v-show="isOpenPrice" class="px-6 pb-6 -mt-1">
              <div class="flex items-center gap-2 h-10">
                <div class="relative min-w-18.5 h-full">
                  <select
                    v-model="priceCurrency"
                    class="w-full h-full bg-white border border-secondary rounded-none pl-2 pr-6 appearance-none focus:outline-none cursor-pointer"
                  >
                    <option value="ETH">ETH</option>
                    <option value="WETH">WETH</option>
                  </select>
                  <i
                    class="fa-solid fa-angle-down text-xs absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
                  ></i>
                </div>

                <input
                  type="number"
                  placeholder="最小"
                  v-model="priceMin"
                  class="w-full h-full border border-secondary rounded-none px-2 text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />

                <span class="text-black flex items-center">─</span>

                <input
                  type="number"
                  placeholder="最大"
                  v-model="priceMax"
                  class="w-full h-full border border-secondary rounded-none px-2 text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>
          </div>

          <!-- 屬性 -->
          <div class="flex flex-col select-none">
            <div class="font-bold text-secondary px-6 pt-5 pb-2">屬性</div>

            <div>
              <button
                @click="isOpenBreed = !isOpenBreed"
                class="flex w-full justify-between items-center font-bold px-6 pt-4 pb-2 focus:outline-none"
              >
                <span>品種</span>
                <i
                  class="fa-solid fa-angle-down transition-transform duration-300"
                  :class="{ 'rotate-180': isOpenBreed }"
                ></i>
              </button>
              <div v-show="isOpenBreed" class="px-6 pb-4">
                <div class="flex flex-col gap-2">
                  <label class="flex justify-between items-center cursor-pointer group">
                    <span class="group-hover:text-gray-600">八哥</span>
                    <input
                      type="checkbox"
                      value="八哥"
                      v-model="selectedBreeds"
                      class="w-4 h-4 accent-black cursor-pointer"
                    />
                  </label>
                  <label class="flex justify-between items-center cursor-pointer group">
                    <span class="group-hover:text-gray-600">虎皮鸚鵡</span>
                    <input
                      type="checkbox"
                      value="虎皮鸚鵡"
                      v-model="selectedBreeds"
                      class="w-4 h-4 accent-black cursor-pointer"
                    />
                  </label>
                  <label class="flex justify-between items-center cursor-pointer group">
                    <span class="group-hover:text-gray-600">太平洋鳥</span>
                    <input
                      type="checkbox"
                      value="太平洋鳥"
                      v-model="selectedBreeds"
                      class="w-4 h-4 accent-black cursor-pointer"
                    />
                  </label>
                  <label class="flex justify-between items-center cursor-pointer group">
                    <span class="group-hover:text-gray-600">畫眉鳥</span>
                    <input
                      type="checkbox"
                      value="畫眉鳥"
                      v-model="selectedBreeds"
                      class="w-4 h-4 accent-black cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div>
              <button
                @click="isOpenBirdCount = !isOpenBirdCount"
                class="flex w-full justify-between items-center font-bold px-6 py-3 focus:outline-none"
              >
                <span>鳥的數量</span>
                <i
                  class="fa-solid fa-angle-down transition-transform duration-300"
                  :class="{ 'rotate-180': isOpenBirdCount }"
                ></i>
              </button>
              <div v-show="isOpenBirdCount" class="px-6 pb-4">
                <div class="flex flex-col gap-2">
                  <label class="flex justify-between items-center cursor-pointer group">
                    <span class="group-hover:text-gray-600">單隻</span>
                    <input
                      type="checkbox"
                      value="1"
                      v-model="selectedBirdCounts"
                      class="w-4 h-4 accent-black cursor-pointer"
                    />
                  </label>
                  <label class="flex justify-between items-center cursor-pointer group">
                    <span class="group-hover:text-gray-600">兩隻</span>
                    <input
                      type="checkbox"
                      value="2"
                      v-model="selectedBirdCounts"
                      class="w-4 h-4 accent-black cursor-pointer"
                    />
                  </label>
                  <label class="flex justify-between items-center cursor-pointer group">
                    <span class="group-hover:text-gray-600">三隻以上</span>
                    <input
                      type="checkbox"
                      value="3+"
                      v-model="selectedBirdCounts"
                      class="w-4 h-4 accent-black cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div>
              <button
                @click="isOpenHasPlants = !isOpenHasPlants"
                class="flex w-full justify-between items-center font-bold px-6 py-3 focus:outline-none"
              >
                <span>是否有花草</span>
                <i
                  class="fa-solid fa-angle-down transition-transform duration-300"
                  :class="{ 'rotate-180': isOpenHasPlants }"
                ></i>
              </button>
              <div v-show="isOpenHasPlants" class="px-6 pb-4">
                <div class="flex flex-col gap-2">
                  <label class="flex justify-between items-center cursor-pointer group">
                    <span class="group-hover:text-gray-600">有花草</span>
                    <input
                      type="checkbox"
                      value="yes"
                      v-model="selectedHasPlants"
                      class="w-4 h-4 accent-black cursor-pointer"
                    />
                  </label>
                  <label class="flex justify-between items-center cursor-pointer group">
                    <span class="group-hover:text-gray-600">純鳥類無花草</span>
                    <input
                      type="checkbox"
                      value="no"
                      v-model="selectedHasPlants"
                      class="w-4 h-4 accent-black cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div class="pb-4">
              <button
                @click="isOpenBirdColor = !isOpenBirdColor"
                class="flex w-full justify-between items-center font-bold px-6 py-3 focus:outline-none"
              >
                <span>鳥的顏色</span>
                <i
                  class="fa-solid fa-angle-down transition-transform duration-300"
                  :class="{ 'rotate-180': isOpenBirdColor }"
                ></i>
              </button>
              <div v-show="isOpenBirdColor" class="px-6 pb-4">
                <div class="flex flex-col gap-2">
                  <label class="flex justify-between items-center cursor-pointer group">
                    <span class="group-hover:text-gray-600">彩色 / 斑斕</span>
                    <input
                      type="checkbox"
                      value="colorful"
                      v-model="selectedColors"
                      class="w-4 h-4 accent-black cursor-pointer"
                    />
                  </label>
                  <label class="flex justify-between items-center cursor-pointer group">
                    <span class="group-hover:text-gray-600">單色 / 純白</span>
                    <input
                      type="checkbox"
                      value="monochrome"
                      v-model="selectedColors"
                      class="w-4 h-4 accent-black cursor-pointer"
                    />
                  </label>
                  <label class="flex justify-between items-center cursor-pointer group">
                    <span class="group-hover:text-gray-600">藍綠色系</span>
                    <input
                      type="checkbox"
                      value="blue-green"
                      v-model="selectedColors"
                      class="w-4 h-4 accent-black cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="basis-full md:basis-3/4">
          <div v-if="currentArtist" class="flex flex-row items-center mb-1">
            <img
              class="h-8 w-8 object-cover rounded-full"
              :src="`/${currentArtist?.img}`"
              :alt="currentArtist?.name"
            />
            <span class="ml-4">{{ currentArtist?.name }}</span>
          </div>
          <div class="flex flex-col md:flex-row gap-4 md:gap-6 mb-10">
            <div class="basis-4/7">
              <h1 class="text-3xl font-bold mb-2">{{ currentSeries?.name }}</h1>
              <p>
                {{ currentSeries?.description }}
              </p>
            </div>
            <div v-if="artistStats" class="basis-3/7">
              <div class="flex bg-white border">
                <div class="relative flex-1 py-4 px-2 border-r text-center">
                  <p>項目</p>
                  <p class="text-2xl">{{ artistStats.items }} k</p>
                  <div
                    class="absolute bg-white px-1 py-6 top-1/2 right-0 -translate-y-1/2 translate-x-1/2"
                  ></div>
                </div>
                <div class="relative flex-1 py-4 px-2 border-r text-center">
                  <p>擁有者</p>
                  <p class="text-2xl">{{ artistStats.owners }} k</p>
                  <div
                    class="absolute bg-white px-1 py-6 top-1/2 right-0 -translate-y-1/2 translate-x-1/2"
                  ></div>
                </div>
                <div class="relative flex-1 py-4 px-2 border-r text-center">
                  <p>底價</p>
                  <p class="text-2xl">
                    <i class="text-lg mr-1 fa-brands fa-ethereum"></i
                    >{{ artistStats.floor_price }} k
                  </p>
                  <div
                    class="absolute bg-white px-1 py-6 top-1/2 right-0 -translate-y-1/2 translate-x-1/2"
                  ></div>
                </div>
                <div class="relative flex-1 py-4 px-2 text-center">
                  <p>總額</p>
                  <p class="text-2xl">{{ artistStats.total_volume }} k</p>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-end">
            <button class="bg-white py-2 px-6 w-fit border">
              最新上架<i class="ml-2 fa-solid fa-sort"></i>
            </button>
          </div>
          <!-- 篩選最新上架 -->
          <div v-if="artworks.length > 0" class="pt-6 md:pt-10 pb-10 md:pb-20">
            <div class="columns-2 md:columns-3 gap-6">
              <div
                v-for="item in artworks"
                :key="item.id"
                class="break-inside-avoid mb-6 cursor-pointer"
              >
                <div
                  class="relative bg-white p-2 md:p-6 border border-gray-200 shadow-sm overflow-hidden"
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

                      <Button
                        :to="{ name: 'ArtworkIntroduction', params: { id: item.id } }"
                        class="mt-auto ml-auto"
                      />
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
      </div>
      <!-- 1. 觸發按鈕（畫面上固定的「篩選條件2」按鈕） -->
      <button
        @click="isOpenFilter = true"
        class="block md:hidden fixed bottom-4 right-1/2 translate-x-1/2 z-40"
      >
        <div class="bg-black text-white px-12 py-2">篩選條件2</div>
      </button>
      <!-- 3. 左側滑出的篩選選單（Drawer） -->
      <div
        class="fixed top-0 right-0 h-full w-full bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col"
        :class="isOpenFilter ? 'translate-x-0' : 'translate-x-full'"
      >
        <!-- 標題與關閉按鈕 -->
        <div class="flex justify-between items-center px-3 py-4 border-b border-secondary">
          <span class="text-xl text-center w-full">篩選條件</span>
          <button @click="isOpenFilter = false" class="text-lg font-bold">✕</button>
        </div>

        <!-- 選單內容區（可滾動） -->
        <div class="flex-1 overflow-y-auto p-4 space-y-6">
          <div class="bg-white font-display flex flex-col select-none">
            <!-- 網路 -->
            <div class="border-b border-secondary">
              <button
                @click="isOpenInternet = !isOpenInternet"
                class="flex w-full justify-between items-center font-bold px-6 py-4 focus:outline-none"
              >
                <span>網路</span>
                <i
                  class="fa-solid fa-angle-down transition-transform duration-300"
                  :class="{ 'rotate-180': isOpenInternet }"
                ></i>
              </button>
              <div v-show="isOpenInternet" class="px-6 pb-6 -mt-1">
                <div class="flex flex-col gap-2">
                  <label class="flex justify-between items-center cursor-pointer group">
                    <span class="group-hover:text-gray-600">以太坊</span>
                    <input
                      type="checkbox"
                      value="ethereum"
                      v-model="selectedNetworks"
                      class="w-4 h-4 accent-black cursor-pointer"
                    />
                  </label>
                  <label class="flex justify-between items-center cursor-pointer group">
                    <span class="group-hover:text-gray-600">BNB 智能鏈</span>
                    <input
                      type="checkbox"
                      value="bsc"
                      v-model="selectedNetworks"
                      class="w-4 h-4 accent-black cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            </div>

            <!-- 狀態 -->
            <div class="border-b border-secondary">
              <button
                @click="isOpenState = !isOpenState"
                class="flex w-full justify-between items-center font-bold px-6 py-4 focus:outline-none"
              >
                <span>狀態</span>
                <i
                  class="fa-solid fa-angle-down transition-transform duration-300"
                  :class="{ 'rotate-180': isOpenState }"
                ></i>
              </button>

              <div v-show="isOpenState" class="px-6 pb-6 -mt-1">
                <div class="flex flex-col gap-2">
                  <label class="flex justify-between items-center cursor-pointer group">
                    <span class="group-hover:text-gray-600">僅展示</span>
                    <input
                      type="checkbox"
                      value="showingOnly"
                      v-model="selectedState"
                      class="w-4 h-4 accent-black cursor-pointer"
                    />
                  </label>
                  <label class="flex justify-between items-center cursor-pointer group">
                    <span class="group-hover:text-gray-600">拍賣中</span>
                    <input
                      type="checkbox"
                      value="auction"
                      v-model="selectedState"
                      class="w-4 h-4 accent-black cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            </div>

            <!-- 價格 -->
            <div class="border-b border-secondary">
              <button
                @click="isOpenPrice = !isOpenPrice"
                class="flex w-full justify-between items-center font-bold px-6 py-4 focus:outline-none"
              >
                <span>價格</span>
                <i
                  class="fa-solid fa-angle-down transition-transform duration-300"
                  :class="{ 'rotate-180': isOpenPrice }"
                ></i>
              </button>

              <div v-show="isOpenPrice" class="px-6 pb-6 -mt-1">
                <div class="flex items-center gap-2 h-10">
                  <div class="relative min-w-18.5 h-full">
                    <select
                      v-model="priceCurrency"
                      class="w-full h-full bg-white border border-secondary rounded-none pl-2 pr-6 appearance-none focus:outline-none cursor-pointer"
                    >
                      <option value="ETH">ETH</option>
                      <option value="WETH">WETH</option>
                    </select>
                    <i
                      class="fa-solid fa-angle-down text-xs absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
                    ></i>
                  </div>

                  <input
                    type="number"
                    placeholder="最小"
                    v-model="priceMin"
                    class="w-full h-full border border-secondary rounded-none px-2 text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />

                  <span class="text-black flex items-center">─</span>

                  <input
                    type="number"
                    placeholder="最大"
                    v-model="priceMax"
                    class="w-full h-full border border-secondary rounded-none px-2 text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>
            </div>

            <!-- 屬性 -->
            <div class="flex flex-col select-none">
              <div class="font-bold text-secondary px-6 pt-5 pb-2">屬性</div>

              <div>
                <button
                  @click="isOpenBreed = !isOpenBreed"
                  class="flex w-full justify-between items-center font-bold px-6 pt-4 pb-2 focus:outline-none"
                >
                  <span>品種</span>
                  <i
                    class="fa-solid fa-angle-down transition-transform duration-300"
                    :class="{ 'rotate-180': isOpenBreed }"
                  ></i>
                </button>
                <div v-show="isOpenBreed" class="px-6 pb-4">
                  <div class="flex flex-col gap-2">
                    <label class="flex justify-between items-center cursor-pointer group">
                      <span class="group-hover:text-gray-600">八哥</span>
                      <input
                        type="checkbox"
                        value="八哥"
                        v-model="selectedBreeds"
                        class="w-4 h-4 accent-black cursor-pointer"
                      />
                    </label>
                    <label class="flex justify-between items-center cursor-pointer group">
                      <span class="group-hover:text-gray-600">虎皮鸚鵡</span>
                      <input
                        type="checkbox"
                        value="虎皮鸚鵡"
                        v-model="selectedBreeds"
                        class="w-4 h-4 accent-black cursor-pointer"
                      />
                    </label>
                    <label class="flex justify-between items-center cursor-pointer group">
                      <span class="group-hover:text-gray-600">太平洋鳥</span>
                      <input
                        type="checkbox"
                        value="太平洋鳥"
                        v-model="selectedBreeds"
                        class="w-4 h-4 accent-black cursor-pointer"
                      />
                    </label>
                    <label class="flex justify-between items-center cursor-pointer group">
                      <span class="group-hover:text-gray-600">畫眉鳥</span>
                      <input
                        type="checkbox"
                        value="畫眉鳥"
                        v-model="selectedBreeds"
                        class="w-4 h-4 accent-black cursor-pointer"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <button
                  @click="isOpenBirdCount = !isOpenBirdCount"
                  class="flex w-full justify-between items-center font-bold px-6 py-3 focus:outline-none"
                >
                  <span>鳥的數量</span>
                  <i
                    class="fa-solid fa-angle-down transition-transform duration-300"
                    :class="{ 'rotate-180': isOpenBirdCount }"
                  ></i>
                </button>
                <div v-show="isOpenBirdCount" class="px-6 pb-4">
                  <div class="flex flex-col gap-2">
                    <label class="flex justify-between items-center cursor-pointer group">
                      <span class="group-hover:text-gray-600">單隻</span>
                      <input
                        type="checkbox"
                        value="1"
                        v-model="selectedBirdCounts"
                        class="w-4 h-4 accent-black cursor-pointer"
                      />
                    </label>
                    <label class="flex justify-between items-center cursor-pointer group">
                      <span class="group-hover:text-gray-600">兩隻</span>
                      <input
                        type="checkbox"
                        value="2"
                        v-model="selectedBirdCounts"
                        class="w-4 h-4 accent-black cursor-pointer"
                      />
                    </label>
                    <label class="flex justify-between items-center cursor-pointer group">
                      <span class="group-hover:text-gray-600">三隻以上</span>
                      <input
                        type="checkbox"
                        value="3+"
                        v-model="selectedBirdCounts"
                        class="w-4 h-4 accent-black cursor-pointer"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <button
                  @click="isOpenHasPlants = !isOpenHasPlants"
                  class="flex w-full justify-between items-center font-bold px-6 py-3 focus:outline-none"
                >
                  <span>是否有花草</span>
                  <i
                    class="fa-solid fa-angle-down transition-transform duration-300"
                    :class="{ 'rotate-180': isOpenHasPlants }"
                  ></i>
                </button>
                <div v-show="isOpenHasPlants" class="px-6 pb-4">
                  <div class="flex flex-col gap-2">
                    <label class="flex justify-between items-center cursor-pointer group">
                      <span class="group-hover:text-gray-600">有花草</span>
                      <input
                        type="checkbox"
                        value="yes"
                        v-model="selectedHasPlants"
                        class="w-4 h-4 accent-black cursor-pointer"
                      />
                    </label>
                    <label class="flex justify-between items-center cursor-pointer group">
                      <span class="group-hover:text-gray-600">純鳥類無花草</span>
                      <input
                        type="checkbox"
                        value="no"
                        v-model="selectedHasPlants"
                        class="w-4 h-4 accent-black cursor-pointer"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div class="pb-4">
                <button
                  @click="isOpenBirdColor = !isOpenBirdColor"
                  class="flex w-full justify-between items-center font-bold px-6 py-3 focus:outline-none"
                >
                  <span>鳥的顏色</span>
                  <i
                    class="fa-solid fa-angle-down transition-transform duration-300"
                    :class="{ 'rotate-180': isOpenBirdColor }"
                  ></i>
                </button>
                <div v-show="isOpenBirdColor" class="px-6 pb-4">
                  <div class="flex flex-col gap-2">
                    <label class="flex justify-between items-center cursor-pointer group">
                      <span class="group-hover:text-gray-600">彩色 / 斑斕</span>
                      <input
                        type="checkbox"
                        value="colorful"
                        v-model="selectedColors"
                        class="w-4 h-4 accent-black cursor-pointer"
                      />
                    </label>
                    <label class="flex justify-between items-center cursor-pointer group">
                      <span class="group-hover:text-gray-600">單色 / 純白</span>
                      <input
                        type="checkbox"
                        value="monochrome"
                        v-model="selectedColors"
                        class="w-4 h-4 accent-black cursor-pointer"
                      />
                    </label>
                    <label class="flex justify-between items-center cursor-pointer group">
                      <span class="group-hover:text-gray-600">藍綠色系</span>
                      <input
                        type="checkbox"
                        value="blue-green"
                        v-model="selectedColors"
                        class="w-4 h-4 accent-black cursor-pointer"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 底部確認按鈕 -->
        <div class="border">
          <button
            @click="isOpenFilter = false"
            class="w-full bg-primary text-lg text-white py-3 text-center"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { nftApi, type Artwork, type ArtistStats } from '@/api/artist' // 💡 引入 ArtistStats 型別
import { useLoadingStore } from '@/store/loading'
import Button from '@/components/Button.vue'

// 1. 擴充型別定義
interface ArtistInfo {
  id: string
  name: string
  img: string
}

interface SeriesInfo {
  id: string
  name: string
  description: string
}

interface FilteredArtwork extends Artwork {
  seriesId?: string
  artistInfo?: ArtistInfo
  seriesInfo?: SeriesInfo
}

const route = useRoute()
const artworks = ref<FilteredArtwork[]>([])

// 儲存當前篩選出來的藝術家、系列與統計資訊
const currentArtist = ref<ArtistInfo | null>(null)
const currentSeries = ref<SeriesInfo | null>(null)
const artistStats = ref<ArtistStats | null>(null) // 💡 新增：儲存看板數據的響應式變數

// 控制各個風琴下拉選單的開關
const isOpenInternet = ref(true)
const isOpenState = ref(true)
const isOpenPrice = ref(true)
const isOpenBreed = ref(true)
const isOpenBirdCount = ref(false)
const isOpenHasPlants = ref(false)
const isOpenBirdColor = ref(false)
const isOpenFilter = ref(false)

// 資料綁定變數
const selectedNetworks = ref<string[]>([])
const selectedState = ref<string[]>([])
const selectedBreeds = ref<string[]>(['虎皮鸚鵡'])
const selectedBirdCounts = ref<string[]>([])
const selectedHasPlants = ref<string[]>([])
const selectedColors = ref<string[]>([])

const priceCurrency = ref('ETH')
const priceMin = ref<number | null>(null)
const priceMax = ref<number | null>(null)

const { show, hide } = useLoadingStore()

onMounted(async () => {
  try {
    show()
    // 1. 撈取全體藝術家大陣列
    const allArtists = await nftApi.getAllArtists()

    // 2. 攤平資料，並同時「注入」藝術家與系列資訊
    const allArtworks: FilteredArtwork[] = allArtists.flatMap(artist => {
      const seriesList = artist.artworks || []
      const artistName = `${artist.firstName} ${artist.lastName}`.trim()

      return seriesList.flatMap(series => {
        const artworkList = series.artworkIds || []
        return artworkList.map(art => ({
          ...art,
          seriesId: series.id,
          artistInfo: {
            id: artist.id,
            name: artistName,
            img: artist.img,
          },
          seriesInfo: {
            id: series.id,
            name: series.name,
            description: series.description,
          },
        }))
      })
    })

    // 3. 檢查網址有沒有帶 seriesId 參數
    const targetSeriesId = route.query.seriesId as string
    const targetArtistId = route.query.artistId as string

    if (targetSeriesId) {
      // 🎯 雙重比對
      const filtered = allArtworks.filter(art => {
        if (targetArtistId) {
          return art.seriesId === targetSeriesId && art.artistInfo?.id === targetArtistId
        }
        return art.seriesId === targetSeriesId
      })

      artworks.value = filtered

      // 撈出精準的藝術家與系列資訊
      if (filtered.length > 0) {
        currentArtist.value = filtered[0]?.artistInfo || null
        currentSeries.value = filtered[0]?.seriesInfo || null
      }

      // 💡 4. 關鍵修正：利用網址的 artistId 或是撈到的資料，去找出該藝術家的 stats
      const currentArtistId = targetArtistId || currentArtist.value?.id
      if (currentArtistId) {
        const foundArtist = allArtists.find(a => a.id === currentArtistId)
        artistStats.value = foundArtist ? foundArtist.stats : null
      }
    } else {
      // 預防機制
      artworks.value = allArtworks
      currentArtist.value = null
      currentSeries.value = null
      artistStats.value = null
    }
  } catch (error) {
    console.error('Filter 頁面載入失敗:', error)
  } finally {
    hide()
  }
})
</script>

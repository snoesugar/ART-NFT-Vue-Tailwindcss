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
                    value="bnb"
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
                    value="display"
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
                  v-model.number="priceMin"
                  class="w-full h-full border border-secondary rounded-none px-2 text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />

                <span class="text-black flex items-center">─</span>

                <input
                  type="number"
                  placeholder="最大"
                  v-model.number="priceMax"
                  class="w-full h-full border border-secondary rounded-none px-2 text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>
          </div>

          <!-- 屬性 -->
          <div class="flex flex-col select-none">
            <div class="font-bold text-secondary px-6 pt-5 pb-2">屬性</div>

            <div
              v-for="group in attributeGroups"
              :key="group.traitType"
              :class="{ 'pb-4': group === attributeGroups[attributeGroups.length - 1] }"
            >
              <button
                @click="toggleAttributeGroup(group.traitType)"
                class="flex w-full justify-between items-center font-bold px-6 py-3 focus:outline-none"
              >
                <span>{{ group.traitType }}</span>
                <i
                  class="fa-solid fa-angle-down transition-transform duration-300"
                  :class="{ 'rotate-180': isAttributeGroupOpen(group.traitType) }"
                ></i>
              </button>
              <div v-show="isAttributeGroupOpen(group.traitType)" class="px-6 pb-4">
                <div class="flex flex-col gap-2">
                  <label
                    v-for="option in group.options"
                    :key="option"
                    class="flex justify-between items-center cursor-pointer group"
                  >
                    <span class="group-hover:text-gray-600">{{ option }}</span>
                    <input
                      type="checkbox"
                      :checked="isAttributeSelected(group.traitType, option)"
                      @change="toggleAttributeFilter(group.traitType, option)"
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
          <div v-if="filteredArtworks.length > 0" class="pt-6 md:pt-10 pb-10 md:pb-20">
            <div class="grid grid-cols-2 md:grid-cols-3 gap-6 items-start">
              <div
                v-for="(col, colIndex) in artwork3Columns"
                :key="colIndex"
                class="flex flex-col gap-6"
              >
                <div
                  v-for="item in col"
                  :key="item.id"
                  class="cursor-pointer fade-in-up"
                  :style="{ '--animation-order': item.globalIndex }"
                >
                  <div
                    class="relative bg-white p-2 md:p-6 border border-gray-200 shadow-sm overflow-hidden"
                  >
                    <img
                      :src="item.imgUrl"
                      :alt="item.title"
                      class="w-full h-auto min-h-34.75 md:min-h-70 object-cover"
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
          <div v-else class="py-16 text-center text-secondary">沒有符合條件的作品</div>
        </div>
      </div>
      <!-- 1. 觸發按鈕（畫面上固定的「篩選條件2」按鈕） -->
      <button
        @click="isOpenFilter = true"
        class="block md:hidden fixed bottom-4 right-1/2 translate-x-1/2 z-40"
      >
        <div class="bg-black text-white px-12 py-2">
          篩選條件<span v-if="activeFilterCount > 0" class="ml-2">
            {{ activeFilterCount }}
          </span>
        </div>
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
                      value="bnb"
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
                      value="display"
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
                    v-model.number="priceMin"
                    class="w-full h-full border border-secondary rounded-none px-2 text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />

                  <span class="text-black flex items-center">─</span>

                  <input
                    type="number"
                    placeholder="最大"
                    v-model.number="priceMax"
                    class="w-full h-full border border-secondary rounded-none px-2 text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>
            </div>

            <!-- 屬性 -->
            <div class="flex flex-col select-none">
              <div class="font-bold text-secondary px-6 pt-5 pb-2">屬性</div>

              <div
                v-for="group in attributeGroups"
                :key="group.traitType"
                :class="{ 'pb-4': group === attributeGroups[attributeGroups.length - 1] }"
              >
                <button
                  @click="toggleAttributeGroup(group.traitType)"
                  class="flex w-full justify-between items-center font-bold px-6 py-3 focus:outline-none"
                >
                  <span>{{ group.traitType }}</span>
                  <i
                    class="fa-solid fa-angle-down transition-transform duration-300"
                    :class="{ 'rotate-180': isAttributeGroupOpen(group.traitType) }"
                  ></i>
                </button>
                <div v-show="isAttributeGroupOpen(group.traitType)" class="px-6 pb-4">
                  <div class="flex flex-col gap-2">
                    <label
                      v-for="option in group.options"
                      :key="option"
                      class="flex justify-between items-center cursor-pointer group"
                    >
                      <span class="group-hover:text-gray-600">{{ option }}</span>
                      <input
                        type="checkbox"
                        :checked="isAttributeSelected(group.traitType, option)"
                        @change="toggleAttributeFilter(group.traitType, option)"
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
import { ref, reactive, onMounted, computed, onUnmounted, watch } from 'vue'
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

interface AttributeGroup {
  traitType: string
  options: string[]
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
const isOpenFilter = ref(false)

// 資料綁定變數
const selectedNetworks = ref<string[]>([])
const selectedState = ref<string[]>([])
const selectedAttributes = reactive<Record<string, string[]>>({})
const openAttributeGroups = reactive<Record<string, boolean>>({})

const priceCurrency = ref('ETH')
const priceMin = ref<number | null>(null)
const priceMax = ref<number | null>(null)

const { show, hide } = useLoadingStore()

const attributeGroups = computed<AttributeGroup[]>(() => {
  const groups = new Map<string, Set<string>>()

  artworks.value.forEach(artwork => {
    const attributes = artwork.attributes || []

    attributes.forEach(attribute => {
      const traitType = String(attribute.trait_type)
      const value = String(attribute.value)

      if (!traitType || !value) return

      if (!groups.has(traitType)) {
        groups.set(traitType, new Set<string>())
      }

      groups.get(traitType)?.add(value)
    })
  })

  return Array.from(groups, ([traitType, values]) => ({
    traitType,
    options: Array.from(values),
  }))
})

const normalizeNetwork = (network?: string) => {
  const normalized = network?.toLowerCase() || ''
  if (['bnb', 'bsc', 'binance', 'binance smart chain'].includes(normalized)) return 'bnb'
  if (['ethereum', 'eth'].includes(normalized)) return 'ethereum'
  return normalized
}

const toPriceNumber = (value: number | string | null) => {
  if (value === null || value === '') return null

  const numberValue = Number(value)
  return Number.isNaN(numberValue) ? null : numberValue
}

const isAttributeGroupOpen = (traitType: string) => {
  return openAttributeGroups[traitType] ?? true
}

const toggleAttributeGroup = (traitType: string) => {
  openAttributeGroups[traitType] = !isAttributeGroupOpen(traitType)
}

const isAttributeSelected = (traitType: string, value: string) => {
  return selectedAttributes[traitType]?.includes(value) ?? false
}

const toggleAttributeFilter = (traitType: string, value: string) => {
  const values = selectedAttributes[traitType] || []

  if (values.includes(value)) {
    selectedAttributes[traitType] = values.filter(selectedValue => selectedValue !== value)
    return
  }

  selectedAttributes[traitType] = [...values, value]
}

watch(attributeGroups, groups => {
  const validGroups = new Map(groups.map(group => [group.traitType, group.options]))

  Object.keys(selectedAttributes).forEach(traitType => {
    const options = validGroups.get(traitType)

    if (!options) {
      delete selectedAttributes[traitType]
      return
    }

    selectedAttributes[traitType] = (selectedAttributes[traitType] || []).filter(value =>
      options.includes(value),
    )
  })

  groups.forEach(group => {
    selectedAttributes[group.traitType] ||= []
    openAttributeGroups[group.traitType] ??= true
  })
})

const filteredArtworks = computed(() => {
  const minPrice = toPriceNumber(priceMin.value)
  const maxPrice = toPriceNumber(priceMax.value)

  return artworks.value.filter(artwork => {
    const matchesNetwork =
      selectedNetworks.value.length === 0 ||
      selectedNetworks.value.includes(normalizeNetwork(artwork.blockchain))

    const matchesState =
      selectedState.value.length === 0 || selectedState.value.includes(artwork.saleStatus || '')

    const matchesMinPrice = minPrice === null || artwork.price >= minPrice
    const matchesMaxPrice = maxPrice === null || artwork.price <= maxPrice

    const matchesAttributes = Object.entries(selectedAttributes).every(
      ([traitType, selectedValues]) => {
        if (selectedValues.length === 0) return true

        return (artwork.attributes || []).some(attribute => {
          return (
            String(attribute.trait_type) === traitType &&
            selectedValues.includes(String(attribute.value))
          )
        })
      },
    )

    return matchesNetwork && matchesState && matchesMinPrice && matchesMaxPrice && matchesAttributes
  })
})

// 手機板篩選
// 🌟 核心：即時計算目前到底選了幾個條件
const activeFilterCount = computed(() => {
  let count = 0

  // 1. 計算網路勾選數
  count += selectedNetworks.value.length

  // 2. 計算狀態勾選數
  count += selectedState.value.length

  // 3. 計算價格是否有輸入 (有輸入算一個)
  if (priceMin.value !== null) count++
  if (priceMax.value !== null) count++

  // 4. 計算動態屬性 (例如：主色調勾了2個、是否有花草勾了1個，共算 3 個)
  Object.values(selectedAttributes).forEach(selectedValues => {
    if (Array.isArray(selectedValues)) {
      count += selectedValues.length
    }
  })

  return count
})

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

// 排列卡片
interface AnimatedArtwork extends FilteredArtwork {
  globalIndex: number
}

const isMobile = ref(false)

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 768
}

// 💡 核心邏輯：將 artworks 陣列依序輪流派發給 2 欄(手機) 或 3 欄(電腦)
const artwork3Columns = computed(() => {
  const colCount = isMobile.value ? 2 : 3 // 這裡配合你的 md:grid-cols-3 改為 3 欄
  const columns: AnimatedArtwork[][] = Array.from({ length: colCount }, () => [])

  const list = filteredArtworks.value || []

  list.forEach((item, index) => {
    const colIndex = index % colCount
    const animatedItem: AnimatedArtwork = {
      ...item,
      globalIndex: index, // 紀錄原始排序，做為動畫延遲的基底
    }

    const targetColumn = columns[colIndex] || []
    targetColumn.push(animatedItem)
  })

  return columns
})

// 註冊與移除視窗監聽
onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>

<style scoped>
.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: calc(var(--animation-order) * 0.08s);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

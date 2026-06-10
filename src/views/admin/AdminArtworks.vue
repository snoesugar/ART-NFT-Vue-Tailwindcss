<template>
  <div class="space-y-6 text-black">
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-black pb-5"
    >
      <div>
        <h1 class="text-3xl font-black tracking-wide">平台作品管理</h1>
        <p class="text-sm text-gray-500 mt-1">
          監控全站數位藝術品、上架狀態與創作者系列（資料扁平化自藝術家 API）。
        </p>
      </div>

      <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-stretch sm:items-center">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜尋作品名稱、系列或創作者..."
          class="px-4 py-2 border-2 border-black font-bold text-sm focus:outline-none focus:bg-primary-bg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] placeholder-gray-400"
        />
        <select
          v-model="statusFilter"
          class="px-4 py-2 border-2 border-black font-bold text-sm bg-white focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
        >
          <option value="all">所有狀態</option>
          <option value="listed">已上架</option>
          <option value="unlisted">未上架</option>
        </select>

        <button
          @click="openAddModal"
          class="px-4 py-2 border-2 border-black font-black text-sm bg-black text-white hover:bg-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-0.5 active:translate-y-0.5"
        >
          <i class="fa-solid fa-plus mr-1"></i> 新增作品
        </button>
      </div>
    </div>

    <div v-if="isLoading" class="p-12 text-center font-bold text-gray-500">
      <i class="fa-solid fa-spinner animate-spin text-2xl mr-2 text-black"></i> 讀取全站作品中...
    </div>

    <div
      v-else-if="filteredArtworks.length === 0"
      class="border-2 border-dashed border-gray-300 p-12 text-center text-gray-400 font-bold bg-white"
    >
      找不到符合篩選條件的作品。
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
        v-for="item in filteredArtworks"
        :key="item.artwork.id"
        class="bg-white border-2 border-black flex flex-col shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
      >
        <div
          class="aspect-square w-full border-b-2 border-black relative bg-gray-100 overflow-hidden group"
        >
          <img
            :src="item.artwork.imgUrl"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            :alt="item.artwork.title"
          />

          <span
            class="absolute top-3 right-3 text-xs font-black border border-black px-2 py-0.5 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
            :class="
              item.artwork.isListed
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-gray-100 text-gray-500'
            "
          >
            {{ item.artwork.isListed ? 'LISTED' : 'UNLISTED' }}
          </span>
        </div>

        <div class="p-4 flex-1 flex flex-col justify-between space-y-3">
          <div>
            <div class="flex items-center justify-between text-xs font-mono text-gray-500">
              <span class="truncate pr-2">📦 {{ item.seriesName }}</span>
              <span class="font-bold text-black bg-primary-bg px-1 border border-black shrink-0">
                {{ item.artwork.categories?.[0] || 'NFT' }}
              </span>
            </div>
            <h3 class="font-black text-lg truncate mt-1" :title="item.artwork.title">
              {{ item.artwork.title }}
            </h3>
            <p class="text-xs text-gray-500 mt-0.5 truncate">
              創作者：<span class="font-bold text-black">{{ item.artistName }}</span>
            </p>
          </div>

          <div class="bg-gray-50 border border-black p-2 font-mono text-xs space-y-1">
            <div class="flex justify-between">
              <span class="text-gray-500">當前價格:</span>
              <span class="font-bold text-primary">{{ `${item.artwork.price} ETH` }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">公鏈通道:</span>
              <span class="text-gray-700 font-bold uppercase">{{
                item.artwork.blockchain || 'Ethereum'
              }}</span>
            </div>
          </div>

          <div class="flex gap-2 pt-2 border-t border-dashed border-gray-300">
            <button
              @click="viewDetails(item)"
              class="flex-1 px-2 py-1.5 border border-black font-bold text-xs bg-white hover:bg-gray-100 transition"
            >
              詳細資料
            </button>
            <button
              @click="openEditModal(item)"
              class="flex-1 px-2 py-1.5 border border-black bg-blue-500 text-white font-bold text-xs"
            >
              編輯
            </button>
            <button
              @click="deleteArtwork(item)"
              class="flex-1 px-2 py-1.5 border border-black bg-red-500 text-white font-bold text-xs"
            >
              刪除
            </button>
            <button
              @click="toggleMarketStatus(item)"
              class="flex-1 px-2 py-1.5 border border-black font-black text-xs text-white transition"
              :class="
                item.artwork.isListed
                  ? 'bg-amber-500 hover:bg-amber-600'
                  : 'bg-emerald-500 hover:bg-emerald-600'
              "
            >
              {{ item.artwork.isListed ? '下架下標' : '上架開價' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="isModalOpen && selectedItem"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
    >
      <div
        class="bg-white border-4 border-black p-6 w-full max-w-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4 animate-fade-in"
      >
        <div class="flex justify-between items-start border-b-2 border-black pb-2">
          <h2 class="text-xl font-black">作品與合約詳情</h2>
          <button @click="isModalOpen = false" class="text-xl font-black hover:text-red-600">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div class="space-y-3 text-sm">
          <div class="flex gap-3 items-center bg-gray-50 p-2 border border-black">
            <img
              :src="selectedItem.artwork.imgUrl"
              class="w-16 h-16 object-cover border border-black"
            />
            <div>
              <h4 class="font-black text-base">{{ selectedItem.artwork.title }}</h4>
              <p class="text-xs text-gray-500">所屬系列：{{ selectedItem.seriesName }}</p>
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-500 uppercase">創作者錢包地址</label>
            <p
              class="font-mono bg-gray-100 p-1.5 mt-1 border border-gray-300 text-xs break-all select-all"
            >
              {{ selectedItem.artistWallet }}
            </p>
          </div>

          <div v-if="selectedItem.artwork.attributes && selectedItem.artwork.attributes.length > 0">
            <label class="block text-xs font-bold text-gray-500 uppercase mb-1"
              >數位屬性 (Attributes)</label
            >
            <div class="grid grid-cols-2 gap-2">
              <div
                v-for="(attr, i) in selectedItem.artwork.attributes"
                :key="i"
                class="bg-primary-bg/40 border border-black p-1.5 text-center"
              >
                <p class="text-[10px] text-gray-500 uppercase font-mono">{{ attr.trait_type }}</p>
                <p class="font-black text-xs truncate">{{ attr.value }}</p>
              </div>
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-500 uppercase"
              >作品敘述 (Description)</label
            >
            <p
              class="text-gray-700 mt-1 text-xs leading-relaxed bg-gray-50 p-2 border border-black border-dashed"
            >
              {{ selectedItem.artwork.description || '該創作者未對此作品提供額外敘述。' }}
            </p>
          </div>
        </div>

        <div class="flex justify-end pt-2">
          <button
            @click="isModalOpen = false"
            class="px-4 py-2 border-2 border-black bg-black text-white font-black text-sm hover:bg-gray-800"
          >
            關閉視窗
          </button>
        </div>
      </div>
    </div>

    <!-- 增加的modal -->
    <div
      v-if="isAddModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 overflow-y-auto"
    >
      <div
        class="bg-white border-4 border-black p-6 w-full max-w-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4 my-8"
      >
        <div class="flex justify-between items-start border-b-2 border-black pb-2">
          <h2 class="text-xl font-black">➕ 新增全新作品到後台</h2>
          <button @click="isAddModalOpen = false" class="text-xl font-black hover:text-red-600">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form @submit.prevent="submitNewArtwork" class="space-y-3 text-sm">
          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase"
              >1. 選擇藝術家 (必要)</label
            >
            <select
              v-model="newArtworkForm.artistId"
              required
              class="w-full px-3 py-2 mt-1 border-2 border-black font-bold text-sm bg-white focus:outline-none"
            >
              <option value="" disabled>-- 請選擇創作者 --</option>
              <option v-for="artist in rawArtistsList" :key="artist.id" :value="artist.id">
                {{ artist.firstName }} {{ artist.lastName }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase"
              >2. 選擇旗下系列 (必要)</label
            >
            <select
              v-model="newArtworkForm.seriesId"
              required
              :disabled="!newArtworkForm.artistId"
              class="w-full px-3 py-2 mt-1 border-2 border-black font-bold text-sm bg-white focus:outline-none disabled:bg-gray-100 disabled:text-gray-400"
            >
              <option value="" disabled>-- 請選擇創作系列 --</option>
              <option v-for="series in availableSeries" :key="series.id" :value="series.id">
                {{ series.name }}
              </option>
            </select>
            <p
              v-if="newArtworkForm.artistId && availableSeries.length === 0"
              class="text-xs text-red-500 mt-1"
            >
              ⚠️ 該藝術家目前沒有任何作品系列，請先去系列 API 建立。
            </p>
          </div>

          <hr class="border-black" />

          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase">作品名稱</label>
            <input
              v-model="newArtworkForm.title"
              type="text"
              required
              placeholder="例如：Cyber Punk Neo #01"
              class="w-full px-3 py-2 mt-1 border-2 border-black text-sm focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase">圖片 URL 連結</label>
            <input
              v-model="newArtworkForm.imgUrl"
              type="url"
              required
              placeholder="https://example.com/art.jpg"
              class="w-full px-3 py-2 mt-1 border-2 border-black text-sm font-mono focus:outline-none"
            />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase">初始定價 (ETH)</label>
              <input
                v-model.number="newArtworkForm.price"
                type="number"
                step="0.001"
                min="0"
                required
                class="w-full px-3 py-2 mt-1 border-2 border-black text-sm focus:outline-none"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase">部署公鏈通道</label>
              <select
                v-model="newArtworkForm.blockchain"
                class="w-full px-3 py-2 mt-1 border-2 border-black font-bold text-sm bg-white focus:outline-none"
              >
                <option value="Ethereum">Ethereum</option>
                <option value="Polygon">Polygon</option>
                <option value="Solana">Solana</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase">主要分類標籤</label>
            <input
              v-model="newArtworkForm.category"
              type="text"
              placeholder="例如：3D, Generative, Painting (預設 NFT)"
              class="w-full px-3 py-2 mt-1 border-2 border-black text-sm focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase">作品敘述</label>
            <textarea
              v-model="newArtworkForm.description"
              rows="3"
              placeholder="描述這件藝術品的創作理念..."
              class="w-full px-3 py-2 mt-1 border-2 border-black text-sm focus:outline-none"
            ></textarea>
          </div>

          <div class="flex justify-end gap-2 pt-2">
            <button
              type="button"
              @click="isAddModalOpen = false"
              class="px-4 py-2 border-2 border-black bg-white text-black font-bold text-sm hover:bg-gray-100"
            >
              取消
            </button>
            <button
              type="submit"
              class="px-4 py-2 border-2 border-black bg-emerald-500 text-white font-black text-sm hover:bg-emerald-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              確認 Push 上架
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 編輯的modal -->
    <!-- 編輯作品 Modal -->
    <div
      v-if="isEditModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 overflow-y-auto"
    >
      <div
        class="bg-white border-4 border-black p-6 w-full max-w-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4 my-8"
      >
        <div class="flex justify-between items-start border-b-2 border-black pb-2">
          <h2 class="text-xl font-black">✏️ 編輯作品</h2>

          <button @click="isEditModalOpen = false" class="text-xl font-black hover:text-red-600">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form @submit.prevent="updateArtwork" class="space-y-3 text-sm">
          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase"> 作品名稱 </label>

            <input
              v-model="editForm.title"
              type="text"
              required
              class="w-full px-3 py-2 mt-1 border-2 border-black"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase"> 圖片 URL </label>

            <input
              v-model="editForm.imgUrl"
              type="url"
              required
              class="w-full px-3 py-2 mt-1 border-2 border-black font-mono"
            />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase"> 價格 (ETH) </label>

              <input
                v-model.number="editForm.price"
                type="number"
                step="0.001"
                min="0"
                class="w-full px-3 py-2 mt-1 border-2 border-black"
              />
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase"> 區塊鏈 </label>

              <select
                v-model="editForm.blockchain"
                class="w-full px-3 py-2 mt-1 border-2 border-black"
              >
                <option value="Ethereum">Ethereum</option>
                <option value="Polygon">Polygon</option>
                <option value="Solana">Solana</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase"> 分類 </label>

            <input
              v-model="editForm.category"
              type="text"
              class="w-full px-3 py-2 mt-1 border-2 border-black"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase"> 作品描述 </label>

            <textarea
              v-model="editForm.description"
              rows="4"
              class="w-full px-3 py-2 mt-1 border-2 border-black"
            ></textarea>
          </div>

          <div class="flex justify-end gap-2 pt-2">
            <button
              type="button"
              @click="isEditModalOpen = false"
              class="px-4 py-2 border-2 border-black bg-white font-bold"
            >
              取消
            </button>

            <button
              type="submit"
              class="px-4 py-2 border-2 border-black bg-blue-500 text-white font-black"
            >
              儲存修改
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { nftApi, type Artist, type Artwork, type Attribute } from '@/api/artist'

interface FlattenedArtworkItem {
  artistId: string
  artistName: string
  artistWallet: string
  seriesId: string
  seriesName: string
  artwork: Artwork
}

// 基礎狀態控制
const searchQuery = ref<string>('')
const statusFilter = ref<string>('all')
const isLoading = ref<boolean>(false)
const rawArtistsList = ref<Artist[]>([])

// 彈窗 1 狀態：詳情
const isModalOpen = ref<boolean>(false)
const selectedItem = ref<FlattenedArtworkItem | null>(null)

// 💡 彈窗 2 狀態：新增作品
const isAddModalOpen = ref<boolean>(false)
const newArtworkForm = ref({
  artistId: '',
  seriesId: '',
  title: '',
  imgUrl: '',
  price: 0.1,
  blockchain: 'Ethereum',
  category: 'NFT',
  description: '',

  attributes: [] as Attribute[],
})

// 💡 連動動態計算：當使用者選了某個藝術家，動態抓出他底下擁有哪些系列 (Series)
const availableSeries = computed(() => {
  if (!newArtworkForm.value.artistId) return []
  const artist = rawArtistsList.value.find(a => a.id === newArtworkForm.value.artistId)
  return artist ? artist.artworks : []
})

// 當切換藝術家時，重置已選的系列 ID
watch(
  () => newArtworkForm.value.artistId,
  () => {
    newArtworkForm.value.seriesId = ''
  },
)

// 核心計算：扁平化巢狀資料成一維陣列
const allFlattenedArtworks = computed<FlattenedArtworkItem[]>(() => {
  const list: FlattenedArtworkItem[] = []
  rawArtistsList.value.forEach((artist: Artist) => {
    if (artist.artworks && artist.artworks.length > 0) {
      artist.artworks.forEach(series => {
        if (series.artworkIds && series.artworkIds.length > 0) {
          series.artworkIds.forEach((art: Artwork) => {
            list.push({
              artistId: artist.id,
              artistName: `${artist.firstName} ${artist.lastName}`,
              artistWallet: artist.walletAddress,
              seriesId: series.id,
              seriesName: series.name,
              artwork: art,
            })
          })
        }
      })
    }
  })
  console.log(list)
  return list
})

// 從後台獲取最原始的 Artist 列表
const fetchArtworksFromArtists = async (): Promise<void> => {
  isLoading.value = true

  try {
    const data: Artist[] = await nftApi.getAllArtists()

    console.log('API原始資料', data)

    rawArtistsList.value = data
  } catch (error) {
    console.error('後台扁平化撈取作品失敗:', error)
  } finally {
    isLoading.value = false
  }
}

// 搜尋與狀態過濾
const filteredArtworks = computed<FlattenedArtworkItem[]>(() => {
  return allFlattenedArtworks.value.filter((item: FlattenedArtworkItem) => {
    const query = searchQuery.value.toLowerCase()
    const matchesSearch =
      item.artwork.title.toLowerCase().includes(query) ||
      item.artistName.toLowerCase().includes(query) ||
      item.seriesName.toLowerCase().includes(query)

    const matchesStatus =
      statusFilter.value === 'all' ||
      (statusFilter.value === 'listed' && item.artwork.isListed) ||
      (statusFilter.value === 'unlisted' && !item.artwork.isListed)

    return matchesSearch && matchesStatus
  })
})

const viewDetails = (item: FlattenedArtworkItem): void => {
  selectedItem.value = item
  isModalOpen.value = true
}

// 開啟新增表單並重置內容
const openAddModal = (): void => {
  newArtworkForm.value = {
    artistId: '',
    seriesId: '',
    title: '',
    imgUrl: '',
    price: 0.5,
    blockchain: 'Ethereum',
    category: 'NFT',
    description: '',
    attributes: [],
  }

  isAddModalOpen.value = true
}

// 💡 核心新增功能：將全新作品 Push 進指定藝術家的指定系列，並 Put 回 API
const submitNewArtwork = async (): Promise<void> => {
  const form = newArtworkForm.value
  if (!form.artistId || !form.seriesId || !form.title || !form.imgUrl) {
    alert('請填寫所有必填欄位！')
    return
  }

  try {
    // 1. 深度拷貝一份該藝術家的舊物件
    const targetArtist = rawArtistsList.value.find(a => a.id === form.artistId)
    if (!targetArtist) return
    const updatedArtist: Artist = JSON.parse(JSON.stringify(targetArtist))

    // 2. 建立新作品物件 (隨機生成一個前端 ID，若後端會自己給可以拿掉)
    const newArtwork: Artwork = {
      id: 'art_' + Date.now(),
      title: form.title,
      isListed: true,
      imgUrl: form.imgUrl,
      price: form.price,
      blockchain: form.blockchain,
      categories: [form.category || 'NFT'],
      description: form.description,
      attributes: form.attributes,

      markets: {
        marketCap: 0,
        change24h: 0,
        change7d: 0,
        floorPrice: form.price,
        hasIcon: false,
        owners: 0,
        totalSupply: 1,
        isOpen: false,
      },
    }

    // 3. 深入巢狀結構，找到正確的系列並 push 進去
    let isAdded = false
    updatedArtist.artworks.forEach(s => {
      if (s.id === form.seriesId) {
        if (!s.artworkIds) s.artworkIds = []
        s.artworkIds.push(newArtwork)
        isAdded = true
      }
    })

    if (!isAdded) {
      alert('找不到該作品系列，請重新確認。')
      return
    }

    // 4. 全量 PUT 回 API
    await nftApi.updateArtist(form.artistId, updatedArtist)
    alert(`✨ 作品「${form.title}」已成功新增並推送到 API 資料庫！`)

    // 5. 關閉彈窗並洗刷畫面更新
    isAddModalOpen.value = false
    await fetchArtworksFromArtists()
  } catch (error) {
    console.error('新增作品失敗:', error)
    alert('後台連線修改失敗，請檢查 API。')
  }
}

// 修改與下架市場狀態
const toggleMarketStatus = async (item: FlattenedArtworkItem): Promise<void> => {
  const isCurrentlyListed = item.artwork.isListed

  const confirmed = confirm(isCurrentlyListed ? '確定要將此作品下架嗎？' : '確定要將此作品上架嗎？')

  if (!confirmed) return

  try {
    const targetArtist = rawArtistsList.value.find(a => a.id === item.artistId)

    if (!targetArtist) return

    const updatedArtist: Artist = JSON.parse(JSON.stringify(targetArtist))

    updatedArtist.artworks.forEach(series => {
      if (series.id === item.seriesId) {
        series.artworkIds.forEach(art => {
          if (art.id === item.artwork.id) {
            art.isListed = !isCurrentlyListed
          }
        })
      }
    })

    await nftApi.updateArtist(item.artistId, updatedArtist)

    alert(isCurrentlyListed ? '作品已成功下架' : '作品已成功上架')

    await fetchArtworksFromArtists()
  } catch (error) {
    console.error('更新狀態失敗:', error)
    alert('更新失敗')
  }
}

onMounted((): void => {
  fetchArtworksFromArtists()
})

// 編輯狀態
const isEditModalOpen = ref(false)

const editForm = ref({
  artistId: '',
  seriesId: '',
  artworkId: '',

  title: '',
  imgUrl: '',
  price: 0,
  blockchain: '',
  description: '',
  category: '',
})

const openEditModal = (item: FlattenedArtworkItem): void => {
  editForm.value = {
    artistId: item.artistId,
    seriesId: item.seriesId,
    artworkId: item.artwork.id,

    title: item.artwork.title,
    imgUrl: item.artwork.imgUrl,
    price: item.artwork.price,
    blockchain: item.artwork.blockchain || 'Ethereum',
    description: item.artwork.description,
    category: item.artwork.categories?.[0] || 'NFT',
  }

  isEditModalOpen.value = true
}

const updateArtwork = async (): Promise<void> => {
  try {
    const form = editForm.value

    const targetArtist = rawArtistsList.value.find(a => a.id === form.artistId)

    if (!targetArtist) return

    const updatedArtist: Artist = JSON.parse(JSON.stringify(targetArtist))

    updatedArtist.artworks.forEach(series => {
      if (series.id === form.seriesId) {
        series.artworkIds?.forEach(art => {
          if (art.id === form.artworkId) {
            art.title = form.title
            art.imgUrl = form.imgUrl
            art.price = form.price
            art.blockchain = form.blockchain
            art.description = form.description
            art.categories = [form.category]
          }
        })
      }
    })

    await nftApi.updateArtist(form.artistId, updatedArtist)

    alert('作品修改成功')

    isEditModalOpen.value = false

    await fetchArtworksFromArtists()
  } catch (error) {
    console.error(error)
    alert('修改失敗')
  }
}

// 刪除作品
const deleteArtwork = async (item: FlattenedArtworkItem): Promise<void> => {
  const confirmed = confirm(`確定刪除作品「${item.artwork.title}」？`)

  if (!confirmed) return

  try {
    const targetArtist = rawArtistsList.value.find(a => a.id === item.artistId)

    if (!targetArtist) return

    const updatedArtist: Artist = JSON.parse(JSON.stringify(targetArtist))

    updatedArtist.artworks.forEach(series => {
      if (series.id === item.seriesId) {
        series.artworkIds = series.artworkIds?.filter(art => art.id !== item.artwork.id) || []
      }
    })

    await nftApi.updateArtist(item.artistId, updatedArtist)

    alert('作品已刪除')

    await fetchArtworksFromArtists()
  } catch (error) {
    console.error(error)
    alert('刪除失敗')
  }
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.2s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>

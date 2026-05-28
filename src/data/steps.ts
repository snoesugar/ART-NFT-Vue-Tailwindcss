export interface step {
  id: number
  icon: string
  title: string
  description: string
}

export const stepsData: step[] = [
  {
    id: 1,
    icon: 'fa-solid fa-wallet',
    title: '設置你的錢包',
    description: '設置好您選擇的錢包後\n點擊右上角的錢包圖標進行連接',
  },
  {
    id: 2,
    icon: 'fa-solid fa-pen-ruler',
    title: '創建您的主頁',
    description: '註冊成為會員，編輯您的資料\n讓大家了解你',
  },
  {
    id: 3,
    icon: 'fa-solid fa-icons',
    title: '添加你的 NFT',
    description: '上傳你的作品\n添加標題和描述',
  },
  {
    id: 4,
    icon: 'fa-solid fa-tags',
    title: '列出它們出售',
    description: '選擇出售 NFT 的方式\n並設定價格，等待有緣人',
  },
]

// 如果你有定義型態 (Interface)，可以順便寫，沒有的話直接 export 即可
export interface Artwork {
  id: number
  title: string
  price: number
  description: string
  imgUrl: string
}

// 模擬資料，故意給予不同的圖片高度或比例
export const artworksData: Artwork[] = [
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
    title: '夏娃的醜聞',
    price: 300,
    description: '禁果不是她摘的，\n但罪名往往留給最美的人。',
    imgUrl: new URL('/art10.jpg', import.meta.url).href,
  },
  {
    id: 4,
    title: '十分鐘就到',
    price: 200,
    description: '這句話跟「下次約吃飯」一樣，\n都是當代最大的謊言。',
    imgUrl: new URL('/art03.jpg', import.meta.url).href,
  },
  {
    id: 5,
    title: '藍色啤酒海',
    price: 150,
    description: '把憂鬱倒進杯子裡，\n今晚我們在泡沫裡滅頂。',
    imgUrl: new URL('/art02.jpg', import.meta.url).href,
  },
  {
    id: 6,
    title: '我這樣有美嗎',
    price: 200,
    description: '在被世界觀看之前，\n我早就對鏡子彩排了無數次。',
    imgUrl: new URL('/art04.jpg', import.meta.url).href,
  },
  {
    id: 7,
    title: '沒有人愛我',
    price: 500,
    description: '孤獨是神話，\n也是現代靈魂唯一的奢侈品。',
    imgUrl: new URL('/art11.jpg', import.meta.url).href,
  },

  {
    id: 8,
    title: '我真的受傷了',
    price: 200,
    description: '不是心碎的聲音，\n是期待再次被摔碎的鈍痛。',
    imgUrl: new URL('/art27.jpg', import.meta.url).href,
  },
]

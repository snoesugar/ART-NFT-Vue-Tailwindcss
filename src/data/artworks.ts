export interface Artwork {
  id: number
  title: string
  price: number
  description: string
  imgUrl: string
}

export interface ArtworkBird {
  id: number
  title: string
  price: number
  description: string
  imgUrl: string
}

export interface ArtworkAll {
  id: number
  title: string
  price: number
  description: string
  imgUrl: string
}

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

// 鳥的作品
export const artworksBirdData: ArtworkBird[] = [
  {
    id: 1,
    title: '區塊戀-他的私生活',
    price: 300,
    description: '唯一想擁有的人，\n唯一不可以擁有的。',
    imgUrl: new URL('/art20.jpg', import.meta.url).href,
  },
  {
    id: 2,
    title: '與你分享的快樂勝過獨自擁有',
    price: 200,
    description: '如果悲傷可以變現，\n我早已是這座城市最富有的人。',
    imgUrl: new URL('/art23.jpg', import.meta.url).href,
  },
  {
    id: 3,
    title: '兩情相悅',
    price: 300,
    description: '禁果不是她摘的，\n但罪名往往留給最美的人。',
    imgUrl: new URL('/art21.jpg', import.meta.url).href,
  },
  {
    id: 4,
    title: '會唱metal的鳥',
    price: 200,
    description: '這句話跟「下次約吃飯」一樣，\n都是當代最大的謊言。',
    imgUrl: new URL('/art24.jpg', import.meta.url).href,
  },
  {
    id: 5,
    title: '群聚的小鳥們',
    price: 150,
    description: '把憂鬱倒進杯子裡，\n今晚我們在泡沫裡滅頂。',
    imgUrl: new URL('/art22.jpg', import.meta.url).href,
  },
  {
    id: 6,
    title: '一大一小兩個恰恰好',
    price: 200,
    description: '在被世界觀看之前，\n我早就對鏡子彩排了無數次。',
    imgUrl: new URL('/art25.jpg', import.meta.url).href,
  },
]

// 探索所有作品
export const ArtworkAllData: ArtworkAll[] = [
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
]

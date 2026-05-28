export interface artist {
  id: number
  firstName: string
  lastName: string
  img: string
  desc: string
}

export const artistsData: artist[] = [
  {
    id: 1,
    firstName: 'Antony',
    lastName: 'Wu',
    img: new URL('/artist01.jpg', import.meta.url).href,
    desc: '深受東方寫意影響，擅長將山水宏觀景象轉化為當代的抽象線條。',
  },
  {
    id: 2,
    firstName: 'Michael',
    lastName: 'Chang',
    img: new URL('/artist02.jpg', import.meta.url).href,
    desc: '捕捉日常窗前的飛鳥與光影，作品散發細細品味生活片刻的純粹與快樂。',
  },
  {
    id: 3,
    firstName: 'Joanne',
    lastName: 'Lin',
    img: new URL('/artist03.jpg', import.meta.url).href,
    desc: '著迷於海洋的奧秘與深度，透過層層堆疊的冷色調反映對自然的敬畏。',
  },
  {
    id: 4,
    firstName: 'Elena',
    lastName: 'Kao',
    img: new URL('/artist04.jpg', import.meta.url).href,
    desc: '以鮮豔大膽的街頭色彩，將都市建築與植物和諧共生的樣貌注入畫布。',
  },
  {
    id: 5,
    firstName: 'Marcus',
    lastName: 'Wang',
    img: new URL('/artist05.jpg', import.meta.url).href,
    desc: '專注於微觀視角，將花草的局部紋理與細胞結構轉譯為超現實的魔幻風格。',
  },
]

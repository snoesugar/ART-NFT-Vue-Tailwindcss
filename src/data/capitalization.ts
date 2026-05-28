export interface capitalization {
  id: number
  name: string
  imgUrl: string
  marketCap: string
  change24h: number
  change7d: number
  floorPrice: string
  hasIcon: boolean
  owners: string
  totalSupply: string
  isOpen: boolean
}

export const capitalizationData: capitalization[] = [
  {
    id: 1,
    name: '追求者送我的花',
    imgUrl: new URL('/art29.jpg', import.meta.url).href,
    marketCap: '1,774.19',
    change24h: 220.49, // 正數自動變綠、加 + 號
    change7d: -2.43, // 負數自動變紅
    floorPrice: '2.90',
    hasIcon: true, // 用來判斷地板價前面要不要加符號
    owners: '32.1K',
    totalSupply: '1000',
    isOpen: false, // 👈 核心：預設手機版是不展開的
  },
  {
    id: 2,
    name: '夏天的時候',
    imgUrl: new URL('/art06.jpg', import.meta.url).href,
    marketCap: '1,524.89',
    change24h: 80.49,
    change7d: -2.43,
    floorPrice: '90.23',
    hasIcon: false,
    owners: '32.1K',
    totalSupply: '1000',
    isOpen: false,
  },
  {
    id: 3,
    name: '海洋波度',
    imgUrl: new URL('/art02.jpg', import.meta.url).href,
    marketCap: '1,400.59',
    change24h: -3.92,
    change7d: -13.43,
    floorPrice: '2.90',
    hasIcon: true,
    owners: '32.1K',
    totalSupply: '1000',
    isOpen: false,
  },
  {
    id: 4,
    name: '賴床真的很不好',
    imgUrl: new URL('/art03.jpg', import.meta.url).href,
    marketCap: '1,224.88',
    change24h: -9.23,
    change7d: -20.43,
    floorPrice: '2.90',
    hasIcon: true,
    owners: '32.1K',
    totalSupply: '1000',
    isOpen: true,
  },
  {
    id: 5,
    name: '瞳孔:流動的脈絡',
    imgUrl: new URL('/art01.jpg', import.meta.url).href,
    marketCap: '1,021.09',
    change24h: 83.49,
    change7d: -1.43,
    floorPrice: '2.90',
    hasIcon: true,
    owners: '32.1K',
    totalSupply: '1000',
    isOpen: false,
  },
  {
    id: 6,
    name: '哭泣的時候',
    imgUrl: new URL('/art12.jpg', import.meta.url).href,
    marketCap: '921.42',
    change24h: -9.43,
    change7d: 183.49,
    floorPrice: '2.90',
    hasIcon: true,
    owners: '32.1K',
    totalSupply: '1000',
    isOpen: false,
  },
  {
    id: 7,
    name: '破碎的菠蘿麵包',
    imgUrl: new URL('/art14.jpg', import.meta.url).href,
    marketCap: '888.88',
    change24h: 20.49,
    change7d: -0.43,
    floorPrice: '2.90',
    hasIcon: true,
    owners: '32.1K',
    totalSupply: '1000',
    isOpen: false,
  },
  {
    id: 8,
    name: '人生中的貓咪們',
    imgUrl: new URL('/art08.jpg', import.meta.url).href,
    marketCap: '770.23',
    change24h: 23.49,
    change7d: 30.23,
    floorPrice: '2.90',
    hasIcon: true,
    owners: '32.1K',
    totalSupply: '1000',
    isOpen: false,
  },
  {
    id: 9,
    name: '髒兮兮的家',
    imgUrl: new URL('/art28.jpg', import.meta.url).href,
    marketCap: '502.31',
    change24h: 13.49,
    change7d: 50.23,
    floorPrice: '2.90',
    hasIcon: true,
    owners: '32.1K',
    totalSupply: '1000',
    isOpen: false,
  },
  {
    id: 10,
    name: '細胞小將',
    imgUrl: new URL('/art16.jpg', import.meta.url).href,
    marketCap: '420.20',
    change24h: 54.49,
    change7d: -12.43,
    floorPrice: '2.90',
    hasIcon: true,
    owners: '32.1K',
    totalSupply: '1000',
    isOpen: false,
  },
]

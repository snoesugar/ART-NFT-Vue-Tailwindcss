# 🎨 ART NFT - 數位藝術交換與市價排行榜平台

ART NFT 是一個以「硬派黑邊線條感」與「新潮流美學」打造的數位藝術展示與拍賣平台。打破傳統藝廊的沉穩感，透過強烈對比的視覺與流暢的動態互動，致力於建構一個讓新生代藝術家能自由展示、大眾能直觀探索市價排行的潮流平台。

🔗 **[點此線上預覽成品](https://snoesugar.github.io/ART-NFT-Vue-Tailwindcss/)**

---

## 🎯 開發動機與核心價值

在 Web3 與數位藝術蓬勃發展的時代，藝術品的展示不應侷限於二維的靜態網頁。多數 NFT 平台偏向金融科技感，缺少了「藝術作品本身的靈魂與故事性」。

- **核心重點**：透過大膽的 UI/UX 設計（如粗黑邊框的潮流感、置中聚焦的藝術家輪播），讓使用者在瀏覽藝術品的同時，如同在逛一場當代線上實體特展。
- **目標**：利用極致的響應式設計（RWD），在桌機端與行動端皆能提供不妥協的視覺衝擊，降低大眾接觸數位藝術的門檻。

---

## 🛠️ 技術重點與解決方案

本專案由我獨立負責前端架構開發，針對複雜視窗版型、動態瀑布流渲染以及跨組件動畫同步問題，提出了以下解決方案：

### 1. 進階響應式佈局與動態 Swiper 特效 (UI/UX Optimization)

- **3D 置中焦點輪播**：使用 `Swiper.js` 實作熱門藝術家輪播。透過深度客製化 CSS 核心，在桌機端實現「非 Active 卡片自動縮小至 48% 並套用去色濾鏡 (`grayscale`)」的強烈視覺對比，並在 Active 時還原，完美聚焦當前藝術家。
- **雙端獨立排行佈局**：針對市價排行榜 (Ranking)，在桌機端採用大圖懸浮遮罩、手機端則自動重組為高度為 `22.5 (90px)` 的精緻橫向列表，兼顧雙端操作體驗。

### 2. 高效能不規則瀑布流渲染 (Performance & Layout)

- **CSS Masonry 實作**：最新藝術品 (Artwork) 區塊利用 Tailwind CSS 的多欄位佈局 (`columns-2 md:columns-4`)，解決傳統 Flexbox 無法完美包容不規則圖片高度的問題。
- **動態遮罩優化**：針對瀑布流卡片，封裝獨立的絕對定位漸變遮罩，在滑鼠懸浮時順暢觸發詳情與以太幣 (ETH) 價格資訊，減少瀏覽器重繪 (Repaint) 的效能消耗。

### 3. 強型別資料結構與模組化管理 (TypeScript Integration)

- **資料結構化定義**：全面導入 **TypeScript**，針對 `artists`（藝術家）、`artworks`（藝術品）及 `steps`（引導步驟）建立嚴格的 Interface 型別定義，確保資料流從資料來源到 UI 渲染的型別安全。
- **靜態資源優化**：利用 Vite 的 `new URL(..., import.meta.url).href` 語法動態解析本地圖片路徑，確保專案在打包 (Build) 部署後圖片資源路徑依然完全正確。

### 4. 零散組件解耦與原子化樣式

- **組件化設計**：將全站的核心操作按鈕抽象化封裝為 `Button.vue` 組件，透過 `props` 控制背景色屬性（如 `:isPrimaryBg`）與邊框顯示（如 `:hasBorder`），達成高複用性。
- **Tailwind 自訂擴充**：在組件中大量運用微調後的原子化 class（如 `h-93.5`、`gap-6.25`、`pb-40!`），確保設計稿的精細度能 100% 還原。

### 5. 自動化整合與持續部署 (CI/CD Pipeline)

- **GitHub Actions 自動化工作流**：撰寫 `deploy.yml` 配置持續整合與部署流程。每當代碼推送到遠端分支時，自動觸發基於 `ubuntu-latest` 環境的虛擬機流水線。
- **無感構建與部署 (Build & Deploy)**：工作流中嚴格限定環境（Node.js 20、啟用 `npm ci` 快取加速），自動執行強型別檢查與生產環境打包 (`npm run build`)。編譯完成後，透過 `actions/upload-pages-artifact` 零時差將 `./dist` 靜態資源發布至 GitHub Pages，落實標準的敏捷開發流程。

---

## 🚀 技術棧 (Tech Stack)

- **Framework:** Vue 3 (Composition API / `<script setup>`)
- **Build Tool:** Vite
- **Programming Language:** TypeScript
- **Styling:** Tailwind CSS, Custom CSS / Scoped CSS
- **Utility Libraries:** Swiper Vue (Autoplay, Pagination), Font Awesome 6
- **Code Quality:** ESLint / Prettier
- **CI/CD / Deployment:** GitHub Actions (Automated Workflows) / GitHub Pages

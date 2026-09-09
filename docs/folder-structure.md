# 專案資料夾結構規範

## 目的

提供統一的專案資料夾與檔案命名規範，方便團隊協作與交接。

本版規劃聚焦於**中大型系統網站**（多模組、頁面數會持續成長，如電子書系統的 catalog / product / cart / member / reader），並以下列三項為優先設計原則：

- **RWD**：斷點與版型變數集中管理，圖片資源支援多尺寸／多密度。
- **SEO**：每頁必須能獨立輸出正確的 meta、結構化資料與 sitemap，且不因頁面增加而失控。
- **無障礙（Accessibility）**：landmark、skip-link、焦點管理與對比度規則內建於共用結構，而非仰賴個別頁面自律。

> 目前專案仍為規劃／範本階段，尚未落地實際檔案。落地時請依此文件建立對應資料夾，不需要一次補齊所有子目錄，可依模組上線進度逐步建立。

---

## 為什麼不維持純扁平的 `public/*.html`

當頁面數量成長到數十頁（catalog、product、cart、member、reader 等模組各自有多個頁面）時，純扁平結構會有兩個問題：

1. **模組邊界不清楚**：檔名只能用前綴（`catalog_list.html`、`catalog_detail.html`）模擬分類，實際上仍混在同一層，難以快速掌握「這個模組有哪些頁面」。
2. **共用區塊必然重複**：每個 `.html` 都要各自寫一份 `<head>`（SEO meta、favicon、OG 標籤）、導覽列、頁尾、skip-link。頁面一多，SEO 與無障礙規則就會因為漏改、改壞某一頁而產生落差，且難以在 Code Review 中發現。

因此本規劃採用**「依模組分子資料夾」＋「共用 Partial 於建置時合併」**的組合：頁面依模組放在 `src/pages/<module>/`，共用的 `<head>`／導覽列／頁尾／結構化資料樣板集中在 `src/partials/`，建置時用輕量 HTML include 工具（不引入 Vue/React 等前端框架，維持現有「無框架」的技術棧選擇）合併輸出到 `dist/`（或本地預覽用的 `public/`）。

---

## 基本結構

```text
project-root/
├─ public/                       # 開發期靜態輸出／本地預覽根目錄（build 產物與少量固定檔案）
│   ├─ robots.txt                # 搜尋引擎爬蟲規則
│   ├─ sitemap.xml               # 網站地圖，由 scripts/generate-sitemap.js 依 src/pages 產生，不手動維護
│   ├─ site.webmanifest
│   ├─ favicon.ico / favicon-*.png
│   └─ assets/
│       ├─ images/
│       │   ├─ og/               # 各頁面對應的 Open Graph 分享縮圖
│       │   └─ ...                # 依模組分類，命名規則見 image-naming-rules.md
│       ├─ fonts/
│       ├─ icons/                 # SVG icon（inline 或 sprite 來源）
│       └─ css/                   # SCSS 編譯輸出，build 產物，勿手動修改
│
├─ src/
│   ├─ pages/                    # 依模組分子資料夾，取代扁平的 public/*.html
│   │   ├─ home/
│   │   │   └─ index.html
│   │   ├─ catalog/
│   │   │   └─ catalog.html
│   │   ├─ product/
│   │   │   └─ product.html
│   │   ├─ cart/
│   │   │   ├─ cart.html
│   │   │   └─ checkout.html
│   │   ├─ member/
│   │   │   ├─ login.html
│   │   │   ├─ register.html
│   │   │   └─ profile.html
│   │   └─ reader/
│   │       └─ reader.html
│   │
│   ├─ partials/                 # 跨頁共用 HTML 片段，建置時 include 進各頁，避免逐頁複製
│   │   ├─ head-meta.html        # 共用 <head>：預設 SEO meta／favicon／OG，各頁可覆寫特定欄位
│   │   ├─ header.html           # 含 skip-link 與 <header role="banner">、<nav> landmark
│   │   ├─ footer.html           # 含 <footer role="contentinfo">
│   │   └─ structured-data/      # 各頁面類型的 JSON-LD 樣板
│   │       ├─ product.jsonld.html
│   │       └─ breadcrumb.jsonld.html
│   │
│   ├─ styles/                   # 沿用既有 7-1 分層
│   │   ├─ base/
│   │   │   ├─ _reset.scss
│   │   │   ├─ _variables.scss   # 含 RWD 斷點變數（$bp-sm / $bp-md / $bp-lg…）與色彩對比 token
│   │   │   ├─ _mixins.scss      # 含 RWD mixin（例如 @mixin respond-to($breakpoint)）
│   │   │   └─ _a11y.scss        # .u-visuallyHidden、:focus-visible、skip-link 樣式
│   │   ├─ layout/
│   │   ├─ components/
│   │   ├─ pages/
│   │   └─ main.scss
│   │
│   ├─ scripts/
│   │   ├─ utils/
│   │   │   ├─ api-helper.js
│   │   │   ├─ seo-meta.js       # 局部動態內容更新 <title>／meta 的輔助函式
│   │   │   └─ a11y-helper.js    # focus trap、aria-live 播報等共用無障礙邏輯
│   │   ├─ components/
│   │   ├─ pages/
│   │   └─ main.js
│   │
│   ├─ components/               # 元件化發展預留（Vue/React），判準見 handover.md
│   └─ pages-legacy/             # （選配）保留舊版扁平頁面於遷移期間比對用，遷移完成後刪除
│
├─ scripts/                      # 專案建置輔助腳本（Node，非前端執行）
│   ├─ build-pages.js            # 以 posthtml-include 等工具合併 partials 到各頁，輸出至 public/
│   └─ generate-sitemap.js       # 依 src/pages 清單自動產生 public/sitemap.xml
│
├─ tests/
│   ├─ unit/
│   ├─ e2e/
│   └─ a11y/                     # 自動化無障礙測試（axe-core / pa11y-ci），對建置後頁面掃描
│
├─ docs/
│   ├─ folder-structure.md       # 本文件
│   ├─ style-naming-rules.md     # class 命名規則（ABEM）
│   ├─ image-naming-rules.md     # 圖檔命名規則
│   ├─ seo-guidelines.md         # 每頁必填 meta 清單、OG／canonical／sitemap 規則
│   ├─ accessibility-guidelines.md # WCAG 2.1 AA checklist、landmark、對比度、鍵盤操作規範
│   ├─ handover.md               # 專案交接與開發注意事項說明
│   ├─ changelog.md              # 版本更新與變更紀錄
│   ├─ workflow-roles.md         # 作業流程與資料夾負責對照
│   └─ page-updates/             # 各頁面更新紀錄
│       ├─ home.md
│       ├─ catalog.md
│       ├─ product.md
│       └─ reader.md
│
└─ package.json
```

---

## RWD 相關規劃

- 斷點統一定義在 `src/styles/base/_variables.scss`，其餘檔案一律透過 `_mixins.scss` 的 `respond-to()` 呼叫，禁止在元件／頁面樣式中寫死 `@media` 數值。
- 圖片資源依「多尺寸／多密度」需求命名（例如 `-sm` / `-md` / `-lg` 或 `@1x` / `@2x`），對應 `<picture>` / `srcset`，詳細規則於 `image-naming-rules.md` 補充。
- 斷點測試涵蓋在 `tests/e2e/`（以常見裝置寬度跑關鍵頁面），避免只在單一桌面解析度下驗收。

## SEO 相關規劃

- `src/partials/head-meta.html` 提供每頁預設 meta（含 `<title>`、`description`、`og:*`、`canonical`），各頁在自己的 `<head>` 區塊 override 頁面專屬欄位，避免遺漏。
- `src/partials/structured-data/` 依頁面類型（商品、麵包屑等）提供 JSON-LD 樣板，於對應頁面 include。
- `scripts/generate-sitemap.js` 於建置時掃描 `src/pages/**`，自動輸出 `public/sitemap.xml`，避免手動維護造成漏收頁面。
- 每頁必填欄位清單與檢核方式整理於 `docs/seo-guidelines.md`。

## 無障礙（Accessibility）相關規劃

- `src/partials/header.html` / `footer.html` 內建 skip-link 與正確的 landmark role，所有頁面共用，不由各頁自行決定要不要加。
- `src/styles/base/_a11y.scss` 提供焦點樣式（`:focus-visible`）、視覺隱藏工具類（`.u-visuallyHidden`），供元件套用。
- `src/scripts/utils/a11y-helper.js` 封裝共用的鍵盤操作與 focus 管理邏輯（如 Modal 開關時的 focus trap、`aria-live` 播報），避免各元件各自實作、行為不一致。
- `tests/a11y/` 針對建置後頁面自動跑 axe-core / pa11y-ci，作為 PR 檢核的一部分。
- 檢核項目與對比度、鍵盤操作規範整理於 `docs/accessibility-guidelines.md`。

## 共用 Partial 機制（建置時合併，非前端框架）

為了避免每頁重複維護 `<head>`／導覽列／頁尾，同時不提前引入 Vue/React 等框架，建議採用輕量的 HTML include 工具（例如 `posthtml` + `posthtml-include`），只負責「建置時把 partial 檔案內容貼進頁面」，不涉及元件狀態或前端執行邏輯：

- 對應 npm script（規劃）：`html:build`、`html:watch`，行為對齊現有的 `scss:build` / `scss:watch`。
- 若專案規模持續擴大到需要元件狀態管理、路由或 SSR，再依 `handover.md` 的判準評估升級 Vite + Vue/React；在那之前，partial include 已足以解決共用結構重複的問題。

---

## 檔案命名規則

- **SCSS partials**：`_variables.scss`, `_mixins.scss`
- **JS 工具**：`date-utils.js`, `api-helper.js`
- **頁面檔案**：`src/pages/<module>/<page>.html`（如 `src/pages/product/product.html`）
- **Partial 檔案**：`src/partials/<name>.html`，結構化資料樣板加副檔名前綴 `.jsonld.html`
- **圖片資源**：`logo-main.png`, `icon-search.svg`（詳見 `image-naming-rules.md`）

---

## 注意事項

- 主 SCSS 檔案：`src/styles/main.scss`，統一匯入所有 partials。
- `public/assets/css/main.css`、`public/sitemap.xml` 與 `public/` 內由建置產生的頁面皆為建置產物，`dist/`（如另有獨立打包輸出）與 build 產物請加入 `.gitignore`，避免版本控制污染。
- 多模組專案一律使用 `src/pages/<module>/` 分子資料夾管理，不再新增扁平化的 `public/*.html`。
- class 命名規則請見 [`docs/style-naming-rules.md`](style-naming-rules.md)（先前文件連結的 `naming-rules.md` 已移除，統一以此文件與 `image-naming-rules.md` 為準）。

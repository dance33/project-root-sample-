# Project Root (Sample)

> 專案摘要

## 技術棧（範本預設）

- HTML5 + SCSS（Dart Sass）+ 原生 JavaScript（ES Modules）
- 無框架、無 bundler；若專案需要 SPA 或元件化開發，可依 [`docs/handover.md`](docs/handover.md) 的判準升級為 Vite + Vue/React
- 程式碼品質：ESLint、Prettier、Stylelint
- 套件管理：npm

## 開始使用

### 安裝相依套件

```bash
npm install
```

### 開發

開發時需要同時跑兩條 watch（各開一個終端機）：

```bash
npm run dev         # 監看 src/styles/main.scss，即時編譯至 public/assets/css/main.css
npm run html:watch  # 監看 src/pages/、src/partials/，即時合併輸出到 public/*.html
```

`public/` 底下的 `.html` 與 `assets/css/main.css` 都是**建置產物**，不要直接修改；要改頁面內容請改 `src/pages/<module>/*.html`，要改共用區塊（head meta、導覽列、頁尾）請改 `src/partials/`。

請搭配 VS Code Live Server（或 Live Sass Compiler）從專案根目錄開啟 `public/index.html` 預覽，**不要用瀏覽器直接開啟檔案**（`file://`），因為頁面內的連結與資源路徑是根相對路徑（如 `href="/catalog.html"`），需要有伺服器根目錄才能正確解析。

> 目前 `src/styles/main.scss` 僅為佔位檔（無實際樣式內容），所以預覽畫面現階段還是無樣式的原始 HTML，屬預期狀況；待樣式範例補上後才會有視覺樣式。

### 建置

```bash
npm run build
```

依序執行 `scss:build`（輸出壓縮後的正式版 CSS 至 `public/assets/css/main.css`）與 `html:build`（把 `src/pages/` 與 `src/partials/` 合併輸出成 `public/*.html`）。也可以只跑其中一步：`npm run scss:build` 或 `npm run html:build`。

### 程式碼檢查與格式化

```bash
npm run lint      # ESLint + Stylelint 檢查
npm run format    # Prettier 格式化
```

### 結構摘要

> 本專案定位為**中大型系統網站**（多模組、頁面數會持續成長），完整規劃與理由請見 [`docs/folder-structure.md`](docs/folder-structure.md)，以下僅列重點。

- `src/pages/<module>/`：頁面依模組分子資料夾，取代扁平的 `public/*.html`，避免模組邊界不清。目前已建立 `home`、`catalog`、`product` 三個範例模組；`cart`、`member`、`reader` 尚待補上。
- `src/partials/`：跨頁共用的 `<head>`／導覽列／頁尾／結構化資料（JSON-LD）樣板，由 `scripts/build-pages.js`（無外部套件依賴的輕量合併腳本）於建置時合併進各頁，確保 SEO meta 與無障礙 landmark 不因頁面增加而各自漂移。
- `public/`：建置產物（`*.html`、`assets/css/main.css`）與少量固定檔案（`robots.txt`、`sitemap.xml`、`assets/` 靜態資源）；`*.html` 由 `npm run html:build` 產生，`sitemap.xml` 待補上 `scripts/generate-sitemap.js` 後自動產生，目前尚未建立。
- `src/styles/`：樣式原始碼，依 7-1 分層概念組織，由 `main.scss` 依序 `@use`；`base/_a11y.scss` 提供無障礙焦點樣式，`base/_variables.scss` 集中管理 RWD 斷點。
- `src/scripts/`：共用互動邏輯與頁面專屬邏輯，由 `main.js` 依 `<body data-page>` 載入對應模組；`utils/seo-meta.js`、`utils/a11y-helper.js` 為 SEO／無障礙共用邏輯。**此資料夾尚未建立**，頁面範例中的 `<body data-page="...">` 已預留掛載點。
- `src/components/`：目前為元件化發展預留空間，未導入框架前可先維持以 `src/styles/components/` + `src/scripts/components/` 為主。
- `docs/`：完整命名規範、SEO／無障礙規劃、架構說明與交接文件。
- `tests/`：`unit` / `e2e` 之外另有 `a11y/`（自動化無障礙掃描），測試框架待專案落地時決定（如 Vitest / Playwright）後補上對應設定。

## 目錄說明（精簡）

| 目錄            | 用途                                                              |
| --------------- | ------------------------------------------------------------------ |
| `src/pages/`    | 依模組分子資料夾的頁面（HTML），取代扁平的 `public/*.html`         |
| `src/partials/` | 跨頁共用 HTML 片段（head meta、導覽列、頁尾、結構化資料樣板）      |
| `public/`       | 建置後直接對外提供的靜態頁面與資源                                 |
| `src/styles/`   | 所有 SCSS 原始檔，依 base → layout → components → pages 順序載入   |
| `src/scripts/`  | 所有 JavaScript 原始檔，依功能拆分為 utils / components / pages    |
| `docs/`         | 專案相關文件（詳細規範請見 docs 目錄，含 SEO／無障礙規劃指南）     |
| `tests/`        | 單元測試 / 整合測試 / 無障礙自動化測試檔案                        |

## 完整資料夾結構

本節先前同時保留了「範本主要結構」與另一份「資料夾結構型式 2」兩種範例，容易造成團隊混淆，現已統一以 [`docs/folder-structure.md`](docs/folder-structure.md) 為唯一正式參考，內含完整目錄樹、模組化頁面（`src/pages/<module>/`）、共用 Partial 機制，以及 RWD／SEO／無障礙的對應規劃，請直接參閱該文件。

## 樣式命名規範(ABEM)

詳見 [`docs/style-naming-rules.md`](docs/style-naming-rules.md)

## 圖檔命名規範

詳見 [`docs/image-naming-rules.md`](docs/image-naming-rules.md)

## SEO 規劃指南

詳見 [`docs/seo-guidelines.md`](docs/seo-guidelines.md)

## 無障礙（Accessibility）規劃指南

詳見 [`docs/accessibility-guidelines.md`](docs/accessibility-guidelines.md)

## 版本紀錄

詳見 [`docs/changelog.md`](docs/changelog.md)

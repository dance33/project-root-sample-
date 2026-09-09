# 更新日誌

## 檔案涵義

本文件用於記錄專案的版本更新內容、功能變更與修正紀錄，方便團隊追蹤發展歷程與回溯問題。

## v1.5.0 (2026-09-09)

- 重新規劃 `docs/folder-structure.md`：針對中大型系統網站補上模組化頁面（`src/pages/<module>/`）、共用 Partial 機制、RWD／SEO／無障礙的對應資料夾規劃，並解決 `README.md` 與 `docs/workflow-roles.md` 先前標記的「兩份資料夾結構範例並存」問題
- 新增 `docs/seo-guidelines.md`、`docs/accessibility-guidelines.md`：每頁必填 meta／結構化資料／WCAG 2.1 AA 檢核清單
- 落地 Partial 機制範例：新增 `scripts/build-pages.js`（無外部套件依賴的輕量 HTML include 建置腳本，支援 `@include`／`@data` 語法）與對應 partial 範例 `src/partials/{head-meta,header,footer}.html`、`src/partials/structured-data/{product,breadcrumb}.jsonld.html`
- 新增模組化頁面範例：`src/pages/home/index.html`、`src/pages/catalog/catalog.html`、`src/pages/product/product.html`
- `package.json` 新增 `html:build`／`html:watch`，`build` 改為 `scss:build && html:build`
- 新增 `src/styles/main.scss` 佔位檔（僅註解，無實際樣式），避免 `scss:build` 因缺少入口檔而中斷 `npm run build`；樣式範例仍待補上
- 修正 `eslint.config.js`：`scripts/**/*.js` 補上 Node 全域變數設定，修正 `build-pages.js` 誤判為瀏覽器環境（`no-undef: console`）的問題
- `.gitignore` 新增 `public/*.html`、`public/assets/css/`，反映此二者已改為建置產物

## v1.4.0 (2026-08-21)

- 補齊 `README.md` 的「技術棧」與「開始使用」章節，並更新專案資料夾結構說明以符合實際目錄
- 建立 `public/`、`src/styles/`、`src/scripts/` 實際骨架檔案，落實 `docs/folder-structure.md` 的規劃
- 新增 ESLint（`eslint.config.js`）、Prettier（`.prettierrc.json`）、Stylelint（`.stylelintrc.json`）設定，並補上對應 npm scripts（`lint`、`format`）
- 清理 `PROJECT_FILE_TRACKING_INDEX.md`、`PROJECT_FILE_TRACKING_SOURCE.md` 中舊專案（iCheers / WebTemplate）殘留內容，改為範本通用格式

## v1.3.2 (2026-07-29)

- 文件調整為「團隊基準範本」語境，補充專案落地後需客製化的原則
- 修正 `docs/folder-structure.md` 與實際目錄差異（含 `src/components` 現況說明）
- 調整 `docs/handover.md` 為範本交接格式，移除與現況不符之模組描述
- 修正 `src/components/component-library-guide.md` 子元件文件命名建議

## v1.3.1 (2026-07-27)

- 建立 SCSS 編譯流程：`src/styles/main.scss` 輸出至 `public/assets/css/main.css`
- 新增 npm scripts：`dev`、`build`、`scss:watch`、`scss:build`
- 將 SCSS 載入由 `@import` 升級為 `@use`，移除 Sass deprecation warning
- 補齊 `base/layout/components/pages` 示意樣式內容
- 三個頁面（index/search/product）class 命名統一為 BEM
- 同步更新 `README.md` 與 `docs/folder-structure.md`，使文件與實際結構一致

## v1.3.0 (2026-07-25)

- 建立多頁面靜態結構（index/search/product）
- 初始化 docs 文件架構（naming-rules、folder-structure、handover、changelog）
- 建立 Sass CLI 基礎編譯流程（前期版本）

## v1.2.0 (2026-07-24)

- 新增電子書閱讀器「書籤功能」
- 修正網路書店 RWD 排版錯位
- 優化 SCSS 結構，新增 `_variables.scss`

## v1.1.0 (2026-07-10)

- 新增「推薦電子書」卡片元件
- 調整首頁 Banner 樣式

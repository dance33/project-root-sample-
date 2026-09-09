# 專案檔案追蹤清單：開發檔案

這份文件列出所有非資產檔案，方便團隊在改頁面、版型、樣式、腳本與文件時快速定位。專案落地後，請將下列範本項目替換為實際頁面與檔案清單。

## 工作區設定與根目錄文件

- `.vscode/settings.json`
- `README.md`
- `package.json`
- `eslint.config.js` / `.stylelintrc.json` / `.prettierrc.json`
- `docs/changelog.md`

## 頁面原始檔（`src/pages/<module>/`）

檔名採 kebab-case（詳見 [`docs/style-naming-rules.md`](docs/style-naming-rules.md)、[`docs/image-naming-rules.md`](docs/image-naming-rules.md)；`docs/naming-rules.md` 已移除，不再使用）。每頁頂端有 `@data` 區塊定義 SEO 欄位，見 [`docs/seo-guidelines.md`](docs/seo-guidelines.md)。

| 模組     | 檔案路徑                                                       | 備註                                 |
| -------- | ---------------------------------------------------------------- | ------------------------------------ |
| 首頁     | [src/pages/home/index.html](src/pages/home/index.html)           | 範例頁面                             |
| 書籍列表 | [src/pages/catalog/catalog.html](src/pages/catalog/catalog.html) | 範例頁面                             |
| 商品詳情 | [src/pages/product/product.html](src/pages/product/product.html) | 範例頁面，含結構化資料（JSON-LD）示範 |
| 購物車 / 會員 / 閱讀器 | —                                                    | 尚未建立，待補上 `cart`／`member`／`reader` 模組 |

## 共用 Partial（`src/partials/`）

| 區塊     | 路徑                                                                                     | 主要用途                       |
| -------- | ------------------------------------------------------------------------------------------ | ------------------------------ |
| Head 共用 | `src/partials/head-meta.html`                                                              | 共用 SEO meta，依 `@data` 代入 |
| 導覽列   | `src/partials/header.html`                                                                  | 含 skip-link 與 `role="banner"` |
| 頁尾     | `src/partials/footer.html`                                                                  | `role="contentinfo"`          |
| 結構化資料 | `src/partials/structured-data/product.jsonld.html`、`breadcrumb.jsonld.html`               | 商品／麵包屑 JSON-LD 樣板       |

## 建置腳本（`scripts/`）

| 區塊       | 路徑                        | 主要用途                                                        |
| ---------- | ---------------------------- | ---------------------------------------------------------------- |
| Partial 合併 | `scripts/build-pages.js`   | 將 `src/pages/**/*.html` 與 `src/partials/` 合併輸出至 `public/`，見 [`docs/folder-structure.md`](docs/folder-structure.md) |
| Sitemap 產生 | —                           | 尚未建立，規劃為 `scripts/generate-sitemap.js`                    |

## 頁面 HTML 建置產物（`public/`）

`public/*.html` 由 `npm run html:build` 依 `src/pages/` 產生，**不是原始檔**，請勿手動修改；改動請回到 `src/pages/<module>/` 對應檔案。

## CSS 編譯輸出（`public/assets/css/`）

| 區塊         | 路徑                         | 主要用途                                       |
| ------------ | ---------------------------- | ---------------------------------------------- |
| Compiled CSS | `public/assets/css/main.css` | 由 `src/styles/main.scss` 建置產生，勿手動修改 |

## JavaScript 腳本（`src/scripts/`）

尚未建立。規劃如下（頁面範例中的 `<body data-page="...">` 已預留掛載點）：

| 區塊       | 路徑                      | 主要用途                                               |
| ---------- | ------------------------- | ------------------------------------------------------ |
| Entry      | `src/scripts/main.js`     | 進入點，依頁面載入對應模組                             |
| Utils      | `src/scripts/utils/`      | 純函式、API 請求封裝、`seo-meta.js`、`a11y-helper.js`  |
| Components | `src/scripts/components/` | 可重用互動元件（如 `modal.js`、`dropdown.js`）         |
| Pages      | `src/scripts/pages/`      | 各頁面專屬邏輯（`home.js`、`catalog.js`、`product.js`）|

## SCSS 原始檔（`src/styles/`）

| 區塊       | 路徑                     | 主要用途                              | 現況 |
| ---------- | ------------------------ | ------------------------------------- | ---- |
| Entry      | `src/styles/main.scss`   | SCSS 主入口，依序 `@use` 各分層       | 已建立（僅佔位註解，無實際樣式） |
| Base       | `src/styles/base/`       | reset、變數、mixin                    | 尚未建立 |
| Layout     | `src/styles/layout/`     | 版面骨架：header、footer、grid        | 尚未建立 |
| Components | `src/styles/components/` | 可重用元件樣式：buttons、cards、forms | 尚未建立 |
| Pages      | `src/styles/pages/`      | 各頁面專屬樣式：home、catalog、product| 尚未建立 |

## 元件化預留（`src/components/`）

目前僅作為未來導入 Vue/React 的預留空間，尚無實際檔案；導入框架後請於此補上元件清單。

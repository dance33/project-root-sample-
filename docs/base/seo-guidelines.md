# SEO 規劃指南

## 檔案涵義

本文件定義中大型系統網站在 SEO 上的最低要求，作為新增頁面時的檢核清單，並說明對應的資料夾與檔案（詳細結構見 [`docs/folder-structure.md`](folder-structure.md)）。

## 目的

- 讓每個新頁面都有一致、不遺漏的 meta 與結構化資料。
- 避免頁面數量成長後，SEO 設定散落各處、難以稽核。

---

## 一、每頁必填 meta 清單

透過 `src/partials/head-meta.html` 提供預設值，各頁在自己的 `<head>` 覆寫下列欄位：

| 欄位 | 必填 | 說明 |
| ---- | ---- | ---- |
| `<title>` | 是 | 每頁唯一，建議「頁面主題 \| 站名」，中文全形約 30 字內 |
| `<meta name="description">` | 是 | 每頁唯一，80–120 字，避免關鍵字堆砌 |
| `<link rel="canonical">` | 是 | 指向該頁正式網址，避免同內容多網址（如篩選參數）被視為重複內容 |
| `<meta property="og:title">` / `og:description` / `og:image` / `og:url` | 是 | 對應 `public/assets/images/og/` 下的分享縮圖 |
| `<meta name="robots">` | 視情況 | 會員專屬頁、購物車、結帳頁一律 `noindex, nofollow` |
| `hreflang`（若有多語系） | 視情況 | 目前專案無多語系需求則略過，未來擴充時於此補充 |

## 二、結構化資料（JSON-LD）

- 樣板集中於 `src/partials/structured-data/`，依頁面類型 include：
  - 商品頁（`product/product.html`）→ `product.jsonld.html`（`Product`、`Offer`）
  - 所有內頁 → `breadcrumb.jsonld.html`（`BreadcrumbList`）
- 新增頁面類型時，先確認 [schema.org](https://schema.org) 是否已有對應型別，再新增樣板檔案，不另創自訂欄位。

## 三、Sitemap 與 robots

- `public/sitemap.xml` 由 `scripts/generate-sitemap.js` 依 `src/pages/**` 自動產生，**不手動編輯**；新增頁面模組後重新執行產生腳本即可。
- 會員登入後才可見的頁面（`member/`、`cart/checkout.html` 等）不列入 sitemap，並在該頁 meta 標記 `noindex`。
- `public/robots.txt` statically 維護，僅需在新增「不應被爬蟲索引的路徑」時更新（例如測試環境路徑）。

## 四、圖片與效能（與 SEO 相關的部分）

- 首屏主視覺圖／Banner 使用具意義的 `alt`，裝飾性圖片 `alt=""`（與無障礙規則一致，見 `accessibility-guidelines.md`）。
- 圖片依 [`docs/image-naming-rules.md`](image-naming-rules.md) 提供多尺寸，避免行動裝置載入過大圖片影響 Core Web Vitals（LCP）。

## 五、新增頁面檢核清單（PR 前自我檢查）

- [ ] `<title>` / `description` / `canonical` 已依實際頁面內容填寫，非沿用預設值
- [ ] 已設定對應的 `og:image`
- [ ] 若為會員限定或流程性頁面（購物車、結帳），已設定 `noindex`
- [ ] 已加入對應的結構化資料（如商品頁）
- [ ] 已重新執行 sitemap 產生腳本，確認新頁面出現在 `sitemap.xml`（若非 `noindex`）

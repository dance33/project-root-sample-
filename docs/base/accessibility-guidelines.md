# 無障礙（Accessibility）規劃指南

## 檔案涵義

本文件定義中大型系統網站的無障礙最低標準（對齊 WCAG 2.1 AA），作為新增頁面／元件時的檢核清單，並說明對應的資料夾與檔案（詳細結構見 [`docs/folder-structure.md`](folder-structure.md)）。

## 目的

- 確保 landmark、skip-link、焦點管理等結構性規則由共用區塊內建，而非仰賴各頁面自行實作。
- 提供元件開發時可直接查閱的鍵盤操作與 ARIA 屬性規範。

---

## 一、頁面結構（由共用 partial 提供，非各頁自行處理）

- `src/partials/header.html` 內建：
  - 頁面最上方的 skip-link（例如「跳到主要內容」），連結至 `<main id="main-content">`
  - `<header role="banner">`、`<nav aria-label="主導覽">`
- `src/partials/footer.html` 內建 `<footer role="contentinfo">`
- 每頁僅能有一個 `<main>`，且需有 `id="main-content"` 供 skip-link 定位
- 標題階層（`h1`–`h6`）需符合邏輯順序，不可為了視覺樣式跳級（如 `h1` 直接接 `h4`）

## 二、色彩與對比度

- 內文文字與背景對比度至少 4.5:1，大字（18pt 以上或 14pt 粗體以上）至少 3:1
- 對比度相關 token 定義於 `src/styles/base/_variables.scss`，新增顏色前先確認是否符合上述比例
- 不可僅用顏色傳達狀態（如錯誤訊息僅變紅色），需搭配文字或圖示

## 三、焦點與鍵盤操作

- 所有可互動元素（連結、按鈕、表單控制項）需可用 `Tab` 鍵到達，且有清楚的焦點樣式（`src/styles/base/_a11y.scss` 的 `:focus-visible`）
- 自訂元件（`.o-Modal`、`.m-Dropdown`、`.o-Accordion` 等）需支援：
  - `Esc` 關閉（Modal、Dropdown）
  - 開啟時焦點移入元件內、關閉後焦點回到觸發按鈕（focus trap，共用邏輯見 `src/scripts/utils/a11y-helper.js`）
  - 方向鍵在同群組項目間切換（如 Tabs、菜單）時，符合 [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) 對應 pattern 的鍵盤規範
- 不可移除瀏覽器預設的 focus outline 卻未提供替代樣式（`outline: none` 需搭配等效的 `:focus-visible` 樣式）

## 四、ARIA 使用原則

- 優先使用原生語意標籤（`<button>`、`<nav>`、`<dialog>` 等），只有原生標籤無法表達時才補 ARIA 屬性
- 動態內容更新（如購物車數量變化、表單驗證錯誤）使用 `aria-live="polite"`（急迫訊息用 `assertive`），統一透過 `a11y-helper.js` 播報，避免各元件各自實作、播報時機不一致
- 圖片：
  - 有意義的圖片提供具體 `alt`（例如商品圖 `alt="書名 封面"`）
  - 裝飾性圖片 `alt=""`，不可省略 `alt` 屬性
- 表單欄位一律有對應 `<label>`（可視覺隱藏但需存在），錯誤訊息透過 `aria-describedby` 關聯到欄位

## 五、自動化檢測

- `tests/a11y/` 使用 axe-core 或 pa11y-ci 對建置後頁面掃描，作為 PR 檢核的一部分
- 自動化工具僅能檢出約 30–40% 的無障礙問題（如缺少 alt、對比度不足），鍵盤操作與邏輯正確性仍需人工測試（純鍵盤操作走過關鍵流程：搜尋 → 商品 → 加入購物車 → 結帳）

## 六、新增頁面／元件檢核清單（PR 前自我檢查）

- [ ] 標題階層正確，無跳級
- [ ] 圖片 `alt` 已依「有意義／裝飾性」正確填寫
- [ ] 互動元件可純鍵盤操作完成（Tab / Enter / Esc / 方向鍵）
- [ ] 自訂彈窗／下拉選單有 focus trap，關閉後焦點回到觸發元素
- [ ] 動態內容變化有適當的 `aria-live` 播報
- [ ] 新增顏色已檢查對比度是否符合 4.5:1（或大字 3:1）

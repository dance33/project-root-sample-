# Class 命名規範

## 檔案涵義
本文件定義前端專案中 class、樣式與資源檔的命名規則，確保團隊協作時命名一致且易於維護。

## 目的
統一前端專案中常用區塊、欄位、物件的 class 命名方式，提升協作效率與可維護性。

---

## 命名原則
1. **語意化**：名稱需能清楚表達用途。
2. **一致性**：同類型元素使用相同前綴或結構。
3. **結構化**：採用簡化版 BEM (Block Element Modifier)。
4. **可維護性**：避免過度冗長，但需支援擴充。

---

## 常用區塊命名範例

| 類型 | 範例命名 | 說明 |
|------|-----------|------|
| 版面結構 | `.layout-header`, `.layout-footer`, `.layout-main` | 頁面主要框架 |
| 導覽 | `.nav-bar`, `.nav-item`, `.nav-link` | 導覽列與選單 |
| 內容區塊 | `.section-hero`, `.section-feature`, `.section-ebook` | 區塊分段 |
| 表單 | `.form-group`, `.form-label`, `.form-input`, `.form-button` | 表單欄位 |
| 按鈕 | `.btn-primary`, `.btn-secondary`, `.btn-outline` | 按鈕樣式 |
| 卡片 | `.card`, `.card-header`, `.card-body`, `.card-footer` | 商品展示 |
| 狀態修飾 | `.is-active`, `.is-disabled`, `.is-loading` | 狀態標記 |

---

## BEM 命名範例
```html
<div class="card card--highlight">
  <div class="card-header">電子書標題</div>
  <div class="card-body">簡介內容</div>
  <div class="card-footer">
    <button class="btn btn-primary">閱讀</button>
  </div>
</div>

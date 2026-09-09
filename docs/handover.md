# 專案交接文件

## 檔案涵義
本文件提供專案交接時所需的概述、環境說明、模組資訊與注意事項，協助接手者快速了解專案。

## 專案概述
- 專案名稱：電子書系統 (B2L)
- 主要功能：電子書資料庫、線上閱讀器、網路書店

## 開發環境
- 編輯器：VS Code
- 技術棧：HTML / SCSS / JS
- 套件管理：npm / yarn

## 資料夾結構
- `src/pages/<module>/` → 頁面原始檔（依模組分子資料夾）
- `src/partials/` → 跨頁共用區塊（head meta／導覽列／頁尾／結構化資料），由 `scripts/build-pages.js` 合併
- `src/styles/` → SCSS 樣式
- `src/scripts/` → JS 邏輯
- `public/` → 建置產物（`npm run build` 產生），非原始檔
- `docs/` → 文件與規範

完整規劃見 [`docs/folder-structure.md`](folder-structure.md)。

## 功能模組
- `card` → 電子書展示卡片
- `modal` → 登入/註冊彈窗
- `reader` → 線上閱讀器互動邏輯

## 負責人
- UI/UX 設計：XXX
- 前端開發：YYY
- 測試：ZZZ

## 注意事項
- class 命名遵循 [`docs/style-naming-rules.md`](style-naming-rules.md)（ABEM）
- 更新日誌請同步至 `changelog.md`

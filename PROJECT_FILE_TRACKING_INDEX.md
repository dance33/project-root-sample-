# 專案檔案追蹤索引

本文件為「團隊基準範本」的檔案追蹤索引範本。
專案落地後，請依實際檔案數量與負責人更新下列統計與表格，避免沿用範本預設值。

## 建議閱讀順序

1. 先看本文件，了解資料夾責任與維護規則。
2. 要改頁面、版型、樣式或腳本時，看 [`PROJECT_FILE_TRACKING_SOURCE.md`](PROJECT_FILE_TRACKING_SOURCE.md)。
3. 若專案有額外的資產追蹤需求（圖片、icon、字型等數量較大），可另建 `PROJECT_FILE_TRACKING_ASSETS.md`，並在此處補上連結。

## 檔案數量摘要（部分已依實況填寫，其餘仍為範本預設）

| 範圍                        | 數量 | 說明                                                        |
| --------------------------- | ---: | ------------------------------------------------------------ |
| 根目錄文件與設定            |    - | README、package.json、ESLint/Prettier/Stylelint 設定等       |
| `src/pages/` 頁面原始檔     |    3 | `home`、`catalog`、`product` 三個模組範例；`cart`／`member`／`reader` 尚未建立 |
| `src/partials/` 共用區塊    |    4 | `head-meta`、`header`、`footer` 與 2 份結構化資料樣板         |
| `scripts/` 建置腳本         |    1 | `build-pages.js`；`generate-sitemap.js` 尚未建立              |
| `public/` 建置產物          |    3 | `npm run html:build` 產生的 `.html`，非原始檔                 |
| `public/assets/` 靜態資產   |    - | 目前尚無實際圖片／字型／icon                                 |
| `src/styles/` SCSS 原始檔   |    1 | 僅 `main.scss` 佔位檔，`base`／`layout`／`components`／`pages` 尚未建立 |
| `src/scripts/` JavaScript   |    - | 尚未建立                                                     |
| `docs/` 文件                |    9 | 詳見下方目錄責任建議                                          |
| `tests/` 測試檔案           |    - | 依專案選用之測試框架                                         |
| 總計                        |    - | 不含 `.git`、`node_modules` 內部檔案                          |

## 目錄責任建議

| 路徑             | 主要角色                     | 建議關注對象           |
| ---------------- | ------------------------------ | ---------------------- |
| `.vscode/`       | 工作區共用設定                | 團隊共用開發環境維護者 |
| `src/pages/`     | 模組化頁面原始碼              | 前端開發               |
| `src/partials/`  | 跨頁共用區塊（head/nav/footer/結構化資料） | 前端開發／技術負責人 |
| `scripts/`       | 建置輔助腳本（Partial 合併、sitemap 產生） | 前端開發               |
| `public/`        | 建置產物，對外提供的靜態頁面與資源 | 前端開發（唯讀，勿手動修改） |
| `src/styles/`    | 樣式原始碼                    | 前端開發               |
| `src/scripts/`   | 前端互動邏輯                  | 前端開發               |
| `src/components/` | 元件化發展預留                | 前端開發（框架導入後） |
| `docs/`          | 規範與交接文件                | 技術負責人             |
| `tests/`         | 測試檔案                      | 前端開發 / QA          |

## 維護規則

- 新增檔案時，請在同一個變更集中同步更新對應的追蹤文件。
- 若修改共用樣式或腳本並影響多頁，請同步更新 [`docs/changelog.md`](docs/changelog.md)。
- 路徑請維持與 repo 完全一致，方便團隊直接搜尋與比對。
- 專案落地後，請將本文件中的「範本預設」字樣移除，改為實際數據。

## 追蹤文件清單

- `PROJECT_FILE_TRACKING_INDEX.md`（本文件）
- `PROJECT_FILE_TRACKING_SOURCE.md`

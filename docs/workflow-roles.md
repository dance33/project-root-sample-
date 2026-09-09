# 作業流程與資料夾負責對照

## 目的

說明本專案的三階段作業流程，並對照各資料夾／檔案的負責角色與交接注意事項，作為分工與 Code Review 的依據。

---

## 作業流程三階段

### 1. 設計（提供圖檔與版型）

- **產出**：Figma / Pencil 設計稿、版型規格、切版標註（間距、字體、色彩變數）
- **負責角色**：視覺設計師
- **對應資料夾**：無直接程式碼產出；設計中定義的顏色、字體等變數，交付後應反映到 `src/styles/base/_variables.scss`
- **交接重點**：設計稿的斷點（breakpoint）、命名應與 [`docs/style-naming-rules.md`](style-naming-rules.md)、[`docs/image-naming-rules.md`](image-naming-rules.md) 一致，避免切版階段重新定義造成落差。

### 2. 切端視覺切版、靜態頁面互動效果

- **產出**：HTML 結構、SCSS 樣式、純前端（無 API）互動效果
- **負責角色**：UIUX設計師、前端設計師
- **對應資料夾**：
  - `src/pages/<module>/`：依模組分子資料夾的頁面結構（如 `home/index.html`、`catalog/catalog.html`）
  - `src/partials/`：共用 `<head>`／導覽列／頁尾／結構化資料樣板，由 `scripts/build-pages.js` 於建置時合併進各頁
  - `src/styles/`：依 base → layout → components → pages 分層撰寫樣式
  - `src/scripts/components/`：純 UI 互動（如 `dropdown.js`、`modal.js`），不含 API 呼叫
  - `src/scripts/pages/`：頁面互動邏輯骨架，可先用假資料（mock）串接
- **交接重點**：
  - class 命名遵循 ABEM，見 [`docs/style-naming-rules.md`](style-naming-rules.md)
  - 圖檔命名遵循 [`docs/image-naming-rules.md`](image-naming-rules.md)
  - 完成後執行 `npm run html:build`，開啟建置產物 `public/<page>.html`（需搭配本機伺服器如 Live Server，不可用 `file://` 直接開啟）獨立預覽，不依賴後端 API

### 3. 切端程式套版、API 串接、打包

- **產出**：真實 API 串接、狀態管理、建置設定、正式環境打包產出
- **負責角色**：前端工程師 ／ 全端工程師
- **對應資料夾**：
  - `src/scripts/utils/api-helper.js`：統一封裝 API 請求
  - `src/scripts/main.js`：依 `<body data-page>` 載入對應頁面模組
  - `src/components/`、`src/pages/`：若專案依 [`docs/handover.md`](handover.md) 判準升級為 Vue/React，於此處建立元件化程式碼
  - `package.json` 的 build 腳本（或 `vite.config.js`，如採用 Vite）：打包設定
  - `public/assets/css/main.css`：SCSS 編譯輸出，屬建置產物，勿手動修改
- **交接重點**：
  - API 串接前需與後端確認合約（欄位、錯誤格式）
  - 打包前執行 `npm run lint`、`npm run build` 確認無誤
  - 版本異動需同步更新 [`docs/changelog.md`](changelog.md)

---

## 資料夾負責與維護建議一覽表

| 資料夾／檔案                                        | 所屬階段      | 主要負責角色                     | 維護建議                                                                                         |
| --------------------------------------------------- | ------------- | -------------------------------- | ------------------------------------------------------------------------------------------------ |
| 設計稿（外部，Figma／Pencil）                       | 1. 設計       | 視覺設計師                       | 交付版本與連結建議記錄於 `docs/handover.md`                                                      |
| `src/styles/base/`                                  | 1 → 2         | 設計師定義、前端設計師落地       | 變數異動需知會所有切版／前端成員                                                                 |
| `src/pages/<module>/`                               | 2. 切版       | 前端設計師                       | 結構異動同步更新 `PROJECT_FILE_TRACKING_SOURCE.md`                                               |
| `src/partials/`                                     | 2. 切版       | 前端設計師／技術負責人           | 影響全站頁面，異動需審慎 review，見 `docs/seo-guidelines.md`、`docs/accessibility-guidelines.md` |
| `scripts/build-pages.js`                            | 2 → 3         | 前端工程師                       | Partial 合併機制，規模擴大時可替換為 EJS 等套件（見 `docs/folder-structure.md`）                 |
| `src/styles/layout/` `components/` `pages/`（SCSS） | 2. 切版       | 前端設計師                       | 遵循 7-1 分層與 ABEM 命名                                                                        |
| `src/scripts/components/`（純 UI 互動）             | 2. 切版       | 前端設計師／前端開發             | 不應含 API 呼叫，保持可獨立預覽                                                                  |
| `src/scripts/pages/`                                | 2 → 3         | 前端設計師起稿、前端工程師補串接 | 交接時需註明是否已完成 API 串接                                                                  |
| `src/scripts/utils/api-helper.js`                   | 3. 套版／串接 | 前端工程師                       | 統一封裝，避免各頁面各自呼叫 fetch                                                               |
| `src/components/`、`src/pages/`（框架元件）         | 3. 套版       | 前端工程師                       | 導入框架後才使用，判準見 `docs/handover.md`                                                      |
| `public/*.html`、`public/assets/css/main.css`       | 3. 打包       | 建置流程自動產生                 | 建置產物，禁止手動修改                                                                           |
| `docs/`                                             | 全階段        | 技術負責人                       | 規範異動須同時通知設計與前端                                                                     |
| `tests/`                                            | 3. 套版／QA   | 前端工程師／QA                   | 測試框架待專案落地時決定並補上                                                                   |

---

## 現況掃描發現的待確認事項

- [`docs/handover.md`](handover.md) 的「負責人」欄位仍為 `XXX/YYY/ZZZ` 佔位字串，專案落地後請填入實際姓名。
- `src/pages/`、`src/partials/`、`scripts/build-pages.js` 已落地（`home`／`catalog`／`product` 三個模組範例），本文件與 `PROJECT_FILE_TRACKING_INDEX.md` / `PROJECT_FILE_TRACKING_SOURCE.md` 已同步更新。`src/scripts/`、`src/styles/{base,layout,components,pages}/` 與 `cart`／`member`／`reader` 模組仍待補上。


---

## 📄 `docs/folder-structure.md`

```markdown
# 專案資料夾結構規範

## 目的
提供統一的專案資料夾與檔案命名規範，方便團隊協作與交接。

---

## 基本結構
project-root/
├─ public/                 # 靜態資源
│   ├─ index.html
│   ├─ search.html
│   ├─ product.html
│   └─ assets/
│       ├─ images/
│       ├─ fonts/
│       └─ icons/
│
├─ src/                    # 開發主要程式碼
│   ├─ styles/             # SCSS
│   │   ├─ base/           # reset, variables, mixins
│   │   ├─ layout/         # header, footer, grid
│   │   ├─ components/     # buttons, cards, forms
│   │   ├─ pages/          # 各頁面專屬樣式
│   │   └─ main.scss       # 主檔案
│   │
│   ├─ scripts/            # JS
│   │   ├─ utils/          # 工具函式
│   │   ├─ components/     # UI互動元件
│   │   ├─ pages/          # 頁面邏輯
│   │   └─ main.js
│   │
│   ├─ components/         # HTML/JSX/Vue/React 元件
│   └─ pages/              # 頁面模板
│
├─ dist/                   # 編譯後輸出
├─ tests/                  # 測試檔案
├─ docs/                   # 文件
│   ├─ naming-rules.md     # class 命名規則
│   ├─ folder-structure.md # 專案資料夾與檔案結構說明
│   ├─ handover.md         # 專案交接與開發注意事項說明
│   ├─ changelog.md        # 版本更新與變更紀錄
│   └─ page-updates/       # 各頁面更新紀錄
│      ├─ home.md          # 首頁更新紀錄
│      ├─ search.md        # 搜尋結果頁面更新紀錄
│      ├─ product.md       # 商品詳目頁面更新紀錄
│      └─ reader.md        # 閱讀器頁面更新紀錄
│
└─ package.json

---

## 檔案命名規則
- **SCSS partials**：`_variables.scss`, `_mixins.scss`
- **JS 工具**：`date-utils.js`, `api-helper.js`
- **頁面檔案**：`home.scss`, `search.js`, `product.html`
- **圖片資源**：`logo-main.png`, `icon-search.svg`

---

## 注意事項
- 主 SCSS 檔案：`src/styles/main.scss`，統一匯入所有 partials。
- `dist/` 應加入 `.gitignore`，避免版本控制污染。
- 多頁面專案建議使用獨立資料夾管理，例如 `search/`、`product/`。


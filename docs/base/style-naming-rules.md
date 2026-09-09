# Class 命名規範（ABEM）

## 檔案涵義

本文件定義前端專案中 class、樣式與資源檔的命名規則。專案採用 **ABEM（Atomic Design + BEM）** 命名法，取代舊有的簡化版 BEM，確保團隊協作時命名一致、可預期元件的層級與可維護性。

## 目的

- 讓 class 名稱本身就能表達「這是什麼層級的元件」「屬於哪個 Block」「是元素還是修飾狀態」。
- 統一 `src/styles/`（SCSS）與 HTML 標記中的命名方式，降低歧義與命名衝突。
- 作為 `stylelint`（`selector-class-pattern`）未來可啟用規則驗證的依據。

---

## 一、什麼是 ABEM

ABEM = **A**tomic Design 的層級前綴 + **BEM**（Block Element Modifier）的結構。

命名結構固定為：

```text
[prefix]-BlockName__ElementName--ModifierName
```

| 組成部分       | 說明                                       | 大小寫規則                      |
| -------------- | ------------------------------------------ | -------------------------------- |
| `prefix-`      | 標示元件的 Atomic Design 層級（見下表）     | 全小寫，接一個連字號 `-`         |
| `BlockName`    | 元件本身（最外層容器）                     | PascalCase（首字大寫）           |
| `__ElementName`| Block 內部的子元素，僅能存在一層             | camelCase（首字小寫），前綴 `__`  |
| `--ModifierName`| 樣式或狀態上的變化版本                     | camelCase（首字小寫），前綴 `--`  |

範例：

```html
<div class="o-ProductCard o-ProductCard--highlight">
  <img class="o-ProductCard__cover" src="..." alt="" />
  <h3 class="o-ProductCard__title">電子書標題</h3>
  <p class="o-ProductCard__desc">簡介內容</p>
  <button class="a-Btn a-Btn--primary">閱讀</button>
</div>
```

> `BlockName` 用 PascalCase 是 ABEM 與傳統 BEM（全小寫連字號）最大的差異，目的是讓眼睛能快速分辨「這是一個 Block 名稱」而不是一般 kebab-case 的工具類別。

---

## 二、Atomic Design 層級前綴

| 前綴 | 對應層級 | 說明 | 對應資料夾 |
| ---- | -------- | ---- | ---------- |
| `a-` | Atom（原子） | 不可再拆分的最小元件，如按鈕、輸入框、標籤 | `src/styles/components/` |
| `m-` | Molecule（分子） | 由多個 Atom 組成的小型元件，如搜尋列（input + button） | `src/styles/components/` |
| `o-` | Organism（有機體） | 由 Molecule / Atom 組成的較大區塊，如卡片、導覽列、表單群組 | `src/styles/components/` |
| `t-` | Template（版型） | 頁面骨架、版面配置，不含實際內容 | `src/styles/layout/` |
| `p-` | Page（頁面） | 單一頁面才會用到的專屬樣式，僅微調不重複定義元件本身樣式 | `src/styles/pages/` |
| `l-` | Layout（佈局） | 純粹的排版容器（grid、container、wrapper），不含視覺樣式 | `src/styles/layout/` |
| `u-` | Utility（工具類） | 單一用途的樣式片段，如 `.u-textCenter`、`.u-hidden` | `src/styles/base/` |
| `is-` / `has-` | State（狀態） | JS 操作觸發的狀態類別，不寫視覺樣式的預設值，只疊加變化 | 依附於各元件檔案內 |

判斷層級的簡單原則：**能否拆得更小、是否會在多處重複使用**。無法再拆分 → Atom；由 2 個以上 Atom 組成且會重複使用 → Molecule；構成頁面中一個完整、具語意的區塊 → Organism。

---

## 三、命名縮寫原則

**Block 名稱是整份文件裡被搜尋、閱讀頻率最高的字串**（IDE 全域搜尋、瀏覽器 DevTools、Code Review），縮寫雖然能讓 class 變短，但如果每個人縮法不同（`Button` 有人寫 `Btn`、有人寫 `But`），反而會讓 ABEM 想要的「可預期性」失效。因此縮寫不是不行，而是**只能用白名單裡的縮寫，不可臨時發明**。

判斷原則：

1. **高頻率、業界已有共識的字**（如 `button`）→ 可以縮寫，但一律使用白名單裡指定的寫法。
2. **語意詞 / Modifier**（如 `primary`、`disabled`、`highlight`）→ 不建議縮寫，這些字本身不長，縮寫反而增加閱讀成本（`--pri` 不如 `--primary` 直覺）。
3. **Element**（如 `title`、`icon`）→ 儘量用完整單字，因為 Element 本來就依附在 Block 語境下，縮寫容易讓語意更模糊（`__ic` 是 icon 還是 index card？）。
4. 需要新增白名單詞彙時，先在 PR 中提出並更新下表，取得共識後才能全專案套用，避免命名風格分裂。

### 縮寫白名單

| 完整字 | 允許縮寫 | 使用位置 | 範例 |
| ------ | -------- | -------- | ---- |
| Button | `Btn` | Block | `.a-Btn`, `.a-Btn--primary` |
| Navigation | `Nav` | Block | `.o-Nav`, `.o-Nav__link` |
| Image | `Img` | Element | `.o-Card__img` |
| Description | `Desc` | Element | `.o-Card__desc` |
| Message | `Msg` | Element / Modifier | `.m-Alert__msg` |
| Number / Quantity | `Num` / `Qty` | Element | `.m-QtySelector__num` |
| Configuration | `Config` | 變數 / 檔名（非 class） | `_config.scss` |
| Information | `Info` | Block / Element | `.m-InfoTip` |

> 未列於白名單的字（例如 `product` → `Prod`、`category` → `Cat`）一律使用完整拼寫，避免產生歧義。

---

## 四、Element 與 Modifier 規則

1. **Element 只能有一層**，不可 `Block__el1__el2` 巢狀下去。若子元素內還有需要命名的節點，改用新的 Element 名稱描述其語意，而不是疊加底線。

   ```text
   ✅ .o-ProductCard__title
   ✅ .o-ProductCard__titleIcon
   ❌ .o-ProductCard__title__icon
   ```

2. **Modifier 只改變外觀或狀態，不新增結構**。同一個 Modifier 應可套用在 Block 或 Element 上：

   ```html
   <div class="a-Btn a-Btn--disabled">…</div>
   <span class="a-Tag__label a-Tag__label--warning">…</span>
   ```

3. **狀態類別（`is-*` / `has-*`）與 ABEM 主體分開撰寫**，不寫死在同一顆 class 裡，方便 JS 直接控制顯示邏輯：

   ```html
   <div class="o-Accordion o-Accordion--bordered is-open">…</div>
   ```

---

## 五、SCSS 撰寫慣例

沿用專案既有的 7-1 分層（`base → layout → components → pages`），並搭配 `@use` 載入，同一個 Block 的 Element / Modifier 一律用巢狀 `&` 撰寫，避免另外重複打完整 class 名稱：

```scss
// src/styles/components/_product-card.scss
.o-ProductCard {
  display: flex;
  flex-direction: column;

  &__cover {
    aspect-ratio: 3 / 4;
    object-fit: cover;
  }

  &__title {
    font-weight: 700;
  }

  &--highlight {
    border: 2px solid var(--color-primary);
  }

  &.is-loading {
    opacity: 0.5;
  }
}
```

規則：

- 巢狀深度不超過 **2 層**（Block → `&__x` / `&--x`），避免產生過度耦合的選擇器。
- 一個 SCSS 檔案只定義一個 Block（檔名採 kebab-case，例如 `_product-card.scss` 對應 `.o-ProductCard`）。
- 不使用標籤選擇器或 ID 選擇器覆寫元件樣式，只透過 class。

---

## 六、與舊版簡化 BEM 的對照（遷移用）

專案先前使用的是「簡化版 BEM」（無 Atomic 前綴、Block 用 kebab-case）。之後新增或重構元件時，請依下表轉換：

| 舊命名（簡化版 BEM） | 新命名（ABEM） | 說明 |
| --------------------- | --------------- | ---- |
| `.card` / `.card-header` / `.card-body` | `.o-Card` / `.o-Card__header` / `.o-Card__body` | Element 改用 `__` 而非額外連字號 |
| `.card--highlight` | `.o-Card--highlight` | Modifier 語法不變，僅 Block 名稱改為 PascalCase 並加前綴 |
| `.btn` / `.btn-primary` | `.a-Btn` / `.a-Btn--primary` | 修飾詞應為 Modifier 而非另建 class；`Btn` 為縮寫白名單用字 |
| `.nav-bar` / `.nav-item` / `.nav-link` | `.o-NavBar` / `.o-NavBar__item` / `.o-NavBar__link` | 同一個 Block 底下的元素統一掛在 `o-NavBar` 之下 |
| `.form-group` / `.form-label` / `.form-input` | `.m-FormGroup` / `.m-FormGroup__label` / `.m-FormGroup__input` | 表單欄位屬於 Molecule |
| `.is-active` / `.is-disabled` / `.is-loading` | 沿用 `.is-active` / `.is-disabled` / `.is-loading` | 狀態類別維持不變，仍與 Atomic 前綴分開使用 |

> 既有頁面（`public/index.html`、`search.html`、`product.html` 等若後續復原）不需要一次全部改完；新開發或重構到的元件才套用 ABEM，並在 `docs/changelog.md` 紀錄該次調整範圍。

---

## 七、常見錯誤（Do / Don't）

```text
❌ .o-productcard          → Block 沒有 PascalCase
❌ .o-ProductCard-title    → Element 用了連字號而非 __
❌ .o-ProductCard__Title   → Element 首字不應大寫（要 camelCase）
❌ .o-ProductCard__title__icon → Element 巢狀兩層
❌ .btn.primary            → Modifier 沒有 -- 前綴，容易與獨立 class 混淆

✅ .o-ProductCard
✅ .o-ProductCard__title
✅ .o-ProductCard__titleIcon
✅ .a-Btn--primary
```

---

## 八、Stylelint 對應建議

目前 `.stylelintrc.json` 的 `selector-class-pattern` 為 `null`（未限制）。待團隊確認 ABEM 全面採用後，可改用以下正則式強制檢查（僅供參考，正式導入前請先在分支驗證既有樣式相容性）：

```json
{
  "rules": {
    "selector-class-pattern": "^(([a-z]+-)?[A-Z][a-zA-Z0-9]*(__[a-z][a-zA-Z0-9]*)?(--[a-z][a-zA-Z0-9]*)?|is-[a-z][a-zA-Z0-9]*|has-[a-z][a-zA-Z0-9]*|u-[a-z][a-zA-Z0-9]*)$"
  }
}
```

---

## 九、快速參考表

| 類型 | 範例命名 | 說明 |
| ---- | -------- | ---- |
| 版面 / Layout | `.l-Container`, `.l-Grid`, `.t-PageShell` | 純排版容器，不含視覺樣式 |
| 原子元件 Atom | `.a-Btn`, `.a-Input`, `.a-Tag` | 最小可重用單位 |
| 分子元件 Molecule | `.m-SearchBar`, `.m-FormGroup` | 由 Atom 組成 |
| 有機體 Organism | `.o-ProductCard`, `.o-NavBar`, `.o-Footer` | 由 Molecule / Atom 組成的完整區塊 |
| 頁面專屬 Page | `.p-Home__hero`, `.p-Product__gallery` | 僅該頁面使用的微調樣式 |
| 工具類 Utility | `.u-textCenter`, `.u-hidden`, `.u-mt16` | 單一用途、不含語意 |
| 狀態 State | `.is-active`, `.is-disabled`, `.is-loading`, `.has-error` | 由 JS 或使用者互動觸發 |

---

## 十、元件庫參考（Component Library Reference）

以下依 Atomic 層級整理常見 UI 元件的建議命名，作為新增元件時的查詢依據。實際專案（電子書系統）如有網站閱讀器、書店特有元件，可依相同格式擴充於本表下方。

### 10.1 Atom（原子）— `src/styles/components/`

| Block | 常見 Element | 常見 Modifier | 常見 State | 說明 |
| ----- | ------------ | -------------- | ---------- | ---- |
| `.a-Btn` | `__icon`, `__label` | `--primary`, `--secondary`, `--outline`, `--danger`, `--small`, `--large` | `is-disabled`, `is-loading` | 按鈕 |
| `.a-Input` | `__field`, `__icon` | `--error`, `--small` | `is-focused`, `is-disabled` | 單行輸入框 |
| `.a-Textarea` | `__field` | `--error` | `is-disabled` | 多行輸入框 |
| `.a-Select` | `__field`, `__arrow` | `--small` | `is-disabled` | 下拉選單（原生 `<select>`） |
| `.a-Checkbox` | `__input`, `__label` | — | `is-checked`, `is-disabled` | 核取方塊 |
| `.a-Radio` | `__input`, `__label` | — | `is-checked`, `is-disabled` | 單選鈕 |
| `.a-Switch` | `__track`, `__thumb` | — | `is-on`, `is-disabled` | 切換開關 |
| `.a-Tag` | `__label`, `__closeIcon` | `--success`, `--warning`, `--danger` | — | 標籤 / 分類徽章 |
| `.a-Badge` | `__count` | `--dot` | — | 數字角標（如購物車數量） |
| `.a-Avatar` | `__img`, `__fallback` | `--small`, `--large`, `--circle` | — | 使用者頭像 |
| `.a-Icon` | — | `--small`, `--large` | — | SVG / Icon Font 包裝 |
| `.a-Link` | — | `--underline` | `is-active` | 純文字連結 |
| `.a-Spinner` | — | `--small` | — | 載入中動畫 |
| `.a-Divider` | — | `--vertical` | — | 分隔線 |

### 10.2 Molecule（分子）— `src/styles/components/`

| Block | 常見 Element | 常見 Modifier | 常見 State | 說明 |
| ----- | ------------ | -------------- | ---------- | ---- |
| `.m-SearchBar` | `__input`, `__btn`, `__clearBtn` | — | `is-focused` | 搜尋列（Input + Btn） |
| `.m-FormGroup` | `__label`, `__control`, `__errorMsg`, `__hint` | `--inline` | `has-error` | 表單欄位群組（Label + Input + 錯誤訊息） |
| `.m-InputGroup` | `__prepend`, `__field`, `__append` | — | — | 帶前後綴的輸入框（如金額、單位） |
| `.m-Pagination` | `__item`, `__prevBtn`, `__nextBtn` | — | `is-active`, `is-disabled` | 分頁器 |
| `.m-Breadcrumb` | `__item`, `__separator` | — | `is-current` | 麵包屑導覽 |
| `.m-Rating` | `__star`, `__count` | `--readonly` | `is-filled` | 星級評分 |
| `.m-Dropdown` | `__toggle`, `__menu`, `__item` | — | `is-open` | 下拉選單（自訂樣式，非原生 select） |
| `.m-Alert` | `__icon`, `__msg`, `__closeBtn` | `--success`, `--warning`, `--danger`, `--info` | — | 提示訊息條 |
| `.m-Toast` | `__msg`, `__closeBtn` | `--success`, `--error` | `is-visible` | 短暫通知（右上/右下彈出） |
| `.m-QtySelector` | `__decreaseBtn`, `__num`, `__increaseBtn` | — | `is-disabled` | 數量增減器（購物車常用） |
| `.m-PriceTag` | `__current`, `__original`, `__discount` | — | — | 價格（含折扣前後價） |
| `.m-Tabs` | `__tab`, `__panel` | — | `is-active` | 頁籤切換 |

### 10.3 Organism（有機體）— `src/styles/components/`

| Block | 常見 Element | 常見 Modifier | 常見 State | 說明 |
| ----- | ------------ | -------------- | ---------- | ---- |
| `.o-ProductCard` | `__cover`, `__title`, `__desc`, `__price`, `__actions` | `--highlight`, `--horizontal` | `is-loading` | 電子書 / 商品卡片 |
| `.o-NavBar` | `__logo`, `__menu`, `__item`, `__link`, `__toggleBtn` | `--fixed`, `--transparent` | `is-open`（行動版選單展開） | 頂部導覽列 |
| `.o-Footer` | `__section`, `__link`, `__copyright` | — | — | 頁尾 |
| `.o-Modal` | `__overlay`, `__dialog`, `__header`, `__body`, `__footer`, `__closeBtn` | `--small`, `--fullscreen` | `is-open` | 彈窗（登入 / 註冊 / 確認框） |
| `.o-Accordion` | `__item`, `__header`, `__panel`, `__icon` | `--bordered` | `is-open` | 手風琴收合區塊 |
| `.o-Table` | `__head`, `__row`, `__cell`, `__sortIcon` | `--striped`, `--compact` | `is-selected` | 表格 |
| `.o-Carousel` | `__track`, `__slide`, `__prevBtn`, `__nextBtn`, `__indicator` | — | `is-active` | 輪播（Banner / 精選書單） |
| `.o-FilterPanel` | `__section`, `__title`, `__optionList`, `__applyBtn` | `--collapsed` | — | 搜尋結果篩選側欄 |
| `.o-ReaderToolbar` | `__bookmarkBtn`, `__fontSizeControl`, `__progressBar`, `__menuBtn` | — | `is-hidden` | 線上閱讀器工具列 |
| `.o-CommentList` | `__item`, `__avatar`, `__author`, `__content` | — | — | 留言 / 書評列表 |
| `.o-Hero` | `__title`, `__subtitle`, `__cta` | `--imageBg` | — | 首頁大型主視覺區塊 |

### 10.4 Layout / Template / Page

| Block | 說明 |
| ----- | ---- |
| `.l-Container` | 內容最大寬度容器，置中並含左右 padding |
| `.l-Grid` | Grid / Flex 排版容器，搭配 Modifier 控制欄數，如 `.l-Grid--cols3` |
| `.t-PageShell` | 頁面骨架（Header + 內容插槽 + Footer） |
| `.p-Home__hero` | 首頁專屬微調（僅覆寫少量樣式，不重新定義 `.o-Hero` 本體） |
| `.p-Search__filterPanel` | 搜尋頁對 `.o-FilterPanel` 的位置微調 |
| `.p-Product__gallery` | 商品頁專屬圖片牆版位 |

> 新增元件時，先確認是否已有可重用的 Atom / Molecule，避免重複造輪子；若現有元件加上 Modifier 就能滿足需求，優先擴充 Modifier 而非新建 Block。

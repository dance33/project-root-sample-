# 圖檔命名規範

## 檔案涵義

本文件定義 `public/assets/images/`、`public/assets/icons/`、`public/assets/fonts/` 底下靜態資源的命名規則，確保圖檔可依用途快速辨識、避免命名衝突，並方便日後替換或串接 CDN。

## 目的

- 讓檔名本身就能表達「這是什麼類型、用在哪裡的圖」，不需要打開檔案才知道用途。
- 統一大小寫、分隔符號與副檔名慣例，避免不同作業系統（Windows / macOS / Linux 部署主機）因大小寫或特殊字元造成路徑問題。
- 與 [`docs/style-naming-rules.md`](style-naming-rules.md)（ABEM）的元件命名邏輯呼應，讓圖檔能對應到使用它的元件或頁面。

---

## 一、基本規則

1. **全部小寫**，不使用大寫字母。
2. **單字間一律用連字號 `-`（kebab-case）分隔**，不使用底線 `_`、空白或駝峰式。
3. **禁止中文、全形符號、特殊字元**（僅允許 `a-z`、`0-9`、`-`）。
4. **檔名需具描述性**，不可用 `img1.jpg`、`未命名.png`、`螢幕擷取畫面.png` 等無意義命名直接上傳。
5. **副檔名一律小寫**，且依用途選擇正確格式（見下表）。

```text
❌ Logo_Main.PNG
❌ 首頁Banner.jpg
❌ IMG_20260901.png
❌ icon (1).svg

✅ logo-main.svg
✅ home-hero-banner.jpg
✅ icon-search.svg
```

---

## 二、命名結構

```text
[類別]-[主題/頁面]-[描述]-[變體或序號][@密度].[副檔名]
```

| 組成部分 | 是否必填 | 說明 | 範例 |
| -------- | -------- | ---- | ---- |
| `類別` | 必填 | 圖片用途分類前綴（見下表） | `icon-`、`logo-`、`banner-`、`thumb-`、`avatar-`、`bg-`、`illus-` |
| `主題/頁面` | 選填 | 僅該頁面 / 該功能使用時加上，對應 `style-naming-rules.md` 的 Page 命名（如 `home`、`catalog`、`product`） | `home-hero-banner.jpg` |
| `描述` | 必填 | 具體內容說明 | `search`、`cart`、`arrow-right` |
| `變體或序號` | 選填 | 同一描述有多個版本時使用（狀態、顏色、序號） | `icon-cart--active.svg`、`banner-01.jpg` |
| `@密度` | 選填 | Retina / HiDPI 圖需提供 2x、3x 版本時使用 | `logo-main@2x.png` |

> 變體使用雙連字號 `--` 呼應 ABEM 的 Modifier 概念（易讀且與一般分隔符區隔），例如 `icon-cart--active.svg`、`icon-cart--disabled.svg`。

---

## 三、類別前綴對照表

| 前綴 | 用途 | 建議資料夾 | 建議格式 |
| ---- | ---- | ---------- | -------- |
| `logo-` | 品牌 / 商標圖 | `assets/images/` | SVG（優先）／PNG |
| `icon-` | 介面圖示（按鈕、選單、狀態） | `assets/icons/` | SVG |
| `banner-` | 大型主視覺 / 橫幅 | `assets/images/` | JPG／WebP |
| `bg-` | 背景圖（區塊、頁面背景） | `assets/images/` | JPG／WebP |
| `thumb-` | 縮圖（商品清單、搜尋結果） | `assets/images/` | JPG／WebP |
| `avatar-` | 使用者頭像（含預設頭像） | `assets/images/` | PNG／WebP |
| `illus-` | 插畫 / 空狀態插圖（如「查無結果」） | `assets/images/` | SVG／PNG |
| `photo-` | 一般照片型內容圖 | `assets/images/` | JPG／WebP |

判斷原則：**能否縮放不失真、是否為純線條圖形** → 是則用 SVG（`icon-`、`logo-`、`illus-` 多半適用）；**是否為色彩豐富的相片內容** → 用 JPG/WebP（`banner-`、`bg-`、`thumb-`、`photo-`）；**是否需要透明背景** → 用 PNG 或 WebP。

---

## 四、圖示（icon）專屬規則

`assets/icons/` 內的圖示建議與慣用圖示庫（如 Feather、Material Icons）名稱對齊，方便替換第三方套件：

```text
✅ icon-search.svg
✅ icon-cart.svg
✅ icon-arrow-right.svg
✅ icon-chevron-down.svg
✅ icon-cart--active.svg     （狀態變體）
```

- 方向類圖示以「終點方向」命名，例如向右箭頭為 `icon-arrow-right`，而非 `icon-right-arrow`。
- 同一圖示若有多色版本（如單色 / 品牌色），用變體區分：`icon-heart--outline.svg`、`icon-heart--filled.svg`。
- 圖示對應的 CSS class 建議直接使用去除副檔名後的名稱，與 [`style-naming-rules.md`](style-naming-rules.md) 的 `a-Icon` Atom 搭配：`<svg class="a-Icon a-Icon--search">`。

---

## 五、響應式與 Retina 圖片

需要提供不同解析度版本時，統一在檔名尾端加上密度標記（副檔名前）：

```text
logo-main.png       → 標準解析度（1x）
logo-main@2x.png    → 2 倍解析度（Retina）
logo-main@3x.png    → 3 倍解析度
```

若同一張圖需依螢幕尺寸提供不同裁切（非單純放大縮小），改用尺寸縮寫而非密度：

```text
home-hero-banner-sm.jpg   → 手機版裁切
home-hero-banner-md.jpg   → 平板版裁切
home-hero-banner-lg.jpg   → 桌面版裁切
```

兩種標記不可混用在同一檔名（不要 `banner-sm@2x.jpg`），如兩者都需要，建議改由 `<picture>` / `srcset` 搭配單一裁切版本 + 密度版本處理，避免檔名組合爆炸。

---

## 六、常見錯誤（Do / Don't）

```text
❌ Home_Banner.JPG           → 大寫字母、底線
❌ banner2.jpg               → 描述不足，看不出用途
❌ icon_search_20260901.svg  → 底線分隔、夾帶不必要日期
❌ 產品縮圖.png               → 中文檔名
❌ thumb-product-1-final-v2-use-this.jpg → 命名夾帶版本註記，應交由 Git 版本控制

✅ home-hero-banner.jpg
✅ icon-search.svg
✅ thumb-product-01.jpg
✅ avatar-default.png
```

---

## 七、與資料夾結構的對應

延續 [`docs/folder-structure.md`](folder-structure.md) 的規劃：

```text
public/assets/
├─ images/     一般圖片（logo、banner、bg、thumb、avatar、illus、photo）
├─ icons/      介面圖示（icon-*.svg）
└─ fonts/      網頁字型（依字重命名，見下方）
```

字型檔命名建議採 `字型名-字重.副檔名`，例如：`noto-sans-tc-regular.woff2`、`noto-sans-tc-bold.woff2`，避免使用官方發行檔名中的空白或大寫。

---

## 八、快速參考表

| 情境 | 建議檔名 |
| ---- | -------- |
| 全站共用商標 | `logo-main.svg` |
| 首頁主視覺橫幅 | `home-hero-banner.jpg` |
| 搜尋圖示 | `icon-search.svg` |
| 購物車圖示（含啟用狀態） | `icon-cart.svg` / `icon-cart--active.svg` |
| 商品縮圖（第 1 張） | `thumb-product-01.jpg` |
| 使用者預設頭像 | `avatar-default.png` |
| 搜尋無結果插圖 | `illus-empty-search.svg` |
| 2 倍解析度商標 | `logo-main@2x.png` |
| 手機版首頁橫幅裁切 | `home-hero-banner-sm.jpg` |

---

## 九、常用圖檔命名庫

以下整理一般網站 / 電子書系統常見會用到的圖檔，作為新增素材時的命名字典，避免每次重新想名稱造成風格分裂。若專案有其他常用圖，可依相同規則擴充於下表。

### 9.1 品牌 / Logo（`assets/images/`）

| 用途 | 建議檔名 |
| ---- | -------- |
| 主要商標（桌機版） | `logo-main.svg` |
| 行動版簡化商標 | `logo-mobile.svg` |
| 反白商標（深色背景用） | `logo-main--white.svg` |
| 瀏覽器分頁圖示 | `favicon.ico` |
| PWA / 手機主畫面圖示 | `logo-app-icon.png` |

### 9.2 介面圖示 Icon（`assets/icons/`）

| 分類 | 建議檔名 |
| ---- | -------- |
| 導覽 / 選單 | `icon-menu.svg`、`icon-close.svg`、`icon-search.svg`、`icon-user.svg`、`icon-cart.svg` |
| 方向箭頭 | `icon-arrow-left.svg`、`icon-arrow-right.svg`、`icon-arrow-up.svg`、`icon-arrow-down.svg`、`icon-chevron-down.svg`、`icon-chevron-up.svg` |
| 操作動作 | `icon-edit.svg`、`icon-delete.svg`、`icon-plus.svg`、`icon-minus.svg`、`icon-download.svg`、`icon-share.svg`、`icon-filter.svg`、`icon-sort.svg` |
| 狀態回饋 | `icon-check.svg`、`icon-warning.svg`、`icon-error.svg`、`icon-info.svg`、`icon-success.svg` |
| 收藏 / 評分 | `icon-heart.svg` / `icon-heart--filled.svg`、`icon-star.svg` / `icon-star--filled.svg` |
| 帳號 / 安全 | `icon-eye.svg` / `icon-eye--off.svg`、`icon-lock.svg`、`icon-unlock.svg` |
| 聯絡資訊 | `icon-calendar.svg`、`icon-clock.svg`、`icon-location.svg`、`icon-phone.svg`、`icon-mail.svg` |
| 第三方 / 社群 | `icon-facebook.svg`、`icon-line.svg`、`icon-google.svg`、`icon-instagram.svg` |

### 9.3 版面用圖（`assets/images/`）

| 用途 | 建議檔名 |
| ---- | -------- |
| 首頁主視覺 | `home-hero-banner.jpg` |
| 活動 / 促銷橫幅 | `banner-promo-01.jpg`、`banner-promo-02.jpg` |
| 區塊背景圖 | `bg-section-primary.jpg`、`bg-footer.jpg` |
| 登入 / 註冊頁背景 | `bg-auth.jpg` |

### 9.4 縮圖 / 頭像（`assets/images/`）

| 用途 | 建議檔名 |
| ---- | -------- |
| 商品 / 電子書縮圖 | `thumb-product-01.jpg`、`thumb-product-02.jpg` |
| 使用者頭像預設圖 | `avatar-default.png` |
| 頭像載入失敗替代圖 | `avatar-placeholder.png` |

### 9.5 插畫 / 空狀態（`assets/images/`）

| 用途 | 建議檔名 |
| ---- | -------- |
| 搜尋無結果 | `illus-empty-search.svg` |
| 購物車為空 | `illus-empty-cart.svg` |
| 404 找不到頁面 | `illus-404.svg` |
| 網路連線錯誤 | `illus-network-error.svg` |
| 空的收藏清單 | `illus-empty-favorite.svg` |

> 新增圖檔前，先查此表是否已有相同用途的命名慣例可沿用；真的找不到對應分類時，再依「二、命名結構」自行組合新名稱，並視情況回填至本表。

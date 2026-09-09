# MVC Bundle 相容性草案

> 本文件為草案（draft），尚未定案。目的是評估目前純前端（HTML／SCSS／JS + partial-include）的建置產物，未來若需整合進 MVC 後端（Razor Views + Bundle & Minification 機制）時，資料夾與檔案是否能平順對應，避免屆時大幅改動 `src/pages/`、`src/partials/` 結構。

## 檔案涵義

記錄「前端範本」與「MVC 後端」之間的對應規劃，作為後端工程師接手串接時的參考依據，並列出目前規劃與 MVC 慣例不一致、需要團隊討論的項目。

## 背景

依 [`docs/workflow-roles.md`](workflow-roles.md) 第三階段「切端程式套版、API 串接、打包」，本專案完成靜態切版後，可能會由後端工程師整合進既有 MVC 專案（Views + Controller + Bundle 設定），而非直接以純前端方式上線。因此需要提前確認：

- 目前 `src/pages/<module>/*.html` 與 `src/partials/*.html` 的切分方式，是否能直接轉為 Razor 的 View／Partial View。
- 目前 `scripts/build-pages.js` 的 `@include`／`@data` 語法，與 MVC 的 `@Html.Partial()` / `@RenderSection()` 在角色上如何對應、哪些邏輯需要重寫。
- `public/assets/css/main.css`、`public/assets/js/` 等建置產物，未來要如何納入 MVC 專案的 Bundle 設定（例如 `BundleConfig.cs`），而非直接以靜態檔案路徑引用。

## 對應關係（草案，待後端確認）

| 前端範本（本專案）                                   | MVC 慣例（預期，待確認）                          | 備註 |
| ----------------------------------------------------- | -------------------------------------------------- | ---- |
| `src/pages/<module>/<page>.html`                      | `Views/<Controller>/<Action>.cshtml`                | 頁面內的靜態文字／區塊需改為 Razor 語法或 ViewModel 綁定 |
| `src/partials/header.html`                            | `Views/Shared/_Header.cshtml`                       | skip-link、landmark 結構需原樣保留 |
| `src/partials/footer.html`                            | `Views/Shared/_Footer.cshtml`                       | 同上 |
| `src/partials/head-meta.html`                         | `Views/Shared/_Layout.cshtml` 的 `<head>` 區塊，或 `_HeadMeta.cshtml` | 各頁覆寫欄位需改為 `ViewData["Title"]` 等機制 |
| `src/partials/structured-data/*.jsonld.html`          | Partial View（維持獨立檔案，於對應頁面 `@Html.Partial` 引入） | 內容多為靜態樣板＋動態欄位置換 |
| `public/assets/css/main.css`（`scss:build` 產物）     | Bundle 設定中的一個 style bundle（如 `~/Content/css`） | 需確認是否改由後端建置流程重新編譯 SCSS，或沿用前端產出的 `.css` |
| `public/assets/js/main.js`（規劃中）                  | Bundle 設定中的一個 script bundle（如 `~/bundles/main`） | 同上 |
| `scripts/generate-sitemap.js` 產出的 `sitemap.xml`    | 視後端路由決定是否改為動態產生                      | 若頁面改由 Controller/Action 路由，靜態掃描 `src/pages` 的方式可能需調整 |

## 建置流程調整方向（草案）

1. **切版階段（本專案負責）**：維持現有 `src/pages/` + `src/partials/` + `scripts/build-pages.js` 流程，產出可獨立預覽的靜態頁面，供設計驗收與無障礙／SEO 檢核。
2. **交接階段**：交付內容包含 `src/` 原始檔（非 `public/` 建置產物），並附上本文件的對應表，供後端工程師轉置為 Razor Views。
3. **整合階段（後端負責，待確認負責角色）**：
   - 將 `src/pages/**/*.html` 的結構轉為對應 `.cshtml`，靜態文字視需求改為 ViewModel 綁定。
   - 將 `src/partials/*.html` 轉為 `Views/Shared/_*.cshtml`。
   - CSS／JS 是否沿用前端 `scss:build` 產出的檔案掛進 Bundle，或由後端重新走一次編譯流程，**待確認**。

## 注意事項

- 本文件僅為前端交接前的規劃草案，實際 MVC 專案的資料夾命名、Bundle 設定方式請以後端團隊現行規範為準，本文件對應表需再核對修正。
- 為降低轉置成本，切版階段請避免在 `src/pages/`、`src/partials/` 中使用 MVC 無法對應的前端專屬語法（例如假資料的 JS 動態渲染邏輯，應集中在 `src/scripts/pages/`，不要混入 HTML 結構）。
- 無障礙（skip-link、landmark、`aria-*`）與 SEO（meta、JSON-LD）相關結構，轉為 Razor 後仍須維持一致，相關規則詳見 [`docs/accessibility-guidelines.md`](accessibility-guidelines.md)、[`docs/seo-guidelines.md`](seo-guidelines.md)。

## 待確認事項

- [ ] 後端採用的是 ASP.NET MVC（`System.Web.Optimization` Bundle）還是 ASP.NET Core（`BundlerMinifier` / 前端另行打包）？兩者設定方式差異較大，需先確認再細化本文件。
- [ ] 整合階段的負責角色與交接時機（是否併入 [`docs/workflow-roles.md`](workflow-roles.md) 的第三階段，或視為獨立的第四階段）。
- [ ] `src/pages/<module>/` 的模組是否與 MVC 的 Controller 一對一對應（例如 `catalog` 模組 → `CatalogController`），或有其他路由規劃。

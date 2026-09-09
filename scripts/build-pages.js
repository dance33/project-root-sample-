// 輕量 HTML Partial 建置腳本（不依賴外部套件）
//
// 用途：把 src/partials/ 的共用區塊（head-meta / header / footer / 結構化資料）
// 合併進 src/pages/<module>/*.html，並將頁面頂端 @data 區塊定義的欄位
// （title / description / canonical ...）代入 partial 內的 {{placeholder}}，
// 最後輸出成單一檔案到 public/。
//
// 這是「共用 Partial 機制」的最小示範；頁面規模持續成長、需要迴圈或條件式
// 樣板語法時，可依 docs/folder-structure.md 的規劃改用 posthtml-include 等套件，
// 屆時只需替換本檔案的實作，src/pages/、src/partials/ 的目錄慣例不需變動。
//
// @include 路徑一律「相對於 src/」，不看呼叫檔案自己的位置，
// 避免 src/pages/<module>/ 深度不同時要寫不同層數的 ../../。
//
// 用法：node scripts/build-pages.js（或 npm run html:build）

import { readdirSync, statSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const srcDir = join(rootDir, 'src');
const pagesDir = join(srcDir, 'pages');
const outDir = join(rootDir, 'public');

const DATA_BLOCK = /<!--\s*@data([\s\S]*?)-->/;
const INCLUDE_TAG = /<!--\s*@include:\s*(.+?)\s*-->/g;
const PLACEHOLDER = /{{\s*([\w-]+)\s*}}/g;

// 頁面未在 @data 覆寫時使用的預設值，避免 placeholder 開天窗
const DEFAULT_DATA = {
  robots: 'index, follow',
  ogImage: '/assets/images/og/default.png',
};

function walkHtmlFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    if (statSync(fullPath).isDirectory()) {
      files.push(...walkHtmlFiles(fullPath));
    } else if (entry.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

// 解析 @data 區塊：一行一組 key: value（純字串，不支援巢狀結構）
function parseDataBlock(raw) {
  const data = {};
  for (const line of raw.trim().split('\n')) {
    const match = line.match(/^\s*([\w-]+)\s*:\s*(.*)$/);
    if (match) data[match[1]] = match[2].trim();
  }
  return data;
}

function applyPlaceholders(content, data) {
  return content.replace(PLACEHOLDER, (_, key) => {
    if (!(key in data)) {
      console.warn(`  ⚠ 找不到 placeholder 對應的欄位：{{${key}}}`);
      return '';
    }
    return data[key];
  });
}

// 遞迴展開 @include，並防止 partial 互相 include 造成無窮迴圈
function resolveIncludes(content, data, seenPaths) {
  return content.replace(INCLUDE_TAG, (_, relPath) => {
    const fullPath = join(srcDir, relPath);
    if (seenPaths.has(fullPath)) {
      throw new Error(`偵測到循環 include：${relPath}`);
    }
    const partialRaw = readFileSync(fullPath, 'utf-8');
    const partialResolved = resolveIncludes(partialRaw, data, new Set(seenPaths).add(fullPath));
    return applyPlaceholders(partialResolved, data);
  });
}

function buildPage(filePath) {
  let content = readFileSync(filePath, 'utf-8');

  const dataMatch = content.match(DATA_BLOCK);
  const pageData = { ...DEFAULT_DATA, ...(dataMatch ? parseDataBlock(dataMatch[1]) : {}) };
  if (dataMatch) content = content.replace(dataMatch[0], '');

  content = resolveIncludes(content, pageData, new Set());
  content = applyPlaceholders(content, pageData);

  const outPath = join(outDir, basename(filePath));
  writeFileSync(outPath, content, 'utf-8');
  console.log(`✔ src/pages/...${basename(filePath)} → public/${basename(filePath)}`);
}

mkdirSync(outDir, { recursive: true });
const pageFiles = walkHtmlFiles(pagesDir);
pageFiles.forEach(buildPage);
console.log(`\n完成，共輸出 ${pageFiles.length} 個頁面到 public/`);

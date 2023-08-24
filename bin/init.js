#! /usr/bin/env node

const fs = require('fs');
const path = require('path');
const fileName = 'i18nCommon.config.js';

// 指定配置檔案的路徑
const configPath = path.join(process.cwd(), fileName);

// 檢查文件是否已存在
if (fs.existsSync(configPath)) {
    console.error(`${fileName} 已存在。`);
    process.exit(1);
}

// 定義預設的配置檔案內容
const defaultConfig = `
/* eslint-disable no-undef */
module.exports = {
  newFolder: "./assets/resources/i18n/label"
};
`;

// 寫入配置檔案
fs.writeFileSync(configPath, defaultConfig);
console.log(`已成功創建 ${fileName}。`);

#! /usr/bin/env node

const fs = require('fs');
const path = require('path');

// 定義 dist 的路徑
const distFolder = path.join(__dirname, '..', 'dist');

let newFolder;

// 嘗試讀取 myRepo.config.js 設定檔
const configPath = path.join(process.cwd(), 'i18nCommon.config.js');

if (fs.existsSync(configPath)) {
    const userConfig = require(configPath);
    newFolder = userConfig.newFolder;
}

if (!newFolder) {
    console.error('未能找到 myRepo.config.js 或該設定檔中沒有指定 newFolder');
    process.exit(1);
}

// 取得 dist 中所有的 JSON 檔案
const distFiles = fs.readdirSync(distFolder).filter(file => file.endsWith('.json'));

for (const file of distFiles) {
    const distFilePath = path.join(distFolder, file);
    const newFolderPath = path.join(newFolder, file);

    // 如果 newFolder 中沒有同名的檔案，則直接複製
    if (!fs.existsSync(newFolderPath)) {
        fs.copyFileSync(distFilePath, newFolderPath);
        console.log(`Copied ${file} to ${newFolder}`);
    } else {
        // 如果有，檢查裡面的 key
        const distData = JSON.parse(fs.readFileSync(distFilePath, 'utf-8'));
        const newFolderData = JSON.parse(fs.readFileSync(newFolderPath, 'utf-8'));

        for (let key in distData) {
            if (!newFolderData.hasOwnProperty(key)) {
                newFolderData[key] = distData[key];
            }
        }

        fs.writeFileSync(newFolderPath, JSON.stringify(newFolderData, null, 2));
        console.log(`Updated keys for ${file} in ${newFolder}`);
    }
}

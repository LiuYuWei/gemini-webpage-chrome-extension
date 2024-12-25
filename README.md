# Gemini 網頁 Chrome 擴充功能
(內容由 AI 產生再做修改)

<img src="img/snapshot-1.png" alt="主彈出介面" width="1024" />

## 概述

**Gemini 網頁 Chrome 擴充功能** 是一款工具，能從任何網頁的 HTML `<body>` 中提取文字內容，並使用 Google Gemini 進行問答處理。此擴充功能讓使用者能夠無縫地與網頁內容互動，輕鬆進行查詢與理解。

## 功能

- 從網頁的 HTML body 中提取文字內容。
- 使用 Google Gemini 根據網頁內容進行摘要、分析或回答問題。
- 用一個按鍵彈出式操作介面。

## 安裝

1. 複製專案庫：
   ```bash
   git clone https://github.com/LiuYuWei/gemini-webpage-chrome-extension
   ```
   <img src="img/snapshot-2.png" alt="主彈出介面" width="1024" />

2. 打開 Google Chrome 並進入 `chrome://extensions/`，並且啟用「開發者模式」（右上角切換）。
   <img src="img/snapshot-3.png" alt="主彈出介面" width="1024" />
   
3. 點擊「載入未封裝項目」，然後選擇專案目錄，匯入完成後，擴充功能將顯示在工具列上。
   <img src="img/snapshot-4.png" alt="主彈出介面" width="1024" />

3. 點擊「API Config Settings」，並且點選 [API Key 連結](https://aistudio.google.com/app/apikey)
   <img src="img/snapshot-5.png" alt="主彈出介面" width="1024" />

4. 申請一個規定額度內免費的 Google Gemini API Key ，並且填寫回去設定檔中
   <img src="img/snapshot-6.png" alt="主彈出介面" width="1024" />
   <img src="img/snapshot-7.png" alt="主彈出介面" width="1024" />

5. 你就可以開始對網頁進行問答。
   <img src="img/snapshot-8.png" alt="主彈出介面" width="1024" />

## 使用方法

1. 瀏覽至任何網頁。
   
2. 在彈出的介面中，對聊天室進行問答

PS: 不是所有網站都能夠讓 Chatbot 問答，本 Chrome Extension 擴充功能不保證任何事情。

## License | 授權

This project is licensed under the MIT License. See the LICENSE file for details.
本專案採用 MIT 許可證授權。詳情請參閱 LICENSE 文件。

## Author | 作者

Simon Liu 劉育維

- GenAI GDE from Taiwan
  - 來自臺灣的生成式 AI GDE

- AI Engineer/Architect
  - AI 工程師/架構師

- LinkedIn Profile
  - [Link](https://linkedin.com/feed/simonliuyuwei)

Feel free to contribute by submitting issues or pull requests!
歡迎透過提交問題或拉取要求來進行貢獻！


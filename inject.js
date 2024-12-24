// 建立圓形按鈕
const chatbotButton = document.createElement("div");
chatbotButton.style.position = "fixed";
chatbotButton.style.bottom = "15px";
chatbotButton.style.right = "15px";
chatbotButton.style.width = "50px";
chatbotButton.style.height = "50px";
chatbotButton.style.backgroundColor = "#d3d3d3";
chatbotButton.style.borderRadius = "50%";
chatbotButton.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
chatbotButton.style.cursor = "pointer";
chatbotButton.style.zIndex = "10000";
chatbotButton.style.display = "flex";
chatbotButton.style.justifyContent = "center";
chatbotButton.style.alignItems = "center";

// 添加圖示
const icon = document.createElement("img");
icon.src = chrome.runtime.getURL("icon.png");
icon.style.width = "30px";
icon.style.height = "30px";
chatbotButton.appendChild(icon);

// 聊天窗口
const chatWindow = document.createElement("iframe");
chatWindow.src = chrome.runtime.getURL("popup.html");
chatWindow.style.position = "fixed";
chatWindow.style.bottom = "70px";
chatWindow.style.right = "20px";
chatWindow.style.width = "510px";
chatWindow.style.height = "490px";
chatWindow.style.border = "1px solid #ccc";
chatWindow.style.borderRadius = "8px";
chatWindow.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
chatWindow.style.zIndex = "10001";
chatWindow.style.display = "none";

// 添加聊天窗口到頁面
document.body.appendChild(chatWindow);

// 點擊按鈕顯示/隱藏聊天窗口
chatbotButton.addEventListener("click", () => {
  chatWindow.style.display = chatWindow.style.display === "none" ? "block" : "none";
});

// 添加按鈕到頁面
document.body.appendChild(chatbotButton);

// 提取網站 <body> 的文字內容
const bodyText = document.body.innerText;

// 傳送文字內容給 Background Script
chrome.runtime.sendMessage({
  action: "extractContent",
  content: bodyText
});

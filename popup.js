// 切換到設定頁面
document.getElementById("open-settings-button").addEventListener("click", () => {
  document.getElementById("chat-page").style.display = "none";
  document.getElementById("settings-page").style.display = "block";

  // 加載已保存的 API Key 和模型選擇
  chrome.storage.local.get(["geminiApiKey", "geminiModel"], (result) => {
    document.getElementById("api-key-input").value = result.geminiApiKey || "";
    document.getElementById("model-select").value = result.geminiModel || "gemini-2.0-flash-exp";
  });
});

// 返回聊天頁面
document.getElementById("back-to-chat-button").addEventListener("click", () => {
  document.getElementById("settings-page").style.display = "none";
  document.getElementById("chat-page").style.display = "block";
});

// 保存 API Key 和模型選擇
document.getElementById("save-key-button").addEventListener("click", () => {
  const apiKey = document.getElementById("api-key-input").value.trim();
  const selectedModel = document.getElementById("model-select").value;
  const statusMessage = document.getElementById("status-message");

  if (!apiKey) {
    statusMessage.textContent = "API Key cannot be empty.";
    statusMessage.style.color = "red";
    return;
  }

  chrome.storage.local.set({ geminiApiKey: apiKey, geminiModel: selectedModel }, () => {
    statusMessage.textContent = "Settings saved successfully!";
    statusMessage.style.color = "green";

    setTimeout(() => {
      statusMessage.textContent = "";
      document.getElementById("settings-page").style.display = "none";
      document.getElementById("chat-page").style.display = "block";
    }, 1000);
  });
});

document.getElementById("send-button").addEventListener("click", async () => {
  const userInput = document.getElementById("user-input").value.trim();
  if (!userInput) return;

  const output = document.getElementById("chat-output");

  // 顯示使用者輸入
  const userMessage = document.createElement("div");
  userMessage.className = "message user-message";
  userMessage.textContent = userInput;
  output.appendChild(userMessage);

  // 插入動態指示器
  const typingIndicator = document.createElement("div");
  typingIndicator.className = "typing-indicator";
  typingIndicator.textContent = "Typing...";
  output.appendChild(typingIndicator);

  // 獲取存儲的文字內容
  chrome.storage.local.get(["geminiApiKey", "geminiModel", "extractedContent"], async (result) => {
    const apiKey = result.geminiApiKey;
    const model = result.geminiModel || "gemini-2.0-flash-exp";
    const extractedContent = result.extractedContent || "";

    if (!apiKey) {
      const errorMessage = document.createElement("div");
      errorMessage.className = "message bot-message";
      errorMessage.textContent = "Error: API Key not set. Please go to settings and enter your API Key.";
      output.appendChild(errorMessage);
      typingIndicator.remove();
      return;
    }

    const systemPrompt = `
You are a helpful assistant. Always respond in the language of the user's input.
If the input is in Traditional Chinese, respond using Traditional Chinese commonly used by people in Taiwan.
Always format the output using Markdown.`;
    const fullPrompt = {
      contents: [{ parts: [{ text: `${systemPrompt}\n\nContext: ${extractedContent}\n\nUser: ${userInput}` }] }]
    };

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fullPrompt),
        }
      );

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let botMessage = document.createElement("div");
      botMessage.className = "message bot-message";
      botMessage.innerHTML = "";
      output.appendChild(botMessage);

      // 用於累積文本並進行 Markdown 處理
      let accumulatedText = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter(line => line.trim() !== "");
        lines.forEach(line => {
          try {
            const event = JSON.parse(line.replace(/^data:/, ""));
            if (event && event.candidates && event.candidates.length > 0) {
              const newText = event.candidates[0].content.parts[0].text;
              accumulatedText += newText;

              // 更新顯示，使用累積的文本並即時渲染 Markdown
              botMessage.innerHTML = marked.parse(accumulatedText);
              output.scrollTop = output.scrollHeight;

              // 在首次接收到內容後移除動態指示器
              if (typingIndicator.parentElement) {
                typingIndicator.remove();
              }
            }
          } catch (error) {
            console.error("Stream error:", error);
          }
        });
      }
    } catch (error) {
      const errorMessage = document.createElement("div");
      errorMessage.className = "message bot-message";
      errorMessage.textContent = `Error: ${error.message}`;
      output.appendChild(errorMessage);
    } finally {
      // 確保在串流完成後移除動態指示器（如果還未移除）
      if (typingIndicator.parentElement) {
        typingIndicator.remove();
      }
    }
  });

  document.getElementById("user-input").value = "";
});



// 清除聊天記錄
document.getElementById("reset-button").addEventListener("click", () => {
  const output = document.getElementById("chat-output");
  output.innerHTML = ""; // 清除所有消息
});

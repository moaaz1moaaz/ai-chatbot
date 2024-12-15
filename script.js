const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", async () => {
  const userText = userInput.value;
  if (!userText) return;

  appendMessage("User", userText);
  userInput.value = "";

  const response = await getAIResponse(userText);
  appendMessage("AI", response);
});

function appendMessage(sender, text) {
  const message = document.createElement("div");
  message.textContent = `${sender}: ${text}`;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function getAIResponse(prompt) {
  const apiKey = "sk-svcacct-BH8Oc8KwtWY3UaeP5n7aXE4_mJnj-wKlC02Z-eScb3uUiYpSMKEwnUj1Tvg6AKSXOT3BlbkFJi30cNH94wnQ_1xS2K1nQugUQ4b1l2xBWO1ByOAR6RAKOMwwMDq7kJZgzAMcF-PsAA";
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await response.json();
  return data.choices[0].message.content;
}

const API_KEY = "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"; // مفتاح API الخاص بك

async function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    const chatbox = document.getElementById('chatbox');
    chatbox.innerHTML += `<p><strong>أنت:</strong> ${userInput}</p>`;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: userInput }]
            })
        });

        const data = await response.json();
        const botReply = data.choices[0].message.content;
        chatbox.innerHTML += `<p><strong>البوت:</strong> ${botReply}</p>`;
        document.getElementById('userInput').value = '';
    } catch (error) {
        chatbox.innerHTML += `<p><strong>خطأ:</strong> تعذر الاتصال بالبوت.</p>`;
        console.error(error);
    }
}

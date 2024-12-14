// استخدم مفتاح API الجديد هنا
const API_KEY = "sk-svcacct-7k7kiz-eqt6SXR3F5qRZ4X3R4rzFXEFIq9y3Belxr_noC_UjPp2P4lePTnVbYT3BlbkFJGerZVDK-_MoELcemNw1N-pSKDjZpyjOFJYR05hMA0bxazwPoh7Kn-zpr_uSDAA"; // استبدل بـ مفتاح API الفعلي

async function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    const chatbox = document.getElementById('chatbox');
    
    // إظهار الرسالة التي كتبها المستخدم في الواجهة
    chatbox.innerHTML += `<p><strong>أنت:</strong> ${userInput}</p>`;
    
    // تنظيف حقل الإدخال بعد إرسال الرسالة
    document.getElementById('userInput').value = '';
    
    // الاتصال بـ OpenAI API
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo", // أو يمكنك استخدام gpt-4 إذا كان لديك
                messages: [{ role: "user", content: userInput }]
            })
        });

        const data = await response.json();
        const botReply = data.choices[0].message.content;

        // عرض إجابة البوت في الواجهة
        chatbox.innerHTML += `<p><strong>البوت:</strong> ${botReply}</p>`;
        
        // التمرير لأسفل في الدردشة
        chatbox.scrollTop = chatbox.scrollHeight;
    } catch (error) {
        console.error('خطأ في الاتصال بـ OpenAI:', error);
        chatbox.innerHTML += `<p><strong>خطأ:</strong> تعذر الاتصال بالبوت.</p>`;
    }
}

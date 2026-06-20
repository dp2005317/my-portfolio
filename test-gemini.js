const { GoogleGenerativeAI } = require('@google/generative-ai');

async function test() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const messages = [
      { role: 'model', text: "Hi!" },
      { role: 'user', text: "hello" }
    ];

    const chat = model.startChat({
        history: messages.slice(0, -1).map((msg) => ({
            role: msg.role === 'model' ? 'model' : 'user',
            parts: [{ text: msg.text }]
        })),
    });

    const userMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(userMessage.text);
    console.log(result.response.text());
  } catch (e) {
    console.error("ERROR CAUGHT:", e.message);
  }
}
test();

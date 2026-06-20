const { GoogleGenerativeAI } = require('@google/generative-ai');

async function test() {
  try {
    const genAI = new GoogleGenerativeAI("AIzaSyD23eG_vVfK0PcqixjMIL_A2e25QuPXk5g");
    const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        systemInstruction: "You are a helpful assistant"
    });
    
    const messages = [
      { role: 'model', text: "Hi!" },
      { role: 'user', text: "hello" }
    ];

    let historyToPass = messages.slice(0, -1);
    if (historyToPass.length > 0 && historyToPass[0].role === 'model') {
        historyToPass = historyToPass.slice(1);
    }

    const chat = model.startChat({
        history: historyToPass.map((msg) => ({
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

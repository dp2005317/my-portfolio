const { GoogleGenerativeAI } = require('@google/generative-ai');

async function test() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "You are a pirate." 
    });
    
    const chat = model.startChat({
        history: [],
    });

    const result = await chat.sendMessage("hello");
    console.log(result.response.text());
  } catch (e) {
    console.error("ERROR CAUGHT:", e.message);
  }
}
test();

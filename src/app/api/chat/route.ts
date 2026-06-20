import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is missing' }, { status: 500 });
    }

    const { messages } = await req.json();

    const genAI = new GoogleGenerativeAI(apiKey);

    // Format the system prompt to guide the AI
    const systemPrompt = `You are the helpful, professional, and friendly AI Assistant for Diganta Pal's portfolio website. 
    Diganta is a top-tier creative technologist and full-stack developer (React, Node.js, Python, GSAP, Three.js). 
    His projects include NexusBio, HONEST, Wavefy, and RV Salon. 
    Keep your answers concise, engaging, and relevant to his professional background. 
    If asked something outside this scope, politely steer the conversation back to Diganta's expertise.
    If any problem occurs or someone wants to contact Diganta for important matters, give his email: dp2005317@gmail.com`;

    const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        systemInstruction: systemPrompt
    });

    // Gemini requires the history to start with a 'user' message. 
    // If the first message in our array is from the model (the initial greeting), we skip it.
    let historyToPass = messages.slice(0, -1);
    if (historyToPass.length > 0 && historyToPass[0].role === 'model') {
        historyToPass = historyToPass.slice(1);
    }

    const chat = model.startChat({
        history: historyToPass.map((msg: any) => ({
            role: msg.role === 'model' ? 'model' : 'user',
            parts: [{ text: msg.text }]
        })),
    });

    const userMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(userMessage.text);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error("AI API Error:", error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}

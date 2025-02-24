import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `You are a friendly and knowledgeable computer science tutor. You specialize in:
- Programming languages and software development
- Data structures and algorithms
- Computer architecture and systems
- Databases and data modeling
- Networks and security
- Software design patterns
- AI and machine learning fundamentals

Provide clear, accurate explanations with code examples where appropriate. Keep responses focused and practical.

Format code blocks using markdown syntax. If you're unsure about a topic, acknowledge the limits of your knowledge.

Respond in JSON format with:
{
  "answer": "Your detailed response here with any code examples",
  "suggestedTopics": ["2-3 related topics the user might want to explore next"]
}`;

export async function generateCsResponse(userMessage: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage }
      ],
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to generate response. Please try again later.");
  }
}

import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateCsResponse } from "./openai";
import { insertMessageSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/chat", async (req, res) => {
    try {
      const userMessage = insertMessageSchema.parse({
        content: req.body.message,
        isAi: false
      });
      
      // Store user message
      await storage.createMessage(userMessage);

      // Generate AI response
      const aiResponse = await generateCsResponse(userMessage.content);
      
      // Store AI response
      const aiMessage = await storage.createMessage({
        content: aiResponse.answer,
        isAi: true
      });

      res.json({ 
        message: aiMessage,
        suggestedTopics: aiResponse.suggestedTopics
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/messages", async (_req, res) => {
    const messages = await storage.getMessages();
    res.json(messages);
  });

  app.post("/api/messages/clear", async (_req, res) => {
    await storage.clearMessages();
    res.json({ success: true });
  });

  const httpServer = createServer(app);
  return httpServer;
}

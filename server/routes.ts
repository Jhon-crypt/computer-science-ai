import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateCsResponse } from "./openai";
import { insertMessageSchema } from "@shared/schema";
import { ZodError } from "zod";

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
      const errorMessage = error instanceof Error ? error.message : 
        error instanceof ZodError ? "Invalid message format" : 
        "Unknown error occurred";

      res.status(400).json({ message: errorMessage });
    }
  });

  app.get("/api/messages", async (_req, res) => {
    try {
      const messages = await storage.getMessages();
      res.json(messages);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch messages";
      res.status(500).json({ message: errorMessage });
    }
  });

  app.post("/api/messages/clear", async (_req, res) => {
    try {
      await storage.clearMessages();
      res.json({ success: true });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to clear messages";
      res.status(500).json({ message: errorMessage });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
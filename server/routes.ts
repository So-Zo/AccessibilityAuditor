import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { checkUrlSchema } from "@shared/schema";
import { accessibilityChecker } from "./accessibilityChecker";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to check a website's accessibility
  app.post("/api/check", async (req, res) => {
    try {
      // Validate request body
      const { url } = checkUrlSchema.parse(req.body);
      
      // Run the accessibility check
      const report = await accessibilityChecker.analyzeUrl(url);
      
      // Return the report
      return res.json(report);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: "Invalid URL format",
          errors: error.errors
        });
      }
      
      console.error("Error checking accessibility:", error);
      return res.status(500).json({
        message: "Failed to check website accessibility",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // API endpoint to get example test data
  app.get("/api/examples/:example", (req, res) => {
    const exampleKey = req.params.example;
    
    // Provide example test data for demo purposes
    const examples: Record<string, string> = {
      "example": "https://example.com",
      "wikipedia": "https://wikipedia.org",
      "ycombinator": "https://news.ycombinator.com"
    };
    
    const url = examples[exampleKey];
    
    if (!url) {
      return res.status(404).json({ message: "Example not found" });
    }
    
    return res.json({ url });
  });

  const httpServer = createServer(app);

  return httpServer;
}

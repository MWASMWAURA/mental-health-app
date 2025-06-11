import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { insertAssessmentSchema } from "@shared/schema";
import { ZodError } from "zod";
import { HfInference } from '@huggingface/inference';

// Using Hugging Face Inference API
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY || "demo_key");

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  app.post("/api/chat", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    console.log('Chat request received:', req.body.message);
    console.log('Using HF API key:', process.env.HUGGINGFACE_API_KEY ? 'Key present' : 'Key missing');

    try {
      const systemPrompt = `You are Dr. Joy, a humorous and empathetic stress relief therapist chatbot. 
Your responses should be warm, understanding, and occasionally include gentle humor to lighten the mood.
Keep responses concise (2-3 sentences) and focus on practical stress management techniques.
Always maintain a supportive and positive tone.`;

      // Try conversational inference first, fall back to text generation
      let botResponse = "I'm here to help you with stress management. What's on your mind today?";
      
      try {
        console.log('Attempting conversational inference...');
        const response = await hf.conversationalInference({
          model: 'microsoft/DialoGPT-medium',
          inputs: {
            past_user_inputs: [],
            generated_responses: [],
            text: req.body.message
          }
        });
        console.log('Conversational response:', response);
        botResponse = response.generated_text || botResponse;
      } catch (convError) {
        console.log('Conversational model failed:', convError.message);
        try {
          console.log('Attempting text generation...');
          const response = await hf.textGeneration({
            model: 'gpt2',
            inputs: `Dr. Joy is a helpful therapist. User: ${req.body.message} Dr. Joy:`,
            parameters: {
              max_new_tokens: 100,
              temperature: 0.8,
              return_full_text: false,
              do_sample: true
            }
          });
          console.log('Text generation response:', response);
          botResponse = response.generated_text?.trim() || botResponse;
        } catch (textError) {
          console.log('Text generation failed:', textError.message);
          // Provide contextual responses based on keywords
          const message = req.body.message.toLowerCase();
          if (message.includes('stress') || message.includes('anxious')) {
            botResponse = "I understand you're feeling stressed. Try taking 5 deep breaths - inhale for 4, hold for 4, exhale for 6. This can help calm your nervous system.";
          } else if (message.includes('sad') || message.includes('depressed')) {
            botResponse = "It sounds like you're going through a tough time. Remember, it's okay to feel this way. Consider doing something small that usually brings you joy.";
          } else if (message.includes('sleep') || message.includes('tired')) {
            botResponse = "Sleep is so important for mental health. Try creating a bedtime routine - no screens 1 hour before bed, and maybe some light stretching or reading.";
          } else {
            botResponse = "Thank you for sharing with me. Mental health is a journey, and I'm here to support you. What specific area would you like help with today?";
          }
        }
      }
      
      // Clean up the response if needed
      if (botResponse.startsWith("Dr. Joy:")) {
        botResponse = botResponse.substring(8).trim();
      }

      res.json({ response: botResponse });
    } catch (err) {
      console.error('Chatbot error:', err);
      res.status(500).json({ error: 'Failed to process chat message' });
    }
  });

  app.post("/api/assessment", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    try {
      const parsedData = insertAssessmentSchema.parse({
        ...req.body,
        userId: req.user.id,
      });

      const assessment = await storage.createAssessment({
        ...parsedData,
        id: 0,
        createdAt: new Date(),
        questionnaire: parsedData.questionnaire ?? null,
        medicalHistory: parsedData.medicalHistory ?? null,
        videoUrl: parsedData.videoUrl ?? null,
        mlResults: {
          riskCategory: parsedData.mlResults?.riskCategory ?? "low",
          confidenceScore: parsedData.mlResults?.confidenceScore ?? 0.85,
          recommendedPlan: parsedData.mlResults?.recommendedPlan ?? "Standard Coverage",
          factors: parsedData.mlResults?.factors ?? []
        }
      });

      res.json(assessment);
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json(err);
      } else {
        throw err;
      }
    }
  });

  app.get("/api/assessments", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const assessments = await storage.getUserAssessments(req.user.id);
    res.json(assessments);
  });

  const httpServer = createServer(app);
  return httpServer;
}
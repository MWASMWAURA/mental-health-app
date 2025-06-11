import { z } from "zod";

export interface User {
  id: number;
  username: string;
  password: string;
  fullName: string | null;
  email: string | null;
  createdAt: Date;
}

export interface InsertUser {
  username: string;
  password: string;
  confirmPassword?: string;
  fullName?: string;
  email?: string;
}

export interface AssessmentAnswer {
  questionId: number;
  value: number;
}

export interface Assessment {
  id: number;
  userId: number;
  questionnaire: { answers: AssessmentAnswer[] } | null;
  medicalHistory: string | null;
  videoUrl: string | null;
  mlResults: any | null;
  createdAt: Date;
}

export type QuestionnaireData = {
  anxiety: number;
  depression: number;
  stress: number;
  sleep: number;
  responses: Record<string, string>;
};

export type MLResults = {
  riskCategory: "low" | "medium" | "high";
  confidenceScore: number;
  recommendedPlan: string;
  factors: string[];
};

export interface MoodEntry {
  id: number;
  userId: number;
  mood: number; // 1-5 scale
  notes: string | null;
  tags: string[] | null;
  createdAt: Date;
}

export interface SupportGroup {
  id: number;
  name: string;
  description: string | null;
  meetingSchedule: string | null;
  maxParticipants: number | null;
  createdAt: Date;
}

export interface GroupMember {
  id: number;
  groupId: number;
  userId: number;
  isAdmin: boolean | null;
  joinedAt: Date;
}

export const insertMoodEntrySchema = z.object({
  mood: z.number(),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const insertUserSchema = z.object({
  username: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
  fullName: z.string().optional(),
  email: z.string().email().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const insertAssessmentSchema = z.object({
  userId: z.number(),
  questionnaire: z.any().optional(),
  medicalHistory: z.string().optional(),
  videoUrl: z.string().optional(),
  mlResults: z.any().optional(),
});

export type InsertMoodEntry = z.infer<typeof insertMoodEntrySchema>;
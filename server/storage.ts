import pg from "pg";
const { Pool } = pg;
import { Assessment, InsertUser, User } from "@shared/schema";
import session from "express-session";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Required for Neon
});

export interface IStorage {
  sessionStore: session.Store;
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createAssessment(assessment: Assessment): Promise<Assessment>;
  getUserAssessments(userId: number): Promise<Assessment[]>;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new session.MemoryStore();
  }

  async getUser(id: number): Promise<User | undefined> {
    try {
      const result = await pool.query(
        `SELECT id, username, password, full_name AS "fullName", email, created_at AS "createdAt"
         FROM users WHERE id = $1`,
        [id]
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error getting user:", error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const result = await pool.query(
        `SELECT id, username, password, full_name AS "fullName", email, created_at AS "createdAt"
         FROM users WHERE username = $1`,
        [username]
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error getting user by username:", error);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      const { confirmPassword, ...userData } = insertUser;
      const result = await pool.query(
        `INSERT INTO users (username, password, full_name, email, created_at)
         VALUES ($1, $2, $3, $4, NOW())
         RETURNING id, username, password, full_name AS "fullName", email, created_at AS "createdAt"`,
        [
          userData.username,
          userData.password,
          userData.fullName ?? null,
          userData.email ?? null,
        ]
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async createAssessment(assessment: Assessment): Promise<Assessment> {
    try {
      const result = await pool.query(
        `INSERT INTO assessments (user_id, questionnaire, medical_history, video_url, ml_results, created_at)
         VALUES ($1, $2, $3, $4, $5, NOW())
         RETURNING id, user_id AS "userId", questionnaire, medical_history AS "medicalHistory", video_url AS "videoUrl", ml_results AS "mlResults", created_at AS "createdAt"`,
        [
          assessment.userId,
          assessment.questionnaire ?? null,
          assessment.medicalHistory ?? null,
          assessment.videoUrl ?? null,
          assessment.mlResults ?? null,
        ]
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error creating assessment:", error);
      throw error;
    }
  }

  async getUserAssessments(userId: number): Promise<Assessment[]> {
    try {
      const result = await pool.query(
        `SELECT id, user_id AS "userId", questionnaire, medical_history AS "medicalHistory", video_url AS "videoUrl", ml_results AS "mlResults", created_at AS "createdAt"
         FROM assessments WHERE user_id = $1 ORDER BY created_at DESC`,
        [userId]
      );
      return result.rows;
    } catch (error) {
      console.error("Error getting user assessments:", error);
      return [];
    }
  }

  // These are no longer needed with auto-increment IDs in Postgres, but if you want to keep them:
  private async getNextUserId(): Promise<number> {
    // Not needed if you use SERIAL or IDENTITY columns in Postgres
    throw new Error("getNextUserId is not needed with Postgres auto-increment IDs.");
  }

  private async getNextAssessmentId(): Promise<number> {
    // Not needed if you use SERIAL or IDENTITY columns in Postgres
    throw new Error("getNextAssessmentId is not needed with Postgres auto-increment IDs.");
  }
}

export const storage = new DatabaseStorage();

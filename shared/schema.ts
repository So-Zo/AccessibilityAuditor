import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Accessibility report schema
export const accessibilityReports = pgTable("accessibility_reports", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  overallScore: integer("overall_score").notNull(),
  screenReaderScore: integer("screen_reader_score").notNull(),
  keyboardScore: integer("keyboard_score").notNull(),
  contrastScore: integer("contrast_score").notNull(), 
  textSizeScore: integer("text_size_score").notNull(),
  ariaScore: integer("aria_score").notNull(),
  issues: jsonb("issues").notNull(),
  passedTests: jsonb("passed_tests").notNull(),
  allTests: jsonb("all_tests").notNull(),
  recommendations: jsonb("recommendations").notNull(),
});

export const insertReportSchema = createInsertSchema(accessibilityReports).omit({
  id: true,
  createdAt: true,
});

// Issue schema with zod
export const issueSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  category: z.enum(['screenReader', 'keyboard', 'contrast', 'textSize', 'aria']),
  impact: z.enum(['critical', 'serious', 'moderate', 'minor']),
  elements: z.array(z.object({
    html: z.string(),
    location: z.string().optional(),
  })),
  howToFix: z.string(),
  code: z.string().optional(),
  fixCode: z.string().optional(),
});

// Test result schema
export const testResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  category: z.enum(['screenReader', 'keyboard', 'contrast', 'textSize', 'aria']),
  status: z.enum(['passed', 'failed', 'partial', 'inapplicable']),
});

// Recommendation schema
export const recommendationSchema = z.object({
  id: z.string(),
  priority: z.enum(['high', 'medium', 'low']),
  text: z.string(),
});

// Check request schema
export const checkUrlSchema = z.object({
  url: z.string().url()
});

// The full report response schema
export const accessibilityReportResponseSchema = z.object({
  url: z.string(),
  date: z.string(),
  overallScore: z.number(),
  screenReaderScore: z.number(),
  keyboardScore: z.number(),
  contrastScore: z.number(),
  textSizeScore: z.number(),
  ariaScore: z.number(),
  issues: z.array(issueSchema),
  passedTests: z.array(testResultSchema),
  allTests: z.array(testResultSchema),
  recommendations: z.array(recommendationSchema),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Issue = z.infer<typeof issueSchema>;
export type TestResult = z.infer<typeof testResultSchema>;
export type Recommendation = z.infer<typeof recommendationSchema>;
export type AccessibilityReport = typeof accessibilityReports.$inferSelect;
export type InsertAccessibilityReport = z.infer<typeof insertReportSchema>;
export type AccessibilityReportResponse = z.infer<typeof accessibilityReportResponseSchema>;

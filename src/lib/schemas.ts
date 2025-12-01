// ============================================================================
// src/lib/schemas.ts
// ============================================================================
import { z } from "zod";

export const profileSchema = z.object({
  sex: z.enum(["male", "female"]),
  age: z.number().min(14).max(90),
  heightCm: z.number().min(120).max(220),
  weightKg: z.number().min(35).max(250),
  goal: z.enum(["cut", "maintain", "bulk"]),
  activityFactor: z.number().min(1.1).max(1.9)
});

export const sessionSchema = z.object({
  type: z.enum(["strength", "endurance", "mixed", "mobility"]),
  durationMin: z.number().min(10).max(240),
  intensity: z.enum(["low", "moderate", "high"]),
  time: z.string()
});

export type ProfileInput = z.infer<typeof profileSchema>;
export type SessionInput = z.infer<typeof sessionSchema>;

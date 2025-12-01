export type Goal = "cut" | "maintain" | "bulk";
export type TrainingType = "strength" | "endurance" | "mixed" | "mobility";
export type Intensity = "low" | "moderate" | "high";

export interface AthleteProfile {
  sex: "male" | "female";
  age: number;
  heightCm: number;
  weightKg: number;
  goal: Goal;
  activityFactor: number;
}

export interface TrainingSession {
  type: TrainingType;
  durationMin: number;
  intensity: Intensity;
  time: string; // HH:MM
}

export interface MacroTargets {
  kcal: number;
  proteinGr: number;
  carbsGr: number;
  fatGr: number;
  mealTiming: Array<{ label: string; proteinPct: number; carbsPct: number; fatPct: number }>;
}
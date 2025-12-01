import type { AthleteProfile, TrainingSession, MacroTargets } from "./types";

const BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";

export async function calculateTargets(input: {
  profile: AthleteProfile;
  sessions: TrainingSession[];
}): Promise<MacroTargets> {
  const res = await fetch(`${BASE}/api/calc/targets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input)
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Serverfeil: ${res.status} ${text}`);
  }
  return res.json();
}
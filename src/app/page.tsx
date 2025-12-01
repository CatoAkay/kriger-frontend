// ============================================================================
// src/app/page.tsx  (REN: holder bare state + kobler komponenter)
// ============================================================================
"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { calculateTargets } from "@/lib/api";
import type { AthleteProfile, TrainingSession, MacroTargets } from "@/lib/types";
import Hero from "@/components/Hero";
import Card from "@/components/Card";
import ProfileForm from "@/components/ProfileForm";
import SessionsEditor from "@/components/SessionsEditor";
import ResultsPanel from "@/components/ResultsPanel";
import { profileSchema } from "@/lib/schemas";

export default function Page() {
  const [profile, setProfile] = useState<AthleteProfile>({
    sex: "male",
    age: 30,
    heightCm: 180,
    weightKg: 80,
    goal: "maintain",
    activityFactor: 1.5
  });

  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [result, setResult] = useState<MacroTargets | null>(null);

  const { mutate: calc, isPending } = useMutation({
    mutationFn: calculateTargets,
    onSuccess: (data) => setResult(data)
  });

  return (
    <main className="container py-8 md:py-10 space-y-8">
      <header className="space-y-2">
        <Hero />
        <div className="flex items-center gap-3 mt-2">
          <span className="pill">MVP</span>
          <span className="pill">Dark</span>
        </div>
        <h1 className="h1">Kriger — Kalori & Makro kalkulator</h1>
        <p className="lead">Start med profil, legg til økter og beregn målene dine.</p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <Card title="Profil">
          <ProfileForm profile={profile} onChange={setProfile} />
        </Card>

        <Card title="Dagens økter">
          <SessionsEditor
            sessions={sessions}
            onAdd={(s) => setSessions((prev) => [...prev, s])}
            onRemove={(idx) => setSessions((prev) => prev.filter((_, i) => i !== idx))}
          />
        </Card>
      </section>

      <section className="section">
        <div className="flex items-center gap-3">
          <button
            disabled={isPending}
            className="btn btn--dark"
            data-glow="true"
            onClick={() => {
              const p = profileSchema.safeParse(profile);
              if (!p.success) return alert("Ugyldig profil");
              calc({ profile: p.data, sessions });
            }}
          >
            {isPending ? "Beregner..." : "Beregn mål"}
          </button>
          <span className="text-xs text-[var(--color-muted)]">Kalkuler basert på dagens økter.</span>
        </div>

        {result && <ResultsPanel result={result} />}
      </section>
    </main>
  );
}

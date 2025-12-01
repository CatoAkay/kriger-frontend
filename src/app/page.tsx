"use client";
import {useState} from "react";
import {z} from "zod";
import {useMutation} from "@tanstack/react-query";
import {calculateTargets} from "@/lib/api";
import type {AthleteProfile, TrainingSession, MacroTargets} from "@/lib/types";
import type React from "react";
import Image from "next/image";
import DeleteButton from "@/components/DeleteButton";

const profileSchema = z.object({
  sex: z.enum(["male", "female"]),
  age: z.number().min(14).max(90),
  heightCm: z.number().min(120).max(220),
  weightKg: z.number().min(35).max(250),
  goal: z.enum(["cut", "maintain", "bulk"]),
  activityFactor: z.number().min(1.1).max(1.9)
});

const sessionSchema = z.object({
  type: z.enum(["strength", "endurance", "mixed", "mobility"]),
  durationMin: z.number().min(10).max(240),
  intensity: z.enum(["low", "moderate", "high"]),
  time: z.string()
});

export default function Page() {
  const [profile, setProfile] = useState<AthleteProfile>({
    sex: "male", age: 30, heightCm: 180, weightKg: 80, goal: "maintain", activityFactor: 1.5
  });
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [time, setTime] = useState("17:30");
  const [result, setResult] = useState<MacroTargets | null>(null);

  const {mutate: calc, isPending} = useMutation({
    mutationFn: calculateTargets,
    onSuccess: (data) => setResult(data)
  });

  const onSexChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setProfile((p) => ({...p, sex: e.target.value as AthleteProfile["sex"]}));
  const onGoalChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setProfile((p) => ({...p, goal: e.target.value as AthleteProfile["goal"]}));
  const onNum = (k: keyof Pick<AthleteProfile, "age" | "heightCm" | "weightKg" | "activityFactor">) =>
    (e: React.ChangeEvent<HTMLInputElement>) => setProfile((p) => ({
      ...p,
      [k]: Number(e.target.value)
    } as AthleteProfile));

  return (
    <main className="container py-8 md:py-10 space-y-8">
      <header className="space-y-2">
        <section
          className="relative w-full h-48 md:h-64 rounded-[--radius-card] overflow-hidden  flex items-center justify-center">
          <Image
            src="/kriger2.png"
            alt="Kriger"
            fill
            priority
            className="object-contain"   // <— viser hele bildet
          />
        </section>
        <div className="flex items-center gap-3">
          <span className="pill">MVP</span>
          <span className="pill">Dark</span>
        </div>
        <h1 className="h1">Kriger — Kalori & Makro kalkulator</h1>
        <p className="lead">Start med profil, legg til økter og beregn målene dine.</p>
      </header>

      {/* Profil + Økter grid */}
      <section className="grid gap-6 md:grid-cols-2">
        {/* Profil */}
        <div className="card">
          <div className="card-body space-y-4">
            <h2 className="h2">Profil</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col">
                <span className="label">Kjønn</span>
                <select className="select" value={profile.sex} onChange={onSexChange}>
                  <option value="male">Mann</option>
                  <option value="female">Kvinne</option>
                </select>
              </label>

              <label className="flex flex-col">
                <span className="label">Alder</span>
                <input className="input" type="number" value={profile.age} onChange={onNum("age")}/>
              </label>

              <label className="flex flex-col">
                <span className="label">Høyde (cm)</span>
                <input className="input" type="number" value={profile.heightCm} onChange={onNum("heightCm")}/>
              </label>

              <label className="flex flex-col">
                <span className="label">Vekt (kg)</span>
                <input className="input" type="number" value={profile.weightKg} onChange={onNum("weightKg")}/>
              </label>

              <label className="flex flex-col">
                <span className="label">Mål</span>
                <select className="select" value={profile.goal} onChange={onGoalChange}>
                  <option value="cut">Cut</option>
                  <option value="maintain">Vedlikehold</option>
                  <option value="bulk">Bulk</option>
                </select>
              </label>

              <label className="flex flex-col">
                <span className="label">Aktivitetsfaktor (jobb/NEAT)</span>
                <input className="input" type="number" step="0.05" value={profile.activityFactor}
                       onChange={onNum("activityFactor")}/>
              </label>
            </div>
          </div>
        </div>

        {/* Økter */}
        <div className="card">
          <div className="card-body space-y-4">
            <h2 className="h2">Dagens økter</h2>
            <div className="flex flex-wrap items-center gap-3">
              <select className="select field" id="type" defaultValue="strength">
                <option value="strength">Styrke</option>
                <option value="endurance">Kondisjon</option>
                <option value="mixed">Mixed</option>
                <option value="mobility">Mobility</option>
              </select>

              <input className="input field" type="number" placeholder="Varighet (min)" id="dur" defaultValue={60}/>

              <select className="select field" id="intensity" defaultValue="moderate">
                <option value="low">Lav</option>
                <option value="moderate">Moderat</option>
                <option value="high">Høy</option>
              </select>

              <input
                className="input field--time"
                type="time"
                value={time}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTime(e.target.value)}
              />

              <button
                className="btn btn--dark field--btn"
                onClick={() => {
                  const type = (document.getElementById("type") as HTMLSelectElement).value as TrainingSession["type"];
                  const durationMin = Number((document.getElementById("dur") as HTMLInputElement).value);
                  const intensity = (document.getElementById("intensity") as HTMLSelectElement).value as TrainingSession["intensity"];
                  const s = sessionSchema.safeParse({type, durationMin, intensity, time});
                  if (!s.success) {
                    alert("Ugyldig økt");
                    return;
                  }
                  setSessions((prev) => [...prev, s.data]);
                }}
              >
                Legg til økt
              </button>
            </div>
            <ul className="list text-sm">
              {sessions.length === 0 && <li className="py-3 text-[var(--color-muted)]">Ingen økter lagt til.</li>}
              {sessions.map((s, i) => (
                <li key={i} className="py-3 flex items-center justify-between">
                  <span className="text-[var(--color-foreground)]">
                    <span className="pill mr-2">{s.time}</span>
                    <span className="k">{s.type}</span> — {s.durationMin} min — {s.intensity}
                  </span>
                  <DeleteButton
                    size="sm"
                    onConfirm={() => setSessions((prev) => prev.filter((_, idx) => idx !== i))}
                    label="Fjern"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Beregn + Resultat */}
      <section className="section">
        <div className="flex items-center gap-3">
          <button
            disabled={isPending}
            className="btn btn--dark"
            data-glow="true"
            onClick={() => {
              const p = profileSchema.safeParse(profile);
              if (!p.success) {
                alert("Ugyldig profil");
                return;
              }
              calc({profile: p.data, sessions});
            }}
          >
            {isPending ? "Beregner..." : "Beregn mål"}
          </button>
          <span className="text-xs text-[var(--color-muted)]">Kalkuler basert på dagens økter.</span>
        </div>

        {result && (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="card">
              <div className="card-body space-y-3">
                <h3 className="h2">Dagsmål</h3>
                <ul className="grid grid-cols-2 gap-3 text-sm">
                  <li className="pill">Kcal <span className="k ml-2">{Math.round(result.kcal)}</span></li>
                  <li className="pill">Protein <span className="k ml-2">{Math.round(result.proteinGr)} g</span></li>
                  <li className="pill">Karbo <span className="k ml-2">{Math.round(result.carbsGr)} g</span></li>
                  <li className="pill">Fett <span className="k ml-2">{Math.round(result.fatGr)} g</span></li>
                </ul>
              </div>
            </div>

            <div className="card">
              <div className="card-body space-y-3">
                <h3 className="h2">Timing (prosent per måltid)</h3>
                <ul className="list text-sm">
                  {result.mealTiming.map((m, i) => (
                    <li key={i} className="py-3">
                      <span className="k">{m.label}</span>: Protein {m.proteinPct}% • Karb {m.carbsPct}% •
                      Fett {m.fatPct}%
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
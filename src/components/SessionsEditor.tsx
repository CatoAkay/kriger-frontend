// ============================================================================
// src/components/SessionsEditor.tsx
// ============================================================================
"use client";
import { useState } from "react";
import type { TrainingSession } from "@/lib/types";
import { sessionSchema } from "@/lib/schemas";
import DeleteButton from "@/components/DeleteButton";

type Props = {
  sessions: TrainingSession[];
  onAdd: (s: TrainingSession) => void;
  onRemove: (idx: number) => void;
};

export default function SessionsEditor({ sessions, onAdd, onRemove }: Props) {
  const [type, setType] = useState<TrainingSession["type"]>("strength");
  const [durationMin, setDuration] = useState<number>(60);
  const [intensity, setIntensity] = useState<TrainingSession["intensity"]>("moderate");
  const [time, setTime] = useState("17:30");

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <select className="select field" value={type} onChange={(e) => setType(e.target.value as any)}>
          <option value="strength">Styrke</option>
          <option value="endurance">Kondisjon</option>
          <option value="mixed">Mixed</option>
          <option value="mobility">Mobility</option>
        </select>

        <input
          className="input field"
          type="number"
          placeholder="Varighet (min)"
          value={durationMin}
          onChange={(e) => setDuration(Number(e.target.value))}
        />

        <select className="select field" value={intensity} onChange={(e) => setIntensity(e.target.value as any)}>
          <option value="low">Lav</option>
          <option value="moderate">Moderat</option>
          <option value="high">Høy</option>
        </select>

        <input className="input field--time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />

        <button
          className="btn btn--dark field--btn"
          onClick={() => {
            const parsed = sessionSchema.safeParse({ type, durationMin, intensity, time });
            if (!parsed.success) return alert("Ugyldig økt");
            onAdd(parsed.data);
          }}
        >
          Legg til økt
        </button>
      </div>

      <ul className="list text-sm">
        {sessions.length === 0 && <li className="py-3 text-[var(--color-muted)]">Ingen økter lagt til.</li>}
        {sessions.map((s, i) => (
          <li key={`${s.type}-${s.time}-${i}`} className="py-3 flex items-center justify-between">
            <span className="text-[var(--color-foreground)]">
              <span className="pill mr-2">{s.time}</span>
              <span className="k">{s.type}</span> — {s.durationMin} min — {s.intensity}
            </span>
            <DeleteButton size="sm" onConfirm={() => onRemove(i)} label="Fjern" />
          </li>
        ))}
      </ul>
    </>
  );
}

// ============================================================================
// src/components/ProfileForm.tsx
// ============================================================================
"use client";
import type { AthleteProfile } from "@/lib/types";
import type React from "react";

type Props = {
  profile: AthleteProfile;
  onChange: (next: AthleteProfile) => void;
};

export default function ProfileForm({ profile, onChange }: Props) {
  const onNum =
    (k: keyof Pick<AthleteProfile, "age" | "heightCm" | "weightKg" | "activityFactor">) =>
      (e: React.ChangeEvent<HTMLInputElement>) =>
        onChange({ ...profile, [k]: Number(e.target.value) } as AthleteProfile);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <label className="flex flex-col">
        <span className="label">Kjønn</span>
        <select
          className="select"
          value={profile.sex}
          onChange={(e) => onChange({ ...profile, sex: e.target.value as AthleteProfile["sex"] })}
        >
          <option value="male">Mann</option>
          <option value="female">Kvinne</option>
        </select>
      </label>

      <label className="flex flex-col">
        <span className="label">Alder</span>
        <input className="input" type="number" value={profile.age} onChange={onNum("age")} />
      </label>

      <label className="flex flex-col">
        <span className="label">Høyde (cm)</span>
        <input className="input" type="number" value={profile.heightCm} onChange={onNum("heightCm")} />
      </label>

      <label className="flex flex-col">
        <span className="label">Vekt (kg)</span>
        <input className="input" type="number" value={profile.weightKg} onChange={onNum("weightKg")} />
      </label>

      <label className="flex flex-col">
        <span className="label">Mål</span>
        <select
          className="select"
          value={profile.goal}
          onChange={(e) => onChange({ ...profile, goal: e.target.value as AthleteProfile["goal"] })}
        >
          <option value="cut">Cut</option>
          <option value="maintain">Vedlikehold</option>
          <option value="bulk">Bulk</option>
        </select>
      </label>

      <label className="flex flex-col">
        <span className="label">Aktivitetsfaktor (jobb/NEAT)</span>
        <input
          className="input"
          type="number"
          step="0.05"
          value={profile.activityFactor}
          onChange={onNum("activityFactor")}
        />
      </label>
    </div>
  );
}

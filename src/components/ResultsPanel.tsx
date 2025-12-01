// ============================================================================
// src/components/ResultsPanel.tsx
// ============================================================================
import type { MacroTargets } from "@/lib/types";

export default function ResultsPanel({ result }: { result: MacroTargets }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="card">
        <div className="card-body space-y-3">
          <h3 className="h2">Dagsmål</h3>
          <ul className="grid grid-cols-2 gap-3 text-sm">
            <li className="pill">
              Kcal <span className="k ml-2">{Math.round(result.kcal)}</span>
            </li>
            <li className="pill">
              Protein <span className="k ml-2">{Math.round(result.proteinGr)} g</span>
            </li>
            <li className="pill">
              Karbo <span className="k ml-2">{Math.round(result.carbsGr)} g</span>
            </li>
            <li className="pill">
              Fett <span className="k ml-2">{Math.round(result.fatGr)} g</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="card">
        <div className="card-body space-y-3">
          <h3 className="h2">Timing (prosent per måltid)</h3>
          <ul className="list text-sm">
            {result.mealTiming.map((m, i) => (
              <li key={i} className="py-3">
                <span className="k">{m.label}</span>: Protein {m.proteinPct}% • Karb {m.carbsPct}% • Fett {m.fatPct}%
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

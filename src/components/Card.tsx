// ============================================================================
// src/components/Card.tsx
// ============================================================================
import type { ReactNode } from "react";

export default function Card({
                               title,
                               children,
                               className = "",
                             }: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`card ${className}`}>
      <div className="card-body space-y-4">
        {title ? <h2 className="h2">{title}</h2> : null}
        {children}
      </div>
    </div>
  );
}

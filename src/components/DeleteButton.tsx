// =============================
// src/components/DeleteButton.tsx
// =============================
"use client";

type Props = {
  onConfirm: () => void;
  size?: "sm" | "md";
  label?: string; // valgfritt tekst ved siden av ikon
};

function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M4 7h16M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export default function DeleteButton({ onConfirm, size = "md", label }: Props) {
  const cls = `btn--danger ${size === "sm" ? "sm" : ""}`;
  return (
    <button
      type="button"
      className={cls}
      onClick={() => {
        if (confirm("Fjerne denne økten?")) onConfirm();
      }}
      title="Fjern"
    >
      <TrashIcon width={18} height={18} />
      {label ? <span>{label}</span> : null}
    </button>
  );
}

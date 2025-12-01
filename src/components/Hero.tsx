// ============================================================================
// src/components/Hero.tsx
// ============================================================================
"use client";
import Image from "next/image";

export default function Hero({
                               src = "/kriger2.png",
                               alt = "Kriger",
                               className = "",
                             }: {
  src?: string;
  alt?: string;
  className?: string;
}) {
  return (
    <section className={`relative w-full h-48 md:h-64 rounded-[--radius-card] overflow-hidden flex items-center justify-center ${className}`}>
      <Image src={src} alt={alt} fill priority className="object-contain" />
    </section>
  );
}

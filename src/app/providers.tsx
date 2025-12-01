// src/app/providers.tsx
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient()); // 1 app-instans
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

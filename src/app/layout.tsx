// src/app/layout.tsx
import "./globals.css";
import Providers from "./providers";

export const metadata = { title: "Kriger", description: "Kalori & Makro kalkulator" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no" className="dark">
    <body className="min-h-dvh bg-background text-foreground antialiased">
    <Providers>{children}</Providers>
    </body>
    </html>
  );
}

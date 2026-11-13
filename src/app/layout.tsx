import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PrimaryNavigation } from "@/components/primary-navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Calorie & Macro Tracker",
    template: "%s | Calorie & Macro Tracker",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-border bg-card">
          <div className="mx-auto max-w-3xl px-4 pt-5 sm:px-6">
            <p className="mb-3 text-sm font-semibold">Calorie &amp; Macro Tracker</p>
            <PrimaryNavigation />
          </div>
        </header>
        <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
          {children}
        </main>
      </body>
    </html>
  );
}

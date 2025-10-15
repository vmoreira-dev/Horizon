"use client";

import ThemeToggle from "@/components/theme-toggle";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-gradient-to-b from-neutral-50 to-white text-neutral-900 dark:from-neutral-950 dark:to-neutral-950 dark:text-neutral-50">
      {/* Frame */}
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {/* Header */}
        <header className="sticky top-0 z-10 -mx-1 flex items-center justify-between gap-4 border-b border-neutral-200/70 bg-white/70 px-1 py-4 backdrop-blur-md dark:border-neutral-800/70 dark:bg-neutral-950/60">
          <h1 className="text-base font-semibold tracking-tight">
            why Horizon 
          </h1>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </header>

        {/* Main */}
        <main className="py-8 md:py-10">
          <div className="space-y-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

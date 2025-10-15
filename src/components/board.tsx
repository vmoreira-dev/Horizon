"use client";

import { useState } from "react";

type Card = { id: string; title: string; };
type Column = { id: string; name: string; cards: Card[] };

const seed: Column[] = [
  {
    id: "todo",
    name: "To Do",
    cards: [
      { id: "c1", title: "Set up Auth" },
      { id: "c2", title: "Design Task schema" },
    ],
  },
  {
    id: "doing",
    name: "In Progress",
    cards: [{ id: "c3", title: "Board UI scaffold" }],
  },
  {
    id: "done",
    name: "Done",
    cards: [{ id: "c4", title: "Next.js boilerplate" }],
  },
];

export default function Board() {
  const [columns] = useState<Column[]>(seed);

  return (
    <div className="relative">
      {/* soft background grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.06)_1px,transparent_1px)] [background-size:24px_24px] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_1px)]"
      />
      <div className="relative flex gap-5 overflow-x-auto pb-4">
        {columns.map((col) => (
          <div
            key={col.id}
            className="w-80 shrink-0 rounded-2xl border border-neutral-200/70 bg-white/80 p-4 shadow-sm backdrop-blur-sm transition-colors hover:border-neutral-300 dark:border-neutral-800/70 dark:bg-neutral-900/70 dark:hover:border-neutral-700"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold tracking-tight">{col.name}</h3>
              <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
                {col.cards.length}
              </span>
            </div>

            <div className="space-y-3">
              {col.cards.map((card) => (
                <button
                  key={card.id}
                  className="group w-full rounded-xl border border-neutral-200 bg-white p-3 text-left text-sm shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-black/10 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-850 dark:focus:ring-white/10"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{card.title}</span>
                    <span className="opacity-0 transition-opacity group-hover:opacity-100 text-neutral-400 dark:text-neutral-500">
                      ↗
                    </span>
                  </div>
                  <div className="mt-2 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent dark:via-neutral-800" />
                  <div className="mt-2 flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                    <span className="inline-flex rounded-md border px-1.5 py-0.5 leading-none dark:border-neutral-700">
                      task
                    </span>
                    <span>•</span>
                    <span className="truncate">no description</span>
                  </div>
                </button>
              ))}

              {/* empty-state pad for columns with no cards */}
              {col.cards.length === 0 && (
                <div className="rounded-xl border border-dashed border-neutral-300/70 p-6 text-center text-sm text-neutral-500 dark:border-neutral-700/70 dark:text-neutral-400">
                  Drop tasks here
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

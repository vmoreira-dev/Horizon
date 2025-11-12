"use client";

import { useEffect, useState } from "react";
import TaskColumn from "./TaskColumn";

type Status = "TODO" | "IN_PROGRESS" | "COMPLETED";

interface Task {
  id: string;
  title: string;
  status: Status;
  createdAt: string;
}

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch("/api/tasks", { cache: "no-store" });
        const data = await res.json();
        setTasks(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  const todo = tasks.filter((t) => t.status === "TODO");
  const inProgress = tasks.filter((t) => t.status === "IN_PROGRESS");
  const completed = tasks.filter((t) => t.status === "COMPLETED");

  return (
    <main className="min-h-screen grid place-items-center">
      {/* GLASS PANEL (one slab) */}
      <section className="horizon-panel relative w-[980px] max-w-[92vw] rounded-2xl border border-white/10 bg-white/10 backdrop-blur-3xl shadow-[0_30px_120px_rgba(0,0,0,0.60)]">
      {/* overlays */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent via-black/10 to-black/40" />
        <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_2px_40px_rgba(255,255,255,0.05)] ring-1 ring-white/10" />
        
        
        {/* CONTENT */}
        <div className="px-12 py-9">
          {/* top row: title + login */}
          <div className="flex items-center justify-between">
            <h1 className="text-white font-bold tracking-tight leading-none text-[64px]">
              Horizon
            </h1>
            <button className="text-sm text-gray-300 hover:text-white transition">Log in</button>
          </div>

          {/* subhead */}
          <p className="mt-2 text-sm text-gray-300">
            Task management dashboard with secure authentication and an adaptive UI.
          </p>

          {/* columns */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-3 text-center text-gray-400">Loading tasks…</div>
            ) : (
              <>
                <TaskColumn title="To Do" tasks={todo} />
                <TaskColumn title="In Progress" tasks={inProgress} />
                <TaskColumn title="Completed" tasks={completed} />
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

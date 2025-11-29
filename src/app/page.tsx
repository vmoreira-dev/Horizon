"use client";

import { useTasks } from "@/hooks/useTasks";
import { Status } from "@prisma/client";
import { useState } from "react";

export default function Home() {
  const { tasks, loading, createTask, moveTask, deleteTask } = useTasks();
  const [newTask, setNewTask] = useState("");

  const todo = tasks.filter((t) => t.status === Status.TODO);
  const inProgress = tasks.filter((t) => t.status === Status.IN_PROGRESS);
  const completed = tasks.filter((t) => t.status === Status.COMPLETED);

  const columns = [
    { title: "To Do", tasks: todo },
    { title: "In Progress", tasks: inProgress },
    { title: "Completed", tasks: completed },
  ];

  return (
    <main className="glass-container text-center space-y-10 animate-fadeInUp">
      {/* Header */}
      <div className="relative text-center space-y-3">
        <h1 className="text-7xl font-bold tracking-tight text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.3)]">
          Horizon
        </h1>

        <p className="text-white/70 text-lg font-light max-w-xl mx-auto">
          Task management dashboard with adaptive UI.
        </p>

        
      </div>

      {/* Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {columns.map((col) => (
          <div
            key={col.title}
            className={`space-y-6 ${
              col.title === "In Progress"
                ? "scale-[1.01] brightness-110"
                : "brightness-95"
            }`}
          >
            <h2 className="text-lg font-semibold mb-2 text-white">
              {col.title}
            </h2>

            {loading ? (
              <p className="text-sm text-white/40">Loading…</p>
            ) : col.tasks.length > 0 ? (
              <div className="space-y-10">
                {col.tasks.map((task) => (
                  <div key={task.id} className="relative group flex flex-col items-center">

                    {/* CARD */}
                    <div className="glass-card task-card p-4 rounded-xl text-left shadow-[0_4px_10px_rgba(0,0,0,0.20)] w-full">
                      <h3 className="font-medium text-white break-words">
                        {task.title}
                      </h3>
                      <p className="text-xs text-white/60">
                        Created: {new Date(task.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* BUTTON FLOAT — CLEAN + SPACED */}
                    <div
                      className="
                        absolute 
                        -bottom-6 
                        flex gap-3 
                        opacity-0 
                        group-hover:opacity-100 
                        transition-opacity 
                        duration-200
                        pointer-events-auto
                      "
                    >
                      {/* BACK */}
                      {col.title !== "To Do" && (
                        <button
                          className="
                            px-2 py-[4px] text-[11px]
                            bg-slate-500/40 
                            border border-slate-300/40 
                            rounded-full 
                            hover:bg-slate-500/60 
                            text-white 
                            backdrop-blur-md
                            shadow-[0_2px_6px_rgba(0,0,0,0.25)]
                          "
                          onClick={() => {
                            const prev =
                              col.title === "In Progress"
                                ? Status.TODO
                                : Status.IN_PROGRESS;
                            moveTask(task.id, prev);
                          }}
                        >
                          ←
                        </button>
                      )}

                      {/* MOVE */}
                      {col.title !== "Completed" && (
                        <button
                          className="
                            px-2 py-[4px] text-[11px]
                            bg-emerald-500/40 
                            border border-emerald-300/40 
                            rounded-full 
                            hover:bg-emerald-500/60 
                            text-white 
                            backdrop-blur-md
                            shadow-[0_2px_6px_rgba(0,0,0,0.25)]
                          "
                          onClick={() => {
                            const next =
                              col.title === "To Do"
                                ? Status.IN_PROGRESS
                                : Status.COMPLETED;
                            moveTask(task.id, next);
                          }}
                        >
                          →
                        </button>
                      )}

                      {/* DELETE */}
                      <button
                        className="
                          px-2 py-[4px] text-[11px]
                          bg-red-500/40 
                          border border-red-300/40 
                          rounded-full 
                          hover:bg-red-500/60 
                          text-white 
                          backdrop-blur-md
                          shadow-[0_2px_6px_rgba(0,0,0,0.25)]
                        "
                        onClick={() => deleteTask(task.id)}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-white/40">No tasks yet.</p>
            )}

            {/* Add task */}
            {col.title === "To Do" && (
              <div className="w-full flex gap-2 mt-6">
                <input
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && newTask.trim() !== "") {
                      createTask(newTask.trim());
                      setNewTask("");
                    }
                  }}
                  placeholder="Add a new task..."
                  className="flex-1 px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
                />

                <button
                  onClick={() => {
                    if (newTask.trim() !== "") {
                      createTask(newTask.trim());
                      setNewTask("");
                    }
                  }}
                  className="px-3 py-2 text-sm rounded-lg bg-emerald-500/30 border border-emerald-400/40 text-white hover:bg-emerald-500/40"
                >
                  Add
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}

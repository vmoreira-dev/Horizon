"use client";

import { useTasks } from "@/hooks/useTasks";
import { Status } from "@prisma/client";
import { useState } from "react";

export default function Home() {
  const { tasks, loading, createTask, moveTask, deleteTask } = useTasks();
  const [newTask, setNewTask] = useState("");

  // Filter tasks into columns
  const todo = tasks.filter((t) => t.status === Status.TODO);
  const inProgress = tasks.filter((t) => t.status === Status.IN_PROGRESS);
  const completed = tasks.filter((t) => t.status === Status.COMPLETED);

  // Column definitions now based on REAL tasks
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
          Task management dashboard with secure authentication and an adaptive UI.
        </p>

        <button className="text-sm text-white/70 hover:text-white absolute right-12 top-0">
          Log in
        </button>
      </div>

      {/* Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {columns.map((col) => (
          <div
            key={col.title}
            className={`space-y-4 ${
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
              <div className="space-y-4">
                {col.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="glass-card task-card text-left p-4 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-medium text-white">{task.title}</h3>
                      <p className="text-xs text-white/60">
                        Created: {new Date(task.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* ACTIONS (FULL BACK + FORWARD + DELETE) */}
                    <div className="flex gap-2">

                      {/* BACK button */}
                      {col.title !== "To Do" && (
                        <button
                          className="px-2 py-1 text-xs bg-slate-500/20 border border-slate-400/40 rounded-lg hover:bg-slate-500/30 text-white"
                          onClick={() => {
                            const prev =
                              col.title === "In Progress"
                                ? Status.TODO
                                : Status.IN_PROGRESS;
                            moveTask(task.id, prev);
                          }}
                        >
                          Back
                        </button>
                      )}

                      {/* MOVE FORWARD button */}
                      {col.title !== "Completed" && (
                        <button
                          className="px-2 py-1 text-xs bg-emerald-500/20 border border-emerald-400/40 rounded-lg hover:bg-emerald-500/30 text-white"
                          onClick={() => {
                            const next =
                              col.title === "To Do"
                                ? Status.IN_PROGRESS
                                : Status.COMPLETED;
                            moveTask(task.id, next);
                          }}
                        >
                          Move
                        </button>
                      )}

                      {/* DELETE button */}
                      <button
                        className="px-2 py-1 text-xs bg-red-500/20 border border-red-400/40 rounded-lg hover:bg-red-500/30 text-white"
                        onClick={() => deleteTask(task.id)}
                      >
                        Delete
                      </button>

                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-white/40">No tasks yet.</p>
            )}

            {/* Inline Add Task Input */}
            {col.title === "To Do" && (
              <div className="w-full flex gap-2">
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

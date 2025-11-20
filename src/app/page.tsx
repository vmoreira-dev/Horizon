"use client";

import { useTasks } from "@/hooks/useTasks";
import { Status } from "@prisma/client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  // ALWAYS call hooks FIRST
  const { data: session } = useSession();
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

  // LOGIN SCREEN
  if (!session) {
    return (
      <main className="glass-container text-center py-20">
        <h1 className="text-7xl font-bold text-white mb-6">Horizon</h1>
        <button
          className="px-4 py-2 bg-white/20 rounded-md hover:bg-white/30 text-white"
          onClick={() => signIn("github")}
        >
          Log in with GitHub
        </button>
      </main>
    );
  }

  // LOGGED-IN SCREEN
  return (
    <main className="glass-container text-center space-y-10 animate-fadeInUp">
      <div className="relative text-center space-y-3">
        <h1 className="text-7xl font-bold text-white">Horizon</h1>

        <button
          className="text-sm text-white/70 hover:text-white absolute right-12 top-0"
          onClick={() => signOut()}
        >
          Log out
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {columns.map((col) => (
          <div key={col.title} className="space-y-4">
            <h2 className="text-lg font-semibold text-white">{col.title}</h2>

            {loading ? (
              <p className="text-sm text-white/40">Loading…</p>
            ) : col.tasks.length > 0 ? (
              <div className="space-y-4">
                {col.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="glass-card p-4 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-medium text-white">{task.title}</h3>
                      <p className="text-xs text-white/60">
                        Created: {new Date(task.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      {col.title !== "To Do" && (
                        <button
                          className="px-2 py-1 text-xs bg-slate-500/20 rounded-lg text-white"
                          onClick={() =>
                            moveTask(
                              task.id,
                              col.title === "In Progress"
                                ? Status.TODO
                                : Status.IN_PROGRESS
                            )
                          }
                        >
                          Back
                        </button>
                      )}

                      {col.title !== "Completed" && (
                        <button
                          className="px-2 py-1 text-xs bg-emerald-500/20 rounded-lg text-white"
                          onClick={() =>
                            moveTask(
                              task.id,
                              col.title === "To Do"
                                ? Status.IN_PROGRESS
                                : Status.COMPLETED
                            )
                          }
                        >
                          Move
                        </button>
                      )}

                      <button
                        className="px-2 py-1 text-xs bg-red-500/20 rounded-lg text-white"
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

            {col.title === "To Do" && (
              <div className="w-full flex gap-2">
                <input
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Add a new task..."
                  className="flex-1 px-3 py-2 bg-white/10 rounded-lg text-white"
                />
                <button
                  onClick={() => {
                    if (newTask.trim()) {
                      createTask(newTask.trim());
                      setNewTask("");
                    }
                  }}
                  className="px-3 py-2 bg-emerald-500/30 rounded-lg text-white"
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

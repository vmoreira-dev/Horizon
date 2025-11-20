"use client";

import { useState, useEffect } from "react";
import { Status, Task } from "@prisma/client";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function createTask(title: string) {
    const res = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ title })
    });

    const task = await res.json();
    setTasks((prev) => [...prev, task]);
  }

  async function updateTask(id: string, changes: Partial<Task>) {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify(changes)
    });

    const updated = await res.json();
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  }

  async function moveTask(id: string, status: Status) {
    return updateTask(id, { status });
  }

  async function deleteTask(id: string) {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return { tasks, loading, createTask, updateTask, moveTask, deleteTask };
}

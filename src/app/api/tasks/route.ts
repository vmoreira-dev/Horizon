import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET — Fetch all tasks
export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(tasks);
  } catch (err) {
    console.error("GET /tasks error:", err);
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

// POST — Create new task
export async function POST(req: Request) {
  try {
    const { title, status } = await req.json();
    const task = await prisma.task.create({
      data: { title, status },
    });
    return NextResponse.json(task);
  } catch (err) {
    console.error("POST /tasks error:", err);
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}

// PATCH — Update task status
export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();
    const task = await prisma.task.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json(task);
  } catch (err) {
    console.error("PATCH /tasks error:", err);
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}

// DELETE — Delete a task
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.task.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /tasks error:", err);
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
  }
}

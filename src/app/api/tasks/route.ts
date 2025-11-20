import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Status } from "@prisma/client";

export async function GET() {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: "asc" }
  });
  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  const { title } = await req.json();

  if (!title) {
    return NextResponse.json({ error: "Title required" }, { status: 400 });
  }

  const task = await prisma.task.create({
    data: {
      title,
      status: Status.TODO
    }
  });

  return NextResponse.json(task, { status: 201 });
}

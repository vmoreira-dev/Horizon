import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request, context: any) {
  const { id } = await context.params;  // ← THIS is what Next.js wants

  const data = await req.json();

  const updated = await prisma.task.update({
    where: { id },
    data,
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: Request, context: any) {
  const { id } = await context.params;  // ← same rule

  await prisma.task.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}

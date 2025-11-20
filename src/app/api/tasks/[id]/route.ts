import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function PATCH(req: Request, { params }: any) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  const body = await req.json();

  const updated = await prisma.task.update({
    where: { id },
    data: body,
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: any) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;

  await prisma.task.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}

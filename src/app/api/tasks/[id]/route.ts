import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Context {
  params: {
    id: string;
  };
}

export async function PATCH(req: Request, { params }: Context) {
  const { id } = params;

  const data = await req.json();

  const updated = await prisma.task.update({
    where: { id },
    data,
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: Context) {
  const { id } = params;

  await prisma.task.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}

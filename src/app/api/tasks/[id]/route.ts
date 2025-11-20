import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Status } from "@prisma/client";

export async function PATCH(req: Request, { params }: any) {
  const { id } = params;
  const body = await req.json();
  const { title, status } = body;

  const updated = await prisma.task.update({
    where: { id },
    data: {
      ...(title && { title }),
      ...(status && Status[status] && { status })
    }
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: any) {
  const { id } = params;

  await prisma.task.delete({
    where: { id }
  });

  return NextResponse.json({ success: true });
}

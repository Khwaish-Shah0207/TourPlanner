import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const data: { title?: string; date?: Date } = {};
  if (body.title !== undefined) data.title = body.title;
  if (body.date !== undefined) data.date = new Date(body.date);

  const task = await prisma.task.update({ where: { id }, data });
  return NextResponse.json(task);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.task.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

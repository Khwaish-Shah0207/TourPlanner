import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { taskSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = taskSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { title, date, tripId } = parsed.data;
  const task = await prisma.task.create({
    data: { title, date: new Date(date), tripId },
  });

  return NextResponse.json(task, { status: 201 });
}

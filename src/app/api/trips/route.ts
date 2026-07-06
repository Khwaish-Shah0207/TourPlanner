import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const trips = await prisma.trip.findMany({
    include: { tasks: { orderBy: { date: "asc" } } },
  });
  return NextResponse.json(trips);
}

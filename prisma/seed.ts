import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function day(base: Date, offset: number) {
  const d = new Date(base);
  d.setDate(d.getDate() + offset);
  return d;
}

async function main() {
  await prisma.task.deleteMany();
  await prisma.trip.deleteMany();

  const kashmirStart = new Date();
  kashmirStart.setHours(0, 0, 0, 0);
  kashmirStart.setDate(kashmirStart.getDate() + 14);

  await prisma.trip.create({
    data: {
      name: "Kashmir",
      color: "#072e68",
      tasks: {
        create: [
          { title: "Arrive in Srinagar", date: day(kashmirStart, 0) },
          { title: "Shikara ride on Dal Lake", date: day(kashmirStart, 0) },
          { title: "Mughal Gardens", date: day(kashmirStart, 1) },
          { title: "Gulmarg Gondola ride", date: day(kashmirStart, 2) },
          { title: "Betaab Valley", date: day(kashmirStart, 3) },
          { title: "Departure", date: day(kashmirStart, 4) },
        ],
      },
    },
  });

  const keralaStart = new Date();
  keralaStart.setHours(0, 0, 0, 0);
  keralaStart.setDate(keralaStart.getDate() + 15);

  await prisma.trip.create({
    data: {
      name: "Kerala",
      color: "#36083e",
      tasks: {
        create: [
          { title: "Arrive in Kochi", date: day(keralaStart, 0) },
          { title: "Fort Kochi walk", date: day(keralaStart, 0) },
          { title: "Munnar tea gardens", date: day(keralaStart, 1) },
          { title: "Mattupetty Dam", date: day(keralaStart, 2) },
          { title: "Alleppey houseboat", date: day(keralaStart, 3) },
          { title: "Departure", date: day(keralaStart, 4) },
        ],
      },
    },
  });

  console.log("Seeded Kashmir and Kerala trips.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

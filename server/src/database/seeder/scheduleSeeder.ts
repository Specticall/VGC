import { PrismaClient } from "@prisma/client";
import { autoScheduler } from "../../utils";

const prisma = new PrismaClient();

export const scheduleSeeder = async () => {
  console.log("Seeding schedules...");

  const movies = await prisma.movie.findMany({
    where: {
      Status: "NOW_SHOWING",
    },
    select: {
      MovieId: true,
      DurationMinutes: true,
    },
  });

  const rooms = await prisma.room.findMany({
    select: {
      RoomId: true,
    },
  });

  const schedulesData = autoScheduler(movies, rooms, 3);
  
  await prisma.schedule.createMany({
    data: schedulesData,
  });

  console.log(`Successfully seeded ${schedulesData.length} schedules.`);
};

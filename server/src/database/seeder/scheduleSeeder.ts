import { PrismaClient } from "@prisma/client";
import { roundTimeDownToNearest5, shuffleArray } from "../../utils/helper";

const prisma = new PrismaClient();

export default async function scheduleSeeder() {
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

  if (movies.length === 0 || rooms.length === 0) {
    console.log("No movies or rooms available for schedule seeding.");
    return;
  }

  const schedulesData = [];
  const startOfDay = new Date();
  startOfDay.setHours(11, 0, 0, 0);

  const endDate = new Date(startOfDay);
  endDate.setDate(endDate.getDate() + 3);

  for (const room of rooms) {
    let currentTime = new Date(startOfDay);

    while (currentTime < endDate) {
      const shuffledMovies = shuffleArray([...movies]);

      for (const movie of shuffledMovies) {
        const movieEndTime = new Date(currentTime.getTime() + movie.DurationMinutes * 60 * 1000 + 30 * 60 * 1000);
        if (
          currentTime.getHours() < 11 || 
          movieEndTime.getHours() >= 23 || 
          movieEndTime > endDate 
        ) {
          currentTime.setDate(currentTime.getDate() + 1); 
          currentTime.setHours(11, 0, 0, 0); 
          break; 
        }

        schedulesData.push({
          StartDate: new Date(startOfDay),
          EndDate: new Date(endDate),
          StartTime: roundTimeDownToNearest5(new Date(currentTime)),
          EndTime: new Date(movieEndTime),
          RoomId: room.RoomId,
          MovieId: movie.MovieId,
        });
        currentTime = new Date(movieEndTime.getTime()); 
      }
    }
  }

  await prisma.schedule.createMany({
    data: schedulesData,
  });

  console.log(`Successfully seeded ${schedulesData.length} schedules.`);
}
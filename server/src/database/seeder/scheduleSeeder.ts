import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function createSchedules(
  movieId: number, 
  runtime: number, 
  roomId: string
) {
  const movieDuration = runtime; 
  const operatingHoursStart = 10; 
  const operatingHoursEnd = 22; 
  const intervalBetweenMovies = 15;

  let scheduleStartTime = operatingHoursStart * 60;
  const schedules = [];
  while (scheduleStartTime + movieDuration <= operatingHoursEnd * 60) {
    const currentDate = new Date(Date.now());
    const hours = Math.floor(scheduleStartTime / 60); 
    const minutes = scheduleStartTime % 60;
    currentDate.setHours(hours, minutes, 0, 0); 

    const schedule = {
      Date: currentDate, 
      StartTime: currentDate,
      Price: Math.floor(Math.random() * 100000) + 50000,
      RoomId: roomId,
      MovieId: movieId.toString(),
    };
    schedules.push(schedule);
    scheduleStartTime += movieDuration + intervalBetweenMovies;
  }

  await prisma.schedule.createMany({
    data: schedules,
  });
}

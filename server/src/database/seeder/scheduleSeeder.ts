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

    let endDate = new Date();
    const rawEndTime = new Date(currentDate.getTime() + movieDuration * 60 * 1000);
    const h = rawEndTime.getHours();
    const m = rawEndTime.getMinutes();

    const roundedMinutes = Math.ceil(m / 15) * 15;
    if (roundedMinutes >= 60) {
      endDate = new Date(rawEndTime.setHours(h + 1, 0, 0, 0));
    }

    endDate = new Date(rawEndTime.setMinutes(roundedMinutes, 0, 0));

    const schedule = {
      StartDate: currentDate,
      EndDate: new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000),
      StartTime: currentDate,
      EndTime: endDate,
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

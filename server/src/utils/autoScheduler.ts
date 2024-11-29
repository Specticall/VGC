import { roundTimeDownToNearest5, shuffleArray } from "./helper";

export const autoScheduler = (
  movies: { MovieId: string; DurationMinutes: number }[],
  rooms: { RoomId: string }[],
  range: number
) => {
  console.log("Scheduling movies...");

  if (movies.length === 0 || rooms.length === 0) {
    console.log("No movies or rooms available for scheduling.");
    return [];
  }
  
  const schedulesData = [];
  const startOfDay = new Date();
  startOfDay.setHours(11, 0, 0, 0);

  const endDate = new Date(startOfDay);
  endDate.setDate(endDate.getDate() + range);

  for (const room of rooms) {
    let currentTime = new Date(startOfDay);

    while (currentTime < endDate) {
      const shuffledMovies = shuffleArray([...movies]);

      for (const movie of shuffledMovies) {
        const movieEndTime = new Date(
          currentTime.getTime() +
            movie.DurationMinutes * 60 * 1000 +
            30 * 60 * 1000
        );
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
          StartTime: roundTimeDownToNearest5(new Date(currentTime)),
          EndTime: roundTimeDownToNearest5(new Date(movieEndTime)),
          RoomId: room.RoomId,
          MovieId: movie.MovieId,
        });
        currentTime = new Date(movieEndTime.getTime());
      }
    }
  }

  return schedulesData;
};

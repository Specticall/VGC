import useSchedulesQuery from "@/hooks/queries/useSchedulesQuery";
import Badge from "../ui/Badge";
import Table from "../ui/Table";
import { formatDate, isBetweenDate } from "@/lib/utils";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";

export default function AiringMoviesList() {
  const navigate = useNavigate();
  const {
    scheduleData,
    schedulesQuery: { isLoading },
  } = useSchedulesQuery();

  return (
    <div className="p-6 bg-primary border-t border-border">
      <h2 className="text-2xl mb-6">Airing Movies</h2>
      <Table.Root cols="minmax(24rem,1.5fr) minmax(12rem,0.5fr) minmax(24rem,1fr) repeat(2,minmax(6rem,0.5fr))">
        <Table.Head>
          <li>Movie Details</li>
          <li>Status</li>
          <li>Air Date</li>
          <li>Room</li>
          <li>Reservations</li>
        </Table.Head>
        {isLoading &&
          new Array(10).fill("x").map((_, i) => {
            return (
              <Table.Body key={i}>
                <div className="flex items-center w-full gap-8">
                  <Skeleton className="h-20 aspect-square" />
                  <div className="flex-1 flex flex-col gap-1">
                    <Skeleton containerClassName="flex-1" />
                    <Skeleton containerClassName="flex-1" />
                  </div>
                </div>
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </Table.Body>
            );
          })}
        {scheduleData?.map((schedule, i) => {
          return (
            <Table.Body
              key={i}
              className="hover:bg-secondary/50 transition cursor-pointer"
              onClick={() => navigate(`/schedule-form/${schedule.MovieId}`)}
            >
              <li className="flex items-center gap-8">
                <img
                  src={schedule.movie.Poster}
                  className="object-cover bg-border h-20 aspect-square rounded-md"
                ></img>
                <div className="overflow-hidden">
                  <h2 className="truncate">{schedule.movie.Title}</h2>
                  <p className="text-light truncate">
                    {schedule.movie.Tagline}
                  </p>
                </div>
              </li>
              {isBetweenDate(schedule.StartDate, schedule.EndDate) ? (
                <Badge variant={"green"}>Airing</Badge>
              ) : (
                <Badge variant={"red"}>Upcoming</Badge>
              )}
              <li className="flex gap-2 text-light">
                {formatDate(schedule.StartDate)} -{" "}
                {formatDate(schedule.EndDate)}
              </li>
              <li className="text-light">{schedule.room.Name}</li>
              <li className="text-light">{schedule._count.reservations}</li>
            </Table.Body>
          );
        })}
      </Table.Root>
    </div>
  );
}

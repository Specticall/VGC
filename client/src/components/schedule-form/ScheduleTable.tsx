import useMovieScheduleQuery from "@/hooks/queries/useMovieScheduleQuery";
import Badge from "../ui/Badge";
import Table from "../ui/Table";
import { formatDate, formatTime, isBetweenDate } from "@/lib/utils";
import Skeleton from "react-loading-skeleton";

type Props = {
  movieId?: string;
};

export default function ScheduleTable({ movieId }: Props) {
  const {
    movieScheduleData,
    movieScheduleQuery: { isLoading },
  } = useMovieScheduleQuery({ id: movieId });

  console.log(movieScheduleData);

  return (
    <div className="mt-6 rounded-md border border-border bg-primary border-md">
      <div className="p-6 pb-0">
        <p className="text-lg text-white border-border pb-4 border-b">
          Added Schedules (3)
        </p>
      </div>
      <div className="p-6">
        <Table.Root cols="minmax(20rem,1fr) minmax(8rem,0.5fr) minmax(16rem,1fr) minmax(16rem,1fr) minmax(24rem,1.5fr) minmax(8rem,0.5fr)">
          <Table.Head>
            <li>Cinema</li>
            <li>Room</li>
            <li>Status</li>
            <li>Time</li>
            <li>Date</li>
            <li>Seats Sold</li>
          </Table.Head>
          {isLoading &&
            new Array(10).fill("x").map((_, i) => {
              return (
                <Table.Body key={i}>
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                </Table.Body>
              );
            })}
          {movieScheduleData?.map((schedule) => {
            console.log(schedule);
            return (
              <Table.Body key={schedule.ScheduleId} className="text-light">
                <li>{schedule.room.cinema.Name}</li>
                <li>{schedule.room.Name}</li>
                {new Date(schedule.StartTime).getTime() > Date.now() && (
                  <Badge variant={"red"}>Upcoming</Badge>
                )}
                {isBetweenDate(schedule.StartTime, schedule.EndTime) && (
                  <Badge variant={"green"}>Airing</Badge>
                )}
                {new Date(schedule.StartTime).getTime() < Date.now() && (
                  <Badge variant={"gray"}>Aired</Badge>
                )}
                <li>
                  {formatTime(schedule.StartTime)} -{" "}
                  {formatTime(schedule.EndTime)}
                </li>
                <li className="flex gap-2 text-light">
                  {formatDate(schedule.StartTime)}
                </li>
                <li>{schedule._count.reservations}</li>
              </Table.Body>
            );
          })}
        </Table.Root>
      </div>
    </div>
  );
}

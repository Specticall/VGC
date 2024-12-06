import BackNavigation from "@/components/general/BackNavigation";
import { Button } from "@/components/ui/Button";
import useTicketsQuery from "@/hooks/queries/useTicketsQuery";
import { formatDate, formatTime } from "@/lib/utils";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";

export default function Tickets() {
  const { ticketsData, ticketsQuery, isEmpty } = useTicketsQuery();
  const navigate = useNavigate();
  return (
    <div className="p-10 flex flex-col">
      <BackNavigation
        title="My Ordered Tickets"
        to="/movies"
        subtitle="Return to movies"
      />
      <ul className="border border-border flex flex-col rounded-md p-6 gap-6 min-h-screen bg-primary mt-8 content-start flex-1">
        {isEmpty && (
          <div className="flex items-center justify-center w-full flex-col flex-1">
            <h2 className="text-white text-4xl">No Tickets Found</h2>
            <p className="text-light mt-2">
              Looks like You haven't ordered any tickets, start ordering today!
            </p>
            <Button className="mt-6">Get Tickets</Button>
          </div>
        )}
        {ticketsQuery.isPending &&
          new Array(4).fill("x").map((_, i) => {
            return <Skeleton height={"20rem"} key={i} />;
          })}
        {ticketsData?.map((ticket) => {
          return (
            <li
              className="border border-border gap-8 grid grid-cols-[auto_3fr] p-8 h-fit rounded-md hover:bg-secondary/50 cursor-pointer transition"
              onClick={() => {
                navigate(ticket.ReservationId);
              }}
            >
              <img
                src={ticket.schedule.movie.Poster}
                className="bg-white rounded-md w-[16rem] aspect-square object-cover"
              ></img>
              <div className="h-full">
                <div className="flex flex-col ">
                  <h2 className="text-title text-white">
                    {ticket.schedule.movie.Title}
                  </h2>
                  <div className="flex gap-1 text-gray flex-wrap">
                    <p>{ticket.schedule.room.Name}</p>
                    <p>•</p>
                    <p>{ticket.schedule.room.cinema.Location}</p>
                    <p>•</p>
                    <p>{ticket.schedule.room.cinema.Name}</p>
                  </div>

                  <div className="flex items-center pt-5 gap-3 text-light">
                    <i className="bx bx-time-five text-2xl"></i>
                    <p>{formatDate(ticket.schedule.StartTime)}</p>
                  </div>
                  <div className="flex items-center gap-3 pt-1 text-light">
                    <i className="bx bxs-calendar text-2xl "></i>
                    <p>
                      {formatTime(ticket.schedule.StartTime)} -{" "}
                      {formatTime(ticket.schedule.EndTime)}
                    </p>
                  </div>
                  <div className="flex items-center pt-10 gap-4 text-light mb-2">
                    <i className="bx bxs-discount text-2xl"></i>
                    <p>{ticket.seats.length} Seats</p>
                  </div>
                  <div className="">
                    <p className="text-white truncate">
                      {ticket.seats
                        ?.map((seat) => `${seat.seat.Row}${seat.seat.Number}`)
                        .join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

import BackNavigation from "@/components/general/BackNavigation";
import useTicketsQuery from "@/hooks/queries/useTicketQuery";
import { formatDate, formatTime } from "@/lib/utils";

export default function Tickets() {
  const { ticketsData } = useTicketsQuery();

  return (
    <div className="p-10">
      <BackNavigation
        title="My Ordered Tickets"
        to="/movies"
        subtitle="Return to movies"
      />
      <ul className="border border-border 3xl:grid-cols-1 rounded-md p-6 grid grid-cols-2 gap-6 min-h-screen bg-primary mt-8 content-start">
        {ticketsData?.map((ticket) => {
          return (
            <li className="border border-border gap-8 grid grid-cols-[auto_3fr] p-8 h-fit">
              <div className="bg-white rounded-md w-[15rem] aspect-square"></div>
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
                  <div className="flex items-center pt-10 gap-4 text-light">
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

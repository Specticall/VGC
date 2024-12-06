import BackNavigation from "@/components/general/BackNavigation";
import QR_Code from "../../public/Movie/QR_Code.png";
import { useParams } from "react-router-dom";
import useReservationQuery from "@/hooks/queries/useReservationQuery";
import { formatDate } from "@/lib/utils";
import Skeleton from "react-loading-skeleton";

export default function TicketDetails() {
  const { id } = useParams();
  const { reservationData } = useReservationQuery({ reservationId: id });

  return (
    <main className="min-h-screen pt-5 flex items-center justify-center flex-col">
      <div className="flex flex-col gap-6">
        <div className="self-start">
          <BackNavigation
            subtitle="Back to tickets"
            title="My Ticket"
            to="/tickets"
          />
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col">
            <div className="relative  rounded text-white border-b border-dashed border-white">
              <div className="relative rounded-t-md overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-secondary from-[40%] opacity-95 to-secondary/40"></div>
                {!reservationData ? (
                  <Skeleton width={"27rem"} className="aspect-square" />
                ) : (
                  <img
                    src={reservationData?.schedule.movie.Poster}
                    alt=""
                    className="w-full  max-w-[27rem] aspect-square object-cover rounded-t-md"
                  />
                )}
              </div>
              {reservationData && (
                <div className="absolute top-20 left-0 flex flex-col items-start px-10">
                  <h1 className="text-title ">
                    {reservationData?.schedule.movie.Title}
                  </h1>
                  <p className="text-paragraph text-light max-w-[90%] mb-2">
                    {reservationData?.schedule.room.cinema.Location}
                  </p>
                  <div className="grid grid-cols-2 gap-8 mt-4">
                    <div className="flex flex-col">
                      <p className="text-light mb-1">Room</p>
                      <p>{reservationData?.schedule.room.Name}</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-light mb-1">Date</p>
                      <p>{formatDate(reservationData?.schedule.StartTime)}</p>
                    </div>

                    <div className="flex flex-col flex-grow">
                      <p className="mb-1 text-light">Seats</p>
                      <div className="flex flex-wrap gap-x-3">
                        {reservationData?.seats.map((seat) => {
                          return (
                            <div>
                              {seat.seat.Row}
                              {seat.seat.Number}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-light mb-1 ">Time</p>
                      <p>19:30 - 21:00</p>
                    </div>
                  </div>
                </div>
              )}
              <div className="absolute -left-6 -bottom-5 bg-background w-10 h-10 rounded-full"></div>
              <div className="absolute -right-6 -bottom-5 bg-background w-10 h-10 rounded-full"></div>
            </div>
            <div
              className="flex flex-col items-center justify-center bg-secondary p-10 rounded-[18px]
"
            >
              <img
                src={QR_Code}
                alt="QR Code"
                className="w-full aspect-square"
              />
              <p className="text-paragraph text-gray pt-10">
                SCAN TO VERIFY TICKET
              </p>
            </div>
          </div>
        </div>{" "}
      </div>
    </main>
  );
}

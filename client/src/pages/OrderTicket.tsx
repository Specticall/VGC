import { useMemo, useState } from "react";
import DateSelector from "@/components/ticketing/DateSelector";
import TimeSelector from "@/components/ticketing/TimeSelector";
import SeatSelector from "@/components/ticketing/SeatSelector";
import { useNavigate, useParams } from "react-router-dom";
import useMovieQuery from "@/hooks/queries/useMovieQuery";
import useSeatsQuery from "@/hooks/queries/useSeatsQuery";
import { SubmitHandler, useForm } from "react-hook-form";

const dummy = [
  {
    scheduleId: "1a2b3c4d-1234-5678-9abc-def123456789",
    date: "2024-11-25T00:00:00",
    startTime: new Date("2024-11-25T10:00:00").getTime(),
    endTime: new Date("2024-11-25T12:00:00").getTime(),
    price: 15.99,
    roomId: "101a1b2c-9876-5432-1abc-def654321098",
    movieId: "m001-abc-def123",
  },
  {
    scheduleId: "2b3c4d5e-2345-6789-0abc-def234567890",
    date: "2024-11-25T00:00:00",
    startTime: new Date("2024-11-25T12:30:00").getTime(),
    endTime: new Date("2024-11-25T14:30:00").getTime(),
    price: 12.5,
    roomId: "102b2c3d-8765-4321-1abc-def543210987",
    movieId: "m002-abc-def234",
  },
  {
    scheduleId: "3c4d5e6f-3456-7890-1abc-def345678901",
    date: "2024-11-25T00:00:00",
    startTime: new Date("2024-11-25T15:00:00").getTime(),
    endTime: new Date("2024-11-25T17:00:00").getTime(),
    price: 18.0,
    roomId: "103c3d4e-7654-3210-1abc-def432109876",
    movieId: "m003-abc-def345",
  },
  {
    scheduleId: "4d5e6f7g-4567-8901-2abc-def456789012",
    date: "2024-11-26T00:00:00",
    startTime: new Date("2024-11-26T09:00:00").getTime(),
    endTime: new Date("2024-11-26T11:00:00").getTime(),
    price: 14.0,
    roomId: "104d4e5f-6543-2109-1abc-def321098765",
    movieId: "m004-abc-def456",
  },
  {
    scheduleId: "5e6f7g8h-5678-9012-3abc-def567890123",
    date: "2024-11-26T00:00:00",
    startTime: new Date("2024-11-26T11:30:00").getTime(),
    endTime: new Date("2024-11-26T13:30:00").getTime(),
    price: 13.75,
    roomId: "105e5f6g-5432-1098-1abc-def210987654",
    movieId: "m005-abc-def567",
  },
  {
    scheduleId: "6f7g8h9i-6789-0123-4abc-def678901234",
    date: "2024-11-26T00:00:00",
    startTime: new Date("2024-11-26T14:00:00").getTime(),
    endTime: new Date("2024-11-26T16:00:00").getTime(),
    price: 20.0,
    roomId: "106f6g7h-4321-0987-1abc-def109876543",
    movieId: "m006-abc-def678",
  },
  {
    scheduleId: "7g8h9i0j-7890-1234-5abc-def789012345",
    date: "2024-11-27T00:00:00",
    startTime: new Date("2024-11-27T10:00:00").getTime(),
    endTime: new Date("2024-11-27T12:00:00").getTime(),
    price: 17.5,
    roomId: "107g7h8i-3210-9876-1abc-def098765432",
    movieId: "m007-abc-def789",
  },
  {
    scheduleId: "8h9i0j1k-8901-2345-6abc-def890123456",
    date: "2024-11-27T00:00:00",
    startTime: new Date("2024-11-27T12:30:00").getTime(),
    endTime: new Date("2024-11-27T14:30:00").getTime(),
    price: 15.25,
    roomId: "108h8i9j-2109-8765-1abc-def987654321",
    movieId: "m008-abc-def890",
  },
  {
    scheduleId: "9i0j1k2l-9012-3456-7abc-def901234567",
    date: "2024-11-27T00:00:00",
    startTime: new Date("2024-11-27T15:00:00").getTime(),
    endTime: new Date("2024-11-27T17:00:00").getTime(),
    price: 19.99,
    roomId: "109i9j0k-1098-7654-1abc-def876543210",
    movieId: "m009-abc-def901",
  },
  {
    scheduleId: "0j1k2l3m-0123-4567-8abc-def012345678",
    date: "2024-11-28T00:00:00",
    startTime: new Date("2024-11-28T09:00:00").getTime(),
    endTime: new Date("2024-11-28T11:00:00").getTime(),
    price: 11.5,
    roomId: "110j0k1l-0987-6543-1abc-def765432109",
    movieId: "m010-abc-def012",
  },
  {
    scheduleId: "1k2l3m4n-1234-5678-9abc-def123456789",
    date: "2024-11-28T00:00:00",
    startTime: new Date("2024-11-28T11:30:00").getTime(),
    endTime: new Date("2024-11-28T13:30:00").getTime(),
    price: 16.25,
    roomId: "111k1l2m-9876-5432-1abc-def654321098",
    movieId: "m011-abc-def123",
  },
  {
    scheduleId: "2l3m4n5o-2345-6789-0abc-def234567890",
    date: "2024-11-28T00:00:00",
    startTime: new Date("2024-11-28T14:00:00").getTime(),
    endTime: new Date("2024-11-28T16:00:00").getTime(),
    price: 14.99,
    roomId: "112l2m3n-8765-4321-1abc-def543210987",
    movieId: "m012-abc-def234",
  },
  {
    scheduleId: "3m4n5o6p-3456-7890-1abc-def345678901",
    date: "2024-11-29T00:00:00",
    startTime: new Date("2024-11-29T10:00:00").getTime(),
    endTime: new Date("2024-11-29T12:00:00").getTime(),
    price: 18.75,
    roomId: "113m3n4o-7654-3210-1abc-def432109876",
    movieId: "m013-abc-def345",
  },
  {
    scheduleId: "4n5o6p7q-4567-8901-2abc-def456789012",
    date: "2024-11-29T00:00:00",
    startTime: new Date("2024-11-29T12:30:00").getTime(),
    endTime: new Date("2024-11-29T14:30:00").getTime(),
    price: 21.0,
    roomId: "114n4o5p-6543-2109-1abc-def321098765",
    movieId: "m014-abc-def456",
  },
  {
    scheduleId: "5o6p7q8r-5678-9012-3abc-def567890123",
    date: "2024-11-29T00:00:00",
    startTime: new Date("2024-11-29T15:00:00").getTime(),
    endTime: new Date("2024-11-29T17:00:00").getTime(),
    price: 13.5,
    roomId: "115o5p6q-5432-1098-1abc-def210987654",
    movieId: "m015-abc-def567",
  },
];

export type OrderFields = {
  cinemaId: string;
  scheduleId: string;
};

export default function OrderTicket() {
  const schedules = dummy;
  const { movieId } = useParams();
  const navigate = useNavigate();
  const { movieData } = useMovieQuery({ id: movieId });
  const [selectedDate, setSelectedDate] = useState("");
  const { seatsData } = useSeatsQuery({ movieId });
  const { handleSubmit, control, watch } = useForm<OrderFields>({
    values: {
      cinemaId: seatsData?.[0]?.CinemaId || "",
      scheduleId: "",
    },
  });

  // const times = useMemo(() => {
  //   if (selectedDate) {
  //     return scheduleGroupedByDate[selectedDate].map((date) => date.startTime);
  //   }
  //   return undefined;
  // }, [scheduleGroupedByDate, selectedDate]);
  const onSubmit: SubmitHandler<OrderFields> = (value) => {
    console.log(value);
  };
  const cinemaId = watch("cinemaId");

  const cinemaNames = useMemo(() => {
    return seatsData?.map((cinema) => {
      return {
        name: cinema.Name,
        id: cinema.CinemaId,
        location: cinema.Location,
      };
    });
  }, [seatsData]);
  const schedulesBasedOnCinema = useMemo(() => {
    setSelectedDate("");
    return seatsData?.find((cinema) => cinema.CinemaId === cinemaId)?.Schedules;
  }, [seatsData, cinemaId]);

  const schedulesBasedOnDate = useMemo(() => {
    if (!schedulesBasedOnCinema) return;
    return schedulesBasedOnCinema[selectedDate]?.filter((sched) =>
      sched.StartTime.includes(selectedDate)
    );
  }, [schedulesBasedOnCinema, selectedDate]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 h-full flex flex-col"
    >
      <div className="flex gap-4">
        <i
          className="bx bx-arrow-back bg-primary border border-border rounded-md p-4 text-white flex items-center justify-center text-2xl w-16 transition hover:bg-secondary cursor-pointer"
          onClick={() => navigate("/movies", { replace: true })}
        ></i>
        <div>
          <p className="text-light">Back to movie list</p>
          <h2 className="text-white text-3xl mt-1">{movieData?.Title}</h2>
        </div>
      </div>
      <DateSelector
        selectedDate={selectedDate}
        className="mt-4"
        onSelectDate={setSelectedDate}
        schedules={schedulesBasedOnCinema}
      />
      <TimeSelector
        schedulesBasedOnDate={schedulesBasedOnDate}
        onSelectTime={() => {}}
      />
      <SeatSelector control={control} cinemas={cinemaNames} />
    </form>
  );
}

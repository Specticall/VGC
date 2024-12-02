import { useEffect, useMemo, useState } from "react";
import DateSelector from "@/components/ticketing/DateSelector";
import TimeSelector from "@/components/ticketing/TimeSelector";
import SeatSelector from "@/components/ticketing/SeatSelector";
import { useNavigate, useParams } from "react-router-dom";
import useMovieQuery from "@/hooks/queries/useMovieQuery";
import { SubmitHandler, useForm } from "react-hook-form";
import useCinemaScheduleQuery from "@/hooks/queries/useCinemaScheduleQuery";
import { LocalCheckoutData } from "@/lib/types";
import { useDidUpdateEffect } from "@/hooks/useDidUpdateEffect";

const getPreviousSave = (): LocalCheckoutData | undefined => {
  const prevCheckout = localStorage.getItem("checkout");
  if (prevCheckout) {
    return JSON.parse(prevCheckout);
  }
  return undefined;
};

export type OrderFields = {
  cinemaId: string;
  scheduleId: string;
  seatIds: string[];
};

export default function OrderTicket() {
  const previousSave = getPreviousSave();

  const { movieId } = useParams();
  const navigate = useNavigate();
  const { movieData } = useMovieQuery({ id: movieId });
  const [selectedDate, setSelectedDate] = useState(
    previousSave?.selectedDate || ""
  );
  const { cinemaScheduleData } = useCinemaScheduleQuery({ movieId });
  const { handleSubmit, control, watch, setValue, reset } =
    useForm<OrderFields>({
      values: {
        cinemaId:
          previousSave?.cinemaId || cinemaScheduleData?.[0]?.CinemaId || "",
        scheduleId: previousSave?.scheduleId || "",
        seatIds: previousSave?.seatsId || [],
      },
    });

  const cinemaId = watch("cinemaId");
  const scheduleId = watch("scheduleId");

  useEffect(() => {
    if (previousSave?.movieId !== movieId) {
      localStorage.removeItem("checkout");
      reset();
    }
  }, [previousSave, movieId, reset]);

  useDidUpdateEffect(() => {
    setValue("scheduleId", "");
    setSelectedDate("");
    setValue("seatIds", []);
  }, [cinemaId]);

  useDidUpdateEffect(() => {
    setValue("scheduleId", "");
    setValue("seatIds", []);
  }, [selectedDate]);

  useDidUpdateEffect(() => {
    setValue("seatIds", []);
  }, [scheduleId]);

  const cinemaNames = useMemo(() => {
    return cinemaScheduleData?.map((cinema) => {
      return {
        name: cinema.Name,
        id: cinema.CinemaId,
        location: cinema.Location,
      };
    });
  }, [cinemaScheduleData]);

  const schedulesBasedOnCinema = useMemo(() => {
    return cinemaScheduleData?.find((cinema) => cinema.CinemaId === cinemaId)
      ?.Schedules;
  }, [cinemaScheduleData, cinemaId]);

  const schedulesBasedOnDate = useMemo(() => {
    if (!schedulesBasedOnCinema) return;
    return schedulesBasedOnCinema[selectedDate]?.filter((sched) =>
      sched.StartTime.includes(selectedDate)
    );
  }, [schedulesBasedOnCinema, selectedDate]);

  const selectedRoomId = useMemo(() => {
    return schedulesBasedOnDate?.find((sched) => {
      return sched.ScheduleId === scheduleId;
    })?.RoomId;
  }, [schedulesBasedOnDate, scheduleId]);

  const onSubmit: SubmitHandler<OrderFields> = (value) => {
    const schedule = schedulesBasedOnDate?.find(
      (sched) => sched.ScheduleId === value.scheduleId
    );

    const cinema = cinemaScheduleData?.find(
      (cinema) => cinema.CinemaId === value.cinemaId
    );

    localStorage.setItem(
      "checkout",
      JSON.stringify({
        cinemaId: value.cinemaId,
        seatsId: value.seatIds,
        scheduleId: value.scheduleId,
        roomId: selectedRoomId,
        movieId,
        startTime: schedule?.StartTime,
        location: cinema?.Location,
        selectedDate,
      } satisfies LocalCheckoutData)
    );
    navigate("/checkout");
  };

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
        control={control}
      />
      <SeatSelector
        price={movieData?.Price}
        control={control}
        cinemas={cinemaNames}
        selectedRoomId={selectedRoomId}
      />
    </form>
  );
}

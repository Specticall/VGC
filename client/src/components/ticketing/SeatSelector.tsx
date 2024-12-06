import { Control, Controller, useController } from "react-hook-form";
import { Button } from "../ui/Button";
import SeatSelectorLegend from "./SeatSelectorLegend";
import { OrderFields } from "@/pages/OrderTicket";
import { useMemo, useState } from "react";
import useSeatsQuery from "@/hooks/queries/useSeatsQuery";
import { SeatsData } from "@/lib/types";
import { cn, formatToRupiah } from "@/lib/utils";
import Skeleton from "react-loading-skeleton";
import Dropdown from "../ui/Dropdown";

// const COLUMNS = 24 + 2;
// const ROWS = 6 + 1;

const COLUMNS = 22;

type Props = {
  control: Control<OrderFields>;
  cinemas?: {
    name: string;
    id: string;
    location: string;
  }[];
  selectedRoomId?: string;
  price?: string;
};

export default function SeatSelector({
  cinemas,
  control,
  selectedRoomId,
  price,
}: Props) {
  const {
    field: { onChange, value },
  } = useController({
    name: "seatIds",
    control,
  });
  const [cinemaIdx, setCinemaIdx] = useState(0);
  const { seatsData, seatsQuery } = useSeatsQuery({ roomId: selectedRoomId });

  const seatsDataWithSpacing = useMemo(
    () =>
      seatsData?.seats.reduce((acc: (SeatsData | string)[], seats, i) => {
        const idx = i % (COLUMNS - 5);
        if (idx === 1) {
          acc.push("SPACING");
          acc.push("SPACING");
        }

        if (idx === 15) {
          acc.push("SPACING");
        }
        acc.push(seats);
        return acc;
      }, []),
    [seatsData?.seats]
  );

  return (
    <div className="flex-1 flex flex-col bg-primary border border-border p-6 rounded-md">
      <div className="flex justify-between">
        <Controller
          control={control}
          name="cinemaId"
          render={({ field: { onChange, value } }) => {
            const cinemaValue = cinemas?.find((cinema) => cinema.id === value);
            return (
              <div>
                <Dropdown
                  canUnselect={false}
                  className="w-[25rem] [&_button]:py-4"
                  placeholder="Select Cinema"
                  data={cinemas?.map((cinema) => cinema.name)}
                  onSelect={(selectedName) => {
                    const target = cinemas?.find(
                      (cinema) => cinema.name === selectedName
                    );

                    onChange(target?.id);
                  }}
                  value={cinemaValue?.name}
                />
              </div>
            );
          }}
        />
        <div>
          <p className="text-light">Price / Seat</p>
          <p className="text-2xl text-white mt-1">
            {formatToRupiah(Number(price)) || (
              <Skeleton height={"2rem"} width={"12rem"} />
            )}
          </p>
        </div>
      </div>
      <div className="overflow-auto px-8 flex-1 flex flex-col min-h-[30rem] items-center justify-center py-10">
        {selectedRoomId && (
          <div className="flex flex-col gap-16">
            <div className="h-8 w-full bg-border flex items-center justify-center py-4 text-gray rounded-md">
              Screen
            </div>
            <ul
              className="grid flex-1 gap-3 place-content-center"
              style={{
                gridTemplateColumns: `repeat(${COLUMNS - 2},3rem)`,
              }}
            >
              {seatsQuery.isPending &&
                new Array(11 * 20).fill("x").map((_, i) => {
                  return <Skeleton key={i} className="h-[3rem]" />;
                })}
              {seatsDataWithSpacing?.map((seat, i) => {
                if (typeof seat === "string") {
                  return <li key={i} className="h-[3rem]"></li>;
                }

                const isReserved = seatsData?.reservedSeats.find((current) => {
                  return current.SeatId === seat.SeatId;
                });
                const isSelected = value.includes(seat.SeatId);
                const seatIdentifier = `${seat.Row}${seat.Number}`;
                return (
                  <li
                    key={i}
                    className={cn(
                      "h-[3rem] rounded-md bg-border cursor-pointer transition flex items-center justify-center text-gray",
                      isSelected
                        ? "bg-white text-primary"
                        : "hover:bg-gray/70 ",
                      isReserved &&
                        "bg-accent text-white hover:bg-accent cursor-not-allowed"
                    )}
                    onClick={() => {
                      if (isReserved) return;
                      const current = value;
                      let newValue;
                      if (current.includes(seat.SeatId)) {
                        newValue = current.filter((cur) => cur !== seat.SeatId);
                      } else {
                        newValue = [...current, seat.SeatId];
                      }
                      onChange(newValue);
                    }}
                  >
                    {seatIdentifier}
                  </li>
                );
              })}
            </ul>{" "}
          </div>
        )}
        {!selectedRoomId && (
          <div className="flex flex-col items-center justify-center">
            <i className="bx bx-time-five flex items-center justify-center bg-primary border border-border rounded-md w-20 aspect-square text-4xl text-light mb-6"></i>
            <h2 className="text-white text-4xl">Please Select Date and Time</h2>
            <p className="text-gray mt-3">
              To select your seats, please fill in the date and time field
            </p>
          </div>
        )}
      </div>
      {selectedRoomId && (
        <div className="flex items-center justify-between">
          <SeatSelectorLegend />
          <Button variant={"primary"}>Book Seat(s)</Button>
        </div>
      )}
    </div>
  );
}

import { Control, Controller } from "react-hook-form";
import { Button } from "../ui/Button";
import SeatSelectorLegend from "./SeatSelectorLegend";
import { OrderFields } from "@/pages/OrderTicket";
import { SeatsData } from "@/lib/types";
import { useState } from "react";

const COLUMNS = 24 + 2;
const ROWS = 6 + 1;

type Props = {
  control: Control<OrderFields>;
  cinemas?: {
    name: string;
    id: string;
    location: string;
  }[];
};

export default function SeatSelector({ cinemas, control }: Props) {
  const [cinemaIdx, setCinemaIdx] = useState(0);
  return (
    <div className="flex-1 flex flex-col bg-primary border border-border p-6 rounded-md">
      <div className="flex justify-between">
        <Controller
          control={control}
          name="cinemaId"
          render={({ field: { onChange, value } }) => {
            const cinema = cinemas?.find((cinema) => cinema.id === value);
            return (
              <div className="flex items-center gap-8">
                <div className="grid grid-cols-[auto_20rem] gap-x-3">
                  <i className="bx bx-map text-white text-3xl row-span-2 "></i>
                  <h2 className="text-white text-xl">{cinema?.name}</h2>
                  <p className="text-light mt-1">{cinema?.location}</p>
                </div>
                <i
                  className="text-white text-3xl bx bx-chevron-right transition hover:text-light cursor-pointer"
                  onClick={() => {
                    if (!cinemas) return;
                    const newIdx = (cinemaIdx + 1) % cinemas.length;
                    setCinemaIdx(newIdx);
                    onChange(cinemas[newIdx].id);
                  }}
                ></i>
              </div>
            );
          }}
        />
        <div>
          <p className="text-light">Price / Seat</p>
          <p className="text-2xl text-white mt-1">Rp.70.000</p>
        </div>
      </div>
      <div className="overflow-auto px-8 flex-1 flex flex-col min-h-[30rem] items-center justify-center py-10">
        <div className="flex flex-col gap-16">
          <div className="h-8 w-full bg-border flex items-center justify-center py-4 text-gray rounded-md">
            Screen
          </div>
          <ul
            className="grid flex-1 gap-3 place-content-center"
            style={{
              gridTemplateColumns: `repeat(${COLUMNS},3rem)`,
            }}
          >
            {new Array(ROWS * COLUMNS).fill("x").map((_, i) => {
              if (
                i % COLUMNS === 4 ||
                i % COLUMNS === 21 ||
                Math.floor(i / COLUMNS) === 3
              ) {
                return <li key={i} className="h-[3rem]"></li>;
              }
              return (
                <li
                  key={i}
                  className="h-[3rem] rounded-md bg-border hover:bg-gray/70 cursor-pointer transition"
                ></li>
              );
            })}
          </ul>{" "}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <SeatSelectorLegend />
        <Button variant={"primary"}>Book Seat(s)</Button>
      </div>
    </div>
  );
}

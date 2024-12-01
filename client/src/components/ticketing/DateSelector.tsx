import { HTMLAttributes, useMemo, useState } from "react";
import { cn, getNamedDays, getNamedMonth } from "../../lib/utils";
import { OrderFields } from "@/pages/OrderTicket";
import { Control, useController } from "react-hook-form";
import { SeatsData } from "@/lib/types";

type Props = {
  scheduleDates?: string[];
  schedules?: SeatsData["Schedules"];
  selectedDate: string;
  onSelectDate: (date: string) => void;
};

export default function DateSelector({
  schedules,
  onSelectDate,
  selectedDate,
  ...props
}: Props & HTMLAttributes<HTMLDivElement>) {
  const scheduleDates = Object.keys(schedules || {});

  return (
    <div
      {...props}
      className={cn(
        "bg-primary border-border border rounded-md  ",
        props.className
      )}
    >
      <ul className={cn("flex gap-4 overflow-x-auto min-w-full w-0 p-4")}>
        {scheduleDates?.map((dateString, i) => {
          const date = new Date(dateString);
          const day = getNamedDays(date.getDay());
          const month = getNamedMonth(date.getMonth());
          const dateNumber = date.getDate();
          const isSelected = dateString === selectedDate;
          return (
            <li
              key={i}
              className={cn(
                "flex flex-col items-center px-5 py-3 rounded-md",
                isSelected
                  ? "bg-accent [&_p]:text-white"
                  : "hover:bg-secondary transition cursor-pointer"
              )}
              onClick={() => {
                onSelectDate(dateString);
              }}
            >
              <p className="text-gray">{day}</p>
              <p className="text-white text-2xl font-semibold">{dateNumber}</p>
              <p className="text-gray">{month}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

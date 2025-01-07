import { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";
import { CinemaScheduleData } from "@/lib/types";
import { OrderFields } from "@/pages/OrderTicket";
import { Control, useController } from "react-hook-form";

type Props = {
  schedulesBasedOnDate?: CinemaScheduleData["Schedules"][number];
  control: Control<OrderFields>;
};

const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export default function TimeSelector({
  schedulesBasedOnDate,
  control,
  ...props
}: Props & HTMLAttributes<HTMLDivElement>) {
  const {
    field: { onChange, value },
  } = useController({
    control,
    name: "scheduleId",
  });

  if (!schedulesBasedOnDate) return <p>Select Date</p>;

  return (
    <div {...props} className={cn("", props.className)}>
      <ul className="flex gap-4 overflow-x-auto min-w-full w-0 py-6">
        {schedulesBasedOnDate?.map((schedule, i) => {
          return (
            <li
              key={i}
              className={cn(
                "text-light px-4 py-2 border border-border rounded-md transition cursor-pointer",
                value === schedule.ScheduleId
                  ? "bg-accent text-white border-accent"
                  : "hover:bg-secondary"
              )}
              onClick={() => {
                onChange(schedule.ScheduleId);
              }}
            >
              {formatTimestamp(new Date(schedule.StartTime).getTime())}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const variants = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
};

const variant = undefined;

console.log(variants[variant || "a"]);

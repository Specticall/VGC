import { HTMLAttributes, useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { SeatsData } from "@/lib/types";

type Props = {
  schedulesBasedOnDate?: SeatsData["Schedules"][number];
  onSelectTime: (scheduleId: string) => void;
};

const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export default function TimeSelector({
  schedulesBasedOnDate,
  onSelectTime,
  ...props
}: Props & HTMLAttributes<HTMLDivElement>) {
  const [selected, setSelected] = useState<string | undefined>();

  useEffect(() => {
    setSelected(undefined);
  }, [schedulesBasedOnDate]);

  console.log(schedulesBasedOnDate);
  if (!schedulesBasedOnDate) return <p>Select Date</p>;

  return (
    <div {...props} className={cn("", props.className)}>
      <ul className="flex gap-4 overflow-x-auto min-w-full w-0 py-6">
        {schedulesBasedOnDate?.map((schedule, i) => {
          console.log(schedulesBasedOnDate);
          return (
            <li
              key={i}
              className={cn(
                "text-light px-4 py-2 border border-border rounded-md transition cursor-pointer",
                selected === schedule.ScheduleId
                  ? "bg-accent text-white border-accent"
                  : "hover:bg-secondary"
              )}
              onClick={() => {
                setSelected(schedule.ScheduleId);
                onSelectTime(schedule.ScheduleId);
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

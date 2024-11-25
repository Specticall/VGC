import { HTMLAttributes, useEffect, useState } from "react";
import { cn } from "../../lib/utils";

type Props = {
  times?: number[];
  onSelectTime: (timestamp: number) => void;
};

const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export default function TimeSelector({
  times,
  onSelectTime,
  ...props
}: Props & HTMLAttributes<HTMLDivElement>) {
  const [selected, setSelected] = useState<number | undefined>();

  useEffect(() => {
    setSelected(undefined);
  }, [times]);

  if (!times) return <p>Select Date</p>;

  return (
    <div {...props} className={cn("", props.className)}>
      <ul className="flex gap-4 overflow-x-auto min-w-full w-0 py-6">
        {times.map((time, i) => {
          return (
            <li
              key={i}
              className={cn(
                "text-light px-4 py-2 border border-border rounded-md transition cursor-pointer",
                selected === time
                  ? "bg-accent text-white border-accent"
                  : "hover:bg-secondary"
              )}
              onClick={() => {
                setSelected(time);
                onSelectTime(time);
              }}
            >
              {formatTimestamp(time)}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

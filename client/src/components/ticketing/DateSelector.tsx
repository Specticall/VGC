import { HTMLAttributes, useState } from "react";
import { cn, getNamedDays, getNamedMonth } from "../../lib/utils";

type Props = {
  scheduleDates?: string[];
  onSelectDate: (date?: string) => void;
  defaultValue?: string;
};

export default function DateSelector({
  scheduleDates,
  onSelectDate,
  defaultValue,
  ...props
}: Props & HTMLAttributes<HTMLDivElement>) {
  const [selected, setSelected] = useState<string | undefined>(defaultValue);
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
          const isSelected = dateString === selected;
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
                setSelected(dateString);
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

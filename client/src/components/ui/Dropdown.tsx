import { HTMLAttributes, useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

type Props<T extends boolean> = {
  data?: string[];
  placeholder?: string;
  value?: T extends true ? string[] : string;
  onSelect?: (item: string[] | string | undefined) => void;
  errorMessage?: string;
  multiple?: T;
  canUnselect?: boolean;
};

export default function Dropdown<T extends boolean = false>({
  data,
  placeholder,
  value,
  onSelect,
  canUnselect,
  multiple,
  errorMessage,
  ...props
}: Props<T> & HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = useState<string[] | string | undefined>(
    multiple ? [] : ""
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutside = (e: MouseEvent) => {
    const el = ref.current;
    if (!el || el.contains(e.target as Node)) return;
    setIsOpen(false);
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const usedValue = typeof value === "undefined" ? selected : value;

  return (
    <div {...props} className={cn("relative ", props.className)} ref={ref}>
      <button
        className={cn(
          "flex justify-between items-center w-full border border-border bg-primary px-6 py-3 hover:bg-secondary/20 transition rounded-md",
          typeof data === "undefined" && "opacity-50",
          errorMessage && "border-red-500"
        )}
        onClick={(e) => {
          e.preventDefault();
          if (typeof data === "undefined") return;
          setIsOpen((cur) => !cur);
        }}
      >
        <p className={cn(usedValue ? "text-white" : "text-gray")}>
          {(Array.isArray(usedValue) ? usedValue.join(", ") : usedValue) ||
            placeholder ||
            "Select Item"}
        </p>
        <i className="bx bx-chevron-down text-white text-xl"></i>
      </button>
      {errorMessage && (
        <div className="mt-2 text-red-500">
          <i className="bx bx-error text-red-500 pb-5 mr-2"></i>
          {errorMessage}
        </div>
      )}
      <ul
        className={cn(
          "border border-border scale-95 opacity-0 invisible p-3 rounded-md grid absolute left-0 right-0 top-16 bg-background transition-all duration-300 max-h-[15rem] overflow-y-scroll z-30 gap-2",
          isOpen && "scale-100 opacity-100 visible"
        )}
      >
        {data?.map((item, i) => {
          const isSelected = Array.isArray(usedValue)
            ? usedValue.includes(item)
            : usedValue === item;
          return (
            <li
              key={i}
              className={cn(
                "text-light py-3 px-4 rounded-md cursor-pointer  transition",
                isSelected ? "bg-secondary/75" : "hover:bg-secondary/25"
              )}
              onClick={() => {
                let newValue;

                if (multiple && Array.isArray(usedValue)) {
                  if (usedValue?.includes(item)) {
                    newValue = usedValue.filter((x) => x !== item);
                  } else {
                    newValue = [...usedValue, item];
                  }
                  if (onSelect) onSelect(newValue);
                } else {
                  newValue = usedValue === item ? undefined : item;
                  if (onSelect) onSelect(canUnselect ? newValue : item);
                  setIsOpen(false);
                }

                setSelected(newValue);
              }}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

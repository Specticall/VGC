import {
  HTMLAttributes,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "../../lib/utils";

type Props = {
  data: string[];
  placeholder?: string;
  value?: string;
  onSelect?: (item?: string) => void;
};

export default function Dropdown({
  data,
  placeholder,
  value,
  onSelect,
  ...props
}: Props & HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = useState<string | undefined>();
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
        className="flex justify-between items-center w-full border border-border px-6 py-3 hover:bg-secondary/20 transition rounded-md"
        onClick={() => setIsOpen((cur) => !cur)}
      >
        <p className={cn(usedValue ? "text-white" : "text-gray")}>
          {usedValue || placeholder || "Select Item"}
        </p>
        <i className="bx bx-chevron-down text-white text-xl"></i>
      </button>
      <ul
        className={cn(
          "border border-border scale-95 opacity-0 invisible p-3 rounded-md grid absolute left-0 right-0 top-16 bg-background transition-all duration-300 max-h-[15rem] overflow-y-scroll",
          isOpen && "scale-100 opacity-100 visible"
        )}
      >
        {data.map((item, i) => {
          const isSelected = usedValue === item;
          return (
            <li
              key={i}
              className={cn(
                "text-light py-3 px-4 rounded-md cursor-pointer  transition",
                isSelected ? "bg-secondary/75" : "hover:bg-secondary/25"
              )}
              onClick={() => {
                const newValue = usedValue === item ? undefined : item;
                setSelected(newValue);
                setIsOpen(false);
                if (onSelect) onSelect(newValue);
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

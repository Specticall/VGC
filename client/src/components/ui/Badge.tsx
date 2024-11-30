import { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const variants = cva("", {
  variants: {
    variant: {
      default: "text-white border-border",
      green: "text-[#78FFF4] bg-[#13231E] border-[#0E8F89]",
      red: "text-[#FC8F8F] bg-[#391818] border-[#FF6161]",
      gray: "text-slate-300 bg-slate-900 border-slate-500",
    },
    dot: {
      default: "hidden",
      green: "bg-[#78FFF4]",
      red: "bg-[#FC8F8F]",
      gray: "bg-slate-500",
    },
  },
});

type Props = {
  children: ReactNode;
  variant: VariantProps<typeof variants>["variant"];
} & HTMLAttributes<HTMLDivElement>;

export default function Badge({ children, variant, ...props }: Props) {
  return (
    <div
      className={cn(
        "border flex gap-2 rounded-full px-5 py-1 items-center w-fit",
        variants({ variant }),
        props.className
      )}
    >
      <div
        className={cn(
          "h-[0.4rem] w-[0.4rem] rounded-full",
          variants({ dot: variant })
        )}
      ></div>
      {children}
    </div>
  );
}

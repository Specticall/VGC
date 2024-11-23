import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";
import { LoadingSpinner } from "./LoadingSpinner";

const buttonVariants = cva(
  "flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none px-6 py-4 transition disabled:opacity-50 leading-[100%]",
  {
    variants: {
      variant: {
        primary: "bg-accent text-white hover:bg-accent/70",
        secondary: "bg-white text-primary hover:bg-white/70",
        tertiary: "bg-none text-white border border-border hover:bg-white/5",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, isLoading, asChild = false, children, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant }), className)}
        ref={ref}
        disabled={props.disabled || isLoading}
        {...props}
      >
        <Slottable>{children}</Slottable>
        {isLoading && (
          <Slottable>
            <LoadingSpinner className="stroke-white ml-2" />
          </Slottable>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

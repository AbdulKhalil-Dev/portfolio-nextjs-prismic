import React from "react";
import clsx from "clsx";

type BoundedProps<T extends React.ElementType= "section"> = {
  as?: T;
  className?: string;
  children: React.ReactNode; 
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className" | "children">;


const Bounded = React.forwardRef<HTMLElement, BoundedProps<any>>(
  ({ as: Comp = "section", className, children, ...restProps }, ref) => {
    return (
      <Comp
        ref={ref as any}
        className={clsx("px-4 py-10 md:px-6 md:py-14 lg:py-16", className)}
        {...restProps}
      >
        <div className="mx-auto w-full max-w-7xl">{children}</div>
      </Comp>
    );
  },
);

Bounded.displayName = "Bounded";

export default Bounded;

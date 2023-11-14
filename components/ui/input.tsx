import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isInvalid?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, isInvalid, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleLabelClick = () => {
      const myRef = ref ?? inputRef;

      if (myRef && (myRef as any).current) {
        (myRef as any).current.focus();
      }
    };

    return (
      <div className="relative">
        <input
          id={props.id}
          type={type}
          className={cn(
            "block rounded-md px-6 pt-6 pb-1 w-full text-md text-white bg-neutral-700/80 appearance-none focus:outline-none focus:ring-0 peer",
            isInvalid && "border-b-2 border-amber-600",
            className
          )}
          placeholder=" "
          ref={ref ?? inputRef}
          {...props}
        />
        <label
          onClick={handleLabelClick}
          htmlFor={props.id}
          className="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
        >
          {label}
        </label>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };

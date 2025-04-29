
import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <div
          className={cn(
            "bg-white w-full rounded-sm",
            "border border-[#24292E4D]", // 30% opacity border
            "focus-within:shadow-[0px_0px_0px_1px_#FFF,0px_0px_0px_3px_#3871DC]",
            error && "border-red-500",
            className
          )}
        >
          <input
            ref={ref}
            className={cn(
              "w-full text-[#24292e] text-xs px-2 py-1 outline-none",
              "placeholder:text-[#24292e]",
              "bg-transparent"
            )}
            {...props}
          />
        </div>
        {error && (
          <span 
            className="text-xs text-red-500 mt-1" 
            aria-live="polite"
          >
            {error}
          </span>
        )}
      </div>
    );
  }
);

AuthInput.displayName = "AuthInput";

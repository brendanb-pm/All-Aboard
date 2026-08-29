import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-md border border-line bg-card px-3.5 text-sm text-ink placeholder:text-muted shadow-[inset_0_1px_0_rgba(18,32,51,0.02)] outline-none transition-[box-shadow,border-color] duration-150 focus:border-blue focus:ring-2 focus:ring-blue/20",
        className,
      )}
      {...props}
    />
  );
}

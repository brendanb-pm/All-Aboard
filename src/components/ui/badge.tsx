import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold tracking-tight",
  {
    variants: {
      tone: {
        navy: "bg-navy-soft text-navy",
        teal: "bg-teal-soft text-teal",
        amber: "bg-amber-soft text-amber",
        danger: "bg-danger-soft text-danger",
        muted: "bg-paper text-muted",
      },
    },
    defaultVariants: { tone: "navy" },
  },
);

export function Badge({
  className,
  tone,
  ...props
}: HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}

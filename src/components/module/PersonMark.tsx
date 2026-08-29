import type { Person } from "@/lib/graph/types";
import { cn } from "@/lib/utils";

const colors: Record<Person["color"], string> = {
  teal: "bg-teal",
  blue: "bg-blue",
  navy: "bg-navy",
  amber: "bg-amber",
  sap: "bg-sap",
};

export function PersonMark({
  person,
  size = "md",
}: {
  person: Person;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <div
      className={cn(
        "grid shrink-0 place-items-center rounded-md font-display font-bold text-white",
        colors[person.color],
        size === "sm" && "size-8 text-[10px] rounded-[8px]",
        size === "md" && "size-11 text-sm rounded-[10px]",
        size === "lg" && "size-14 text-base rounded-xl",
      )}
    >
      {person.initials}
    </div>
  );
}

"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Sheet({
  open,
  onOpenChange,
  title,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/30 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          className={cn(
            "fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-card shadow-xl",
            "data-[state=open]:animate-in data-[state=open]:slide-in-from-right",
          )}
        >
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <Dialog.Title className="font-display text-base font-semibold text-navy">
              {title}
            </Dialog.Title>
            <Dialog.Close className="rounded-md p-2 text-muted hover:bg-paper hover:text-ink">
              <X className="size-4" />
              <span className="sr-only">Close</span>
            </Dialog.Close>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

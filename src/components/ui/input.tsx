import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-12 w-full min-w-0 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-glass)] px-4 py-2 text-base backdrop-blur-md transition-all outline-none placeholder:text-muted-foreground focus-visible:border-[var(--color-primary)] disabled:pointer-events-none disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Input }

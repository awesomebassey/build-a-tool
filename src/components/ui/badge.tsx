import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 rounded-full border border-transparent px-2.5 py-0.5 text-xs font-medium whitespace-nowrap transition-all [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-3",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-primary)] text-white shadow-[0_2px_8px_rgba(255,107,53,0.2)]",
        secondary:
          "bg-[var(--color-surface-2)] text-foreground border border-[var(--color-border)] backdrop-blur-md",
        destructive: "bg-red-500/10 text-red-500 border-red-500/20",
        outline:
          "border border-[var(--color-border)] text-foreground bg-transparent backdrop-blur-sm",
        ghost: "hover:bg-[var(--color-surface-2)] text-foreground",
        link: "text-[var(--color-primary)] underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }

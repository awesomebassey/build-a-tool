import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-xl text-sm font-medium whitespace-nowrap transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-primary)] text-white shadow-[0_4px_12px_rgba(255,107,53,0.25)] hover:bg-[var(--color-primary-dark)] hover:shadow-[0_6px_20px_rgba(255,107,53,0.35)]",
        outline:
          "border border-[var(--color-border)] bg-transparent backdrop-blur-md hover:bg-[var(--color-surface-2)] hover:border-[var(--color-border-focus)]",
        secondary:
          "bg-[var(--color-surface-2)] text-foreground backdrop-blur-md hover:bg-[var(--color-surface-1)]",
        ghost: "hover:bg-[var(--color-surface-2)] backdrop-blur-sm",
        destructive: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
        link: "text-[var(--color-primary)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6 gap-2",
        xs: "h-8 px-3 text-xs rounded-lg gap-1.5",
        sm: "h-10 px-4 text-sm rounded-lg gap-1.5",
        lg: "h-14 px-8 text-base rounded-2xl gap-2.5",
        icon: "size-12 rounded-xl",
        "icon-sm": "size-10 rounded-lg",
        "icon-lg": "size-14 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

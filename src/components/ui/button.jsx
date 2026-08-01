import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-white/20 text-white shadow-lg backdrop-blur-md border border-white/20 hover:bg-white/30 hover:scale-[1.02] active:scale-[0.98]",
        destructive:
          "bg-destructive/80 text-destructive-foreground shadow-sm hover:bg-destructive/90 backdrop-blur-md",
        outline:
          "border border-white/20 bg-transparent shadow-sm hover:bg-white/10 hover:text-white backdrop-blur-sm",
        secondary:
          "bg-white/10 text-white shadow-sm hover:bg-white/20 backdrop-blur-md border border-white/10",
        ghost: "hover:bg-white/10 hover:text-white",
        link: "text-blue-300 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2 rounded-full",
        sm: "h-9 rounded-full px-4 text-xs",
        lg: "h-12 rounded-full px-10",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }

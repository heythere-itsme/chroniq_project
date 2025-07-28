import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(" rounded-[4px]", className)}
      {...props}
    />
  )
}

export { Skeleton }

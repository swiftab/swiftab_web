import { cn } from "@/lib/utils"
import { Monitor, Users } from "lucide-react"
import { format } from "date-fns"

interface CompactEventCardProps {
  title: string
  start: Date
  end: Date
  guests: number
  table: string
  variant?: "default" | "purple" | "green" | "red"
  isOnline?: boolean
  className?: string
}



export function CompactEventCard({
  title,
  start,
  end,
  guests,
  table,
  variant = "default",
  isOnline,
  className,
}: CompactEventCardProps) {
  const variantStyles = {
    default: "bg-card hover:bg-card/90",
    purple: "bg-purple-100 hover:bg-purple-200 text-purple-800 dark:text-purple-300",
    green: "bg-green-100 hover:bg-green-200 text-green-800 dark:text-green-300",
    red: "bg-red-100 hover:bg-red-200 text-red-800 dark:text-red-300",
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-1 rounded-md border px-2 py-1 text-sm shadow-sm",
        variantStyles[variant],
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium truncate">{title}</span>
        {isOnline && <Monitor className="h-3 w-3" />}
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {format(start, "h:mm a")} - {format(end, "h:mm a")}
        </span>
        <div className="flex items-center gap-1">
          <Users className="h-3 w-3" />
          <span>{guests}</span>
        </div>
      </div>
      <div className="text-xs text-muted-foreground">{table}</div>
    </div>
  )
}


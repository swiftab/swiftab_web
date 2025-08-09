import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Users, Clock, MapPin, Repeat, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { Event } from "@/types/event"

interface EventCardProps {
  event: Event
  resource: { title: string; type: "table" | "room"; floor: string; capacity: number }
  className?: string
}

export function EventCard({ event, resource, className }: EventCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const colorClasses = {
    default: "bg-card hover:bg-card/90",
    purple: "bg-purple-500/20 hover:bg-purple-500/30 text-purple-700 dark:text-purple-300",
    green: "bg-green-500/20 hover:bg-green-500/30 text-green-700 dark:text-green-300",
    blue: "bg-blue-500/20 hover:bg-blue-500/30 text-blue-700 dark:text-blue-300",
    orange: "bg-orange-500/20 hover:bg-orange-500/30 text-orange-700 dark:text-orange-300",
  }

  const statusIndicator = {
    confirmed: "bg-green-500",
    tentative: "bg-yellow-500",
    busy: "bg-red-500",
  }

  return (
    <Card
      className={cn(
        "group relative flex items-center gap-2 p-2 transition-all",
        colorClasses[event.color || "default"],
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full">
        {event.status && <div className={cn("h-full w-full rounded-full", statusIndicator[event.status])} />}
      </div>

      <Avatar className="h-6 w-6">
        <div className="flex h-full w-full items-center justify-center bg-muted">{event.title.charAt(0)}</div>
      </Avatar>

      <div className="flex-1 overflow-hidden">
        <p className="truncate text-sm font-medium">{event.title}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>
              {new Date(event.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -{" "}
              {new Date(event.end).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>
              {resource.title} ({resource.type})
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {event.isRecurring && (
          <Tooltip>
            <TooltipTrigger>
              <Repeat className="h-3 w-3 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>Recurring event</TooltipContent>
          </Tooltip>
        )}

        {event.attendees && (
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="h-3 w-3" />
            <span className="text-xs">{event.attendees}</span>
          </div>
        )}

        <Popover>
          <PopoverTrigger>
            <Info className="h-4 w-4 text-muted-foreground" />
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">{event.title}</h4>
                <p className="text-sm text-muted-foreground">{event.description || "No description provided."}</p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <span className="text-sm font-medium">Status</span>
                  <span className="col-span-2 text-sm">{event.status}</span>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <span className="text-sm font-medium">Location</span>
                  <span className="col-span-2 text-sm">
                    {resource.title} ({resource.type}) on {resource.floor}
                  </span>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <span className="text-sm font-medium">Capacity</span>
                  <span className="col-span-2 text-sm">{resource.capacity}</span>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <span className="text-sm font-medium">Reservation</span>
                  <span className="col-span-2 text-sm">
                    {event.reservationType} {event.reservationNumber}
                  </span>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {isHovered && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
          <button className="px-2 py-1 bg-blue-500 rounded">Edit</button>
        </div>
      )}
    </Card>
  )
}


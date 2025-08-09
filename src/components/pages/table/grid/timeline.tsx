"use client"

import { useState } from "react"
import FullCalendar from "@fullcalendar/react"
import resourceTimelinePlugin from "@fullcalendar/resource-timeline"
import type { EventInput, EventContentArg } from "@fullcalendar/core"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { EventCard } from "./eventcard"
import type { Resource } from "@/types/event"

const INITIAL_EVENTS: EventInput[] = [
  {
    id: "1",
    title: "Charlie Webb",
    start: "2025-01-28T11:00:00",
    end: "2025-01-28T12:00:00",
    resourceId: "table1",
    extendedProps: {
      attendees: 4,
      status: "confirmed",
      description: "Team meeting",
      reservationType: "table",
      reservationNumber: 1,
    },
  },
  {
    id: "2",
    title: "Mary Green",
    start: "2023-04-09T12:00:00",
    end: "2023-04-09T13:00:00",
    resourceId: "room1",
    extendedProps: {
      attendees: 4,
      status: "tentative",
      color: "purple",
      isRecurring: true,
      description: "Client presentation",
      reservationType: "room",
      reservationNumber: 1,
    },
  },
  {
    id: "3",
    title: "Charles Williams",
    start: "2023-04-09T13:30:00",
    end: "2023-04-09T14:30:00",
    resourceId: "table2",
    extendedProps: {
      attendees: 3,
      status: "busy",
      color: "green",
      description: "Lunch meeting",
      reservationType: "table",
      reservationNumber: 2,
    },
  },
]

const RESOURCES: Resource[] = [
  { id: "table1", title: "Table 1", type: "table", floor: "Main Floor", capacity: 4 },
  { id: "table2", title: "Table 2", type: "table", floor: "Main Floor", capacity: 4 },
  { id: "room1", title: "Room 101", type: "room", floor: "Main Floor", capacity: 8 },
  { id: "room2", title: "Room 102", type: "room", floor: "Main Floor", capacity: 6 },
  { id: "table3", title: "Table 3", type: "table", floor: "Second Floor", capacity: 4 },
  { id: "room3", title: "Room 201", type: "room", floor: "Second Floor", capacity: 10 },
]

const FLOORS = ["Main Floor", "Second Floor"]

export function Timeline() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentFloor, setCurrentFloor] = useState(FLOORS[0])

  const handlePrev = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate)
      newDate.setDate(newDate.getDate() - 1)
      return newDate
    })
  }

  const handleNext = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate)
      newDate.setDate(newDate.getDate() + 1)
      return newDate
    })
  }

  const renderEventContent = (eventContent: EventContentArg) => {
    const event = eventContent.event
    const resource = RESOURCES.find((r) => r.id === event.getResources()[0]?.id)
    if (!resource) return null

    return (
      <EventCard
        event={{
          id: event.id,
          title: event.title,
          start: event.startStr,
          end: event.endStr,
          color: event.extendedProps.color,
          resourceId: event.getResources()[0]?.id,
          attendees: event.extendedProps.attendees,
          status: event.extendedProps.status,
          isRecurring: event.extendedProps.isRecurring,
          description: event.extendedProps.description,
          reservationType: event.extendedProps.reservationType,
          reservationNumber: event.extendedProps.reservationNumber,
        }}
        resource={resource}
        className="h-full"
      />
    )
  }

  const filteredResources = RESOURCES.filter((resource) => resource.floor === currentFloor)

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border bg-background">
      <header className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-4">
          <Select value={currentFloor} onValueChange={setCurrentFloor}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select floor" />
            </SelectTrigger>
            <SelectContent>
              {FLOORS.map((floor) => (
                <SelectItem key={floor} value={floor}>
                  {floor}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center gap-1 rounded-lg bg-muted px-2 py-1">
            <span className="text-sm font-medium">{filteredResources.length}</span>
            <span className="text-xs text-muted-foreground">available</span>
          </div>
          <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Reservation
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handlePrev}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-1">
            <span className="font-medium">
              {currentDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
            </span>
          </div>
          <Button variant="outline" size="icon" onClick={handleNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </header>
      <div className="flex-1 overflow-auto">
        <FullCalendar
          plugins={[resourceTimelinePlugin]}
          initialView="resourceTimelineDay"
          initialDate={currentDate}
          resources={filteredResources}
          events={INITIAL_EVENTS}
          eventContent={renderEventContent}
          headerToolbar={false}
          height="100%"
          slotDuration="00:15:00"
          slotLabelInterval="01:00"
          slotMinTime="11:00:00"
          slotMaxTime="18:00:00"
          resourceAreaWidth="15%"
          resourceLabelDidMount={(info) => {
            info.el.innerHTML = `
              <div class="text-sm font-medium">${info.resource.title}</div>
              <div class="text-xs text-muted-foreground">${info.resource.extendedProps.type}</div>
            `
          }}
        />
      </div>
    </div>
  )
}


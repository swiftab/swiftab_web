"use client";

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import type {
  EventClickArg,
  DatesSetArg,
  EventContentArg,
} from "@fullcalendar/core";
import { TimelineHeader } from "./timelineheader";
import { EventModal } from "./Eventmodal";
import { CompactEventCard } from "./compact-event-card";

interface ReservationInfo {
  reservationID: string;
  userId: string;
  name: string;
  email: string;
  phoneNumber: string;
  bookingDate: string;
  bookingFor: string;
  endTime: string;
  guest: number;
  tableNumber: string;
  diningArea: string;
  _id: string;
}

interface ReservationData {
  reservationInfo: ReservationInfo;
  status: "active" | "completed" | "cancelled";
}

interface TimelineEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  guests: number;
  table: string;
  floor: string;
  status: "active" | "completed" | "cancelled";
  variant?: "default" | "purple" | "green" | "red";
  isOnline?: boolean;
}

interface VerticalTimelineProps {
  timelineData: ReservationData[];
  diningAreas: [string]; // Ensuring diningAreas contains tables
}

export function VerticalTimeline({
  timelineData,
  diningAreas,
}: VerticalTimelineProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date("2025-01-28")
  );
  const [selectedFloor, setSelectedFloor] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(
    null
  );
  const [visibleEvents, setVisibleEvents] = useState<TimelineEvent[]>([]);

  // Convert reservation data to TimelineEvent format
  const formattedEvents: TimelineEvent[] = timelineData.map((data) => ({
    id: data.reservationInfo._id,
    title: data.reservationInfo.name,
    start: data.reservationInfo.bookingFor,
    end: data.reservationInfo.endTime,
    guests: data.reservationInfo.guest,
    table: data.reservationInfo.tableNumber,
    floor: data.reservationInfo.diningArea || "main",
    status: data.status,
  }));

  const updateVisibleEvents = () => {
    const dayStart = new Date(selectedDate);
    dayStart.setHours(0, 0, 0, 0); // Start of selected day (local time)

    const dayEnd = new Date(selectedDate);
    dayEnd.setHours(23, 59, 59, 999); // End of selected day (local time)

    const filtered = formattedEvents.filter((event) => {
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);

      // Handle same-day events by ensuring minimum duration
      if (eventStart.getTime() === eventEnd.getTime()) {
        eventEnd.setMinutes(eventStart.getMinutes() + 30); // Add 30min default duration
      }

      // Check if event overlaps with the selected day
      const isInRange = eventStart < dayEnd && eventEnd > dayStart;

      return (
        isInRange && (selectedFloor === "" || event.floor === selectedFloor)
      );
    });

    console.log("Filtered Events:", filtered);
    setVisibleEvents(filtered);
  };

  // Effect to update events when date, floor, or timelineData changes
  useEffect(() => {
    updateVisibleEvents();
  }, [selectedDate, selectedFloor, timelineData]);

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = visibleEvents.find((e) => e.id === clickInfo.event.id);
    if (event) {
      setSelectedEvent(event);
    }
  };

  const handleDateChange = (dateInfo: DatesSetArg) => {
    setSelectedDate(dateInfo.start);
  };

  const handleFloorChange = (floor: string) => {
    setSelectedFloor(floor);
  };

  const handlePrevious = () => {
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 1);
      return newDate;
    });
  };

  const handleNext = () => {
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    });
  };

  // Calculate occupancy rate
  const totalTables =
    diningAreas?.reduce((acc, area) => acc + area?.length, 0) || 0;
  const occupiedTables = visibleEvents.filter(
    (event) => event.status !== "cancelled"
  ).length;
  const occupancyRate =
    totalTables > 0 ? Math.round((occupiedTables / totalTables) * 100) : 0;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border bg-background">
      <TimelineHeader
        occupancy={occupancyRate}
        diningArea={diningAreas}
        selectedDate={selectedDate}
        onPrevious={handlePrevious}
        onNext={handleNext}
        selectedFloor={selectedFloor}
        onFloorChange={handleFloorChange}
      />

      <div className="flex-1 overflow-x-auto p-4">
        <FullCalendar
          plugins={[timeGridPlugin, interactionPlugin]}
          initialView="timeGridDay"
          initialDate={selectedDate}
          events={visibleEvents}
          eventClick={handleEventClick}
          datesSet={handleDateChange}
          headerToolbar={false}
          allDaySlot={false}
          slotMinTime="00:00:00" // Expanded to show all hours
          slotMaxTime="24:00:00"
          height="auto"
          nowIndicator={true}
          eventMinHeight={20}
          eventContent={(eventInfo: EventContentArg) => {
            const event = eventInfo.event;
            const status = event.extendedProps.status;
            let variant: "default" | "purple" | "green" | "red" = "default";

            switch (status) {
              case "active":
                variant = "purple";
                break;
              case "completed":
                variant = "green";
                break;
              case "cancelled":
                variant = "red";
                break;
            }

            return (
              <CompactEventCard
                title={event.title}
                start={event.start!}
                end={event.end!}
                guests={event.extendedProps.guests}
                table={event.extendedProps.table}
                variant={variant}
                isOnline={event.extendedProps.isOnline}
              />
            );
          }}
        />
      </div>

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}

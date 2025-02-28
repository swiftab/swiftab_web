import React from "react"
import { format, parseISO } from "date-fns"

interface EventModalProps {
  event: {
    title: string
    start: string
    end: string
    guests: number
    table: string
    floor: string
    status: "active" | "completed" | "cancelled"
    isOnline?: boolean
  }
  onClose: () => void
}

export function EventModal({ event, onClose }: EventModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-bold">{event.title}</h2>
        <p>Start: {format(parseISO(event.start), "PPpp")}</p>
        <p>End: {format(parseISO(event.end), "PPpp")}</p>
        <p>Guests: {event.guests}</p>
        <p>Table: {event.table}</p>
        <p>Floor: {event.floor}</p>
        <p className="capitalize">Status: {event.status}</p>
        {event.isOnline && <p>Online Event</p>}
        <button className="mt-4 w-full rounded bg-red-500 text-white p-2" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  )
}


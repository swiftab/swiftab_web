export type EventStatus = "confirmed" | "tentative" | "busy"
export type EventColor = "default" | "purple" | "green" | "blue" | "orange"

export interface Event {
  id: string
  title: string
  start: string
  end: string
  color?: EventColor
  resourceId: string
  attendees?: number
  status?: EventStatus
  description?: string
  isRecurring?: boolean
  reservationType?: "table" | "room"
  reservationNumber?: number
}

export interface Resource {
  id: string
  title: string
  type: "table" | "room"
  floor: string
  capacity: number
}


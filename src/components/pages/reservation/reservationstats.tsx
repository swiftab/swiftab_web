import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, CalendarDays, Activity } from "lucide-react"

interface Reservation {
  id: string
  name: string
  email: string
  phoneNumber: string
  start: string
  end: string
  guests: number
  table: string
  floor: string
  status: string
}

interface ReservationStatsProps {
  reservations: Reservation[]
}

export function ReservationStats({ reservations }: ReservationStatsProps) {
  const totalReservations = reservations.length
  const totalGuests = reservations.reduce((sum, res) => sum + res.guests, 0)
  
  const activeReservations = reservations.filter(
    (res) => res.status.toLowerCase() === "active" || res.status.toLowerCase() === "confirmed"
  ).length

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card className="border-none shadow-sm bg-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Total Reservations</CardTitle>
          <CalendarDays className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{totalReservations}</div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm bg-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Total Guests</CardTitle>
          <Users className="h-4 w-4 text-indigo-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{totalGuests}</div>
        </CardContent>
      </Card>
      <Card className="border-none shadow-sm bg-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Active & Confirmed</CardTitle>
          <Activity className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{activeReservations}</div>
        </CardContent>
      </Card>
    </div>
  )
}
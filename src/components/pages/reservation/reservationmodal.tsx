import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface Reservation {
  id: string
  title: string
  start: string
  end: string
  guests: number
  table: string
  floor: string
  status: string
}

interface ReservationModalProps {
  reservation: Reservation
  onClose: () => void
}

export function ReservationModal({ reservation, onClose }: ReservationModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 text-gray-100">
        <DialogHeader>
          <DialogTitle>Reservation Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div>
            <h3 className="font-semibold">Guest</h3>
            <p>{reservation.title}</p>
          </div>
          <div>
            <h3 className="font-semibold">Date & Time</h3>
            <p>{new Date(reservation.start).toLocaleString()}</p>
          </div>
          <div>
            <h3 className="font-semibold">Guests</h3>
            <p>{reservation.guests}</p>
          </div>
          <div>
            <h3 className="font-semibold">Table</h3>
            <p>{reservation.table}</p>
          </div>
          <div>
            <h3 className="font-semibold">Floor</h3>
            <p>{reservation.floor}</p>
          </div>
          <div>
            <h3 className="font-semibold">Status</h3>
            <p>{reservation.status}</p>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}


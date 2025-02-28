import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarDays } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"

interface DateRangePickerProps {
  onChange: (range: { start: string; end: string }) => void
}

export function DateRangePicker({ onChange }: DateRangePickerProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <CalendarDays className="mr-2 h-4 w-4" /> Select Date Range
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={date}
          onSelect={(newDate) => {
            setDate(newDate)
            if (newDate && newDate instanceof Date) {
              onChange({
                start: newDate.toISOString(),
                end: new Date(newDate.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
              })
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}


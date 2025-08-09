import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarDays } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { DateRange } from "react-day-picker" // Ensure you have this type

interface DateRangePickerProps {
  onChange: (range: { start: string; end: string }) => void
}

export function DateRangePicker({ onChange }: DateRangePickerProps) {
  const [date, setDate] = useState<DateRange | undefined>({ from: new Date(), to: undefined })

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
          selected={date} // Now `date` is a `DateRange`
          onSelect={(newDate) => {
            setDate(newDate);

            if (newDate?.from) {
              onChange({
                start: newDate.from.toISOString(),
                end: newDate.to ? newDate.to.toISOString() : newDate.from.toISOString(),
              });
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

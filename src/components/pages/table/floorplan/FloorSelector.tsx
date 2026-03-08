import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Floor } from "@/types/table"

interface FloorSelectorProps {
  floors: Floor[]
  selectedFloor: string
  onFloorChange: (floorId: string) => void
}

export function FloorSelector({ floors, selectedFloor, onFloorChange }: FloorSelectorProps) {
  return (
    <div className="w-full sm:w-[180px]">
      <Select value={selectedFloor} onValueChange={onFloorChange}>
        <SelectTrigger className="w-full bg-gray-50 border-gray-200 text-gray-800 font-medium h-9 rounded-lg focus:ring-indigo-500/20">
          <SelectValue placeholder="Select Floor" />
        </SelectTrigger>
        <SelectContent className="rounded-xl border-gray-100 shadow-lg">
          {floors.map((floor) => (
            <SelectItem key={floor.id} value={floor.id} className="rounded-lg font-medium">
              {floor.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
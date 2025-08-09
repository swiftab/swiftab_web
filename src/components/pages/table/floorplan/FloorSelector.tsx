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
    <div className="flex items-center gap-2 bg-background p-2 rounded-md shadow-sm">
      <Select value={selectedFloor} onValueChange={onFloorChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select floor" />
        </SelectTrigger>
        <SelectContent>
          {floors.map((floor) => (
            <SelectItem key={floor.id} value={floor.id}>
              {floor.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}


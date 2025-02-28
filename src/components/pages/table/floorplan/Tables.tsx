import { Button } from "@/components/ui/button"
import { TableItem } from "@/types/table"

interface TableLibraryProps {
  onAddTable: (shape: TableItem["shape"]) => void
}

export function Tables({ onAddTable }: TableLibraryProps) {
  return (
    <div className="grid gap-4">
      <Button onClick={() => onAddTable("rectangle")} variant="outline" className="justify-start">
        Rectangle Table
      </Button>
      <Button onClick={() => onAddTable("round")} variant="outline" className="justify-start">
        Round Table
      </Button>
      <Button onClick={() => onAddTable("square")} variant="outline" className="justify-start">
        Square Table
      </Button>
    </div>
  )
}


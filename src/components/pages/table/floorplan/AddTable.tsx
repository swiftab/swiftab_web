import * as React from "react"
import { Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TableItem, Floor } from "@/types/table"

interface AddTableDialogProps {
  floors: Floor[]
  onAddTable: (floorId: string, table: Omit<TableItem, 'id' | 'floorId'>) => void
}

export function AddTableDialog({ floors, onAddTable }: AddTableDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedFloor, setSelectedFloor] = React.useState<string>("")
  const [tableName, setTableName] = React.useState("")
  const [tableShape, setTableShape] = React.useState<TableItem["shape"]>("rectangle")

  console.log(floors)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!tableName) return

    const newTable: Omit<TableItem, 'id' | 'floorId'> = {
      name: tableName,
      status: "Free",
      position: { x: 200, y: 200 },
      rotation: 0,
      shape: tableShape,
      size: tableShape === "round" ? { width: 100, height: 100 } : { width: 120, height: 80 },
      chairs: [
        { id: '1', position: 'top' },
        { id: '2', position: 'right' },
        { id: '3', position: 'bottom' },
        { id: '4', position: 'left' },
      ],
    }

    onAddTable(selectedFloor, newTable)
    setOpen(false)
    setTableName("")
    setSelectedFloor("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Table
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Table</DialogTitle>
          <DialogDescription>
            Create a new table and assign it to a floor.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* <div className="space-y-2">
            <Label htmlFor="floor">Floor</Label>
            <Select value={selectedFloor} onValueChange={setSelectedFloor}>
              <SelectTrigger id="floor">
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
          </div> */}
          <div className="space-y-2">
            <Label htmlFor="name">Table Name</Label>
            <Input
              id="name"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              placeholder="Enter table name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="shape">Table Shape</Label>
            <Select value={tableShape} onValueChange={(value: TableItem["shape"]) => setTableShape(value)}>
              <SelectTrigger id="shape">
                <SelectValue placeholder="Select shape" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rectangle">Rectangle</SelectItem>
                <SelectItem value="round">Round</SelectItem>
                {/* <SelectItem value="square">Square</SelectItem>
                <SelectItem value="oval">Oval</SelectItem> */}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">
            Create Table
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}


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
  const [tableName, setTableName] = React.useState("")
  const [tableShape, setTableShape] = React.useState<TableItem["shape"]>("rectangle")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!tableName) return

    // Default to the middle of the screen upon creation
    const newTable: Omit<TableItem, 'id' | 'floorId'> = {
      name: tableName,
      status: "Free",
      position: { x: 300, y: 200 },
      rotation: 0,
      shape: tableShape,
      size: tableShape === "round" ? { width: 110, height: 110 } : { width: 140, height: 90 },
      chairs: [
        { id: '1', position: 'top' },
        { id: '2', position: 'right' },
        { id: '3', position: 'bottom' },
        { id: '4', position: 'left' },
      ],
    }

    onAddTable("", newTable) 
    setOpen(false)
    setTableName("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-gray-200 text-gray-700 bg-white hover:bg-gray-50 h-9 rounded-lg font-medium shadow-sm oswald">
          <Plus className="mr-2 h-4 w-4" />
          Add Table
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] rounded-2xl border-0 shadow-2xl p-0 overflow-hidden oswald">
        <div className="px-6 py-5 bg-gray-50/80 border-b border-gray-100">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-gray-900">Add New Table</DialogTitle>
            <DialogDescription className="text-sm font-medium text-gray-500">
              Create a table to drop onto your floor plan.
            </DialogDescription>
          </DialogHeader>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-xs font-semibold text-gray-700">Table Name/Number</Label>
            <Input
              id="name"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              placeholder="e.g. Table 12"
              className="bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-primary/20"
            />
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="shape" className="text-xs font-semibold text-gray-700">Shape</Label>
            <Select value={tableShape} onValueChange={(value: TableItem["shape"]) => setTableShape(value)}>
              <SelectTrigger id="shape" className="bg-gray-50 border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-primary/20">
                <SelectValue placeholder="Select shape" />
              </SelectTrigger>
              <SelectContent className="rounded-xl shadow-lg border-gray-100">
                <SelectItem value="rectangle" className="rounded-lg">Rectangle</SelectItem>
                <SelectItem value="round" className="rounded-lg">Round</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button type="submit" className="w-full bg-primary hover:bg-primary/50 text-white rounded-lg shadow-md shadow-indigo-600/20 mt-2">
            Create Table
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
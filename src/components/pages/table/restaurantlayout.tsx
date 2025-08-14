"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useSaveLayoutInfo } from "@/hooks/tablehook/savelayouthook"
import type { SaveLayoutData } from "@/types/layoutinfo"

const diningAreas = [
  "Main Dining Room",
  "Private Dining Room",
  "First Floor Main Room",
  "Terrace",
  "Outdoor Seating",
  "Bar Area",
  "Chef's Table",
  "Rooftop Dining",
  "Patio",
  "Garden Dining",
  "Lounge Area",
  "Al Fresco Dining",
  "Dining Pods",
]

interface RestaurantLayoutProps {
  isOpen: boolean
  onClose: () => void
}

export function RestaurantLayout({ isOpen, onClose }: RestaurantLayoutProps) {
  const [selectedDiningAreas, setSelectedDiningAreas] = useState<string[]>([])
  const [tableCapacity, setTableCapacity] = useState<string>("")
  const [totalTables, setTotalTables] = useState<string>("")

  const mutation = useSaveLayoutInfo()

  const toggleDiningArea = (area: string) => {
    setSelectedDiningAreas((prev) => (prev.includes(area) ? prev.filter((item) => item !== area) : [...prev, area]))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedDiningAreas.length) {
      alert("Please select at least one dining area.")
      return
    }

    const layoutData: SaveLayoutData = {
      diningAreas: selectedDiningAreas,
      tableCapacity: Number(tableCapacity),
      totalTables: Number(totalTables),
    }

    mutation.mutate(layoutData, {
      onSuccess: (response) => {
        console.log("Layout saved:", response)
        localStorage.setItem("diningAreas", JSON.stringify(response.diningAreas))
        onClose()
        window.location.reload();
      },
      onError: (error) => {
        console.error("Error saving layout info:", error.message)
        alert("Failed to save layout. Please try again.")
      },
    })
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Add Dining Area</SheetTitle>
          <SheetDescription>
            Select one or more dining areas and optionally provide table capacity and total tables.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="space-y-4">
            <div className="space-y-3">
              <Label className="text-sm font-medium">Dining Areas</Label>
              <div className="grid grid-cols-1 gap-3 max-h-48 overflow-y-auto">
                {diningAreas.map((area) => (
                  <div key={area} className="flex items-center space-x-2">
                    <Checkbox
                      id={area}
                      checked={selectedDiningAreas.includes(area)}
                      onCheckedChange={() => toggleDiningArea(area)}
                    />
                    <Label htmlFor={area} className="text-sm">
                      {area}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tableCapacity" className="text-sm font-medium">
                Table Capacity
              </Label>
              <Input
                id="tableCapacity"
                type="number"
                value={tableCapacity}
                onChange={(e) => setTableCapacity(e.target.value)}
                min="1"
                placeholder="Enter table capacity"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalTables" className="text-sm font-medium">
                Total Tables
              </Label>
              <Input
                id="totalTables"
                type="number"
                value={totalTables}
                onChange={(e) => setTotalTables(e.target.value)}
                min="1"
                placeholder="Enter total number of tables"
              />
            </div>
          </div>

          <Button type="submit" disabled={mutation.isPending} className="w-full">
            {mutation.isPending ? "Saving..." : "Save changes"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}

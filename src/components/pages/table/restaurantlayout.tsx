"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useSaveLayoutInfo } from "@/hooks/tablehook/savelayouthook";
import { SaveLayoutData } from "@/types/layoutinfo";

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
];

interface RestaurantLayoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RestaurantLayoutModal({
  isOpen,
  onClose,
}: RestaurantLayoutModalProps) {
  const [selectedDiningAreas, setSelectedDiningAreas] = useState<string[]>([]);
  const [tableCapacity, setTableCapacity] = useState<string>("");
  const [totalTables, setTotalTables] = useState<string>("");

  const mutation = useSaveLayoutInfo();

  const toggleDiningArea = (area: string) => {
    setSelectedDiningAreas((prev) =>
      prev.includes(area) ? prev.filter((item) => item !== area) : [...prev, area]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDiningAreas.length) {
      alert("Please select at least one dining area.");
      return;
    }

    const layoutData: SaveLayoutData = {
      diningAreas: selectedDiningAreas,
      tableCapacity: Number(tableCapacity),
      totalTables: Number(totalTables),
    };

    mutation.mutate(layoutData, {
      onSuccess: (response) => {
        console.log("Layout saved:", response);
        localStorage.setItem('diningAreas', JSON.stringify(response.diningAreas));
        alert("Layout saved successfully!");
        onClose();
      },
      onError: (error) => {
        console.error("Error saving layout info:", error.message);
        alert("Failed to save layout. Please try again.");
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Dining Area</DialogTitle>
          <DialogDescription>
            Select one or more dining areas and optionally provide table capacity
            and total tables.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="diningArea" className="text-right">
                Dining Areas
              </Label>
              <div className="col-span-3">
                {diningAreas.map((area) => (
                  <div key={area} className="flex items-center space-x-2">
                    <Checkbox
                      id={area}
                      checked={selectedDiningAreas.includes(area)}
                      onCheckedChange={() => toggleDiningArea(area)}
                    />
                    <Label htmlFor={area}>{area}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tableCapacity" className="text-right">
                Table Capacity
              </Label>
              <Input
                id="tableCapacity"
                type="number"
                value={tableCapacity}
                onChange={(e) => setTableCapacity(e.target.value)}
                className="col-span-3"
                min="1"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="totalTables" className="text-right">
                Total Tables
              </Label>
              <Input
                id="totalTables"
                type="number"
                value={totalTables}
                onChange={(e) => setTotalTables(e.target.value)}
                className="col-span-3"
                min="1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

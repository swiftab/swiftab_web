import React from "react";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TimelineHeaderProps {
  selectedDate: Date;
  onPrevious: () => void;
  onNext: () => void;
  selectedFloor: string;
  onFloorChange: (floor: string) => void;
  occupancy: number;
  diningArea: string[];
}

export function TimelineHeader({
  selectedDate,
  onPrevious,
  onNext,
  selectedFloor,
  onFloorChange,
  occupancy,
  diningArea,
}: TimelineHeaderProps) {
  console.log(diningArea)
  return (
    <div className="flex items-center justify-between border-b px-4 py-3">
      <div className="flex items-center space-x-4">
        <button onClick={onPrevious} className="p-2">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <h2 className="text-lg font-semibold">
          {format(selectedDate, "MMMM d, yyyy")}
        </h2>
        <button onClick={onNext} className="p-2">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <Tabs
          value={selectedFloor}
          onValueChange={onFloorChange}
          className="w-fit"
        >
          <TabsList>
            {diningArea.map((floor) => (
              <TabsTrigger key={floor} value={floor}>
                {floor}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="text-sm text-muted-foreground">
          Occupancy: {occupancy}%
        </div>
      </div>
    </div>
  );
}

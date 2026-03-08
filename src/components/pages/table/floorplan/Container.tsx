"use client";

import * as React from "react";
import {
  DndContext,
  DragEndEvent,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { Button } from "@/components/ui/button";
import { TableItem } from "@/types/table";
import { DraggableTable } from "./DraggableTable";
import { FloorSelector } from "./FloorSelector";
import { AddTableDialog } from "./AddTable";
import { useQuery } from "@tanstack/react-query";
import { fetchRestaurantTables } from "@/hooks/tablehook/fetchrestable";
import { FullScreenLoader } from "@/components/Loading/FullScreen";
import { useSaveTable } from "@/hooks/tablehook/savelayouthook";
import { Save, LayoutGrid } from "lucide-react";

type Chair = "top" | "right" | "bottom" | "left";
interface DiningArea {
  id: string;
  name: string;
}

export default function Container() {
  const [diningAreas, setDiningAreas] = React.useState<DiningArea[]>([]);
  const [selectedFloor, setSelectedFloor] = React.useState<string>("");
  const [tables, setTables] = React.useState<TableItem[]>([]);
  const [selectedTable, setSelectedTable] = React.useState<string | null>(null);
  
  // Adjusted sensor for smoother drag initiation
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 2 } }));
  const saveTableMutation = useSaveTable();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    setTables((tables) =>
      tables.map((table) => {
        if (table.id === active.id) {
          return {
            ...table,
            position: { x: table.position.x + delta.x, y: table.position.y + delta.y },
          };
        }
        return table;
      })
    );
  };

  const handleRotateTable = (id: string) => {
    setTables((tables) => tables.map((table) => table.id === id ? { ...table, rotation: (table.rotation + 90) % 360 } : table));
  };

  const handleRemoveTable = (id: string) => {
    setTables((tables) => tables.filter((table) => table.id !== id));
  };

  const handleAddChair = (tableId: string) => {
    setTables((tables) =>
      tables.map((table) => {
        if (table.id === tableId) {
          const newChairId = `${table.id}-chair-${table.chairs.length + 1}`;
          const newChairPosition: { id: string; position: Chair } = {
            id: newChairId,
            position: table.shape === "round" ? "top" : (["top", "right", "bottom", "left"][table.chairs.length % 4] as Chair),
          };
          return { ...table, chairs: [...table.chairs, newChairPosition] };
        }
        return table;
      })
    );
  };

  const handleRemoveChair = (tableId: string, chairId: string) => {
    setTables((tables) =>
      tables.map((table) => table.id === tableId ? { ...table, chairs: table.chairs.filter((chair) => chair.id !== chairId) } : table)
    );
  };

  const handleAddTable = (floorId: string, tableData: Omit<TableItem, "id" | "floorId">) => {
    const newTable: TableItem = { ...tableData, id: `T-${tables.length + 1}`, floorId: selectedFloor };
    setTables([...tables, newTable]);
  };

  const handleUpdateTableName = (tableId: string, newName: string) => {
    setTables((tables) => tables.map((table) => table.id === tableId ? { ...table, name: newName } : table));
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["restaurantTables"],
    queryFn: fetchRestaurantTables,
    select: (data) => data?.restaurantLayoutData ? { diningAreas: data.restaurantLayoutData.diningAreas, tablePosition: data.restaurantLayoutData.tablePosition } : { diningAreas: [], tablePosition: [] },
  });

  React.useEffect(() => {
    if (data?.diningAreas) {
      const areasWithIds = data.diningAreas.map((area: string, index: number) => ({ id: (index + 1).toString(), name: area }));
      setDiningAreas(areasWithIds);
      setSelectedFloor(areasWithIds[0]?.id || "");
      setTables(data?.tablePosition || []);
    }
  }, [data]);

  const filteredTables = tables?.filter((table: TableItem) => table.floorId === selectedFloor) || [];

  const handleSave = () => {
    if (tables.length > 0) saveTableMutation.mutate(tables);
  };

  if (isLoading) return <FullScreenLoader />;
  if (error) return <div className="p-8 text-center text-red-500">Error loading floor plan.</div>;

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] p-4 md:p-6 bg-gray-50/50">
      
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] mb-4 z-10 relative">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 rounded-xl">
            <LayoutGrid className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 leading-none mb-1">Floor Plan</h1>
            <p className="text-xs text-gray-500 font-medium">Design your dining areas</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <FloorSelector floors={diningAreas} selectedFloor={selectedFloor} onFloorChange={setSelectedFloor} />
          <AddTableDialog floors={diningAreas} onAddTable={handleAddTable} />
          <Button 
            onClick={handleSave} 
            disabled={saveTableMutation.isPending}
            className="bg-primary hover:bg-primary/50 text-white shadow-md shadow-indigo-600/20"
          >
            <Save className="h-4 w-4 mr-2" />
            {saveTableMutation.isPending ? "Saving..." : "Save Plan"}
          </Button>
        </div>
      </header>

      <div className="flex-1 relative bg-white border border-gray-200 rounded-2xl shadow-inner overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40" 
             style={{ backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }} 
        />
        
        <DndContext sensors={sensors} modifiers={[restrictToParentElement]} onDragEnd={handleDragEnd}>
          <div className="w-full h-full relative" onClick={() => setSelectedTable(null)}>
            {filteredTables.map((table: TableItem) => (
              <DraggableTable
                key={table.id}
                table={table}
                isSelected={selectedTable === table.id}
                onSelect={(e) => { e.stopPropagation(); setSelectedTable(table.id); }}
                onRotate={() => handleRotateTable(table.id)}
                onRemove={() => handleRemoveTable(table.id)}
                onAddChair={() => handleAddChair(table.id)}
                onRemoveChair={(chairId) => handleRemoveChair(table.id, chairId)}
                onUpdateName={(newName) => handleUpdateTableName(table.id, newName)}
              />
            ))}
          </div>
        </DndContext>
      </div>
    </div>
  );
}
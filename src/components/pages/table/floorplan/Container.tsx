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

type Chair = "top" | "right" | "bottom" | "left"; // Example type

interface DiningArea {
  id: string;
  name: string;
}

const initialTables: TableItem[] = [];

export default function Container() {
  const [diningAreas, setDiningAreas] = React.useState<DiningArea[]>([]);
  //console.log(diningAreas)
  const [selectedFloor, setSelectedFloor] = React.useState<string>("");
  //console.log(selectedFloor)
  const [tables, setTables] = React.useState<TableItem[]>(initialTables);
  const [selectedTable, setSelectedTable] = React.useState<string | null>(null);
  const sensors = useSensors(useSensor(PointerSensor));
  const saveTableMutation = useSaveTable();

  //console.log(tables)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;

    setTables((tables) =>
      tables.map((table) => {
        if (table.id === active.id) {
          return {
            ...table,
            position: {
              x: table.position.x + delta.x,
              y: table.position.y + delta.y,
            },
          };
        }
        return table;
      })
    );
  };

  const handleRotateTable = (id: string) => {
    setTables((tables) =>
      tables.map((table) => {
        if (table.id === id) {
          return {
            ...table,
            rotation: (table.rotation + 90) % 360,
          };
        }
        return table;
      })
    );
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
            position:
              table.shape === "round"
                ? ("top" as Chair) // Ensure it's explicitly typed
                : (["top", "right", "bottom", "left"][
                    table.chairs.length % 4
                  ] as Chair),
          };

          return {
            ...table,
            chairs: [...table.chairs, newChairPosition],
          };
        }
        return table;
      })
    );
  };

  const handleRemoveChair = (tableId: string, chairId: string) => {
    setTables((tables) =>
      tables.map((table) => {
        if (table.id === tableId) {
          return {
            ...table,
            chairs: table.chairs.filter((chair) => chair.id !== chairId),
          };
        }
        return table;
      })
    );
  };

  const handleAddTable = (
    floorId: string,
    tableData: Omit<TableItem, "id" | "floorId">
  ) => {
    const newTable: TableItem = {
      ...tableData,
      id: `T-${tables.length + 1}`,
      floorId: selectedFloor,
    };
    setTables([...tables, newTable]);
  };

  const handleUpdateTableName = (tableId: string, newName: string) => {
    setTables((tables) =>
      tables.map((table) => {
        if (table.id === tableId) {
          return {
            ...table,
            name: newName,
          };
        }
        return table;
      })
    );
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["restaurantTables"],
    queryFn: fetchRestaurantTables,
    select: (data) =>
      data?.restaurantLayoutData
        ? {
            diningAreas: data.restaurantLayoutData.diningAreas,
            tablePosition: data.restaurantLayoutData.tablePosition,
          }
        : { diningAreas: [], tablePosition: [] },
  });

  React.useEffect(() => {
    if (data?.diningAreas) {
      const areasWithIds = data.diningAreas.map(
        (area: string, index: number) => ({
          id: (index + 1).toString(),
          name: area,
        })
      );
      setDiningAreas(areasWithIds);
      setSelectedFloor(areasWithIds[0]?.id || "");
      setTables(data?.tablePosition);
    }
  }, [data]);

  console.log(data?.tablePosition);

  const filteredTables = tables?.filter(
    (table: TableItem) => table.floorId === selectedFloor
  );

  if (isLoading) return <FullScreenLoader />;
  if (error) return <div>Error loading tables</div>;

  const handleSave = () => {
    console.log("Payload to be sent:", tables);
    if (tables.length > 0) {
      saveTableMutation.mutate(tables);
    } else {
      console.error("No tables to save");
    }
  };

  return (
    <>
      <div className="flex  ">
        {/* Header */}

        <div className="flex-1">
          <header className="flex items-center justify-between gap-4 border-b pb-2 mb-5">
            <h1 className="text-lg font-semibold">Floor Plan</h1>
            <FloorSelector
              floors={diningAreas}
              selectedFloor={selectedFloor}
              onFloorChange={setSelectedFloor}
            />
            <div className="flex items-center gap-2">
              <AddTableDialog
                floors={diningAreas}
                onAddTable={handleAddTable}
              />
              <Button
                onClick={handleSave}
                disabled={saveTableMutation.isPending}
              >
                {saveTableMutation.isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </header>
          <DndContext
            sensors={sensors}
            modifiers={[restrictToParentElement]}
            onDragEnd={handleDragEnd}
          >
            <div className="relative h-[calc(100vh-8rem)] border rounded-lg bg-muted/20 grid-background flex items-center justify-center">
              <div className="absolute top-2 left-2 z-10"></div>
              {filteredTables.map((table: TableItem) => (
                <DraggableTable
                  key={table.id}
                  table={table}
                  isSelected={selectedTable === table.id}
                  onSelect={() => setSelectedTable(table.id)}
                  onRotate={() => handleRotateTable(table.id)}
                  onRemove={() => handleRemoveTable(table.id)}
                  onAddChair={() => handleAddChair(table.id)}
                  onRemoveChair={(chairId) =>
                    handleRemoveChair(table.id, chairId)
                  }
                  onUpdateName={(newName) =>
                    handleUpdateTableName(table.id, newName)
                  }
                />
              ))}
            </div>
          </DndContext>
        </div>
      </div>
    </>
  );
}

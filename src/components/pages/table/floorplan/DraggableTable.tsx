import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { MoreHorizontal, RotateCw, Trash, Plus, Minus, ChevronRight, Edit2 } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { TableItem } from "@/types/table"

interface DraggableTableProps {
  table: TableItem
  isSelected: boolean
  onSelect: () => void
  onRotate: () => void
  onRemove: () => void
  onAddChair: () => void
  onRemoveChair: (chairId: string) => void
  onUpdateName: (newName: string) => void
}

function getChairPosition(index: number, total: number, tableShape: 'rectangle' | 'round' | 'square', tableWidth: number, tableHeight: number): { left: string, top: string, transform: string } {
  
  if (tableShape === 'round') {
    const angle = (index / total) * 2 * Math.PI
    const radius = 0.45 // Slightly increased to account for chair size
    const x = Math.sin(angle) * radius * 100
    const y = -Math.cos(angle) * radius * 100
    return {
      left: `${35 + x}%`,
      top: `${35 + y}%`,
      transform: `translate(${x}%, ${y}%) rotate(${angle * (180 / Math.PI)}deg)`,
    }
  } else {
    const perSide = Math.ceil(total / 4)
    const side = Math.floor(index / perSide)
    const sideIndex = index % perSide
    const sidePercent = (sideIndex + 0.5) / perSide

    switch (side) {
      case 0: // Top
        return { left: `${sidePercent * 100}%`, top: '-27px', transform: 'translateX(-50%) rotate(0deg)' }
      case 1: // Right
        return { left: `${tableWidth}px`, top: `${sidePercent * 100}%`, transform: 'translateY(-50%) rotate(90deg)' }
      case 2: // Bottom
        return { left: `${(1 - sidePercent) * 100}%`, top: `${tableHeight}px`, transform: 'translateX(-50%) rotate(180deg)' }
      case 3: // Left
        return { left: '-27px', top: `${(1 - sidePercent) * 100}%`, transform: 'translateY(-50%) rotate(270deg)' }
      default:
        return { left: '0', top: '0', transform: 'none' }
    }
  }
}

export function DraggableTable({
  table,
  isSelected,
  onSelect,
  onRotate,
  onRemove,
  onAddChair,
  onRemoveChair,
  onUpdateName,
}: DraggableTableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: table.id,
  })
  const [isEditing, setIsEditing] = useState(false)
  const [tempName, setTempName] = useState(table.name)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isActionInProgress, setIsActionInProgress] = useState(false)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const style = {
    transform: CSS.Translate.toString(transform),
    left: table.position.x,
    top: table.position.y,
    width: table.size.width,
    height: table.size.height,
    rotate: `${table.rotation}deg`,
  }

  const handleNameChange = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdateName(tempName)
    setIsEditing(false)
  }

  const handleAction = (action: () => void) => {
    if (!isActionInProgress) {
        setIsActionInProgress(true);
        action(); // Execute the action immediately
        setTimeout(() => setIsActionInProgress(false), 10); // Prevent rapid clicks
    }
};

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "absolute cursor-move",
        isSelected && "z-10"
      )}
      onClick={onSelect}
      {...listeners}
      {...attributes}
    >
      {/* Chairs */}
      {table.chairs.map((chair, index) => {
        const position = getChairPosition(index, table.chairs.length, table.shape, table.size.width, table.size.height)
        return (
          <div
            key={chair.id}
            style={{
              position: 'absolute',
              width: '30px',
              height: '30px',
              ...position,
            }}
            className={cn(
              "flex items-center justify-center",
              table.status === "Free" && "text-green-500",
              table.status === "Reserved" && "text-yellow-500",
              table.status === "Occupied" && "text-purple-500"
            )}
            aria-label={`Chair ${index + 1}`}
          >
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 11.25C7.5 8.35051 9.85051 6 12.75 6H17.25C20.1495 6 22.5 8.35051 22.5 11.25V15C22.5 15.4142 22.1642 15.75 21.75 15.75H8.25C7.83579 15.75 7.5 15.4142 7.5 15V11.25Z" fill="currentColor"/>
              <path d="M6 16.5C6 16.0858 6.33579 15.75 6.75 15.75H23.25C23.6642 15.75 24 16.0858 24 16.5V18C24 20.4853 21.9853 22.5 19.5 22.5H10.5C8.01472 22.5 6 20.4853 6 18V16.5Z" fill="currentColor"/>
            </svg>
          </div>
        )
      })}
      
      {/* Table */}
      <div
        className={cn(
          "relative border-2 bg-background",
          table.shape === "round" && "rounded-full",
          table.shape !== "round" && "rounded-lg",
          isSelected && "ring-2 ring-primary",
          table.status === "Free" && "border-green-500",
          table.status === "Reserved" && "border-yellow-500",
          table.status === "Occupied" && "border-purple-500"
        )}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <div className="flex h-full items-center justify-center">
          {isEditing ? (
            <form onSubmit={handleNameChange} className="w-full max-w-[80%]">
              <Input
                ref={inputRef}
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="text-sm font-medium text-center"
                onBlur={handleNameChange}
              />
            </form>
          ) : (
            <span className="text-sm font-medium">{table.name}</span>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="absolute right-1 top-1 h-6 w-6">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open table options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setIsEditing(true)}>
                <Edit2 className="mr-2 h-4 w-4" />
                Edit Name
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction(onRotate)}>
                <RotateCw className="mr-2 h-4 w-4" />
                Rotate Table
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction(onAddChair)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Chair
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Remove Chair
                <DropdownMenu>
                  <DropdownMenuTrigger className="ml-auto">
                    <ChevronRight className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {table.chairs.map((chair, index) => (
                      <DropdownMenuItem key={chair.id} onClick={() => handleAction(() => onRemoveChair(chair.id))}>
                        <Minus className="mr-2 h-4 w-4" />
                        Chair {index + 1}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleAction(onRemove)}>
                <Trash className="mr-2 h-4 w-4" />
                Remove Table
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}


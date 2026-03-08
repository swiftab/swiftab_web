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
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent
} from "@/components/ui/dropdown-menu"
import { TableItem } from "@/types/table"

interface DraggableTableProps {
  table: TableItem; isSelected: boolean; onSelect: (e:any) => void;
  onRotate: () => void; onRemove: () => void; onAddChair: () => void;
  onRemoveChair: (chairId: string) => void; onUpdateName: (newName: string) => void;
}

function getChairPosition(index: number, total: number, tableShape: string, tableWidth: number, tableHeight: number) {
  if (tableShape === 'round') {
    const angle = (index / total) * 2 * Math.PI
    const radius = 0.55 // Distance from center
    const x = Math.sin(angle) * radius * 100
    const y = -Math.cos(angle) * radius * 100
    return { left: `calc(50% + ${x}% - 12px)`, top: `calc(50% + ${y}% - 12px)`, transform: `rotate(${angle * (180 / Math.PI)}deg)` }
  } else {
    const perSide = Math.ceil(total / 4)
    const side = Math.floor(index / perSide)
    const sidePercent = ((index % perSide) + 0.5) / perSide
    switch (side) {
      case 0: return { left: `${sidePercent * 100}%`, top: '-16px', transform: 'translateX(-50%) rotate(0deg)' } // Top
      case 1: return { left: `calc(100% + 16px)`, top: `${sidePercent * 100}%`, transform: 'translateY(-50%) rotate(90deg)' } // Right
      case 2: return { left: `${(1 - sidePercent) * 100}%`, top: `calc(100% + 16px)`, transform: 'translateX(-50%) rotate(180deg)' } // Bottom
      case 3: return { left: '-16px', top: `${(1 - sidePercent) * 100}%`, transform: 'translateY(-50%) rotate(270deg)' } // Left
      default: return { left: '0', top: '0', transform: 'none' }
    }
  }
}

export function DraggableTable({ table, isSelected, onSelect, onRotate, onRemove, onAddChair, onRemoveChair, onUpdateName }: DraggableTableProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: table.id })
  const [isEditing, setIsEditing] = useState(false)
  const [tempName, setTempName] = useState(table.name)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { if (isEditing && inputRef.current) inputRef.current.focus() }, [isEditing])

  const handleNameChange = (e: React.FormEvent) => {
    e.preventDefault(); onUpdateName(tempName); setIsEditing(false);
  }

  // Combine dragging coordinates with rotation state
  const style = {
    transform: `${CSS.Translate.toString(transform)} rotate(${table.rotation}deg)`,
    left: table.position.x,
    top: table.position.y,
    width: table.size.width,
    height: table.size.height,
  }

  // Status Indicator Colors
  const statusColor = table.status === "Free" ? "bg-emerald-400" : table.status === "Reserved" ? "bg-amber-400" : "bg-indigo-500";

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "absolute cursor-grab active:cursor-grabbing transition-all duration-200 ease-out",
        isSelected && "z-20",
        isDragging && "scale-105 z-50 opacity-90" // "Pick up" physics
      )}
      onClick={onSelect}
      {...listeners}
      {...attributes}
    >
      {/* Render Chairs */}
      {table.chairs.map((chair, index) => {
        const position = getChairPosition(index, table.chairs.length, table.shape, table.size.width, table.size.height)
        return (
          <div
            key={chair.id}
            style={{ position: 'absolute', width: '24px', height: '24px', ...position }}
            className="bg-white border-2 border-slate-200 rounded-full shadow-sm"
          />
        )
      })}
      
      {/* Render Table Surface */}
      <div
        className={cn(
          "relative w-full h-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)] border border-slate-200 flex flex-col items-center justify-center group transition-colors",
          table.shape === "round" ? "rounded-full" : "rounded-xl",
          isSelected && "ring-2 ring-indigo-500 border-transparent shadow-[0_8px_20px_rgba(99,102,241,0.2)]"
        )}
      >
        {/* Status Indicator Dot */}
        <div className={cn("absolute top-2 right-2 h-2.5 w-2.5 rounded-full shadow-inner", statusColor)} />

        {isEditing ? (
          <form onSubmit={handleNameChange} className="w-full px-2" onPointerDown={(e) => e.stopPropagation()}>
            <Input
              ref={inputRef}
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="text-xs font-bold text-center h-7 px-1 bg-gray-50 border-gray-200 focus:ring-indigo-500"
              onBlur={handleNameChange}
            />
          </form>
        ) : (
          <>
            <span className="text-sm font-bold text-slate-800 tracking-tight">{table.name}</span>
            <span className="text-[10px] font-medium text-slate-400">{table.chairs.length} Seats</span>
          </>
        )}

        {/* Hover Context Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="secondary" 
              size="icon" 
              className="absolute -top-3 -right-3 h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 shadow-md bg-white border border-gray-100 transition-opacity"
              onPointerDown={(e) => e.stopPropagation()} // Prevent dragging when clicking menu
            >
              <MoreHorizontal className="h-3.5 w-3.5 text-gray-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48 rounded-xl shadow-lg border-gray-100 p-1">
            <DropdownMenuItem onClick={() => setIsEditing(true)} className="rounded-lg text-sm">
              <Edit2 className="mr-2 h-3.5 w-3.5 text-gray-400" /> Edit Name
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onRotate} className="rounded-lg text-sm">
              <RotateCw className="mr-2 h-3.5 w-3.5 text-gray-400" /> Rotate 90°
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onAddChair} className="rounded-lg text-sm">
              <Plus className="mr-2 h-3.5 w-3.5 text-gray-400" /> Add Chair
            </DropdownMenuItem>
            
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="rounded-lg text-sm">
                <Minus className="mr-2 h-3.5 w-3.5 text-gray-400" /> Remove Chair
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="rounded-xl shadow-lg border-gray-100 p-1">
                  {table.chairs.map((chair, index) => (
                    <DropdownMenuItem key={chair.id} onClick={() => onRemoveChair(chair.id)} className="rounded-lg text-sm">
                      Chair {index + 1}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuSeparator className="bg-gray-100" />
            <DropdownMenuItem onClick={onRemove} className="rounded-lg text-sm text-rose-600 focus:bg-rose-50 focus:text-rose-700">
              <Trash className="mr-2 h-3.5 w-3.5" /> Remove Table
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
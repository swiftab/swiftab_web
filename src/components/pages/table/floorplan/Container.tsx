'use client'

import * as React from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { RockingChairIcon as ChairIcon, TableIcon } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Item = {
  id: string
  type: 'chair' | 'table'
}

type GridItem = {
  id: string
  item: Item | null
}

const GRID_SIZE = 10

export default function Container() {
  const [items, setItems] = React.useState<Item[]>([
    { id: 'chair1', type: 'chair' },
    { id: 'chair2', type: 'chair' },
    { id: 'chair3', type: 'chair' },
    { id: 'chair4', type: 'chair' },
    { id: 'table1', type: 'table' },
    { id: 'table2', type: 'table' },
  ])

  const [grid, setGrid] = React.useState<GridItem[]>(
    Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => ({
      id: `grid-${index}`,
      item: null,
    }))
  )

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result

    // If there's no destination, we don't need to do anything
    if (!destination) return

    // If the source and destination are the same, we don't need to do anything
    if (source.droppableId === destination.droppableId && source.index === destination.index) return

    // Moving from items to grid
    if (source.droppableId === 'items' && destination.droppableId.startsWith('grid-')) {
      const newItems = Array.from(items)
      const [movedItem] = newItems.splice(source.index, 1)
      setItems(newItems)

      const newGrid = [...grid]
      const destIndex = parseInt(destination.droppableId.split('-')[1])
      newGrid[destIndex] = { ...newGrid[destIndex], item: movedItem }
      setGrid(newGrid)
    }
    // Moving within the grid
    else if (source.droppableId.startsWith('grid-') && destination.droppableId.startsWith('grid-')) {
      const newGrid = [...grid]
      const sourceIndex = parseInt(source.droppableId.split('-')[1])
      const destIndex = parseInt(destination.droppableId.split('-')[1])
      const [movedItem] = [newGrid[sourceIndex].item]
      newGrid[sourceIndex] = { ...newGrid[sourceIndex], item: null }
      newGrid[destIndex] = { ...newGrid[destIndex], item: movedItem }
      setGrid(newGrid)
    }
    // Moving from grid back to items (optional feature)
    else if (source.droppableId.startsWith('grid-') && destination.droppableId === 'items') {
      const newGrid = [...grid]
      const sourceIndex = parseInt(source.droppableId.split('-')[1])
      const [movedItem] = [newGrid[sourceIndex].item]
      newGrid[sourceIndex] = { ...newGrid[sourceIndex], item: null }
      setGrid(newGrid)

      const newItems = Array.from(items)
      newItems.splice(destination.index, 0, movedItem!)
      setItems(newItems)
    }
  }

  return (
    <div className="flex h-screen">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="w-1/4 bg-gray-100 p-4">
          <Tabs defaultValue="items" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="items">Items</TabsTrigger>
              <TabsTrigger value="saved">Saved Layouts</TabsTrigger>
            </TabsList>
            <TabsContent value="items">
              <Card>
                <CardContent className="pt-6">
                  <Droppable droppableId="items" direction="vertical">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                        {items.map((item, index) => (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="bg-white p-2 rounded shadow"
                              >
                                {item.type === 'chair' ? (
                                  <ChairIcon className="h-6 w-6" />
                                ) : (
                                  <TableIcon className="h-6 w-6" />
                                )}
                                <span className="ml-2">{item.type === 'chair' ? 'Chair' : 'Table'}</span>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="saved">
              <Card>
                <CardContent>
                  <p>Saved layouts will appear here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div className="flex-1 p-4">
          <div className="grid grid-cols-10 gap-1">
            {grid.map((cell, index) => (
              <Droppable key={cell.id} droppableId={`grid-${index}`}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={cn(
                      "h-16 w-16 border border-gray-200 flex items-center justify-center",
                      snapshot.isDraggingOver && "bg-blue-100"
                    )}
                  >
                    {cell.item && (
                      <Draggable draggableId={`grid-item-${cell.item.id}`} index={0}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="w-full h-full flex items-center justify-center"
                          >
                            {cell.item.type === 'chair' ? (
                              <ChairIcon className="h-8 w-8 text-gray-600" />
                            ) : (
                              <TableIcon className="h-8 w-8 text-gray-600" />
                            )}
                          </div>
                        )}
                      </Draggable>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
          <div className="mt-4">
            <Button onClick={() => console.log('Save layout', grid)}>Save Layout</Button>
          </div>
        </div>
      </DragDropContext>
    </div>
  )
}
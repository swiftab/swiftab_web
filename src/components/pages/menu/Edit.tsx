"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Pencil } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface MenuItem {
  id: string
  menu: string
  description: string
  price: number
  category: "breakfast" | "lunch" | "dinner"
  image: string
  code: string
}

interface EditItemSheetProps {
  item: MenuItem
  onEditItem: (item: MenuItem) => void
}

export default function EditItemSheet({ item, onEditItem }: EditItemSheetProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [editedItem, setEditedItem] = React.useState<MenuItem>(item)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onEditItem(editedItem)
    setIsOpen(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Edit {item.menu}</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Menu Item</SheetTitle>
          <SheetDescription>Make changes to the menu item here. Click save when you're done.</SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="grid gap-6 py-6">
          <div className="grid gap-2">
            <Label htmlFor="edit-menu">Menu Item</Label>
            <Input
              id="edit-menu"
              value={editedItem.menu}
              onChange={(e) => setEditedItem({ ...editedItem, menu: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-description">Description</Label>
            <Input
              id="edit-description"
              value={editedItem.description}
              onChange={(e) => setEditedItem({ ...editedItem, description: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-price">Price</Label>
            <Input
              id="edit-price"
              value={editedItem.price}
              onChange={(e) => {
                const value = e.target.value
                if (!isNaN(Number(value)) || value === "") {
                  setEditedItem({
                    ...editedItem,
                    price: Number(value),
                  })
                }
              }}
            />
          </div>
          <Button type="submit" className="w-full">
            Save changes
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}

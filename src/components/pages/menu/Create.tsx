"use client"

import React, { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Loader, Plus } from "lucide-react"
import { useAddMenu } from "@/hooks/restauranthook/addmenuhook"
import { Switch } from "@/components/ui/switch"
import Image from "next/image"

// Define the type for a menu item
interface MenuItem {
  name: string
  description: string
  cost: number
  rate: number
  //category: "breakfast" | "lunch" | "dinner";
  image: string
}

type categoryprop = {
  category: "breakfast" | "lunch" | "dinner"
}

export default function CreateItemSheet() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [useFileUpload, setUseFileUpload] = React.useState(true)
  const [imageFile, setImageFile] = React.useState<File | null>(null)

  const [newItem, setNewItem] = React.useState<MenuItem>({
    name: "",
    description: "",
    cost: 0,
    rate: 0,
    image: "",
  })

  const [category, setCategory] = React.useState<categoryprop>({
    category: "breakfast",
  })

  const { mutate: addMenuItem, isPending } = useAddMenu()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("name", newItem.name)
    formData.append("description", newItem.description)
    formData.append("cost", newItem.cost.toString())
    formData.append("rate", newItem.rate.toString())
    formData.append("category", category.category)

    if (imageFile) {
      formData.append("image", imageFile)
    } else if (newItem.image) {
      formData.append("image", newItem.image)
    }

    addMenuItem(
      { data: formData, menuType: category.category },
      {
        onSuccess: () => {
          console.log("Menu item added successfully")
          setIsOpen(false)
          setNewItem({ name: "", description: "", cost: 0, rate: 0, image: "" })
          setImageFile(null)
        },
        onError: (error) => {
          console.error("Failed to add menu item:", error)
        },
      },
    )
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="bg-gray-200 hover:bg-gray-300 text-black">
          <Plus className="mr-2 h-4 w-4" />
          Create New Item
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add Menu</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="space-y-4">
            <div className="flex flex-row justify-between items-center gap-2">
              <div className="flex-1">
                <Label htmlFor="name" className="text-sm font-medium">
                  Menu Item
                </Label>
                <Input
                  id="name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="mt-1"
                  placeholder="Enter item name"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="price" className="text-sm font-medium">
                  Price
                </Label>
                <Input
                  id="cost"
                  type="number"
                  value={newItem.cost}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      cost: Number.parseFloat(e.target.value) || 0,
                    })
                  }
                  className="mt-1"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="text-sm font-medium">
                Description
              </Label>
              <textarea
                id="description"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                className="mt-1 flex h-20 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Describe the menu item"
              />
            </div>

            <div>
              <Label htmlFor="category" className="text-sm font-medium">
                Category
              </Label>
              <select
                id="category"
                value={category.category}
                onChange={(e) =>
                  setCategory({
                    ...newItem,
                    category: e.target.value as "breakfast" | "lunch" | "dinner",
                  })
                }
                className="mt-1 flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="imageToggle" className="text-sm font-medium">
                Image Upload Method
              </Label>
              <div className="flex items-center space-x-2">
                <Label htmlFor="imageToggle" className="text-sm">
                  URL
                </Label>
                <Switch id="imageToggle" checked={useFileUpload} onCheckedChange={setUseFileUpload} />
                <Label htmlFor="imageToggle" className="text-sm">
                  File
                </Label>
              </div>
            </div>

            {useFileUpload ? (
              <div>
                <Label htmlFor="imageFile" className="text-sm font-medium">
                  Upload Image
                </Label>
                <Input
                  id="imageFile"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      setImageFile(file)
                      const reader = new FileReader()
                      reader.onload = () => {
                        if (reader.result) {
                          setNewItem({
                            ...newItem,
                            image: reader.result as string,
                          })
                        }
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                  className="mt-1"
                />
              </div>
            ) : (
              <div>
                <Label htmlFor="imageUrl" className="text-sm font-medium">
                  Image URL
                </Label>
                <Input
                  id="imageUrl"
                  type="text"
                  value={newItem.image}
                  onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                  className="mt-1"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            )}
          </div>

          {newItem.image && (
            <div className="mt-4">
              <Label className="text-sm font-medium">Image Preview:</Label>
              <div className="mt-2 border rounded-md overflow-hidden">
                <Image
                  src={newItem.image || "/placeholder.svg"}
                  alt="Selected Menu Item"
                  width={400}
                  height={96}
                  className="w-full h-24 object-cover"
                />
              </div>
            </div>
          )}

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? (
              <span className="flex items-center justify-center">
                <Loader className="animate-spin mr-2" />
                Saving...
              </span>
            ) : (
              "Save Item"
            )}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}

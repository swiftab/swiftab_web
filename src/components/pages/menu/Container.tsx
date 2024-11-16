'use client'

import * as React from "react"
import { Search, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import DeleteConfirmationDialog from "./Delete"
import EditItemDialog from "./Edit"
import CreateItemDialog from "./Create"

const initialMenuItems = [
  {
    id: "1",
    code: "#430085",
    menu: "Eggs Benedict",
    image: "/placeholder.svg",
    description: "Classic breakfast dish with hollandaise sauce",
    price: "$12.99",
    category: "breakfast"
  },
  {
    id: "2",
    code: "#430086",
    menu: "Grilled Chicken Salad",
    image: "/placeholder.svg",
    description: "Fresh salad with grilled chicken breast",
    price: "$10.50",
    category: "lunch"
  },
  {
    id: "3",
    code: "#430087",
    menu: "Steak Frites",
    image: "/placeholder.svg",
    description: "Juicy steak served with crispy fries",
    price: "$24.99",
    category: "dinner"
  },
  // Add more menu items to test scrolling
  ...[...Array(20)].map((_, index) => ({
    id: `${index + 4}`,
    code: `#4300${90 + index}`,
    menu: `Menu Item ${index + 4}`,
    image: "/placeholder.svg",
    description: `Description for Menu Item ${index + 4}`,
    price: `$${(Math.random() * 20 + 5).toFixed(2)}`,
    category: ["breakfast", "lunch", "dinner"][Math.floor(Math.random() * 3)]
  }))
]

export default function MenuManager() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [activeTab, setActiveTab] = React.useState("breakfast")
  const [menuItems, setMenuItems] = React.useState(initialMenuItems)
  const [editItem, setEditItem] = React.useState(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false)
  const [itemToDelete, setItemToDelete] = React.useState(null)

  const filteredMenuItems = menuItems.filter(
    (item) =>
      item.category === activeTab &&
      (item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.menu.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const handleCreateItem = (newItem) => {
    setMenuItems([...menuItems, { ...newItem, id: Date.now().toString() }])
  }

  const handleEditItem = (updatedItem) => {
    setMenuItems(menuItems.map(item => item.id === updatedItem.id ? updatedItem : item))
    setEditItem(null)
  }

  const handleDeleteItem = () => {
    setMenuItems(menuItems.filter(item => item.id !== itemToDelete.id))
    setIsDeleteDialogOpen(false)
    setItemToDelete(null)
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-10 bg-background shadow-md">
        <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-4xl font-bold tracking-tight text-primary">Manage Menu</h1>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search menu items..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <CreateItemDialog onCreateItem={handleCreateItem} />
          </div>
        </div>
      </div>
      <div className="flex-grow overflow-auto">
        <div className="max-w-7xl mx-auto p-4 md:p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3 mb-4">
              <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
              <TabsTrigger value="lunch">Lunch</TabsTrigger>
              <TabsTrigger value="dinner">Dinner</TabsTrigger>
            </TabsList>
            {["breakfast", "lunch", "dinner"].map((category) => (
              <TabsContent key={category} value={category} className="border rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4 text-primary">{category.charAt(0).toUpperCase() + category.slice(1)} Menu</h2>
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Code</TableHead>
                        <TableHead>Menu Item</TableHead>
                        <TableHead className="hidden md:table-cell">Description</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMenuItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.code}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                                <img
                                  src={item.image}
                                  alt={item.menu}
                                  className="h-8 w-8 rounded object-cover"
                                />
                              </div>
                              <span>{item.menu}</span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{item.description}</TableCell>
                          <TableCell>{item.price}</TableCell>
                          <TableCell className="text-right">
                            <EditItemDialog item={item} onEditItem={handleEditItem} />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setItemToDelete(item)
                                setIsDeleteDialogOpen(true)
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete {item.menu}</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteItem}
        itemName={itemToDelete?.menu}
      />
    </div>
  )
}
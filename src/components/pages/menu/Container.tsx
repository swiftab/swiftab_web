"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import DeleteConfirmationDialog from "./Delete";
import EditItemDialog from "./Edit";
import CreateItemDialog from "./Create";
import Image from "next/image";
import { fetchMenu } from "@/hooks/restauranthook/fetchmenuhook";
import { useDeleteMenu } from "@/hooks/restauranthook/deletehook";
import { toast } from "@/hooks/use-toast";
import { useEditMenuItem } from "@/hooks/restauranthook/editmenuhook";
import { FullScreenLoader } from "@/components/Loading/FullScreen";

interface MenuItem {
  id: string;
  code: string;
  menu: string;
  image: string;
  description: string;
  price: number;
  category: "breakfast" | "lunch" | "dinner";
}

export default function MenuManager() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("breakfast");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<MenuItem | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [restaurantName, setRestaurantName] = useState("");

  useEffect(() => {
    const restaurantData = localStorage.getItem("RestaurantData");
    if (restaurantData) {
      const parsedData = JSON.parse(restaurantData);
      const name = parsedData.restaurant?.data[0]?.restaurantName;
      if (name) {
        setRestaurantName(name);
      }
    } else {
      console.log("No restaurant data found in localStorage.");
    }
  }, []);

  const { data: menu, error, isPending } = useQuery({
    queryKey: ["menu"],
    queryFn: () => fetchMenu(),
  });

  const validCategories = ["breakfast", "lunch", "dinner"] as const;

  const menuItems: MenuItem[] = menu
    ? Object.entries(menu)
        .filter(([category]) =>
          validCategories.includes(category as (typeof validCategories)[number])
        )
        .flatMap(([category, items]) => {
          if (!Array.isArray(items)) {
            console.error(
              `Expected items to be an array for category ${category}, but got:`,
              items
            );
            return [];
          }
          return items.map((item: any) => ({
            id: item._id,
            code: item._id,
            menu: item.name,
            image: item.image,
            description: item.description,
            price: item.cost,
            category: category as "breakfast" | "lunch" | "dinner",
          }));
        })
    : [];

  const filteredMenuItems = menuItems.filter(
    (item) =>
      item.category === activeTab &&
      (item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.menu.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const editMutation = useEditMenuItem();

  const handleEditItem = (updatedItem: MenuItem, menuType: string) => {
    editMutation.mutate({ updatedItem, menuType });
  };

  const deleteMutation = useDeleteMenu();

  const handleDeleteItem = () => {
    if (itemToDelete) {
      deleteMutation.mutate({
        menuType: itemToDelete.category,
        itemId: itemToDelete.id,
      });
    }
  };

  useEffect(() => {
    if (deleteMutation.isSuccess) {
      toast({
        title: "Deleted!",
        description: "Menu item deleted successfully.",
        variant: "default",
      });

      // Close the dialog and reset the state after successful deletion
      setIsDeleteDialogOpen(false);
      setItemToDelete(null);
    }

    if (deleteMutation.isError && deleteMutation.error) {
      toast({
        title: "Error",
        description: deleteMutation.error.message || "An error occurred.",
        variant: "destructive",
      });
    }
  }, [deleteMutation.isSuccess, deleteMutation.isError, deleteMutation.error]);

  if (isPending) return <FullScreenLoader />
  if(deleteMutation.isPending) return <FullScreenLoader />
  if (error) return <div>Error loading menu</div>;

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between gap-4 border-b pb-2 mb-5">
        <h1 className="text-lg font-semibold">Menu</h1>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search menu items..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>
      <div className="flex justify-between items-center">
        <CreateItemDialog
        //onCreateItem={handleCreateItem}
        />
      </div>
      <div className="flex-grow overflow-auto">
        <div className="max-w-7xl mx-auto p-4 md:p-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full max-w-md grid-cols-3 mb-4">
              <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
              <TabsTrigger value="lunch">Lunch</TabsTrigger>
              <TabsTrigger value="dinner">Dinner</TabsTrigger>
            </TabsList>
            {["breakfast", "lunch", "dinner"].map((category) => (
              <TabsContent
                key={category}
                value={category}
                className="border rounded-lg p-6"
              >
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Code</TableHead>
                        <TableHead>Menu Item</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Description
                        </TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMenuItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">
                          {`****${item.code.slice(-4)}`}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                                <Image
                                  src={item.image}
                                  alt={item.menu}
                                  width={20}
                                  height={20}
                                  className="h-8 w-8 rounded object-cover"
                                />
                              </div>
                              <span>{item.menu}</span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {item.description}
                          </TableCell>
                          <TableCell>{item.price}</TableCell>
                          <TableCell className="text-right">
                            <EditItemDialog
                              item={item}
                              onEditItem={(updatedItem) =>
                                handleEditItem(updatedItem, item.category)
                              }
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setItemToDelete(item);
                                setIsDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">
                                Delete {item.menu}
                              </span>
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
  );
}
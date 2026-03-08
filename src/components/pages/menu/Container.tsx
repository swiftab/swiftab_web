"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Search,
  Trash2,
  Coffee,
  Sun,
  Moon,
  AlertCircle,
  UtensilsCrossed,
} from "lucide-react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

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
    }
  }, []);

  const {
    data: menu,
    error,
    isPending,
  } = useQuery({
    queryKey: ["menu"],
    queryFn: () => fetchMenu(),
  });

  const validCategories = ["breakfast", "lunch", "dinner"] as const;

  const menuItems: MenuItem[] = React.useMemo(() => {
    if (!menu) return [];
    return Object.entries(menu)
      .filter(([category]) => validCategories.includes(category as any))
      .flatMap(([category, items]) => {
        if (!Array.isArray(items)) return [];
        return items.map((item: any) => ({
          id: item._id,
          code: item._id,
          menu: item.name,
          image: item.image,
          description: item.description,
          price: item.cost,
          category: category as "breakfast" | "lunch" | "dinner",
        }));
      });
  }, [menu]);

  const filteredMenuItems = React.useMemo(() => {
    return menuItems.filter(
      (item) =>
        item.category === activeTab &&
        (item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.menu.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())),
    );
  }, [menuItems, activeTab, searchQuery]);

  // Category counts for the tabs
  const getCount = (category: string) =>
    menuItems.filter((item) => item.category === category).length;

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
        title: "Item Deleted",
        description: "The menu item was removed successfully.",
      });
      setIsDeleteDialogOpen(false);
      setItemToDelete(null);
    }
    if (deleteMutation.isError && deleteMutation.error) {
      toast({
        title: "Error",
        description: deleteMutation.error.message || "Failed to delete item.",
        variant: "destructive",
      });
    }
  }, [deleteMutation.isSuccess, deleteMutation.isError, deleteMutation.error]);

  const formatPrice = (price: number) => {
    return price.toLocaleString("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  // Graceful error state
  if (error) {
    return (
      <div className="w-full flex-1 p-6">
        <div className="rounded-xl border border-red-100 bg-red-50 p-8 text-center max-w-2xl mx-auto mt-12">
          <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-900 mb-2">
            Failed to load menu
          </h3>
          <p className="text-red-600 text-sm">
            Please check your connection and refresh the page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex-1 p-4 md:p-8 bg-gray-50/30 min-h-screen relative oswald">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-end items-end sm:items-end gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search menu items..."
              className="pl-9 bg-white border-gray-200 focus:ring-teal-500/20 focus:border-teal-500 transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            {/* Tab Controls */}
            <div className="p-4 border-b border-gray-100 bg-gray-50/50">
              <TabsList className="h-10 bg-gray-100/80 p-1 grid grid-cols-3 max-w-md">
                <TabsTrigger
                  value="breakfast"
                  className="rounded-md text-xs sm:text-sm flex items-center gap-2"
                >
                  <Coffee className="w-4 h-4 hidden sm:block text-amber-600" />
                  Breakfast{" "}
                  <Badge variant="secondary" className="ml-1 bg-white">
                    {getCount("breakfast")}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="lunch"
                  className="rounded-md text-xs sm:text-sm flex items-center gap-2"
                >
                  <Sun className="w-4 h-4 hidden sm:block text-orange-500" />
                  Lunch{" "}
                  <Badge variant="secondary" className="ml-1 bg-white">
                    {getCount("lunch")}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="dinner"
                  className="rounded-md text-xs sm:text-sm flex items-center gap-2"
                >
                  <Moon className="w-4 h-4 hidden sm:block text-indigo-500" />
                  Dinner{" "}
                  <Badge variant="secondary" className="ml-1 bg-white">
                    {getCount("dinner")}
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Tab Contents */}
            {["breakfast", "lunch", "dinner"].map((category) => (
              <TabsContent
                key={category}
                value={category}
                className="m-0 focus-visible:outline-none"
              >
                {isPending || deleteMutation.isPending ? (
                  <div className="p-6">
                    <MenuLoadingSkeleton />
                  </div>
                ) : filteredMenuItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="h-16 w-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                      <UtensilsCrossed className="h-8 w-8 text-gray-300" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">
                      No items found
                    </h3>
                    <p className="text-sm text-gray-500 max-w-sm mt-1">
                      {searchQuery
                        ? "No items match your search. Try different keywords."
                        : `Your ${category} menu is currently empty.`}
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table className="min-w-full">
                      <TableHeader className="bg-gray-50/50">
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="w-100px font-semibold text-gray-600">
                            Code
                          </TableHead>
                          <TableHead className="font-semibold text-gray-600">
                            Item Details
                          </TableHead>
                          <TableHead className="hidden md:table-cell font-semibold text-gray-600 w-1/3">
                            Description
                          </TableHead>
                          <TableHead className="font-semibold text-gray-600">
                            Price
                          </TableHead>
                          <TableHead className="text-right font-semibold text-gray-600 pr-6">
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredMenuItems.map((item) => (
                          <TableRow
                            key={item.id}
                            className="hover:bg-gray-50/80 transition-colors"
                          >
                            <TableCell>
                              <Badge
                                variant="outline"
                                className="text-xs font-mono text-gray-500 bg-gray-50"
                              >
                                ...{item.code.slice(-4)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200/60 shadow-sm shrink-0">
                                  <Image
                                    src={item.image}
                                    alt={item.menu}
                                    width={48}
                                    height={48}
                                    className="object-cover h-full w-full"
                                  />
                                </div>
                                <span className="font-semibold text-gray-900">
                                  {item.menu}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell text-sm text-gray-500 pr-8">
                              <span className="line-clamp-2">
                                {item.description}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className="font-semibold text-gray-900">
                                {formatPrice(item.price)}
                              </span>
                            </TableCell>
                            <TableCell className="text-right pr-6">
                              <div className="flex items-center justify-end gap-1">
                                <EditItemDialog
                                  item={item}
                                  onEditItem={(updatedItem) =>
                                    handleEditItem(updatedItem, item.category)
                                  }
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                  onClick={() => {
                                    setItemToDelete(item);
                                    setIsDeleteDialogOpen(true);
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      <div
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 group
                     flex items-center justify-center"
      >
        <CreateItemDialog />
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

function MenuLoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0"
        >
          <Skeleton className="h-6 w-16 bg-gray-100" />
          <div className="flex items-center gap-3 flex-1 px-4">
            <Skeleton className="h-12 w-12 rounded-lg bg-gray-100 shrink-0" />
            <Skeleton className="h-5 w-32 bg-gray-100" />
          </div>
          <div className="hidden md:block flex-1">
            <Skeleton className="h-4 w-3/4 bg-gray-100" />
          </div>
          <Skeleton className="h-5 w-20 bg-gray-100 mx-4" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8 rounded-md bg-gray-100" />
            <Skeleton className="h-8 w-8 rounded-md bg-gray-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

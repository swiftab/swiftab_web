"use client"

import * as React from "react";
import { Search } from "lucide-react";

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
import Image from "next/image";

const orders = [
  {
    code: "#430085",
    menu: "Hamburger",
    image: "/placeholder.svg",
    customer: "Devon Lane",
    price: "$5.42",
  },
  {
    code: "#430086",
    menu: "Burger with cheese",
    image: "/placeholder.svg",
    customer: "Jacob Jones",
    price: "$12.00",
  },
  {
    code: "#430084",
    menu: "Potato with drink",
    image: "/placeholder.svg",
    customer: "Ronald Richards",
    price: "$8.50",
  },
  {
    code: "#430087",
    menu: "Burger with cheese",
    image: "/placeholder.svg",
    customer: "Esther Howard",
    price: "$12.00",
  },
  {
    code: "#430088",
    menu: "Bread and chicken",
    image: "/placeholder.svg",
    customer: "Wade Warren",
    price: "$9.99",
  },
  {
    code: "#430089",
    menu: "Hamburger",
    image: "/placeholder.svg",
    customer: "Kathryn Murphy",
    price: "$5.42",
  },
  {
    code: "#430078",
    menu: "Gourmet burger",
    image: "/placeholder.svg",
    customer: "Brooklyn Simmons",
    price: "$15.99",
  },
  {
    code: "#430079",
    menu: "Hamburger",
    image: "/placeholder.svg",
    customer: "Kristin Watson",
    price: "$5.42",
  },
];

export default function Container() {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredOrders = orders.filter(
    (order) =>
      order.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.menu.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full flex-1 space-y-4 p-4 md:p-8 pt-6 overflow-x-auto">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Order</h2>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="previous">Previous</TabsTrigger>
            <TabsTrigger value="canceled">Canceled</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="border rounded-lg mt-6">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
              <div className="rounded-lg border">
                <Table className="min-w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">CODE</TableHead>
                      <TableHead>MENU</TableHead>
                      <TableHead>CUSTOMER NAME</TableHead>
                      <TableHead className="text-right">PRICE</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.code}>
                        <TableCell className="font-medium">{order.code}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                              <Image
                                src={order.image}
                                alt={order.menu}
                                className="h-8 w-8 rounded"
                              />
                            </div>
                            {order.menu}
                          </div>
                        </TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell className="text-right">{order.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="recent">
            <div className="flex h-[450px] items-center justify-center border rounded-lg">
              <p className="text-muted-foreground">Recent orders will appear here</p>
            </div>
          </TabsContent>
          <TabsContent value="previous">
            <div className="flex h-[450px] items-center justify-center border rounded-lg">
              <p className="text-muted-foreground">Previous orders will appear here</p>
            </div>
          </TabsContent>
          <TabsContent value="canceled">
            <div className="flex h-[450px] items-center justify-center border rounded-lg">
              <p className="text-muted-foreground">Canceled orders will appear here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

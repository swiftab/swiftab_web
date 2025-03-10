"use client";

import * as React from "react";
import { Search, AlertCircle, CheckCircle2, Clock, XCircle } from "lucide-react";
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
import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "@/hooks/orderhook/fetchorder";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

export default function OrdersContainer() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("all");

  // Fetch orders data
  const { data, error, isPending } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders
  });

  const orders = data?.orders || [];

  // Filter orders based on search query
  const filteredOrders = React.useMemo(() => {
    return orders.filter(order => 
      order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.menu.some(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      order.tableNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [orders, searchQuery]);

  // Filter orders based on status for tabs
  const getFilteredOrdersByStatus = React.useCallback((status) => {
    if (status === "all") return filteredOrders;
    if (status === "recent") return filteredOrders.filter(order => order.status === "Not-served");
    if (status === "previous") return filteredOrders.filter(order => order.status === "Served");
    if (status === "canceled") return filteredOrders.filter(order => order.paid === "Cancelled" || order.status === "Cancelled");
    return filteredOrders;
  }, [filteredOrders]);

  // Calculate total price for an order
  const calculateOrderTotal = (order) => {
    return order.menu.reduce((total, item) => total + (item.cost * item.quantity), 0);
  };

  // Format price to display with currency
  const formatPrice = (price) => {
    return (price / 100).toLocaleString('en-KE', { 
      style: 'currency', 
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  // Get status icon and color
  const getStatusDetails = (status, paid) => {
    if (status === "Served" && paid === "Paid") 
      return { icon: <CheckCircle2 className="h-4 w-4 text-green-500" />, color: "bg-green-100 text-green-800" };
    if (status === "Served") 
      return { icon: <CheckCircle2 className="h-4 w-4 text-blue-500" />, color: "bg-blue-100 text-blue-800" };
    if (status === "Not-served") 
      return { icon: <Clock className="h-4 w-4 text-amber-500" />, color: "bg-amber-100 text-amber-800" };
    
    return { icon: <XCircle className="h-4 w-4 text-red-500" />, color: "bg-red-100 text-red-800" };
  };

  // Calculate metrics for the summary
  const metrics = React.useMemo(() => {
    return {
      total: orders.length,
      served: orders.filter(order => order.status === "Served").length,
      pending: orders.filter(order => order.status === "Not-served").length,
      revenue: orders.reduce((total, order) => total + calculateOrderTotal(order), 0)
    };
  }, [orders]);

  if (error) {
    return (
      <div className="w-full flex-1 p-8">
        <Card className="border-red-200">
          <CardHeader className="text-red-700">
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Error Loading Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>There was a problem loading your orders. Please try again later.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full flex-1 p-4 overflow-x-auto">
      <div className="space-y-6">
        {/* Summary Cards */}
        {!isPending && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Orders</CardDescription>
                <CardTitle className="text-2xl">{metrics.total}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Served Orders</CardDescription>
                <CardTitle className="text-2xl text-green-600">{metrics.served}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Pending Orders</CardDescription>
                <CardTitle className="text-2xl text-amber-600">{metrics.pending}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Revenue</CardDescription>
                <CardTitle className="text-2xl">{formatPrice(metrics.revenue)}</CardTitle>
              </CardHeader>
            </Card>
          </div>
        )}

        <header className="flex items-center justify-between gap-4">
          <span />
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-4 h-auto">
            <TabsTrigger value="all" className="py-2">
              All <Badge className="ml-2 bg-gray-100 text-gray-800">{filteredOrders.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="recent" className="py-2">
              Pending <Badge className="ml-2 bg-amber-100 text-amber-800">{getFilteredOrdersByStatus("recent").length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="previous" className="py-2">
              Served <Badge className="ml-2 bg-green-100 text-green-800">{getFilteredOrdersByStatus("previous").length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="canceled" className="py-2">
              Canceled <Badge className="ml-2 bg-red-100 text-red-800">{getFilteredOrdersByStatus("canceled").length}</Badge>
            </TabsTrigger>
          </TabsList>
          
          {["all", "recent", "previous", "canceled"].map((tab) => (
            <TabsContent key={tab} value={tab} className="border rounded-lg mt-6">
              <div className="p-4 md:p-6">
                {isPending ? (
                  <OrdersLoadingSkeleton />
                ) : getFilteredOrdersByStatus(tab).length === 0 ? (
                  <div className="flex h-64 items-center justify-center">
                    <p className="text-muted-foreground">No orders found</p>
                  </div>
                ) : (
                  <div className="rounded-lg border">
                    <Table className="min-w-full">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[120px]">ORDER ID</TableHead>
                          <TableHead>MENU ITEMS</TableHead>
                          <TableHead>TABLE</TableHead>
                          <TableHead>STATUS</TableHead>
                          <TableHead className="text-right pr-6">TOTAL</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getFilteredOrdersByStatus(tab).map((order) => {
                          const { icon, color } = getStatusDetails(order.status, order.paid);
                          const totalPrice = calculateOrderTotal(order);
                          
                          return (
                            <TableRow key={order._id} className="cursor-pointer hover:bg-gray-50">
                              <TableCell className="font-medium">{order.orderId}</TableCell>
                              <TableCell>
                                <div className="flex flex-col gap-1">
                                  {order.menu.slice(0, 2).map((item, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                      <div className="h-8 w-8 rounded-md bg-gray-50 flex items-center justify-center overflow-hidden">
                                        <Image
                                          src={item.image}
                                          alt={item.name}
                                          width={32}
                                          height={32}
                                          className="h-8 w-8 object-cover"
                                        />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <p className="text-sm truncate">{item.name}</p>
                                        <p className="text-xs text-gray-500">x{item.quantity}</p>
                                      </div>
                                    </div>
                                  ))}
                                  {order.menu.length > 2 && (
                                    <p className="text-xs text-gray-500 ml-10">
                                      +{order.menu.length - 2} more items
                                    </p>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">{order.tableNumber}</Badge>
                              </TableCell>
                              <TableCell>
                                <Badge className={`flex gap-1 items-center ${color}`}>
                                  {icon}
                                  {order.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right font-medium pr-6">
                                {formatPrice(totalPrice)}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

// Loading skeleton
function OrdersLoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-8 w-24" />
          </div>
          {[1, 2, 3, 4].map(item => (
            <div key={item} className="py-3 flex items-center gap-4">
              <Skeleton className="h-10 w-24" />
              <div className="flex items-center gap-2 flex-1">
                <Skeleton className="h-10 w-10 rounded-md" />
                <Skeleton className="h-6 w-32" />
              </div>
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
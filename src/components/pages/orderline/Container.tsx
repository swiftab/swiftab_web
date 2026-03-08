"use client";

import * as React from "react";
import {
  Search,
  AlertCircle,
  CheckCircle2,
  Clock,
  XCircle,
  ListOrdered,
  UtensilsCrossed,
  CalendarClock,
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
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "@/hooks/orderhook/fetchorder";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface MenuItem {
  _id: string;
  image: string;
  name: string;
  description: string;
  cost: number;
  quantity: number;
}

export interface Order {
  _id: string;
  userId: string;
  orderId: string;
  restaurantId: string;
  reservationId: string;
  tableNumber: string;
  items: MenuItem[];
  orderStatus: "placed" | "served" | "ready_to_pay" | "completed" | "cancelled";
  paid: "Paid" | "Unpaid";
  takenBy?: string;
  createdAt: string;
}

export default function OrdersContainer() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("all");

  const { data, error, isPending } = useQuery<{ orders: Order[] }>({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  const orders = data?.orders || [];

  const filteredOrders = React.useMemo(() => {
    return orders.filter(
      (order) =>
        order.orderId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items.some((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        order.tableNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [orders, searchQuery]);

  const getFilteredOrdersByStatus = React.useCallback(
    (status: string) => {
      if (status === "all") return filteredOrders;
      if (status === "recent") return filteredOrders.filter((o) => o.orderStatus === "placed");
      if (status === "previous") return filteredOrders.filter((o) => o.orderStatus === "served");
      if (status === "canceled") return filteredOrders.filter((o) => o.orderStatus === "cancelled");
      return filteredOrders;
    },
    [filteredOrders]
  );

  const calculateOrderTotal = (order: Order): number => {
    return order.items.reduce((total, item) => total + item.cost * item.quantity, 0);
  };

  const formatPrice = (price: number) => {
    return (price).toLocaleString("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const formatTime = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-KE', { 
      hour: 'numeric', 
      minute: 'numeric',
      hour12: true 
    }).format(date);
  };

  const getStatusDetails = (status: string, paid: string) => {
    if (status === "served" && paid === "completed") {
      return {
        icon: <CheckCircle2 className="h-3.5 w-3.5 mr-1" />,
        classes: "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20",
        label: "Completed",
      };
    }
    if (status === "served") {
      return {
        icon: <CheckCircle2 className="h-3.5 w-3.5 mr-1" />,
        classes: "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20",
        label: "Served (Unpaid)",
      };
    }
    if (status === "placed") {
      return {
        icon: <Clock className="h-3.5 w-3.5 mr-1" />,
        classes: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20",
        label: "Preparing",
      };
    }
    return {
      icon: <XCircle className="h-3.5 w-3.5 mr-1" />,
      classes: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20",
      label: "cancelled",
    };
  };

  const metrics = React.useMemo(() => {
    return {
      total: orders.length,
      served: orders.filter((o) => o.orderStatus === "served").length,
      pending: orders.filter((o) => o.orderStatus === "placed").length,
      revenue: orders.reduce((total, o) => total + calculateOrderTotal(o), 0),
    };
  }, [orders]);

  if (error) {
    return (
      <div className="w-full flex-1 p-6">
        <div className="rounded-xl border border-red-100 bg-red-50 p-8 text-center max-w-2xl mx-auto mt-12">
          <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-900 mb-2">Failed to load orders</h3>
          <p className="text-red-600 text-sm">Please check your connection and try refreshing the dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex-1 p-4 md:p-8 bg-gray-50/50 min-h-screen oswald">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          {!isPending && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-none shadow-sm bg-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Orders</CardTitle>
                  <ListOrdered className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{metrics.total}</div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm bg-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Pending Setup</CardTitle>
                  <UtensilsCrossed className="h-4 w-4 text-amber-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-600">{metrics.pending}</div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm bg-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Served Today</CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{metrics.served}</div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm bg-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
                  
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold text-gray-900">{formatPrice(metrics.revenue)}</div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border-b border-gray-100">
              <TabsList className="h-10 bg-gray-100/80 p-1">
                <TabsTrigger value="all" className="rounded-md text-xs sm:text-sm px-3">
                  All
                </TabsTrigger>
                <TabsTrigger value="recent" className="rounded-md text-xs sm:text-sm px-3">
                  Pending
                </TabsTrigger>
                <TabsTrigger value="previous" className="rounded-md text-xs sm:text-sm px-3">
                  Served
                </TabsTrigger>
              </TabsList>

              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search order ID, table, or item..."
                  className="pl-9 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {["all", "recent", "previous"].map((tab) => (
              <TabsContent key={tab} value={tab} className="m-0 focus-visible:outline-none">
                {isPending ? (
                  <div className="p-6"><OrdersLoadingSkeleton /></div>
                ) : getFilteredOrdersByStatus(tab).length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                      <ListOrdered className="h-6 w-6 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No orders found</h3>
                    <p className="text-sm text-gray-500 max-w-sm mt-1">Try adjusting your search filters or check back later for new orders.</p>
                  </div>
                ) : (
                  <>
                    <div className="hidden md:block">
                      <Table>
                        <TableHeader className="bg-gray-50/50">
                          <TableRow className="hover:bg-transparent">
                            <TableHead className="w-180px font-semibold text-gray-600">Order Details</TableHead>
                            <TableHead className="font-semibold text-gray-600">Items</TableHead>
                            <TableHead className="font-semibold text-gray-600">Table</TableHead>
                            <TableHead className="font-semibold text-gray-600">Status</TableHead>
                            <TableHead className="text-right font-semibold text-gray-600 pr-6">Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {getFilteredOrdersByStatus(tab).map((order) => {
                            const { icon, classes, label } = getStatusDetails(order.orderStatus, order.paid);
                            
                            return (
                              <TableRow key={order._id} className="cursor-pointer hover:bg-gray-50/80 transition-colors">
                                <TableCell>
                                  <div className="flex flex-col">
                                    <span className="font-semibold text-gray-900">{order.orderId}</span>
                                    <span className="text-xs text-gray-500 flex items-center mt-1">
                                      <CalendarClock className="w-3 h-3 mr-1" />
                                      {formatTime(order.createdAt)}
                                    </span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-3">
                                    {/* <div className="flex -space-x-2">
                                      {order.items.slice(0, 3).map((item, idx) => (
                                        <div key={idx} className="h-8 w-8 rounded-full border-2 border-white bg-gray-100 overflow-hidden relative z-10" style={{ zIndex: 10 - idx }}>
                                          <Image src={item.image} alt={item.name} width={32} height={32} className="object-cover h-full w-full" />
                                        </div>
                                      ))}
                                    </div> */}
                                    <div className="flex flex-col">
                                      <span className="text-sm font-medium text-gray-900 truncate max-w-200px">
                                        {order.items.map(m => `${m.quantity}x ${m.name}`).join(', ')}
                                      </span>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-100 text-gray-800 text-xs font-semibold">
                                    Table {order.tableNumber}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${classes}`}>
                                    {icon}
                                    {label}
                                  </span>
                                </TableCell>
                                <TableCell className="text-right pr-6">
                                  <span className="font-semibold text-gray-900">{formatPrice(calculateOrderTotal(order))}</span>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>

                    <div className="md:hidden flex flex-col divide-y divide-gray-100">
                      {getFilteredOrdersByStatus(tab).map((order) => {
                        const { icon, classes, label } = getStatusDetails(order.orderStatus, order.paid);
                        
                        return (
                          <div key={order._id} className="p-4 flex flex-col gap-4 hover:bg-gray-50 cursor-pointer transition-colors">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-bold text-gray-900">{order.orderId}</h3>
                                <p className="text-xs text-gray-500 mt-0.5">{formatTime(order.createdAt)}</p>
                              </div>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${classes}`}>
                                {icon}
                                {label}
                              </span>
                            </div>
                            {/* <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="shrink-0 flex items-center gap-2 bg-white border border-gray-100 rounded-lg p-1.5 pr-3 shadow-sm">
                                  <Image src={item.image} alt={item.name} width={32} height={32} className="rounded-md object-cover h-8 w-8" />
                                  <div className="flex flex-col">
                                    <span className="text-xs font-semibold text-gray-900 max-w-100px truncate">{item.name}</span>
                                    <span className="text-[10px] text-gray-500">Qty: {item.quantity}</span>
                                  </div>
                                </div>
                              ))}
                            </div> */}

                            <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                               <div className="text-sm font-medium text-gray-600">
                                 Table <span className="text-gray-900 font-bold">{order.tableNumber}</span>
                               </div>
                               <div className="font-bold text-gray-900">
                                 {formatPrice(calculateOrderTotal(order))}
                               </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}

// --- Loading Skeleton ---
function OrdersLoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32 bg-gray-100" />
            <Skeleton className="h-4 w-24 bg-gray-100" />
          </div>
          <div className="hidden md:flex items-center gap-2">
             <Skeleton className="h-8 w-8 rounded-full bg-gray-100" />
             <Skeleton className="h-8 w-8 rounded-full bg-gray-100" />
          </div>
          <Skeleton className="h-6 w-20 rounded-full bg-gray-100" />
          <Skeleton className="h-5 w-24 bg-gray-100" />
        </div>
      ))}
    </div>
  );
}
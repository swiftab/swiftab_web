"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { 
  Calendar, 
  CreditCard, 
  MapPin, 
  Users, 
  Utensils, 
  ArrowUpRight, 
  Clock,
  ChevronRight
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import useSocketData from "@/hooks/socket/useSocketData";
import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "@/hooks/orderhook/fetchorder";
import { Skeleton } from "@/components/ui/skeleton";

const monthlyOrders = [
  { month: "Jan", orders: 45 }, { month: "Feb", orders: 52 },
  { month: "Mar", orders: 38 }, { month: "Apr", orders: 65 },
  { month: "May", orders: 48 }, { month: "Jun", orders: 91 },
  { month: "Jul", orders: 52 }, { month: "Aug", orders: 62 },
  { month: "Sep", orders: 55 }, { month: "Oct", orders: 70 },
  { month: "Nov", orders: 45 }, { month: "Dec", orders: 58 },
];

const miniChartData = [
  { value: 45 }, { value: 52 }, { value: 38 }, { value: 65 }, 
  { value: 48 }, { value: 91 }, { value: 72 }
];

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
  status: "Served" | "Not-served";
  paid: "Paid" | "Unpaid";
  takenBy?: string;
  createdAt: string;
}

export default function Dashboard() {
  const realtimeData = useSocketData("realTimeData");

  const { data, error, isPending } = useQuery<{ orders: Order[] }>({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  const recentOrders = React.useMemo(() => {
    return data?.orders
      ?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 4) || []; 
  }, [data]);

  const activeTables = realtimeData?.tableStatus?.activeTables ?? 0;
  const totalTables = realtimeData?.tableStatus?.totalTables ?? 0;
  const occupancyRate = totalTables ? (activeTables / totalTables) * 100 : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50 p-4 md:p-8 oswald">
      <div className="max-w-7xl mx-auto w-full space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Reservations</p>
                <h3 className="text-3xl font-bold text-gray-900">{realtimeData?.reservations ?? 0}</h3>
              </div>
              <div className="p-2 bg-indigo-50 rounded-xl">
                <Calendar className="h-5 w-5 text-indigo-500" />
              </div>
            </div>
            <div className="flex items-center justify-between mt-auto">
              <span className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                <ArrowUpRight className="h-3 w-3 mr-0.5" /> 12%
              </span>
              <div className="h-8 w-20">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={miniChartData}>
                    <defs>
                      <linearGradient id="colorIndigo" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorIndigo)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Seated Tables</p>
                <h3 className="text-3xl font-bold text-gray-900">{activeTables}<span className="text-lg text-gray-400 font-medium">/{totalTables}</span></h3>
              </div>
              <div className="p-2 bg-rose-50 rounded-xl">
                <Utensils className="h-5 w-5 text-rose-500" />
              </div>
            </div>
            <div className="mt-auto">
              <div className="flex justify-between text-xs font-medium text-gray-500 mb-1.5">
                <span>Occupancy</span>
                <span>{occupancyRate.toFixed(0)}%</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full transition-all duration-500 ease-in-out" style={{ width: `${occupancyRate}%` }} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Active Guests</p>
                <h3 className="text-3xl font-bold text-gray-900">{realtimeData?.totalCustomers ?? 0}</h3>
              </div>
              <div className="p-2 bg-emerald-50 rounded-xl">
                <Users className="h-5 w-5 text-emerald-500" />
              </div>
            </div>
            <div className="flex items-center justify-between mt-auto">
              <span className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                <ArrowUpRight className="h-3 w-3 mr-0.5" /> 8%
              </span>
              <div className="h-8 w-20">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={miniChartData}>
                    <defs>
                      <linearGradient id="colorEmerald" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorEmerald)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Revenue (MTD)</p>
                <h3 className="text-2xl font-bold text-gray-900 truncate max-w-120px">
                  {formatCurrency(realtimeData?.revenue ?? 0)}
                </h3>
              </div>
              <div className="p-2 bg-violet-50 rounded-xl shrink-0">
                <CreditCard className="h-5 w-5 text-violet-500" />
              </div>
            </div>
            <div className="flex items-center justify-between mt-auto">
              <span className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                <ArrowUpRight className="h-3 w-3 mr-0.5" /> 15%
              </span>
              <div className="h-8 w-20">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={miniChartData}>
                    <defs>
                      <linearGradient id="colorViolet" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorViolet)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] lg:col-span-2">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Booking Overview</h3>
                <p className="text-sm text-gray-500">Monthly reservation trends</p>
              </div>
              <div className="flex bg-gray-100/80 p-1 rounded-lg">
                <Button variant="ghost" size="sm" className="text-xs h-7 px-3 rounded-md text-gray-500 hover:text-gray-900">Weekly</Button>
                <Button size="sm" className="text-xs h-7 px-3 rounded-md bg-white text-gray-900 shadow-sm">Monthly</Button>
                <Button variant="ghost" size="sm" className="text-xs h-7 px-3 rounded-md text-gray-500 hover:text-gray-900">Yearly</Button>
              </div>
            </div>

            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyOrders} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#94a3b8" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    dy={10}
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <Tooltip
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontWeight: 500 }}
                  />
                  <Bar 
                    dataKey="orders" 
                    name="Reservations" 
                    fill="#6366f1" 
                    radius={[6, 6, 6, 6]} 
                    barSize={28}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] lg:col-span-1 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Areas</h3>
                <p className="text-sm text-gray-500">Live floor utilization</p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full">
                <MapPin className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-5 flex-1">
              {/* Dining Item */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-700">Main Dining</span>
                  <span className="text-sm font-bold text-gray-900">80%</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: "80%" }} />
                </div>
                <p className="text-xs text-gray-500 mt-1.5 font-medium">8 of 10 tables occupied</p>
              </div>

              {/* Patio Item */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-700">Patio / Terrace</span>
                  <span className="text-sm font-bold text-gray-900">50%</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: "50%" }} />
                </div>
                <p className="text-xs text-gray-500 mt-1.5 font-medium">3 of 6 tables occupied</p>
              </div>

              {/* Bar Item */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-700">Bar Area</span>
                  <span className="text-sm font-bold text-gray-900">25%</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "25%" }} />
                </div>
                <p className="text-xs text-gray-500 mt-1.5 font-medium">2 of 8 seats occupied</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 bg-gray-50/50 -mx-6 -mb-6 px-6 pb-6 rounded-b-2xl flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-700">Overall</span>
              <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">64%</span>
            </div>
          </div>
        </div>

        {/* --- Bottom Row: Recent Orders --- */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                Recent Orders
                {isPending && <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />}
              </h3>
              <p className="text-sm text-gray-500">Latest tickets from the floor</p>
            </div>
            <Button variant="ghost" className="text-sm text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          <div className="p-0">
            {error && <div className="p-6 text-sm text-red-500">Failed to load recent orders.</div>}
            {isPending && (
              <div className="p-6 space-y-4">
                {[1, 2, 3].map(i => <Skeleton key={i} className="h-12 w-full bg-gray-100 rounded-lg" />)}
              </div>
            )}
            
            {!isPending && !error && recentOrders.length === 0 ? (
              <div className="p-12 text-center text-gray-500">No active orders right now.</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-gray-50/50">
                    <TableRow className="hover:bg-transparent border-b-gray-100">
                      <TableHead className="font-semibold text-gray-600 pl-6 w-[120px]">Order ID</TableHead>
                      <TableHead className="font-semibold text-gray-600">Time</TableHead>
                      <TableHead className="font-semibold text-gray-600">Table</TableHead>
                      <TableHead className="font-semibold text-gray-600">Items</TableHead>
                      <TableHead className="font-semibold text-gray-600 text-right pr-6">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order._id} className="hover:bg-gray-50/80 transition-colors border-b-gray-50 last:border-0">
                        <TableCell className="pl-6 font-medium text-gray-900">{order.orderId}</TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="w-3.5 h-3.5 mr-1.5" />
                            {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </TableCell>
                        <TableCell>
                           <Badge variant="outline" className="bg-white text-gray-700 font-semibold border-gray-200 shadow-sm">
                             Table {order.tableNumber}
                           </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600 truncate max-w-[200px]">
                          {order.items.map((item) => `${item.quantity}x ${item.name}`).join(", ")}
                        </TableCell>
                        <TableCell className="text-right pr-6 font-bold text-gray-900">
                          {formatCurrency(order.items.reduce((sum, item) => sum + item.cost * item.quantity, 0))}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
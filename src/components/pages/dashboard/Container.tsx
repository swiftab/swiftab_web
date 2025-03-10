"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
} from "recharts";
import { Calendar, CreditCard, MapPin, Users, Utensils } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useSocketData from "@/hooks/socket/useSocketData";

const monthlyOrders = [
  { month: "Jan", orders: 45 },
  { month: "Feb", orders: 52 },
  { month: "Mar", orders: 38 },
  { month: "Apr", orders: 65 },
  { month: "May", orders: 48 },
  { month: "Jun", orders: 91 },
  { month: "Jul", orders: 52 },
  { month: "Aug", orders: 62 },
  { month: "Sep", orders: 55 },
  { month: "Oct", orders: 70 },
  { month: "Nov", orders: 45 },
  { month: "Dec", orders: 58 },
];

const recentOrders = [
  {
    id: "#435080",
    item: "Burger with fries",
    customer: "Bessie Cooper",
    price: "$9.00",
    date: "02 May 2024",
  },
  {
    id: "#435081",
    item: "Chicken Caesar Salad",
    customer: "Jenny Wilson",
    price: "$12.00",
    date: "02 May 2024",
  },
  {
    id: "#435082",
    item: "Margherita Pizza",
    customer: "Guy Hawkins",
    price: "$15.00",
    date: "02 May 2024",
  },
];

const monthlyReservations = [
  { month: "Jan", reservations: 45, revenue: 1800 },
  { month: "Feb", reservations: 52, revenue: 2080 },
  { month: "Mar", reservations: 38, revenue: 1520 },
  { month: "Apr", reservations: 65, revenue: 2600 },
  { month: "May", reservations: 48, revenue: 1920 },
  { month: "Jun", reservations: 91, revenue: 3640 },
  { month: "Jul", reservations: 52, revenue: 2080 },
  { month: "Aug", reservations: 62, revenue: 2480 },
  { month: "Sep", reservations: 55, revenue: 2200 },
  { month: "Oct", reservations: 70, revenue: 2800 },
  { month: "Nov", reservations: 45, revenue: 1800 },
  { month: "Dec", reservations: 58, revenue: 2320 },
];

const todayReservations = 18;
const availableTables = 7;
const totalTables = 15;
const occupancyRate = Math.round((1 - availableTables / totalTables) * 100);

export default function Dashboard() {
  const data = useSocketData("realTimeData");
  console.log("socketio", data);
  return (
    <div className="flex flex-col overflow-x-hidden">
      {/* Dashboard Content */}
      <div>
        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium text-slate-500">
                  Today's Reservations
                </p>
                <Calendar className="h-4 w-4 text-indigo-500" />
              </div>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-bold">{todayReservations}</h3>
                <div className="text-xs text-emerald-500 font-medium">
                  +12% from yesterday
                </div>
              </div>
              <div className="h-[30px] mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyReservations.slice(-7)}>
                    <Line
                      type="monotone"
                      dataKey="reservations"
                      stroke="#6366f1"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium text-slate-500">
                  Table Availability
                </p>
                <Utensils className="h-4 w-4 text-rose-500" />
              </div>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-bold">
                  {availableTables}/{totalTables}
                </h3>
                <div className="text-xs text-emerald-500 font-medium">
                  {occupancyRate}% occupancy
                </div>
              </div>
              <div className="mt-3 h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-rose-500 rounded-full"
                  style={{ width: `${occupancyRate}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium text-slate-500">
                  Active Customers
                </p>
                <Users className="h-4 w-4 text-emerald-500" />
              </div>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-bold">2,453</h3>
                <div className="text-xs text-emerald-500 font-medium">
                  +8% this month
                </div>
              </div>
              <div className="h-[30px] mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyReservations.slice(-7)}>
                    <Line
                      type="monotone"
                      dataKey="reservations"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium text-slate-500">
                  Revenue (MTD)
                </p>
                <CreditCard className="h-4 w-4 text-violet-500" />
              </div>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-bold">$11,260</h3>
                <div className="text-xs text-emerald-500 font-medium">
                  +15% vs last month
                </div>
              </div>
              <div className="h-[30px] mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyReservations.slice(-7)}>
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reservation Rate Chart */}
        <Card className="shadow-sm overflow-hidden">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-1 bg-indigo-500 rounded-full"></div>
                <div>
                  <h3 className="font-medium text-slate-800">
                    Reservation Rate
                  </h3>
                  <p className="text-xs text-slate-500">
                    Overview of booking patterns
                  </p>
                </div>
              </div>
              <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs px-3 py-1 h-7 rounded-md"
                >
                  Weekly
                </Button>
                <Button
                  size="sm"
                  className="text-xs px-3 py-1 h-7 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md"
                >
                  Monthly
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs px-3 py-1 h-7 rounded-md"
                >
                  Yearly
                </Button>
              </div>
            </div>

            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyOrders}
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                  <defs>
                    <linearGradient
                      id="colorOrders"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#6366f1" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#6366f1"
                        stopOpacity={0.2}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="month"
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    padding={{ left: 10, right: 10 }}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      border: "none",
                      padding: "8px 12px",
                      fontSize: "12px",
                    }}
                    cursor={{ fill: "rgba(224, 231, 255, 0.2)" }}
                    formatter={(value) => [`${value} reservations`, "Total"]}
                    labelFormatter={(label) => `${label} 2024`}
                  />
                  <Bar
                    dataKey="orders"
                    name="Reservations"
                    fill="url(#colorOrders)"
                    radius={[6, 6, 0, 0]}
                    barSize={30}
                  />
                  <ReferenceLine
                    y={60}
                    stroke="#e2e8f0"
                    strokeDasharray="3 3"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-sm bg-indigo-500"></div>
                  <span>This Year</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-sm bg-slate-300"></div>
                  <span>Target</span>
                </div>
              </div>
              <div className="font-medium">
                Average: 56.8 reservations/month
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service Area Utilization */}
        <Card className="shadow-sm overflow-hidden">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-1 bg-emerald-500 rounded-full"></div>
                <div>
                  <h3 className="font-medium text-slate-800">
                    Service Area Utilization
                  </h3>
                  <p className="text-xs text-slate-500">
                    Current table allocation
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="text-xs h-8">
                <MapPin className="h-3.5 w-3.5 mr-1" />
                View Floor Plan
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Main Dining</span>
                  <span className="text-xs text-indigo-600 font-medium">
                    80%
                  </span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: "80%" }}
                  ></div>
                </div>
                <div className="mt-1.5 text-xs text-slate-500">
                  8 of 10 tables booked
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Patio</span>
                  <span className="text-xs text-emerald-600 font-medium">
                    50%
                  </span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: "50%" }}
                  ></div>
                </div>
                <div className="mt-1.5 text-xs text-slate-500">
                  3 of 6 tables booked
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Private Room</span>
                  <span className="text-xs text-rose-600 font-medium">
                    100%
                  </span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-rose-500 rounded-full"
                    style={{ width: "100%" }}
                  ></div>
                </div>
                <div className="mt-1.5 text-xs text-slate-500">
                  3 of 3 tables booked
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Bar Area</span>
                  <span className="text-xs text-amber-600 font-medium">
                    25%
                  </span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: "25%" }}
                  ></div>
                </div>
                <div className="mt-1.5 text-xs text-slate-500">
                  2 of 8 seats booked
                </div>
              </div>
            </div>

            <div className="mt-3 text-xs text-slate-500 flex justify-between">
              <span>Overall utilization: 64%</span>
              <span className="text-emerald-600">+12% from yesterday</span>
            </div>
          </CardContent>
        </Card>
        {/* Recent Orders */}
        <Card className="col-span-6 mt-5">
          <CardContent className="p-2">
            <div className="flex items-center gap-2">
              <div className="h-8 w-1 bg-red-500 rounded-full"></div>
              <div>
                <h3 className="font-medium text-slate-800">Recent Orders 🔴</h3>
                {/* <p className="text-xs text-slate-500">
                  Current table allocation
                </p> */}
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Order ID</TableHead>
                  <TableHead className="text-xs">Item</TableHead>
                  <TableHead className="text-xs">Customer</TableHead>
                  <TableHead className="text-xs">Price</TableHead>
                  <TableHead className="text-xs">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="text-xs">{order.id}</TableCell>
                    <TableCell className="text-xs">{order.item}</TableCell>
                    <TableCell className="text-xs">{order.customer}</TableCell>
                    <TableCell className="text-xs">{order.price}</TableCell>
                    <TableCell className="text-xs">{order.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

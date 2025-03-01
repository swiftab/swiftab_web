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
} from "recharts";
import { MapPin } from "lucide-react";


import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Header from "./Header";

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
  { id: "#435080", item: "Burger with fries", customer: "Bessie Cooper", price: "$9.00", date: "02 May 2024" },
  { id: "#435081", item: "Chicken Caesar Salad", customer: "Jenny Wilson", price: "$12.00", date: "02 May 2024" },
  { id: "#435082", item: "Margherita Pizza", customer: "Guy Hawkins", price: "$15.00", date: "02 May 2024" },
];

export default function Dashboard() {
  return (
    <div className="flex flex-col overflow-x-hidden">

      {/* Dashboard Content */}
      <div className="grid grid-cols-4 gap-3 mt-4">
        {/* Metrics */}
        {["Menu", "Orders", "Customers", "Income"].map((metric, index) => (
          <Card key={metric} className="col-span-1">
            <CardContent className="p-2">
              <div className="text-sm">{metric}</div>
              <div className="text-xl font-bold mt-1">{[124, 325, "2,453", "$11,260"][index]}</div>
              <div className="h-[30px] mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyOrders.slice(-5)}>
                    <Line
                      type="monotone"
                      dataKey="orders"
                      stroke={["#0ea5e9", "#f43f5e", "#22c55e", "#8b5cf6"][index]}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Order Rate Chart */}
        <Card className="col-span-3 row-span-1 h-[200px]">
          <CardContent className="p-2">
            <div className="flex justify-between text-sm">
              <div>Order Rate</div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="text-xs px-2">
                  Weekly
                </Button>
                <Button variant="ghost" size="sm" className="text-xs px-2 text-white bg-secondary">
                  Monthly
                </Button>
                <Button variant="ghost" size="sm" className="text-xs px-2">
                  Yearly
                </Button>
              </div>
            </div>
            <div className="h-[150px] mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyOrders}>
                  <XAxis
                    dataKey="month"
                    stroke="#888"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip />
                  <Bar dataKey="orders" fill={'#008080'} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Service Area */}
        <Card className="col-span-2 h-[150px]">
          <CardContent className="p-2">
            <div className="text-sm">Service Area</div>
            <div className="relative mt-3 rounded-lg border bg-muted/10 flex items-center justify-center">
              <MapPin className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="col-span-6">
          <CardContent className="p-2">
            <div className="text-sm">Recent Orders</div>
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

"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChevronLeft, Download } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample data
const salesData = [
  { month: "Jan", thisYear: 30000, lastYear: 25000 },
  { month: "Feb", thisYear: 25000, lastYear: 28000 },
  { month: "Mar", thisYear: 32000, lastYear: 24000 },
  { month: "Apr", thisYear: 28000, lastYear: 29000 },
  { month: "May", thisYear: 35000, lastYear: 26000 },
  { month: "Jun", thisYear: 30000, lastYear: 27000 },
];

const sparklineData = [
  { value: 400 },
  { value: 300 },
  { value: 500 },
  { value: 350 },
  { value: 450 },
  { value: 400 },
];

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = React.useState("month");

  return (
    <div className="flex-1 p-4 md:p-8 pt-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Link href="/(dashboard)/dash">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Select defaultValue="custom">
              <SelectTrigger className="w-[240px]">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="custom">
                  Jun 10,2020 - Jun 10,2021
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$60,040</div>
              <div className="text-xs text-muted-foreground">
                +12% from last month
              </div>
              <div className="h-[35px] mt-3">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sparklineData}>
                    <Bar dataKey="value" fill="#0ea5e9" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">953,000</div>
              <div className="text-xs text-muted-foreground">
                +8.2% from last month
              </div>
              <div className="h-[35px] mt-3">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sparklineData}>
                    <Bar dataKey="value" fill="#a855f7" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                AVG Item/Sale
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.005</div>
              <div className="text-xs text-muted-foreground">
                +4.4% from last month
              </div>
              <div className="h-[35px] mt-3">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sparklineData}>
                    <Bar dataKey="value" fill="#22c55e" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Sales for This Year</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <Button
                    variant={timeframe === "month" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimeframe("month")}
                  >
                    Month
                  </Button>
                  <Button
                    variant={timeframe === "week" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimeframe("week")}
                  >
                    Week
                  </Button>
                  <Button
                    variant={timeframe === "day" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimeframe("day")}
                  >
                    Day
                  </Button>
                </div>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={salesData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <defs>
                    <linearGradient id="thisYear" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="lastYear" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="month"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "white",
                      border: "1px solid #e2e8f0",
                    }}
                    formatter={(value) => [`$${value}`, "Sales"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="lastYear"
                    stroke="#94a3b8"
                    fillOpacity={1}
                    fill="url(#lastYear)"
                    name="Last Year"
                  />
                  <Area
                    type="monotone"
                    dataKey="thisYear"
                    stroke="#0ea5e9"
                    fillOpacity={1}
                    fill="url(#thisYear)"
                    name="This Year"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

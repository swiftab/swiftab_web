"use client";

import {
  CalendarIcon,
  Users,
  UserPlus,
  Users2,
  Star,
  User,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomerDetails } from "../customer/customers/Container";
import { ReviewList } from "../customer/reviews/Container";

export default function ReservationDashboard() {
  return (
    <div className="container mx-auto py-2">
      <header className="flex items-center justify-between gap-4 border-b pb-2 mb-5">
        <h1 className="text-lg font-semibold">Customer</h1>
        <div className="flex flex-row-reverse items-center gap-4 ml-auto">
          <Card className="w-36 h-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Customers
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">6k+</div>
            </CardContent>
          </Card>
          <Card className="w-36 h-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                New Customers
              </CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">2k+</div>
            </CardContent>
          </Card>
          <Card className="w-36 h-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Frequent Customers
              </CardTitle>
              <Users2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">4k+</div>
            </CardContent>
          </Card>
        </div>
      </header>

      <Tabs defaultValue="reviews" className="space-y-4">
        <TabsList>
          {/* <TabsTrigger value="reservations" className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            Reservations
          </TabsTrigger> */}
          <TabsTrigger value="reviews" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Reviews
          </TabsTrigger>
          <TabsTrigger value="customers" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Customers
          </TabsTrigger>
        </TabsList>
        {/* <TabsContent value="reservations">
          <ReservationList />
        </TabsContent> */}
        <TabsContent value="reviews">
          <ReviewList />
        </TabsContent>
        <TabsContent value="customers">
          <CustomerDetails />
        </TabsContent>
      </Tabs>
    </div>
  );
}

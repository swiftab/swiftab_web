"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import EditProfileDialog from "./EditProfileDialog";
import { Pencil } from "lucide-react";
import { FullScreenLoader } from "@/components/Loading/FullScreen";
import { useQuery } from "@tanstack/react-query";
import { fetchAdminInfo } from "@/lib/api";

export default function Container() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { data, error, isLoading } = useQuery({
    queryKey: ["adminInfo"],
    queryFn: fetchAdminInfo,
  });

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (error) {
    return <div>Error fetching admin info: {error.message}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const {
    name,
    email,
    phoneNumber,
    restaurantName,
    location,
    hrsOfOperation,
  } = data;

  const initials = `${name[0].toUpperCase()}${name.split(" ")[1] ? name.split(" ")[1][0].toUpperCase() : ""}`;

  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between gap-4 border-b pb-2">
        <h1 className="text-lg font-semibold">Profile</h1>
      </header>

      <div className="space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">{name}</h2>
                <Badge variant="default">Admin</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <h3 className="text-lg font-semibold">Personal Details</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditDialogOpen(true)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">First Name</p>
              <p className="font-medium">{name.split(" ")[0]}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last Name</p>
              <p className="font-medium">{name.split(" ")[1] || ""}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email Address</p>
              <p className="font-medium">{email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone Number</p>
              <p className="font-medium">{phoneNumber}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">User Role</p>
              <p className="font-medium">Admin</p>
            </div>
          </CardContent>
        </Card>

        {/* Address */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <h3 className="text-lg font-semibold">Restaurant Details</h3>
            <Button variant="ghost" size="icon">
              <Pencil className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground">Restaurant Name</p>
              <p className="font-medium">{restaurantName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium">{location}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Hours of Operation
              </p>
              <p className="font-medium">{hrsOfOperation}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <EditProfileDialog
        profile={{ name, email, phoneNumber }}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onUpdate={() => {
          /* Handle profile update logic */
        }}
      />
    </div>
  );
}

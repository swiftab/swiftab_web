"use client";

import React, { useEffect, useState } from "react";
import {
  Bell,
  Menu,
  ChevronDown,
  Calendar,
  LogOut,
  User,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export default function HeaderDashboard() {
  const notifications = 3;
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [initials, setInitials] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      if (parsedUser.name) {
        const result = splitName(parsedUser.name);
        setFirstName(result.firstName);
        setLastName(result.lastName);
        setInitials(result.initials);
      }
    }

    // Set current time and update every minute
    updateCurrentTime();
    const timer = setInterval(updateCurrentTime, 60000);

    return () => clearInterval(timer);
  }, []);

  const updateCurrentTime = () => {
    const now = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    setCurrentTime(now.toLocaleDateString("en-US", options));
  };

  function splitName(name) {
    const parts = name.trim().split(" ");

    if (parts.length === 1) {
      const firstName = parts[0];
      const initials = `${firstName[0].toUpperCase()}${firstName[1]?.toUpperCase() || ""}`;
      return { firstName, lastName: "", initials };
    }

    const [firstName, ...lastNameParts] = parts;
    const lastName = lastNameParts.join(" ");
    const initials = `${firstName[0].toUpperCase()}${lastName[0]?.toUpperCase() || ""}`;
    return { firstName, lastName, initials };
  }

  if (!user) {
    return (
      <header className="flex items-center justify-between p-4 border-b border-slate-200 bg-white shadow-sm">
        <div className="animate-pulse h-10 bg-slate-200 rounded w-32"></div>
        <div className="animate-pulse h-10 bg-slate-200 rounded-full w-10"></div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-[#fff] px-4 shadow-sm">
      {/* Left side - Brand and mobile menu */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <div className="hidden md:flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-indigo-600 flex items-center justify-center">
            <Calendar className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl text-slate-800">SwifTab</span>
        </div>
      </div>

      {/* Center - Search and current time */}
      <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-4">
        <div className="hidden lg:block text-sm text-slate-500">
          <Calendar className="h-4 w-4 inline-block mr-1 text-indigo-500" />
          {currentTime}
        </div>
      </div>

      {/* Right side - Notifications and profile */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-slate-700" />
            {notifications > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-rose-500 text-white border-2 border-white rounded-full">
                {notifications}
              </Badge>
            )}
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 rounded-full pl-2 pr-0"
            >
              <div className="flex items-center gap-2">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-slate-700">
                    {firstName} {lastName}
                  </p>
                  <p className="text-xs text-slate-500">Administrator</p>
                </div>
                <Avatar className="h-8 w-8 border border-slate-200">
                  <AvatarImage src={user.avatar || ""} alt={firstName} />
                  <AvatarFallback className="bg-indigo-100 text-indigo-600">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4 text-slate-500" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-rose-500">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import {
  Bell,
  Menu,
  ChevronDown,
  LogOut,
  User as UserIcon,
  Settings,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/components/auth/AuthContext";

export default function HeaderDashboard() {
  const notifications = 3;
  const { user } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [initials, setInitials] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [greeting, setGreeting] = useState("Welcome");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (user?.name) {
      const result = splitName(user.name);
      setFirstName(result.firstName);
      setLastName(result.lastName);
      setInitials(result.initials);
    }

    const updateDateTime = () => {
      const now = new Date();

      const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      setCurrentTime(now.toLocaleDateString("en-US", options));
      const hour = now.getHours();
      if (hour < 12) setGreeting("Good morning");
      else if (hour < 18) setGreeting("Good afternoon");
      else setGreeting("Good evening");
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 60000);

    return () => clearInterval(timer);
  }, [user]);

  function splitName(name: string) {
    const parts = name.trim().split(" ");
    if (parts.length === 1) {
      const first = parts[0];
      const inits = `${first[0]?.toUpperCase() || ""}${first[1]?.toUpperCase() || ""}`;
      return { firstName: first, lastName: "", initials: inits };
    }
    const [first, ...lastNameParts] = parts;
    const last = lastNameParts.join(" ");
    const inits = `${first[0]?.toUpperCase() || ""}${last[0]?.toUpperCase() || ""}`;
    return { firstName: first, lastName: last, initials: inits };
  }

  if (!user || !mounted) {
    return (
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-gray-100 bg-white px-4 sm:px-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="animate-pulse h-8 bg-gray-100 rounded-md w-32"></div>
        </div>
        <div className="flex items-center gap-4">
          <div className="animate-pulse h-8 bg-gray-100 rounded-full w-24 hidden md:block"></div>
          <div className="animate-pulse h-10 w-10 bg-gray-100 rounded-full"></div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-gray-100 bg-white/80 backdrop-blur-md px-4 sm:px-6 shadow-sm transition-all oswald">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-gray-500 hover:text-gray-900"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <div className="hidden md:block">
          <h2 className="text-sm font-semibold text-gray-900">
            {greeting}, {firstName}! 👋
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden lg:flex items-center gap-2 bg-gray-50/80 border border-gray-100 px-3 py-1.5 rounded-full text-xs font-medium text-gray-600">
          <Clock className="h-3.5 w-3.5 text-teal-600" />
          {currentTime}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="relative text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-full"
        >
          <Bell className="h-5 w-5" />
          {notifications > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white">
              {notifications}
            </span>
          )}
        </Button>
        <div className="h-6 w-px bg-gray-200 hidden sm:block mx-1"></div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 rounded-full pl-2 pr-1.5 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Avatar className="h-8 w-8 ring-1 ring-gray-100 shadow-sm">
                  <AvatarFallback className="bg-teal-50 text-teal-700 font-bold text-xs">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-gray-900 leading-none mb-1">
                    {firstName} {lastName}
                  </p>
                  <p className="text-[11px] text-gray-500 leading-none font-medium">
                    Administrator
                  </p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400 hidden sm:block" />
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-56 rounded-xl border-gray-100 shadow-lg p-1"
          >
            <DropdownMenuLabel className="font-semibold text-gray-900">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-50" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="rounded-lg cursor-pointer hover:bg-gray-50">
                <UserIcon className="mr-2 h-4 w-4 text-gray-500" />
                <span className="font-medium text-gray-700">Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg cursor-pointer hover:bg-gray-50">
                <Settings className="mr-2 h-4 w-4 text-gray-500" />
                <span className="font-medium text-gray-700">Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-gray-50" />
            <DropdownMenuItem className="rounded-lg cursor-pointer text-rose-600 focus:text-rose-600 focus:bg-rose-50">
              <LogOut className="mr-2 h-4 w-4" />
              <span className="font-medium">Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function Header() {
  const [user, setUser] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [firstName, setFirstName] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [lastName, setLastName] = useState("");
  const [initials, setInitials] = useState("");

  useEffect(() => {
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
  }, []);

  function splitName(name: string) {
    const parts = name.trim().split(" ");

    if (parts.length === 1) {
      const firstName = parts[0];
      const initials = `${firstName[0].toUpperCase()}${firstName[1]?.toUpperCase() || ""}`;
      return { firstName, lastName: "", initials };
    }

    const [firstName, lastName] = parts;
    const initials = `${firstName[0].toUpperCase()}.${lastName[0].toUpperCase()}`;
    return { firstName, lastName, initials };
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <header className="flex items-center justify-between gap-4 border-b pb-2">
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <div className="flex items-center gap-2">
        <Button size="icon" variant="ghost">
          <Bell className="h-4 w-4" />
        </Button>
        <Avatar className="h-10 w-10">
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

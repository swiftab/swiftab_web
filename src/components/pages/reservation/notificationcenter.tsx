import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function NotificationCenter() {
  const notifications = [
    { id: 1, message: "New reservation added" },
    {
      id: 2,
      message: "Reservation #1234 updated",
    },
    { id: 3, message: "Reservation #5678 canceled" },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <h3 className="font-medium">Notifications</h3>
          {notifications.map((notification) => (
            <div key={notification.id} className="text-sm">
              {notification.message}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

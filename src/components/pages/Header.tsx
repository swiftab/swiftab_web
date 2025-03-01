import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { FullScreenLoader } from "../Loading/FullScreen";
import { fetchAdminInfo } from "@/hooks/authhook/authhooks";
import { useQuery } from "@tanstack/react-query";

interface HeaderProps {
  currentTab: string;
}

export function Header({ currentTab }: HeaderProps) {

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

  // const {
  //   name,
  //   email,
  //   phoneNumber,
  //   restaurantName,
  //   location,
  //   hrsOfOperation,
  // } = data;

  // const initials = `${name[0].toUpperCase()}${name.split(" ")[1] ? name.split(" ")[1][0].toUpperCase() : ""}`;

  return (
    <header className="sticky top-0 z-10 flex h-12 items-center justify-between border-b bg-primary px-4 md:px-6">
      <div className="flex items-center">
        <SidebarTrigger className="mr-2 md:hidden bg-white" />
        <h1 className="text-lg font-semibold md:text-xl text-white">
          {currentTab}
        </h1>
      </div>
      <div className="flex items-center space-x-2 md:space-x-4">
        <Button variant="ghost" size="icon" className="bg-white">
          <Bell className="h-5 w-5 " />
          <span className="sr-only">Notifications</span>
        </Button>
      </div>
    </header>
  );
}

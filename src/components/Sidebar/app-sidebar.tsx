"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

import SideBarFooter from "./sidebar-footer";
import { SideBarContent } from "./side-barcontent";
import { useQuery } from "@tanstack/react-query";
import { fetchAdminInfo } from "@/hooks/authhook/authhooks";
import { FullScreenLoader } from "../Loading/FullScreen";

export function AppSidebar() {
  const { state } = useSidebar();

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

  const { restaurantName, image } = data;

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader
        style={{
          backgroundImage: image ? `url(${image})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-row justify-between items-center px-0 h-16">
          {state === "expanded" && (
            <span className="text-center font-semibold text-sm text-white hover:text-primary/50 transition-all duration-300">
              {restaurantName ? restaurantName : "Swiftab"}
            </span>
          )}
          <div className="items-center flex">
            <SidebarTrigger />
          </div>
        </div>
      </SidebarHeader>
      <SidebarSeparator className="mt-2" />
      <SideBarContent />
      <SideBarFooter />
    </Sidebar>
  );
}

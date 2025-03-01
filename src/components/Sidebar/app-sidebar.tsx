"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

// import SideBarFooter from "./sidebar-footer";
// import { SideBarContent } from "./side-barcontent";
import { useQuery } from "@tanstack/react-query";
import { fetchAdminInfo } from "@/hooks/authhook/authhooks";
import { FullScreenLoader } from "../Loading/FullScreen";
import Link from "next/link";
import { Calendar, ChartNetwork, HelpCircle, LayoutDashboard, ListOrdered, LogOut, Settings, Table2, Users, Utensils } from "lucide-react";
import { usePathname } from "next/navigation";


const sidebarItems = [
  { name: "Dashboard", href: "/dash", icon: LayoutDashboard },
  { name: "Report", href: "/analytics", icon: ChartNetwork },
  { name: "Reservations", href: "/reservations", icon: Calendar },
  { name: "Orders", href: "/order-line", icon: ListOrdered },
  { name: "Manage Dishes", href: "/dishes", icon: Utensils },
  { name: "Manage Tables", href: "/tables/floorplan", icon: Table2 },
  { name: "Customers", href: "/customers", icon: Users },
];

const footerItems = [
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Logout", href: "#", icon: LogOut },
  { name: "Need Help", href: "#", icon: HelpCircle },
];


export function AppSidebar() {
  const { state } = useSidebar();
  const pathname = usePathname();

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
      <SidebarSeparator className="mt-2"/>
      <SidebarContent>
        <SidebarMenu>
          {sidebarItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild isActive={pathname === item.href}>
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator className="mt-2"/>
      <SidebarFooter>
        <SidebarMenu>
          {footerItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild>
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

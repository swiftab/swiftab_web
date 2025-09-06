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
import { useMutation } from "@tanstack/react-query";
import { fetchLogout } from "@/hooks/authhook/authhooks";
import Link from "next/link";
import {
  Calendar,
  //ChartNetwork,
  HelpCircle,
  LayoutDashboard,
  ListOrdered,
  LogOut,
  Settings,
  Table2,
  //Users,
  Utensils,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { LoadingSpinner } from "../ui/loading";

const sidebarItems = [
  { name: "Dashboard", href: "/dash", icon: LayoutDashboard },
  //{ name: "Report", href: "/analytics", icon: ChartNetwork },
  { name: "Reservations", href: "/reservations", icon: Calendar },
  { name: "Orders", href: "/order-line", icon: ListOrdered },
  { name: "Manage Dishes", href: "/dishes", icon: Utensils },
  { name: "Manage Tables", href: "/tables/floorplan", icon: Table2 },
  //{ name: "Customers", href: "/customers", icon: Users },
];

const footerItems = [
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Logout", href: "#", icon: LogOut },
  { name: "Need Help", href: "#", icon: HelpCircle },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const pathname = usePathname();
  const [logoutLoading, setLogoutLoading] = useState(false);

  const { user, isLoading } = useAuth();

  const router = useRouter();

  const logoutMutation = useMutation<void, Error, void>({
    mutationFn: fetchLogout,
    onSuccess: () => {
      toast({
        title: "Logged out",
        description: "You have logged out successfully.",
        variant: "default",
      });
      router.replace("/signin");
    },
    onError: (error: any) => {
      toast({
        title: "Logout failed",
        description: error.message || "An error occurred.",
        variant: "destructive",
      });
    },
  });

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      setLogoutLoading(true);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#008080]/50 to-[#008080]/100">
        <LoadingSpinner desc="Preparing your restaurant ... " />
      </div>
    );
  }

  if (logoutLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#008080]/50 to-[#008080]/100">
        <LoadingSpinner desc="Logout ... " />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#008080]/50 to-[#008080]/100">
        <LoadingSpinner desc="Preparing your restaurant ... " />
      </div>
    );
  }

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader
        style={{
          backgroundImage: user?.image ? `url(${user?.image})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-row justify-between items-center px-0 h-16">
          {state === "expanded" && (
            <span className="text-center font-semibold text-sm text-white hover:text-primary/50 transition-all duration-300">
              {user.restaurantName ? user.restaurantName : "Swiftab"}
            </span>
          )}
          <div className="items-center flex">
            <SidebarTrigger />
          </div>
        </div>
      </SidebarHeader>
      <SidebarSeparator className="mt-2" />
      <SidebarContent>
        <SidebarMenu className="px-2">
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
      <SidebarSeparator className="mt-2" />
      <SidebarFooter>
        <SidebarMenu>
          {footerItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild>
                {item.name == "Logout" ? (
                  <button onClick={handleLogout}>
                    <item.icon className="mr-2 h-4 w-4" />
                    Logout
                  </button>
                ) : (
                  <Link href={item.href}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Link>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

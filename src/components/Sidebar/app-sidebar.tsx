"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { fetchLogout } from "@/hooks/authhook/authhooks";
import { useAuth } from "../auth/AuthContext";
import { toast } from "@/hooks/use-toast";

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
  SidebarGroup,
  SidebarGroupContent,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Calendar,
  HelpCircle,
  LayoutDashboard,
  ListOrdered,
  LogOut,
  Settings,
  Table2,
  Utensils,
  Loader2,
} from "lucide-react";
import Image from "next/image";

const sidebarItems = [
  { name: "Home", href: "/dash", icon: "/assets/icon/home.png" },
  {
    name: "Reservations",
    href: "/reservations",
    icon: "/assets/icon/reserved.png",
  },
  { name: "Orders", href: "/order-line", icon: "/assets/icon/menu.png" },
  {
    name: "Manage Menu",
    href: "/dishes",
    icon: "/assets/icon/spoon-and-fork.png",
  },
  {
    name: "Floor Plan",
    href: "/tables/floorplan",
    icon: "/assets/icon/tiles.png",
  },
];

const footerItems = [
  { name: "Settings", href: "/settings", icon: "/assets/icon/setting.png" },
  { name: "Need Help?", href: "#", icon: "/assets/icon/help.png" },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();

  const { user, isLoading } = useAuth();
  const [logoutLoading, setLogoutLoading] = useState(false);

  const logoutMutation = useMutation<void, Error, void>({
    mutationFn: fetchLogout,
    onSuccess: () => {
      toast({
        title: "Logged out",
        description: "You have securely logged out.",
      });
      router.replace("/signin");
    },
    onError: (error: any) => {
      toast({
        title: "Logout failed",
        description: error.message || "An error occurred.",
        variant: "destructive",
      });
      setLogoutLoading(false);
    },
  });

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoading || !user) {
    return (
      <Sidebar variant="sidebar" className="border-r border-gray-100 bg-white">
        <SidebarHeader className="h-16 flex items-center justify-center border-b border-gray-50">
          <Skeleton className="h-8 w-8 rounded-lg" />
        </SidebarHeader>
        <SidebarContent className="p-4 space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-10 w-full rounded-md bg-gray-100" />
          ))}
        </SidebarContent>
      </Sidebar>
    );
  }

  const restaurantName = user?.restaurantName || "Swiftab";

  return (
    <Sidebar
      variant="sidebar"
      className="border-r border-gray-100 bg-white shadow-sm oswald"
    >
      <SidebarHeader className="p-0 relative h-29 overflow-hidden bg-gray-900 shrink-0">
        {user?.image && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-60"
            style={{ backgroundImage: `url(${user.image})` }}
          />
        )}
        <div className="absolute inset-0 bg-linear-to-r from-gray-900/90 to-gray-900/40" />

        <div className="relative z-10 flex h-full items-center px-4 justify-between transition-all">
          <div className="flex items-center gap-3 overflow-hidden">
            {/* <div className="h-8 w-8 shrink-0 rounded-lg bg-teal-500 flex items-center justify-center text-white font-bold italic shadow-sm">
              {restaurantName.charAt(0).toUpperCase()}
            </div> */}

            {state === "expanded" && (
              <span className="font-semibold text-sm text-white truncate w-32 tracking-wide">
                {restaurantName}
              </span>
            )}
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="pt-4 pb-4 bg-white">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5 px-2">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.name}
                      className={`h-10 transition-colors ${
                        isActive
                          ? "bg-teal-50 text-teal-700 hover:bg-teal-50 hover:text-teal-800 font-medium"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center gap-3"
                      >
                        {/* <item.icon className={`h-4 w-4 shrink-0 ${isActive ? "text-teal-600" : "text-gray-400"}`} /> */}
                        <div
                          className={`relative h-5 w-5 shrink-0 transition-all duration-200 ${
                            isActive
                              ? "opacity-100"
                              : "opacity-50 grayscale hover:grayscale-0"
                          }`}
                        >
                          <Image
                            src={item.icon}
                            alt={`${item.name} icon`}
                            fill
                            className="object-contain"
                            sizes="20px"
                          />
                        </div>
                        <span className="truncate">{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-50 bg-gray-50/50 p-2">
        <SidebarMenu className="gap-1">
          {footerItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.name}
                  isActive={isActive}
                  className="h-10 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  <Link href={item.href} className="flex items-center gap-3">
                    <div
                      className={`relative h-4 w-4 shrink-0 transition-all duration-200 ${
                        isActive
                          ? "opacity-100"
                          : "opacity-50 grayscale hover:grayscale-0"
                      }`}
                    >
                      <Image
                        src={item.icon}
                        alt={`${item.name} icon`}
                        fill
                        className="object-contain"
                        sizes="20px"
                      />
                    </div>
                    <span className="text-sm">{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}

          <SidebarSeparator className="my-1 mx-2" />
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Logout"
              className="h-10 text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-colors"
            >
              <button
                onClick={handleLogout}
                disabled={logoutLoading}
                className="flex items-center gap-3 w-full"
              >
                {logoutLoading ? (
                  <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
                ) : (
                  <LogOut className="h-4 w-4 shrink-0 text-rose-500" />
                )}
                <span>{logoutLoading ? "Logging out..." : "Logout"}</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

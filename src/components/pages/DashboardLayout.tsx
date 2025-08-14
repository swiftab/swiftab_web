"use client";

import { SidebarInset } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { AppSidebar } from "../Sidebar/app-sidebar";
import { useAuth } from "../auth/AuthContext";
import { RestaurantSetupModal } from "../multiform/Container";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../ui/loading";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isNewUser, setIsNewUser] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, isLoading } = useAuth();
  const pathname = usePathname();

  const getCurrentTabName = () => {
    const path = pathname.split("/")[1] || "home";
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  // Auto-open modal for new users
  useEffect(() => {
    if (user && !user.restaurantId) {
      setIsNewUser(true);
      setIsModalOpen(true);
    }
  }, [user]);

  if (isLoading || !user) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#008080]/50 to-[#008080]/100">
        <LoadingSpinner desc="Preparing your restaurant ... " />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row w-full">
      <AppSidebar />
      <SidebarInset className="flex flex-1 flex-col">
        <main>
          <Header currentTab={getCurrentTabName()} />
          <div className="flex-1 w-full overflow-auto p-4">{children}</div>
        </main>
      </SidebarInset>
      {isNewUser && (
        <RestaurantSetupModal
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      )}
    </div>
  );
}

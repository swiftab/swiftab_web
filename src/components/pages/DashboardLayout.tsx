"use client";

import { SidebarInset } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { AppSidebar } from "../Sidebar/app-sidebar";
import { useAuth } from "../auth/AuthContext";
import { RestaurantSetupModal } from "../multiform/Container";
import { useState } from "react";
import { LoadingSpinner } from "../ui/loading";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isNewUser, setIsNewUser] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, isLoading } = useAuth();
  const pathname = usePathname();

  const getCurrentTabName = () => {
    const path = pathname.split("/")[1];
    return path.charAt(0).toUpperCase() + path.slice(1) || "Home";
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Here you might want to update the user's status in your backend
    setIsNewUser(false);
  };

  if (isLoading || !user) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#008080]/50 to-[#008080]/100">
        <LoadingSpinner />
      </div>
    );
  }

  return user?.restaurantId == null ? (
    <RestaurantSetupModal isOpen={isModalOpen} onClose={handleCloseModal} />
  ) : (
    <div className="flex min-h-screen flex-col md:flex-row w-full ">
      <AppSidebar />
      <SidebarInset className="flex flex-1 flex-col">
        <Header currentTab={getCurrentTabName()} />
        <main className="fflex-1 overflow-y-auto p-4 md:p-6 bg-[#f8f8f8]">
          <div className="flex-1 w-full overflow-auto p-4">{children}</div>
        </main>
      </SidebarInset>
    </div>
  );
}

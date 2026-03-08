"use client";

import { SidebarInset } from "@/components/ui/sidebar";
import { Header } from "./Header";
import { AppSidebar } from "../Sidebar/app-sidebar";
import { useAuth } from "../auth/AuthContext";
import { RestaurantSetupModal } from "../multiform/Container";
import { useEffect, useState } from "react";
import { FullScreenLoader } from "../Loading/FullScreen";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isNewUser, setIsNewUser] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (user && !user.restaurantId) {
      setIsNewUser(true);
      setIsModalOpen(true);
    }
  }, [user]);

  if (isLoading || !user) {
    return (
      <FullScreenLoader />
    );
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row w-full">
      <AppSidebar />
      <SidebarInset className="flex flex-1 flex-col">
        <main>
          <Header  />
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

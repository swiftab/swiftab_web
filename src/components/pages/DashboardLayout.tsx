"use client";

import { SidebarInset } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { DashboardContent } from "./Container";
import { Header } from "./Header";
import { AppSidebar } from "../Sidebar/app-sidebar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const getCurrentTabName = () => {
    const path = pathname.split('/')[1]
    return path.charAt(0).toUpperCase() + path.slice(1) || 'Home'
  }
  return (
    <div className="flex min-h-screen flex-col md:flex-row w-full ">
      <AppSidebar />
      <SidebarInset className="flex flex-1 flex-col">
        <Header currentTab={getCurrentTabName()} />
        <main className="fflex-1 overflow-y-auto p-4 md:p-6 bg-[#f8f8f8]">
          <div className="flex-1 w-full overflow-auto p-4">
            <DashboardContent>{children}</DashboardContent>
          </div>
        </main>
      </SidebarInset>
    </div>
  );
}


"use client"

import {
  Sidebar,
  SidebarHeader,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

import SideBarFooter from "./sidebar-footer";
import { SideBarContent } from "./side-barcontent";

export function AppSidebar() {
  const { toggleSidebar, state } = useSidebar();

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader>
        <div className="flex flex-row justify-between items-center px-0 h-16">
          {state === "expanded" && <span className="px-5">Swiftab</span>}
          <div className="items-center flex">
            <SidebarTrigger />
          </div>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SideBarContent />
      <SideBarFooter />
    </Sidebar>
  );
}

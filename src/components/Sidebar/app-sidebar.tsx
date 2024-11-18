import {
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import SideBarFooter from "./sidebar-footer";
import { SideBarContent } from "./side-barcontent";

export function AppSidebar() {
  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader>
        <div className="flex flex-row justify-between items-center space-x-10">
          <span>Swiftab</span>
          <div className="p-4">
            <SidebarTrigger />
          </div>
        </div>
      </SidebarHeader>
      <SideBarContent />
      <SideBarFooter />
    </Sidebar>
  );
}

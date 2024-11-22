import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar/app-sidebar";
import { DashboardContent } from "@/components/pages/Container";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <div className="flex-1 w-full overflow-auto p-4">
            <DashboardContent>{children}</DashboardContent>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

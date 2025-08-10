import { AuthProvider } from "@/components/auth/AuthContext";
import { DashboardLayout } from "@/components/pages/DashboardLayout";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <DashboardLayout>{children}</DashboardLayout>
      </SidebarProvider>
    </AuthProvider>
  );
}

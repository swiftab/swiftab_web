"use client";

import { DashboardLayout } from "@/components/pages/DashboardLayout";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    // Log all cookies to see what's available
    console.log("All cookies:", document.cookie);

    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    console.log("Extracted token:", token);

    if (!token) {
      console.log("No token found, redirecting to /signin");
      router.push("/signin");
    } else {
      console.log("Token found, staying on dashboard");
    }
  }, [router]);

  return (
    <SidebarProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </SidebarProvider>
  );
}
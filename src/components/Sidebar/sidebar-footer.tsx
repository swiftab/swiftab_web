import React from "react";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronUp, CircleUser, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { fetchLogout } from "@/hooks/authhook/authhooks";
import { toast } from "@/hooks/use-toast";
import { Button } from "../ui/button";

export default function SideBarFooter() {
  const router = useRouter();

  const logoutMutation = useMutation<void, Error, void>({
    mutationFn: fetchLogout,
    onSuccess: () => {
      toast({
        title: "Logged out",
        description: "You have logged out successfully.",
        variant: "default",
      });
      router.replace("/signin");
      localStorage.clear();
    },
    onError: (error: any) => {
      toast({
        title: "Logout failed",
        description: error.message || "An error occurred.",
        variant: "destructive",
      });
    },
  });

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <Settings /> Settings
                <ChevronUp className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              className="w-[--radix-popper-anchor-width]"
            >
              <DropdownMenuItem>
                <Link href={"/accounts"} className="w-full">
                  <Button className="w-full" variant="default">
                    <span>Account</span>
                    <CircleUser />
                  </Button>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  className="w-full"
                  variant="destructive"
                  onClick={handleLogout}
                >
                  <span>Sign out</span>

                  <LogOut />
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}

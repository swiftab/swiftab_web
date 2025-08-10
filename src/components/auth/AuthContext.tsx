"use client";

import { fetchAdminInfo } from "@/lib/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type User = {
  firstName: string;
  lastName: string;
  email: string | null;
  phoneNumber: string | null;
  avatar:string | null;
  createdAt: string | null;
  restaurantId:string | null;
  name: string,
  restaurantName: string | null,
  location: string | null,
  image: string | null,
  hrsOfOperation: string | null,
  description: string | null
  phone: string | null,
  restaurantEmail: string | null,
};

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signOut: () => void;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const {
    data: user,
    isLoading,
    refetch,
    error,
    isError,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: fetchAdminInfo,
    enabled: hasMounted,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => {
    if (isError) {
      console.error("Failed to fetch user:", error);
      queryClient.setQueryData(["userInfo"], null);
    }
  }, [isError, error, queryClient]);

  const refreshUser = async () => {
    await refetch();
  };

  const signOut = () => {
    queryClient.setQueryData(["userInfo"], null);
    queryClient.invalidateQueries({ queryKey: ["userInfo"] });
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signOut, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

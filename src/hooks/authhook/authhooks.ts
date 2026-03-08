import { useMutation, UseMutationResult } from "@tanstack/react-query";
import {
  AuthData,
  AuthResponse,
  Authwaiter,
  AuthWaiterResponse,
  ErrorResponse,
} from "@/types/auth";
import { loginAdmin, signUpAdmin, signUpWaiter } from "@/lib/api";
import apiClient from "@/lib/axios";
import { useAuth } from "@/components/auth/AuthContext";

export function useLogin(): UseMutationResult<
  AuthResponse,
  ErrorResponse,
  AuthData
> {
  const { refreshUser } = useAuth();

  return useMutation<AuthResponse, ErrorResponse, AuthData>({
    mutationFn: loginAdmin,
    onSuccess: async () => {
      setTimeout(() => {
        refreshUser();
      }, 1000);
    },
    onError: (error: ErrorResponse) => {
      console.error(
        `Login error (${error.statusCode || "Unknown"}): ${error.message}`,
      );
      if (error.details) {
        console.error("Additional error details:", error.details);
      }
    },
  });
}

export function useSignUp(): UseMutationResult<
  AuthResponse,
  ErrorResponse,
  AuthData
> {
  return useMutation<AuthResponse, ErrorResponse, AuthData>({
    mutationFn: signUpAdmin,
    onSuccess: () => {
      console.log("Sign-up successful:");
    },
    onError: (error: ErrorResponse) => {
      console.error("Sign-up error:", error.message);
    },
  });
}

export const fetchLogout = async (): Promise<void> => {
  const response = await apiClient.post("/auth/admin/logout");

  if (!response || response.status !== 200) {
    throw new Error("Logout failed");
  }
};

export function useWaiterSignUp(): UseMutationResult<
  AuthWaiterResponse,
  ErrorResponse,
  Authwaiter
> {
  return useMutation<AuthWaiterResponse, ErrorResponse, Authwaiter>({
    mutationFn: signUpWaiter,
    onSuccess: () => {
      console.log("Sign-up waiter successful:");
    },
    onError: (error: ErrorResponse) => {
      console.error("Sign-up waiter error:", error.message);
    },
  });
}

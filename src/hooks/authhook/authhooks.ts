import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AuthData, AuthResponse, ErrorResponse } from "@/types/auth";
import { loginAdmin, signUpAdmin } from "@/lib/api";
import apiClient from "@/lib/axios";

export function useLogin(): UseMutationResult<
  AuthResponse,
  ErrorResponse,
  AuthData
> {
  return useMutation<AuthResponse, ErrorResponse, AuthData>({
    mutationFn: loginAdmin,
    onSuccess: (data: AuthResponse) => {
      console.log("Login successful:", data);
      if (data.token) {
        localStorage.setItem("authToken", data.token);
      }
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }
    },
    onError: (error: ErrorResponse) => {
      console.error(
        `Login error (${error.statusCode || "Unknown"}): ${error.message}`
      );
      alert(error.message || "An unexpected error occurred. Please try again."); // Display error to user
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

export async function fetchAdminInfo() {
  const response = await apiClient.get("/auth/admin/fetchinfo");
  return response.data;
}

export const fetchLogout = async (): Promise<void> => {
  const response = await apiClient.post("/auth/admin/logout");

  if (!response || response.status !== 200) {
    throw new Error("Logout failed");
  }
};
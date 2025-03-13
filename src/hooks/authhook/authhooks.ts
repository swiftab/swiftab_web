import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AuthData, AuthResponse, Authwaiter, AuthWaiterResponse, ErrorResponse } from "@/types/auth";
import { loginAdmin, signUpAdmin, signUpWaiter } from "@/lib/api";
import apiClient from "@/lib/axios";
import { useRouter } from "next/navigation";

export function useLogin(): UseMutationResult<
  AuthResponse,
  ErrorResponse,
  AuthData
> {
  const router = useRouter();
  
  return useMutation<AuthResponse, ErrorResponse, AuthData>({
    mutationFn: loginAdmin,
    onSuccess: (data: AuthResponse) => {
      console.log("Login successful:", data);
      // if (data.token) {
      //   localStorage.setItem("authToken", data.token);
      // }
      if (data.token) {
        //document.cookie = `token=${data.token}; path=/; max-age=${24 * 60 * 60}; secure=${process.env.NODE_ENV === 'production'}; sameSite=${process.env.NODE_ENV === 'production' ? 'none' : 'lax'}`;
        localStorage.setItem("authToken", data.token); // Optional
      }
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      router.replace('/dash');
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
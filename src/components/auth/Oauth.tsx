"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";
import Image from "next/image";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const { user, refreshUser } = useAuth();

  const [isNewLogin, setIsNewLogin] = useState(false);

  useEffect(() => {
    if (user) return;
    refreshUser()
      .then(() => {
        setIsNewLogin(false);
      })
      .catch((err) => {
        console.log("No active session:", err);
        toast.error("❌ Login failed. Please try again.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  }, [user, isNewLogin, refreshUser]);

  const handleGoogleAuth = () => {
    setIsNewLogin(true);
    window.location.href =
      "https://server-production-2ee7.up.railway.app/swiftab/auth/admin/google-auth";
  };
  const handleXAuth = () => {
    setIsNewLogin(true);
    window.location.href = "https://server-production-2ee7.up.railway.app/swiftab/auth/admin/x-auth";
  };

  return (
    <div className="p-4 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#008080] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="max-w-md relative z-10">
        {/* Main card */}
        <div className="rounded-3xl p-8 ">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/50 rounded-2xl flex items-center justify-center">
                <Image
                  src="/swiftab/logo.png"
                  width={50}
                  height={50}
                  alt="Picture of the author"
                />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-black mb-2">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h1>
            <p className="text-gray-900">
              {isSignUp
                ? "Join our community today"
                : "Sign in to your account"}
            </p>
          </div>

          {/* Social Auth Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={handleGoogleAuth}
              className="w-full bg-white hover:bg-gray-50 text-gray-900 font-medium py-4 px-6 rounded-xl border border-gray-200 transition-all duration-300 flex items-center justify-center space-x-3 group hover:shadow-lg hover:scale-105"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <button
              onClick={handleXAuth}
              className="w-full bg-black hover:bg-gray-900 text-white font-medium py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 group hover:shadow-lg hover:scale-105"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>Continue with X</span>
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
            </p>
            <Button
              variant="link"
              className="p-0 h-auto font-semibold"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Sign in instead" : "Create account"}
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-900 text-sm">
            By continuing, you agree to our{" "}
            <a
              href="/terms"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Terms
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

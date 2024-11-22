"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView: "signin" | "signup";
}

export function AuthModal({ isOpen, onClose, initialView }: AuthModalProps) {
  const [view, setView] = useState<"signin" | "signup">(initialView);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{view === "signin" ? "Sign In" : "Sign Up"}</DialogTitle>
        </DialogHeader>
        {view === "signin" ? (
          <SignInForm onToggleView={() => setView("signup")} />
        ) : (
          <SignUpForm onToggleView={() => setView("signin")} />
        )}
      </DialogContent>
    </Dialog>
  );
}

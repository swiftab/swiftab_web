"use client";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "./provider";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </html>
  );
}

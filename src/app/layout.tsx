"use client";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "./provider";
import { Oswald } from 'next/font/google';
//import type { Metadata } from 'next';

const oswald = Oswald({ 
  variable: '--font-oswald',
  subsets: ['latin'],
  //weight: ['300', '400', '600', '700'],
});

// export const metadata: Metadata = {
//   title: 'Swiftab | Restaurant Management',
//   description: 'Streamline your restaurant operations and maximize covers.',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${oswald.variable} antialiased`}>
        <Toaster />
        <Providers>{children}</Providers>
        
      </body>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </html>
  );
}
"use client";

import { SignUpForm } from "@/components/auth/SignUpForm";
import Image from "next/image";

export default function Page() {
  return (
    <div className=" min-h-screen flex bg-gray-50 oswald">
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url('/swiftab/bg.jpg')" }}
        />

        <div className="absolute inset-0 bg-linear-to-br from-teal-900/90 to-gray-900/90" />
        <div className="relative z-10 flex flex-col w-full p-12 xl:p-20 justify-between">
          <div>
            <div className="flex items-center gap-2 mb-12">
              <Image
                src="/assets/logo/logo2.png"
                alt="swiftab"
                width={1000}
                height={800}
                className=" md:h-24 md:w-auto transition-transform duration-300 hover:scale-105"
              />
            </div>
            <h1 className="text-4xl xl:text-5xl font-extrabold text-white leading-[1.15] mb-6 max-w-lg">
              Start Optimizing Your Operations Today.
            </h1>
            <p className="text-lg text-teal-100 max-w-md leading-relaxed mb-10">
              Join thousands of top-tier restaurants using our system to manage
              reservations, optimize floor plans, and empower staff.
            </p>
          </div>

          <div className="mt-12 text-teal-200/60 text-sm font-medium">
            © {new Date().getFullYear()} Swiftab. All rights reserved.
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md flex flex-col justify-center">
          <div className="flex lg:hidden items-center justify-center gap-2 mb-10">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold italic">
              S
            </div>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">
              Swiftab
            </span>
          </div>

          <SignUpForm />
        </div>
      </div>
    </div>
  );
}

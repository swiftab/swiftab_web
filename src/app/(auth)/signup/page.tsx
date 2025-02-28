"use client";

import { SignUpForm } from "@/components/auth/SignUpForm";
import React from "react";

export default function page() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Section - Background Image */}
      <div
        className="hidden lg:flex w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: "url('/swiftab/bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-teal-800 bg-opacity-70 flex flex-col justify-center p-12">
          <div className="text-white max-w-lg">
            <h1 className="text-4xl font-bold mb-6">Streamline Your Restaurant Management</h1>
            <p className="text-xl mb-8">Join thousands of restaurants that use our system to manage reservations, tables, staff, and more.</p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="bg-white rounded-full p-1 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#008080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <p className="text-white text-lg">Reduce no-shows by up to 45%</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-white rounded-full p-1 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#008080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <p className="text-white text-lg">Optimize table turnover rates</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-white rounded-full p-1 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#008080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <p className="text-white text-lg">Access insights on customer preferences</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right section - Sign Up Form */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-4 md:p-8">
        <SignUpForm />
      </div>
    </div>
  );
}
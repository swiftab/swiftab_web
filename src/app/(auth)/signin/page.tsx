"use client";

import { AuthProvider } from "@/components/auth/AuthContext";
// import AuthPage from "@/components/auth/Oauth";
import { SignInForm } from "@/components/auth/SignInForm";
import Image from "next/image";

export default function Page() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex bg-gray-50 oswald">
        <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-50 transition-opacity duration-1000"
            style={{ backgroundImage: "url('/swiftab/bg.jpg')" }}
          />
          <div className="absolute inset-0 bg-linear-to-br from-teal-900/90 to-gray-900/90" />

          <div className="relative z-10 flex flex-col justify-between w-full p-12 xl:p-20">
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
                Streamline Service, <br /> Maximize Covers.
              </h1>
              <p className="text-lg text-teal-100 max-w-md leading-relaxed">
                Join thousands of top-tier restaurants using our system to
                manage reservations, optimize floor plans, and empower staff.
              </p>
            </div>
            {/* <div className="backdrop-blur-md bg-white/10 border border-white/20 p-8 rounded-2xl max-w-lg shadow-2xl">
              <div className={`min-h-[100px] transition-opacity duration-300 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                <h3 className="text-xl font-bold text-white mb-3">
                  {benefits[currentBenefit].title}
                </h3>
                <p className="text-teal-50 text-base leading-relaxed">
                  {benefits[currentBenefit].description}
                </p>
              </div>

              <div className="flex gap-2 mt-8 items-center">
                {benefits.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsTransitioning(true);
                      setTimeout(() => {
                        setCurrentBenefit(index);
                        setIsTransitioning(false);
                      }, 300);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ease-in-out ${
                      currentBenefit === index 
                        ? "w-8 bg-teal-400" 
                        : "w-4 bg-white/30 hover:bg-white/50"
                    }`}
                    aria-label={`Go to benefit ${index + 1}`}
                  />
                ))}
              </div>
            </div> */}
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
            <SignInForm />
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}

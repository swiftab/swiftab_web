import Image from "next/image";
import React from "react";
import Trustees from "./Trustees";

export default function HeroSection() {
  return (
    <section className="pt-10 pb-4 px-6 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] mb-6 tracking-tight">
            Streamline Service, <br />
            <span className="text-black">Maximize Covers</span>
          </h1>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
            Take control of your restaurant operations with our intuitive admin
            dashboard. Track reservations, manage orders, and optimize your
            floor plan effortlessly.
          </p>

          <div className="flex items-center gap-4">
            <button className="bg-primary hover:bg-primary/50 text-white font-medium px-6 py-3 rounded-lg shadow-lg shadow-blue-500/30 transition-all">
              Request a Demo
            </button>
            <button className="flex items-center gap-2 text-gray-700 font-medium px-6 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all">
              <span className="text-red-500">▶</span> Watch Demo
            </button>
          </div>
        </div>

        <div className="relative h-400px lg:h-500px w-full flex items-center justify-center overflow-hidden">
          <Image
            src="/assets/hero3.png"
            alt="Swiftab"
            width={1000}
            height={800}
            className="w-full h-auto object-contain transition-transform duration-300 hover:scale-105"
            priority
          />
        </div>
      </div>

      <div className="mt-20 text-center">
        <Trustees />
      </div>
    </section>
  );
}

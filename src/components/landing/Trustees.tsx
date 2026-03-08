"use client";
import React from "react";
import Image from "next/image";

export default function Trustees() {
  const trustedBrands = [
    {
      id: 1,
      name: "The Capital Grille",
      styling: "font-serif font-bold text-xl",
      imgPath: "/assets/trusted/blitong.jpeg",
    },
    {
      id: 2,
      name: "Nando's",
      styling: "font-bold text-xl",
      imgPath: "/assets/trusted/estilo.jpeg",
    },
    {
      id: 3,
      name: "Ruth's Chris",
      styling: "italic font-bold text-xl",
      imgPath: "/assets/trusted/food.jpeg",
    },
    {
      id: 4,
      name: "NOBU",
      styling: "tracking-widest font-bold text-xl",
      imgPath: "/assets/trusted/mafe.jpeg",
    },
    {
      id: 5,
      name: "Sweetgreen",
      styling: "font-bold text-xl",
      imgPath: "/assets/trusted/sokhakhu.jpeg",
    },
    {
      id: 6,
      name: "Shake Shack",
      styling: "font-black text-xl",
      imgPath: "/assets/trusted/thai.jpeg",
    },
  ];

  const duplicatedBrands = [...trustedBrands, ...trustedBrands];

  return (
    <div className="mt-24 mb-12 w-full max-w-7xl mx-auto flex flex-col items-center justify-center overflow-hidden">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 1.5rem)); } /* Accounts for the gap */
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `,
        }}
      />

      <p className="text-sm text-gray-500 font-medium mb-10 text-center">
        Trusted by <span className="text-gray-900 font-bold">1,200+</span>{" "}
        restaurants and hospitality groups
      </p>

      <div
        className="relative w-full flex overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "-webkit-linear-gradient(left, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="flex items-center gap-12 lg:gap-24 animate-scroll w-max whitespace-nowrap px-6">
          {duplicatedBrands.map((brand, index) => (
            <div
              key={`${brand.id}-${index}`}
              className="flex items-center justify-center opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300 cursor-default"
            >
                {/* <Image
                  src={brand.imgPath}
                  alt={brand.name}
                  width={120}
                  height={40}
                  className="object-contain"
                /> */}
              <div className={brand.styling}>{brand.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

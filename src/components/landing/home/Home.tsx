"use client";

import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  MoveRight,
  SlidersVertical,
  Utensils,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="container bg-primary/5 border-none grid lg:grid-cols-2 gap-8 items-center py-0 px-20 flex-1 mt-5 mb-2 border rounded-lg relative overflow-hidden">
      {isClient && (
        <>
          <svg
            className="absolute top-[-50px] left-[-50px] opacity-50 z-0"
            width="175"
            height="175"
            viewBox="0 0 175 175"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="87.5"
              cy="87.5"
              r="87.5"
              fill="#003366"
              fillOpacity="0.1"
            />
          </svg>
          <svg
            className="absolute bottom-[-50px] right-[-90px] opacity-50 z-0"
            width="175"
            height="175"
            viewBox="0 0 175 175"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="87.5"
              cy="87.5"
              r="87.5"
              fill="green"
              fillOpacity="0.1"
            />
          </svg>
        </>
      )}
      <div className="space-y-8 relative z-10">
        <h1 className="text-xl font-bold tracking-tight lg:text-4xl text-center md:text-left">
          Your Ultimate <span className="text-primary">Restaurant</span>
          <br />
          Management Solution
        </h1>

        <div className="flex justify-between items-center gap-x-8">
          <div className="flex justify-start items-center gap-x-8">
            <span className="rounded-lg p-2 bg-white">
              <LayoutDashboard size={20} />
            </span>
            <span className="rounded-lg p-2 bg-white">
              <Utensils size={20} />
            </span>
            <span className="rounded-lg p-2 bg-white">
              <SlidersVertical size={20} />
            </span>
          </div>
        </div>

        <p className="text-xl text-muted-foreground text-center md:text-left">
          All essential restaurant Management function
          <br />
          in one unified function.
        </p>
        <div className="space-y-4 text-center md:text-left ">
          <Button size="lg" className="px-8 hover:bg-slate-600">
            Get started{" "}
            <span>
              <MoveRight />
            </span>
          </Button>
          <div className="flex gap-8 items-center text-xl ">
            <div>
              <span className="font-bold text-center md:text-left">500+</span>
              <span className="text-muted-foreground ml-2 text-center md:text-left">
                Restaurants
              </span>
            </div>
            <div>
              <span className="font-bold text-center md:text-left">6k+</span>
              <span className="text-muted-foreground ml-2 text-center md:text-left">
                Customers
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-[500px] z-10">
        {isClient && (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/swiftab/dash.mp4" type="video/mp4" />
            <Image
              src="/dashboard-placeholder.jpg"
              alt="Dashboard Prototype"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </video>
        )}
      </div>
    </section>
  );
}

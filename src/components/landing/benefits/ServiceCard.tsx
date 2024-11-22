import React, { useState, useEffect } from "react";
import { CalendarCheck, ChartNoAxesCombined, Star } from "lucide-react";
import dynamic from "next/dynamic";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AnimatedNumbers = dynamic<any>(() => import("react-animated-numbers"), {
  ssr: false,
});

export default function ServiceCard() {
  // State to control when animations start
  const [trigger, setTrigger] = useState({
    first: false,
    second: false,
    third: false,
  });

  useEffect(() => {
    // Trigger animations sequentially
    const timeouts = [
      setTimeout(() => setTrigger((prev) => ({ ...prev, first: true })), 500),
      setTimeout(() => setTrigger((prev) => ({ ...prev, second: true })), 1500),
      setTimeout(() => setTrigger((prev) => ({ ...prev, third: true })), 2500),
    ];

    return () => timeouts.forEach((timeout) => clearTimeout(timeout));
  }, []);

  return (
    <div className="container space-y-12">
      {/* Header */}
      <div className="relative inline-block">
        <svg
          className="absolute -top-3 -left-3 w-6 h-6 text-primary/40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 24C0 10.7452 10.7452 0 24 0"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M8 24C8 15.1634 15.1634 8 24 8"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M16 24C16 19.5817 19.5817 16 24 16"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
        <h2 className="text-3xl font-bold px-4 text-primary">Benefits</h2>
        <svg
          className="absolute -bottom-3 -right-3 w-6 h-6 text-primary/40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24 0C24 13.2548 13.2548 24 0 24"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M16 0C16 8.83656 8.83656 16 0 16"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M8 0C8 4.41828 4.41828 8 0 8"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="container flex flex-col justify-end items-end">
        <p className="text-xl text-muted-foreground">
          Consolidate all your restaurant management needs in one place, from
          reservation and table management to menu management, offering a
          holistic solution for efficient and effective operations.
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 py-12">
          {/* First Counter */}
          <div className="flex flex-col items-center text-center">
            <span className="rounded-full p-4 bg-white shadow-md mb-4">
              <Star className="w-8 h-8 text-yellow-500" />
            </span>
            <div className="flex items-center">
              {trigger.first && (
                <AnimatedNumbers
                  includeComma
                  animateToNumber={88}
                  fontStyle={{ fontSize: 24, fontWeight: "bold" }}
                  locale="en-US"
                  configs={[{ mass: 10, tension: 210, friction: 120 }]}
                />
              )}
              <span className="text-2xl font-bold ml-1">%</span>
            </div>
            <p className="text-sm text-muted-foreground">User satisfaction</p>
          </div>

          {/* Second Counter */}
          <div className="flex flex-col items-center text-center">
            <span className="rounded-full p-4 bg-white shadow-md mb-4">
              <ChartNoAxesCombined className="w-8 h-8 text-black" />
            </span>
            <div className="flex items-center">
              {trigger.second && (
                <AnimatedNumbers
                  includeComma
                  animateToNumber={53}
                  fontStyle={{ fontSize: 24, fontWeight: "bold" }}
                  locale="en-US"
                  configs={[{ mass: 15, tension: 210, friction: 120 }]}
                />
              )}
              <span className="text-2xl font-bold ml-1">%</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Adoption rate <br />
              growth
            </p>
          </div>

          {/* Third Counter */}
          <div className="flex flex-col items-center text-center">
            <span className="rounded-full p-4 bg-white shadow-md mb-4">
              <CalendarCheck className="w-8 h-8 text-green-500" />
            </span>
            <div className="flex items-center">
              {trigger.third && (
                <AnimatedNumbers
                  includeComma
                  animateToNumber={88}
                  fontStyle={{ fontSize: 24, fontWeight: "bold" }}
                  locale="en-US"
                  configs={[{ mass: 20, tension: 210, friction: 120 }]}
                />
              )}
              <span className="text-2xl font-bold ml-1">%</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Increase in <br />
              reservation efficiency
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

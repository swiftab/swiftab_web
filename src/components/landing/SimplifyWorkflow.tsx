"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

export default function SimplifyWorkflow() {
  const [activeTab, setActiveTab] = useState(0);

  const workflowItems = [
    {
      title: "Track Reservations",
      description:
        "Monitor incoming bookings, walk-ins, and table statuses with real-time updates.",
      img: "/assets/reservations.png",
    },
    {
      title: "Analyze Sales",
      description:
        "Dive into detailed insights by shift, menu item, or timeframe to make data-driven decisions.",
      img: "/assets/feature.png",
    },
    {
      title: "Manage Staff",
      description:
        "Assign sections, track server performance, and collaborate seamlessly across the floor.",
      img: "/assets/feature.png",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % workflowItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeTab]);

  return (
    <section className="py-12 px-6 max-w-6xl mx-auto w-full">
      {/* Injecting CSS animation for the progress bar */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes fillProgress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-progress {
          animation: fillProgress 5s linear forwards;
        }
      `,
        }}
      />

      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Simplify Your Workflow
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Highlight the streamlined actions your team can take within the
          dashboard, breaking it into manageable and engaging steps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-3">
          {workflowItems.map((item, index) => (
            <div
              key={index}
              onClick={() => setActiveTab(index)}
              className={`p-6 md:p-8 rounded-lg cursor-pointer transition-all duration-300 ease-in-out border ${
                activeTab === index
                  ? "border-gray-100 scale-[1.02]"
                  : "bg-transparent border-transparent hover:bg-gray-50 opacity-60 hover:opacity-100"
              }`}
            >
              <h3
                className={`text-xl font-bold transition-colors duration-300 ${
                  activeTab === index ? "text-gray-900" : "text-gray-500"
                }`}
              >
                {item.title}
              </h3>

              {/* Expandable Content Area */}
              <div
                className={`grid transition-all duration-500 ease-in-out ${
                  activeTab === index
                    ? "grid-rows-[1fr] opacity-100 mt-2"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  <a
                    href="#"
                    className="text-primary text-sm font-semibold flex items-center gap-1 hover:text-primary/70 transition-colors"
                  >
                    Learn more <span className="translate-y-[1px]">→</span>
                  </a>

                  <div className="h-1 w-full bg-gray-100 mt-5 rounded-full overflow-hidden">
                    {activeTab === index && (
                      <div
                        key={`progress-${activeTab}`}
                        className="h-full bg-primary animate-progress rounded-full"
                      ></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="relative bg-white rounded-3xl min-h-[400px] flex items-center justify-center border border-gray-100 overflow-hidden shadow-inner">
          {workflowItems.map((item, index) => (
            <div
              key={index}
              className={`absolute inset-0 p-8 flex items-center justify-center transition-opacity duration-700 ease-in-out ${
                activeTab === index
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <Image
                src={item.img}
                alt={item.title}
                width={1000}
                height={800}
                className="w-full h-auto object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const features = [
  {
    id: 1,
    title: "Craft customised floor plans effortlessly",
    description:
      "Design your restaurant layout with intuitive tools and templates.",
    image: "/user.png",
    bgColor: "bg-primary/100",
  },
  {
    id: 2,
    title: "Experience streamlined operations",
    description:
      "Optimize your workflow with our integrated management system.",
    image: "/user.png",
    bgColor: "bg-primary/70",
  },
  {
    id: 3,
    title: "Effortless reservation handling",
    description:
      "Manage bookings seamlessly with our advanced reservation system.",
    image: "/user.png",
    bgColor: "bg-primary/50",
  },
];

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="relative inline-block mb-12">
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
        <h2 className="text-4xl font-bold px-4 text-primary">Features</h2>
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
      <div ref={containerRef} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              progress={scrollYProgress}
              index={index}
              total={features.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  feature: {
    id: number;
    title: string;
    description: string;
    image: string;
    bgColor: string;
  };
  progress: MotionValue<number>;
  index: number;
  total: number;
}

function FeatureCard({ feature, progress, index, total }: FeatureCardProps) {
  const threshold = index / total;
  const nextThreshold = (index + 1) / total;

  const y = useTransform(progress, [threshold, nextThreshold], ["0%", "-100%"]);

  const opacity = useTransform(
    progress,
    [threshold, Math.min(nextThreshold, 1)],
    [1, 0],
  );

  const zIndex = total - index;

  return (
    <motion.div
      style={{ y, opacity, zIndex }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div
        className={`${feature.bgColor} backdrop-blur-lg rounded-3xl shadow-xl w-full max-w-4xl h-[80vh] flex overflow-hidden`}
      >
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <h3 className="text-3xl font-semibold mb-4 text-white">
            {feature.title}
          </h3>
          <p className="text-xl text-white/90">{feature.description}</p>
        </div>
        <div className="w-1/2 relative flex flex-col justify-center">
          <Image
            src={feature.image}
            alt={feature.title}
            //layout="fill"
            width={400}
            height={400}
            className="object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
}

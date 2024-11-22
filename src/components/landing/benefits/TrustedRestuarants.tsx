"use client";

import React, { useRef, useEffect, useState } from "react";
import TrustedRes from "./TrustedRes";
import Image from "next/image";
import { motion } from "framer-motion";

export default function TrustedRestaurants() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      // Calculate the total scrollable width of the container
      setContainerWidth(containerRef.current.scrollWidth);
    }
  }, []);

  return (
    <section className="py-20 overflow-hidden">
      <div className="container">
        <h2 className="text-center text-black/90 text-xl font-bold mb-12 relative inline-block w-full">
          Already chosen by these{" "}
          <span className="relative">
            restaurants
            <span className="absolute -bottom-2 left-0 w-full h-5 rounded-2xl bg-muted/70 -rotate-0 z-10" />
          </span>
        </h2>

        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_60%,transparent)]">
          <motion.div
            ref={containerRef}
            className="flex gap-24"
            animate={{
              x: [0, -containerWidth / 2],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 50,
                ease: "linear",
              },
            }}
          >
            {/* Render logos twice for smooth looping */}
            {[...TrustedRes, ...TrustedRes].map((res, index) => (
              <Image
                src={res.image}
                alt={res.name}
                key={`${res.id}-${index}`}
                width={70}
                height={70}
                className="shrink-0"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

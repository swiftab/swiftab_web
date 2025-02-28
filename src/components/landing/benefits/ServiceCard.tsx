import React, { useState, useEffect, useRef } from "react";
import { CalendarCheck, Settings, LineChart, Target } from "lucide-react";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";

// Import animated numbers component with SSR handling
const AnimatedNumbers = dynamic(() => import("react-animated-numbers"), {
  ssr: false,
});

export default function FeatureSection() {
  // Use intersection observer to trigger animations when scrolled into view
  const [sectionRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // State for sequential animations
  const [animateStep, setAnimateStep] = useState({
    metrics: false,
    step1: false,
    step2: false,
    step3: false,
  });

  // Trigger animations when section comes into view
  useEffect(() => {
    if (inView) {
      const timeouts = [
        setTimeout(
          () => setAnimateStep((prev) => ({ ...prev, metrics: true })),
          400
        ),
        setTimeout(
          () => setAnimateStep((prev) => ({ ...prev, step1: true })),
          600
        ),
        setTimeout(
          () => setAnimateStep((prev) => ({ ...prev, step2: true })),
          1200
        ),
        setTimeout(
          () => setAnimateStep((prev) => ({ ...prev, step3: true })),
          1800
        ),
      ];

      return () => timeouts.forEach((timeout) => clearTimeout(timeout));
    }
  }, [inView]);

  return (
    <section ref={sectionRef} className="py-10 overflow-hidden bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="relative inline-block mb-4">
            <svg
              className="absolute -top-3 -left-3 w-6 h-6 text-primary/20"
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
            <h2 className="text-4xl font-bold text-gray-900 px-4">
              Tools for Growth
            </h2>
            <svg
              className="absolute -bottom-3 -right-3 w-6 h-6 text-blue-500/40"
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
          <p className="text-xl text-gray-600 mt-4">
            A suite of turn-key solutions for growing your restaurant
          </p>
        </div>

        {/* Metrics Section */}
        <div className="flex flex-wrap justify-center gap-8 mb-20">
          {/* User Satisfaction */}
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg transition-all duration-500 transform hover:scale-105">
            <span className="rounded-full p-4 bg-yellow-50 mb-4">
              <Target className="w-8 h-8 text-yellow-500" />
            </span>
            <div className="flex items-center h-10">
              {animateStep.metrics && (
                <AnimatedNumbers
                  includeComma
                  animateToNumber={100}
                  fontStyle={{ fontSize: 28, fontWeight: "bold" }}
                  locale="en-US"
                  configs={[{ mass: 1, tension: 210, friction: 40 }]}
                />
              )}
              <span className="text-2xl font-bold ml-1">%</span>
            </div>
            <p className="text-gray-600 font-medium mt-2">User satisfaction</p>
          </div>

          {/* Revenue Increase */}
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg transition-all duration-500 transform hover:scale-105">
            <span className="rounded-full p-4 bg-blue-50 mb-4">
              <LineChart className="w-8 h-8 text-blue-500" />
            </span>
            <div className="flex items-center h-10">
              {animateStep.metrics && (
                <AnimatedNumbers
                  includeComma
                  animateToNumber={95}
                  fontStyle={{ fontSize: 28, fontWeight: "bold" }}
                  locale="en-US"
                  configs={[{ mass: 1, tension: 190, friction: 40 }]}
                />
              )}
              <span className="text-2xl font-bold ml-1">%</span>
            </div>
            <p className="text-gray-600 font-medium mt-2">Revenue growth</p>
          </div>

          {/* Implementation Time */}
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg transition-all duration-500 transform hover:scale-105">
            <span className="rounded-full p-4 bg-green-50 mb-4">
              <CalendarCheck className="w-8 h-8 text-green-500" />
            </span>
            <div className="flex items-center h-10">
              {animateStep.metrics && (
                <AnimatedNumbers
                  includeComma
                  animateToNumber={97}
                  fontStyle={{ fontSize: 28, fontWeight: "bold" }}
                  locale="en-US"
                  configs={[{ mass: 1, tension: 170, friction: 40 }]}
                />
              )}
              <span className="text-2xl font-bold ml-1">%</span>
            </div>
            <p className="text-gray-600 font-medium mt-2">
              Faster implementation
            </p>
          </div>
        </div>

        {/* Features Steps */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connecting line */}
          <div className="absolute top-0 bottom-0 border-dotted left-1/2 w-px bg-gradient-to-b from-blue-200 to-blue-500 hidden md:block"></div>

          {/* Step 1 */}
          <div
            className={`flex flex-col md:flex-row items-center mb-20 transition-all duration-1000 ${animateStep.step1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="md:w-1/2 md:pr-10 text-center md:text-right">
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Craft customised floor plans effortlessly
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  Design your restaurant layout with intuitive tools and
                  templates.
                </p>
                <a
                  href="#"
                  className="text-primary font-medium hover:text-primary/80 inline-flex items-center"
                >
                  Learn about floor plans
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 ml-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div className="relative my-8 md:my-0">
              <div className="absolute left-1/2 -translate-x-1/2 size-12 flex items-center justify-center rounded-full bg-white z-10 shadow-lg">
                <span className="text-2xl font-bold">1</span>
              </div>
            </div>

            <div className="md:w-1/2 md:pl-10">
              <div className="relative bg-gradient-to-br from-blue-50 to-white p-4 rounded-xl shadow-lg overflow-hidden">
                <div className="absolute rounded-full w-64 h-64 blur-3xl -top-20 -right-20 bg-blue-500/10 z-0"></div>
                <Settings className="w-12 h-12 text-blue-500 mb-4" />
                <div className="h-40 bg-blue-100/50 rounded-lg flex items-center justify-center">
                  <p className="text-blue-800 font-medium">
                    Paywall Editor Visualization
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div
            className={`flex flex-col md:flex-row-reverse items-center mb-20 transition-all duration-1000 ${animateStep.step2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="md:w-1/2 md:pl-10 text-center md:text-left">
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Experience streamlined operations
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  Optimize your workflow with our integrated management system.
                </p>
                <a
                  href="#"
                  className="text-primary font-medium hover:text-primary/80 inline-flex items-center"
                >
                  Learn about streamlined operations
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 ml-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div className="relative my-8 md:my-0">
              <div className="absolute left-1/2 -translate-x-1/2 size-12 flex items-center justify-center rounded-full bg-white z-10 shadow-lg">
                <span className="text-2xl font-bold">2</span>
              </div>
            </div>

            <div className="md:w-1/2 md:pr-10">
              <div className="relative bg-gradient-to-br from-purple-50 to-white p-4 rounded-xl shadow-lg overflow-hidden">
                <div className="absolute rounded-full w-64 h-64 blur-3xl -top-20 -left-20 bg-purple-500/10 z-0"></div>
                <Target className="w-12 h-12 text-purple-500 mb-4" />
                <div className="h-40 bg-purple-100/50 rounded-lg flex items-center justify-center">
                  <p className="text-purple-800 font-medium">
                    Audience Targeting Visualization
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div
            className={`flex flex-col md:flex-row items-center transition-all duration-1000 ${animateStep.step3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="md:w-1/2 md:pr-10 text-center md:text-right">
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Effortless reservation handling
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  Manage bookings seamlessly with our advanced reservation
                  system.
                </p>
                <a
                  href="#"
                  className="text-primary font-medium hover:text-primary/80 inline-flex items-center"
                >
                  Learn about Effortless reservation handling
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 ml-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div className="relative my-8 md:my-0">
              <div className="absolute left-1/2 -translate-x-1/2 size-12 flex items-center justify-center rounded-full bg-white z-10 shadow-lg">
                <span className="text-2xl font-bold">3</span>
              </div>
            </div>

            <div className="md:w-1/2 md:pl-10">
              <div className="relative bg-gradient-to-br from-green-50 to-white p-4 rounded-xl shadow-lg overflow-hidden">
                <div className="absolute rounded-full w-64 h-64 blur-3xl -bottom-20 -right-20 bg-green-500/10 z-0"></div>
                <LineChart className="w-12 h-12 text-green-500 mb-4" />
                <div className="h-40 bg-green-100/50 rounded-lg flex items-center justify-center">
                  <p className="text-green-800 font-medium">
                    A/B Testing Analytics Visualization
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

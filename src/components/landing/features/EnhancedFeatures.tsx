import React from "react";
import {
    Calendar,
    Clock,
    Users,
    ChefHat,
    BarChart,
    MessageSquare,
    Smartphone,
    Gift,
    ShieldCheck,
  } from "lucide-react";

export default function EnhancedFeatures() {
  return (
    <section id="features" className="py-10 md:py-20 relative px-20 bg-gradient-to-r from-gray-50 to-white">
      <div className="container px-4 md:px-6">
        <div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          data-animate
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium text-gray-700 border border-white/20 mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Enterprise Features
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-gray-900 to-blue-200 bg-clip-text text-transparent">
            Comprehensive Reservation Management
          </h2>
          <p className="max-w-[800px] text-gray-700 text-lg md:text-xl">
            Our platform equips fine dining establishments and restaurant groups
            with enterprise-grade tools to optimize operations, enhance guest
            experiences, and drive sustainable growth.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: <Calendar className="h-10 w-10" />,
              title: "Omnichannel Booking System",
              description:
                "Unify reservations across your website, Google Business, Instagram, and third-party platforms with real-time availability synchronization.",
              gradient: "from-blue-500 to-indigo-500",
            },
            {
              icon: <MessageSquare className="h-10 w-10" />,
              title: "Intelligent Communications",
              description:
                "Reduce no-shows by up to 45% with AI-driven SMS and email confirmations, customizable reminder sequences, and two-way guest messaging.",
              gradient: "from-blue-500 to-cyan-500",
            },
            {
              icon: <Users className="h-10 w-10" />,
              title: "Guest Relationship Management",
              description:
                "Build comprehensive guest profiles with dining preferences, allergies, special occasions, and visit history to deliver personalized experiences.",
              gradient: "from-indigo-500 to-blue-500",
            },
            {
              icon: <BarChart className="h-10 w-10" />,
              title: "Business Intelligence Dashboard",
              description:
                "Make data-driven decisions with advanced analytics on booking patterns, table utilization, revenue forecasting, and customizable KPI tracking.",
              gradient: "from-cyan-500 to-blue-500",
            },
            {
              icon: <Clock className="h-10 w-10" />,
              title: "Dynamic Waitlist Management",
              description:
                "Optimize seating efficiency with sophisticated waitlist algorithms, automated SMS notifications, and accurate wait time predictions.",
              gradient: "from-blue-500 to-indigo-500",
            },
            {
              icon: <ChefHat className="h-10 w-10" />,
              title: "Kitchen Production Integration",
              description:
                "Synchronize reservations with your kitchen management system to optimize prep scheduling, reduce waste, and improve service timing.",
              gradient: "from-indigo-500 to-orange-500",
            },
            {
              icon: <Smartphone className="h-10 w-10" />,
              title: "Mobile Host Application",
              description:
                "Empower your staff with a dedicated mobile app for real-time floor management, table assignments, and guest service notes.",
              gradient: "from-green-500 to-emerald-500",
            },
            {
              icon: <Gift className="h-10 w-10" />,
              title: "Digital Gift Card System",
              description:
                "Increase revenue streams with customizable digital gift cards that integrate directly with your reservation and POS systems.",
              gradient: "from-amber-500 to-orange-500",
            },
            {
              icon: <ShieldCheck className="h-10 w-10" />,
              title: "Fraud Prevention & Deposit Management",
              description:
                "Secure your business with integrated deposit collection, credit card verification, and no-show protection policies.",
              gradient: "from-blue-500 to-indigo-500",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl border border-gray-200/70 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/10 hover:-translate-y-1"
              data-animate
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-20 rounded-2xl`}
              ></div>
              <div className="relative">
                <div
                  className={`inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-r ${feature.gradient} mb-4`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="mt-16 text-center" data-animate>
          <Button
            size="lg"
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-100 px-8 h-14 rounded-full font-medium text-base"
          >
            View Full Feature Comparison
          </Button>
        </div> */}
      </div>
    </section>
  );
}

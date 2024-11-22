"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/landing/benefits/ServiceCard";
import FooterHome from "@/components/landing/footer/FooterHome";
import Header from "@/components/landing/header/Header";
import Home from "./home/Home";
import TrustedRestuarants from "./benefits/TrustedRestuarants";
import Features from "./features/Features";
import Testimonials from "@/components/landing/testimonials/Testimonials";
import Started from "./started/Started";
import dynamic from "next/dynamic";

const AuthModal = dynamic(
  () => import("../auth/Authmodal").then((mod) => mod.AuthModal),
  { ssr: false }
);

export default function LandingPage() {
  const servicesRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalView, setModalView] = useState<"signin" | "signup">("signin");

  const handleOpenModal = (type: "signin" | "signup") => {
    setModalView(type);
    setIsModalOpen(true);
  };

  return (
    <div className="flex min-h-screen flex-col  overflow-x-clip bg-white">
      {/* Header */}
      <div className="mt-1 sm:mt-1 md:mt-2 lg:mt-4 xl:mt-1">
        <Header
          onOpenModal={handleOpenModal}
          scrollToSection={scrollToSection}
          servicesRef={servicesRef}
          testimonialsRef={testimonialsRef}
          featuresRef={featuresRef}
        />
      </div>
      {/* Main Content */}
      <main className="flex-1 bg-inherit/10 px-10">
        <Home />

        {/* trusted restaurants */}
        <TrustedRestuarants />

        {/* Benefits Section */}
        <section
          ref={servicesRef}
          className="bg-muted/50 py-24 px-20 border rounded-2xl border-none mb-20 "
        >
          <ServiceCard />
        </section>

        {/* Feature Section */}
        <section className=" px-20 border rounded-2xl border-none mb-10 bg-gradient-to-b from-white/50 to-white">
          <Features />
        </section>

        {/* Testimonials Section */}
        <section
          ref={testimonialsRef}
          className="mb-5 border rounded-2xl border-none bg-muted/50"
        >
          <Testimonials />
        </section>

        <Started />
      </main>
      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialView={modalView}
      />

      {/* Footer */}
      <FooterHome />
    </div>
  );
}

import React from "react";
import Header from "./Header";
import HeroSection from "./Home";
import FeaturesSection from "./FeaturesSection";
import SimplifyWorkflow from "./SimplifyWorkflow";
import StreamlineOperations from "./StreamlineOperations";
import Pricing from "./Pricing";
import Faq from "./Faq";
import Footer from "./Footer";

export default function Container() {
  return (
    <>
      <Header />
      <main className="mt-10 min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900 oswald">
        <HeroSection />
        <FeaturesSection />
        <SimplifyWorkflow />
        <Pricing />
        <StreamlineOperations /> 
        <Faq />
      </main>
      <Footer />
    </>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: "Home", href: "home" },
    { name: "Features", href: "features" },
    { name: "Pricing", href: "pricing" },
    { name: "Support", href: "support" },
  ];

  return (
    <section
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? "bg-white/70 backdrop-blur-md border-b border-gray-200/50 shadow-sm"
          : "bg-transparent py-4"
      }`}
    >
      <nav className="flex items-center justify-between px-6 max-w-7xl mx-auto w-full oswald">
        <Link href="/" className="shrink-0 flex items-center z-50">
          <div
            className={`transition-all duration-500 ease-in-out flex items-center justify-center ${
              isScrolled ? "h-16 w-32 md:h-20 md:w-36" : "h-16 w-32 md:h-20 md:w-36"
            }`}
          >
            <Image
              src="/assets/logo/logo2.png"
              alt="Swiftab"
              width={1000}
              height={800}
              className="w-full h-auto object-contain transition-transform duration-300 hover:scale-105"
              priority
            />
          </div>
        </Link>
        <div
          className={`hidden md:flex items-center overflow-hidden transition-all duration-500 ease-in-out ${
            isScrolled ? "max-w-0 opacity-0 gap-0" : "max-w-2xl opacity-100 gap-8"
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={`#${link.href}`}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-sm font-medium text-gray-600 hover:text-black transition-colors whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3 md:gap-4 z-50">
          <Link
            href="/#contact"
            onClick={(e) => scrollToSection(e, "contact")}
            className="hidden md:flex text-sm font-medium text-gray-700 hover:text-black px-4 py-2 border border-gray-200 hover:border-gray-300 rounded-full bg-white/50 hover:bg-white transition-all"
          >
            Contact Sales
          </Link>
          <Link
            href="/signin"
            className="text-sm font-medium text-white bg-primary hover:bg-primary/90 px-5 py-2 rounded-full shadow-sm shadow-primary/20 transition-all hover:scale-105 active:scale-95"
          >
            Sign In
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 -mr-2 text-gray-700 hover:text-black transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-white/95 backdrop-blur-xl z-40 transition-all duration-500 ease-in-out md:hidden flex flex-col pt-24 px-6 ${
          isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={`#${link.href}`}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-2xl font-semibold text-gray-900 flex items-center justify-between border-b border-gray-100 pb-4"
            >
              {link.name}
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, "contact")}
            className="text-2xl font-semibold text-gray-900 flex items-center justify-between border-b border-gray-100 pb-4"
          >
            Contact Sales
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </a>
        </div>
        
        <div className="mt-auto mb-10">
          <p className="text-sm text-gray-500 font-medium">Ready to optimize your floor plan?</p>
          <Link
            href="/signin"
            className="mt-4 flex w-full items-center justify-center text-base font-semibold text-white bg-primary py-4 rounded-xl shadow-lg shadow-primary/30"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}
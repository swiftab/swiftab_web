"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  CalendarClock,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import FeatureSection from "./benefits/ServiceCard";
import EnhancedFeatures from "./features/EnhancedFeatures";
import Howitworks from "./works/Howitworks";
import Pricing from "./pricing/Pricing";
import Testimonials from "./testimonials/Testimonials";
import FooterHome from "./footer/FooterHome";
import Cta from "./footer/Cta";
import Home from "./home/Home";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const observerRefs = useRef<IntersectionObserver[]>([]);
  const router = useRouter();

  const navigateToSignin = ()=>{
    router.push('/signin/')
  }

  const navigateToSignup = ()=>{
    router.push('/signup')
  }
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse position for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const sections = ["features", "how-it-works", "pricing", "testimonials"];

    sections.forEach((section) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate-in");
              if (entry.intersectionRatio > 0.5) {
                setActiveSection(section);
              }
            }
          });
        },
        { threshold: [0.1, 0.5] }
      );

      const element = document.getElementById(section);
      if (element) {
        observer.observe(element);
        observerRefs.current.push(observer);
      }
    });

    // Animate elements with data-animate attribute
    const animateObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-animate]").forEach((el) => {
      animateObserver.observe(el);
    });
    observerRefs.current.push(animateObserver);

    return () => {
      observerRefs.current.forEach((observer) => observer.disconnect());
    };
  }, []);

  

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900 overflow-hidden">
      {/* Background gradient elements */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-gray-100 to-gray-200/30 blur-[120px] -translate-x-1/2 -translate-y-1/2"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px) translate(-50%, -50%)`,
          }}
        />
        <div
          className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-l from-gray-200/30 to-gray-300/40 blur-[100px] translate-x-1/2"
          style={{
            transform: `translate(${-mousePosition.x * 20}px, ${mousePosition.y * 20}px) translate(50%, 0)`,
          }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-gray-300/20 to-gray-200/30 blur-[80px]"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${-mousePosition.y * 20}px)`,
          }}
        />
      </div>

      <div className="fixed inset-0 z-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-[0.02]"></div>

      <header className="sticky top-0 z-40 backdrop-blur-xl bg-transparent border-b border-gray-200/70 md:px-20 px-5">
        <div className="container flex h-20 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 blur-sm rounded-full opacity-70"></div>
              <CalendarClock className="h-8 w-8 relative" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              SwifTab
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {["features", "how-it-works", "pricing", "testimonials"].map(
              (item) => (
                <Link
                  key={item}
                  href={`#${item}`}
                  className={`text-sm font-medium transition-colors hover:text-gray-900 ${
                    activeSection === item ? "text-gray-900" : "text-gray-700"
                  }`}
                >
                  {item
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </Link>
              )
            )}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              onClick={navigateToSignin}
            >
              Log In
            </Button>
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/80 text-white border-0 shadow-lg shadow-blue-700/20"
              onClick={navigateToSignup}
            >
              Get Started
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-15 w-15" />
            ) : (
              <Menu className="h-15 w-15" />
            )}
          </Button>
        </div>

        {isMenuOpen && (
          <div className="container md:hidden py-4 pb-6 border-t border-gray-200/70 backdrop-blur-xl bg-gray-50">
            <nav className="flex flex-col gap-4">
              {["features", "how-it-works", "pricing", "testimonials"].map(
                (item) => (
                  <Link
                    key={item}
                    href={`#${item}`}
                    className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item
                      .split("-")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </Link>
                )
              )}
              <div className="flex flex-col gap-2 mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-center text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  onClick={navigateToSignin}
                >
                  Log In
                </Button>
                <Button
                  size="sm"
                  className="justify-center bg-primary hover:bg-primary/80 text-white border-0"
                  onClick={navigateToSignup}
                >
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1 relative z-10 ">
        {/* Hero Section */}
        <Home />

        <FeatureSection />

        {/* Enhanced Features Section */}
        <EnhancedFeatures />

        {/* Enhanced How It Works Section */}
        
          <Howitworks />

        {/* Pricing Section */}
        <Pricing />



<Testimonials />
        {/* CTA Section */}
        <Cta />

      </main>

      <FooterHome />

      {/* Add CSS for animations */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes float-slow {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }

        [data-animate] {
          opacity: 0;
          transform: translateY(20px);
          transition:
            opacity 0.6s ease-out,
            transform 0.6s ease-out;
        }

        [data-animate].animate-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}

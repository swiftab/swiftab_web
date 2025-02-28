import { Button } from "@/components/ui/button";
import { CalendarClock } from "lucide-react";
import Link from "next/link";

export default function FooterHome() {
  return (
    <footer className="border-t border-gray-200/70 bg-gray-100">
      <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 blur-sm rounded-full opacity-70"></div>
                <CalendarClock className="h-8 w-8 relative" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                SwifTab
              </span>
            </div>
            <p className="text-gray-500">
              Streamlining restaurant reservations since 2021.
            </p>
            <div className="flex gap-4 mt-2">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              >
                <span className="sr-only">Twitter</span>𝕏
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              >
                <span className="sr-only">Instagram</span>📸
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              >
                <span className="sr-only">LinkedIn</span>🔗
              </Button>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Product
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="#features"
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Integrations
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Updates
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Resources
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="#"
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Guides
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                  API Documentation
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="#"
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200/70 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} TableReserve. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

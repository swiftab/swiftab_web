import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CalendarClock, Twitter, Instagram, Linkedin, ArrowRight, Mail } from "lucide-react"
import Link from "next/link"

export default function FooterHome() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="px-4 py-12 md:px-6 md:py-16 lg:py-20">
        {/* Newsletter section */}
        <div className="mb-16 p-6 md:p-8 bg-gradient-to-r from-primary/10 to-green-700/5 rounded-2xl border border-primary/20">
          <div className="grid gap-6 md:grid-cols-2 md:gap-8 items-center">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Stay updated with SwifTab</h3>
              <p className="text-gray-600">
                Get the latest news, product updates, and exclusive offers delivered to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 h-12 bg-white border-gray-200 focus:border-primary focus:ring-primary"
                />
              </div>
              <Button className="h-12 px-5 bg-primary hover:bg-primary/90 text-white font-medium">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-green-700 blur-sm rounded-full opacity-70"></div>
                  <div className="relative bg-white p-2 rounded-full">
                    <CalendarClock className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-primary bg-clip-text text-transparent">
                  SwifTab
                </span>
              </div>
              <p className="text-gray-600 max-w-md">
                Streamlining restaurant reservations since 2021. Helping restaurants maximize capacity and deliver
                exceptional dining experiences.
              </p>
              <div className="flex gap-4 mt-2">
                <Link href="https://twitter.com" className="group" target="_blank" rel="noopener noreferrer">
                  <div className="p-2.5 rounded-full bg-gray-100 text-gray-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <Twitter className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </div>
                </Link>
                <Link href="https://instagram.com" className="group" target="_blank" rel="noopener noreferrer">
                  <div className="p-2.5 rounded-full bg-gray-100 text-gray-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <Instagram className="h-5 w-5" />
                    <span className="sr-only">Instagram</span>
                  </div>
                </Link>
                <Link href="https://linkedin.com" className="group" target="_blank" rel="noopener noreferrer">
                  <div className="p-2.5 rounded-full bg-gray-100 text-gray-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-semibold text-gray-900 uppercase tracking-wider">Product</h3>
            <ul className="space-y-3.5">
              <li>
                <Link href="#features" className="text-gray-600 hover:text-primary transition-colors inline-flex">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-gray-600 hover:text-primary transition-colors inline-flex">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary transition-colors inline-flex">
                  Integrations
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary transition-colors inline-flex">
                  Updates
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary transition-colors inline-flex">
                  Case Studies
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-semibold text-gray-900 uppercase tracking-wider">Resources</h3>
            <ul className="space-y-3.5">
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary transition-colors inline-flex">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary transition-colors inline-flex">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary transition-colors inline-flex">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-semibold text-gray-900 uppercase tracking-wider">Company</h3>
            <ul className="space-y-3.5">
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary transition-colors inline-flex">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary transition-colors inline-flex">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-primary transition-colors inline-flex">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-primary transition-colors inline-flex">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} SwifTab. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/terms" className="text-sm text-gray-500 hover:text-primary transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}


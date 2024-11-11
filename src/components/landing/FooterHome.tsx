import Link from "next/link"
import { Facebook, Twitter, Instagram } from "lucide-react"

export default function Container() {
  return (
    <footer className="w-full bg-zinc-800 text-zinc-100 py-12 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-3">
            <h2 className="text-xl font-bold mb-4">SwifTab</h2>
            <p className="text-sm text-zinc-300 mb-4">
              Your guide to unforgettable dining experiences
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-zinc-300 hover:text-white">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-zinc-300 hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-zinc-300 hover:text-white">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          {/* Product Column */}
          <div className="md:col-span-2">
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-zinc-300 hover:text-white">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-zinc-300 hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-zinc-300 hover:text-white">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-zinc-300 hover:text-white">
                  Updates
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="md:col-span-2">
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-zinc-300 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-zinc-300 hover:text-white">
                  Contact us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-zinc-300 hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-zinc-300 hover:text-white">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="md:col-span-2">
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-zinc-300 hover:text-white">
                  Getting started
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-zinc-300 hover:text-white">
                  Help center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-zinc-300 hover:text-white">
                  Server status
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-zinc-300 hover:text-white">
                  Chat support
                </Link>
              </li>
            </ul>
          </div>

          {/* Privacy and Terms Column */}
          <div className="md:col-span-3">
            <h3 className="font-semibold mb-4">Privacy and Terms</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-zinc-300 hover:text-white">
                  Community guidelines
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-zinc-300 hover:text-white">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-zinc-300 hover:text-white">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
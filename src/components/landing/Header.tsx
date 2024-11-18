'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from 'lucide-react'

export default function Header({ 
  scrollToSection = () => {}, 
  servicesRef = null, 
  testimonialsRef = null, 
  featuresRef = null 
}: { 
  scrollToSection?: (ref: React.RefObject<HTMLElement>) => void,
  servicesRef?: React.RefObject<HTMLElement> | null,
  testimonialsRef?: React.RefObject<HTMLElement> | null,
  featuresRef?: React.RefObject<HTMLElement> | null
}) {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: 'Home', onClick: () => {} },
    { name: 'Contact Us', onClick: () => {} },
    { name: 'Services', onClick: () => scrollToSection(servicesRef) },
    { name: 'About Us', onClick: () => scrollToSection(testimonialsRef) },
    { name: 'FAQ', onClick: () => scrollToSection(featuresRef) },
  ]

  return (
    <header className="sticky top-0 z-50 bg-background/2 backdrop-blur m-1 sm:m-1 md:m-2 lg:m-4 xl:m-5">
      <div className="container flex h-14 items-center justify-between rounded-full border">
        <Link href="/" className="flex items-center space-x-2 px-4 sm:px-6 md:px-8 lg:px-10">
          <Image
            src="/swiftab/logo.svg"
            width={100}
            height={100}
            alt="logo"
            className="bg-background/10"
          />
        </Link>
        <nav className="hidden md:flex gap-6 px-4">
          {navItems.map((item, index) => (
            <button 
              key={index}
              onClick={item.onClick}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {item.name}
            </button>
          ))}
        </nav>
        <div className="flex gap-4 px-4 sm:px-6 md:px-8 lg:px-10">
          <Button variant="outline" asChild className="hidden sm:inline-flex">
            <Link href="/dash">Log In</Link>
          </Button>
          <Button asChild className="hidden sm:inline-flex">
            <Link href="/signup">Sign up</Link>
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4">
                {navItems.map((item, index) => (
                  <button 
                    key={index}
                    onClick={() => {
                      item.onClick()
                      setIsOpen(false)
                    }}
                    className="text-sm font-medium hover:text-primary transition-colors"
                  >
                    {item.name}
                  </button>
                ))}
                <Button variant="outline" asChild className="w-full sm:hidden">
                  <Link href="/dash">Log In</Link>
                </Button>
                <Button asChild className="w-full sm:hidden">
                  <Link href="/signup">Sign up</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
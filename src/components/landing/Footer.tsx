import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
   <footer className="w-full oswald" id='support'>
    <div className="bg-primary/60 text-gray-950 py-20 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="max-w-xl">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">Take Control of Your Restaurant Today!</h2>
          <p className="text-primary-100 text-lg mb-8">Streamline your front-of-house, track table turns, and manage your staff efficiently with our powerful dashboard.</p>
          
          <div className="flex items-center gap-8 mb-8">
            <div>
              <div className="text-3xl font-bold">25%</div>
              <div className="text-primary-20 text-sm">Faster Table Turns</div>
            </div>
            <div>
              <div className="text-3xl font-bold">500+</div>
              <div className="text-primary-20 text-sm">Restaurants Empowered</div>
            </div>
            <div>
              <div className="text-3xl font-bold">99.9%</div>
              <div className="text-primary-20 text-sm">Uptime Guarantee</div>
            </div>
          </div>
          
          <button className="bg-white text-primary font-bold px-8 py-4 rounded-lg shadow-lg hover:bg-gray-50 transition-all">
            Request a Demo
          </button>
        </div>
        

        <div className="w-full md:w-1/2 h-64 bg-primary/50 rounded-2xl border border-blue-400/50 backdrop-blur-sm flex items-center justify-center p-6 transform rotate-2 translate-x-12 hidden md:flex">
             <div className="w-full h-full bg-white rounded-xl shadow-2xl p-4 flex flex-col">
                <div className="h-4 w-1/3 bg-gray-200 rounded mb-4"></div>
                <div className="flex gap-4 flex-1">
                   <div className="w-1/4 bg-blue-50 rounded-lg border border-blue-100"></div>
                   <div className="flex-1 bg-gray-50 rounded-lg border border-gray-100 p-4">
                      <div className="grid grid-cols-3 gap-2 h-full">
                         {[...Array(6)].map((_, i) => <div key={i} className="bg-gray-200 rounded-md"></div>)}
                      </div>
                   </div>
                </div>
             </div>
        </div>
      </div>
    </div>

    <div className="bg-white py-16 px-6 border-t border-gray-100">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="col-span-1 md:col-span-1">
           <Link href="/" className="shrink-0">
        <div className="h-10 w-15 md:h-16 md:w-32 transition-transform duration-300 hover:scale-105 flex items-center justify-center">
          <Image
            src="/assets/logo/logo2.png"
            alt="swiftab"
            width={1000}
            height={800}
            className=" md:h-24 md:w-auto transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>
          <p className="text-sm text-gray-500 mb-6">Empowering hospitality growth, one table at a time.</p>
          <div className="flex gap-4 text-gray-400">
             <span className="hover:text-gray-900 cursor-pointer">Fb</span>
             <span className="hover:text-gray-900 cursor-pointer">Ig</span>
             <span className="hover:text-gray-900 cursor-pointer">X</span>
             <span className="hover:text-gray-900 cursor-pointer">In</span>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 mb-4">Product</h4>
          <ul className="space-y-3 text-sm text-gray-500">
            <li><a href="#" className="hover:text-primary-50">Dashboard</a></li>
            <li><a href="#" className="hover:text-primary-50">Features</a></li>
            <li><a href="#" className="hover:text-primary-50">Pricing</a></li>
            <li><a href="#" className="hover:text-primary-50">Support</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 mb-4">Resources</h4>
          <ul className="space-y-3 text-sm text-gray-500">
            <li><a href="#" className="hover:text-primary-50">Documentation</a></li>
            <li><a href="#" className="hover:text-primary-50">FAQs</a></li>
            <li><a href="#" className="hover:text-primary-50">Tutorials</a></li>
            <li><a href="#" className="hover:text-primary-50">Case Studies</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 mb-4">Company</h4>
          <ul className="space-y-3 text-sm text-gray-500">
            <li><a href="#" className="hover:text-primary-50">About Us</a></li>
            <li><a href="#" className="hover:text-primary-50">Careers</a></li>
            <li><a href="#" className="hover:text-primary-50">Blog</a></li>
            <li><a href="#" className="hover:text-primary-50">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 mb-4">Community</h4>
          <ul className="space-y-3 text-sm text-gray-500">
            <li><a href="#" className="hover:text-primary-50">Forum</a></li>
            <li><a href="#" className="hover:text-primary-50">Events</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-4">
        <p>© 2026 Swiftab. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-gray-900">Privacy Policy</a>
          <a href="#" className="hover:text-gray-900">Terms of Service</a>
          <a href="#" className="hover:text-gray-900">Cookies Settings</a>
        </div>
      </div>
    </div>
  </footer>
  )
}


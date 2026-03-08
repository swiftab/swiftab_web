"use client"

import React, { useState } from 'react'

export default function Pricing() {
    const [isAnnual, setIsAnnual] = useState(false);
  return (
        <section className="py-12 px-6 max-w-5xl mx-auto w-full" id='pricing'>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Flexible Plans for Every Need</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">Choose the plan that fits your restaurant. Whether starting small or scaling up, our pricing supports your workflow.</p>
        
        <div className="inline-flex bg-gray-50 border border-gray-200 rounded-xl p-1">
          <button 
            onClick={() => setIsAnnual(false)}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${!isAnnual ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Monthly
          </button>
          <button 
            onClick={() => setIsAnnual(true)}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${isAnnual ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Yearly <span className="text-xs ml-1 text-green-500">(Save 20%)</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="bg-white border border-gray-200 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Starter</h3>
          <p className="text-sm text-gray-500 mb-6">Get started with the essentials to manage your front-of-house efficiently.</p>
          <div className="text-4xl font-extrabold text-gray-900 mb-6">0 <span className="text-base font-normal text-gray-500">/mo</span></div>
          <button className="w-full py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold mb-6 transition-all">Sign Up Now</button>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-center gap-2"><span className="text-red-500">✔️</span> Manage up to 15 tables</li>
            <li className="flex items-center gap-2"><span className="text-red-500">✔️</span> 100 reservations monthly</li>
            <li className="flex items-center gap-2"><span className="text-red-500">✔️</span> Basic floor plan builder</li>
            <li className="flex items-center gap-2"><span className="text-red-500">✔️</span> Email support</li>
          </ul>
        </div>

        <div className="bg-white border-2 border-primary rounded-2xl p-8 shadow-xl transform md:-translate-y-4 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Most Popular</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Pro</h3>
          <p className="text-sm text-gray-500 mb-6">Unlock advanced tools and insights to scale your service and optimize workflows.</p>
          <div className="text-4xl font-extrabold text-gray-900 mb-6">Ksh{isAnnual ? '12000' : '1000'} <span className="text-base font-normal text-gray-500">/mo</span></div>
          <button className="w-full py-3 rounded-lg bg-primary hover:bg-primary/60 text-white font-semibold mb-6 transition-all shadow-lg shadow-blue-500/30">Get Started</button>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-center gap-2"><span className="text-red-500">✔️</span> Unlimited tables & reservations</li>
            <li className="flex items-center gap-2"><span className="text-red-500">✔️</span> POS & Payment Integrations</li>
            <li className="flex items-center gap-2"><span className="text-red-500">✔️</span> Advanced shift analytics</li>
            <li className="flex items-center gap-2"><span className="text-red-500">✔️</span> Priority 24/7 support</li>
          </ul>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Enterprise</h3>
          <p className="text-sm text-gray-500 mb-6">Custom solutions designed for restaurant groups with dedicated support.</p>
          <div className="text-4xl font-extrabold text-gray-900 mb-6">Custom</div>
          <button className="w-full py-3 rounded-lg bg-blue-50 hover:bg-blue-100 text-primary/60 font-semibold mb-6 transition-all border border-primary/20">Contact Us</button>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-center gap-2"><span className="text-red-500">✔️</span> Multi-location management</li>
            <li className="flex items-center gap-2"><span className="text-red-500">✔️</span> Dedicated account manager</li>
            <li className="flex items-center gap-2"><span className="text-red-500">✔️</span> Custom API access</li>
            <li className="flex items-center gap-2"><span className="text-red-500">✔️</span> Custom feature development</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
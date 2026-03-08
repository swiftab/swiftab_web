"use client"

import React from 'react'

export default function StreamlineOperations() {
  return (
      <section className="py-12 px-6 w-full max-w-6xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Streamline Your Operations</h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">Unlock the full potential of your restaurant with tools to automate waitlists, deliver insights, and centralize table data.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <div className="h-32 bg-gray-50 rounded-xl mb-6 flex items-center justify-center text-2xl">🔄</div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Automated Waitlists</h3>
        <p className="text-sm text-gray-600">Simplify host stand tasks. Handle SMS notifications, table readiness, and queue monitoring effortlessly.</p>
      </div>
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <div className="h-32 bg-gray-50 rounded-xl mb-6 flex items-center justify-center text-2xl">📊</div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Service Reporting</h3>
        <p className="text-sm text-gray-600">Generate tailored reports to focus on turn times and cover counts. Visualize performance insights.</p>
      </div>
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <div className="h-32 bg-gray-50 rounded-xl mb-6 flex items-center justify-center text-2xl">🌐</div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Multi-Location Insights</h3>
        <p className="text-sm text-gray-600">Track and analyze sales across all your restaurant branches from one unified admin dashboard.</p>
      </div>
    </div>

    <div className="text-center mb-24">
      <button className="bg-primary hover:bg-primary/50 text-white font-medium px-8 py-3 rounded-lg shadow-md transition-all">
        Request a Demo
      </button>
    </div>

    {/* Integrations Block */}
    <div className="bg-primary/10 rounded-3xl p-12 border border-gray-100 flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Expand Your Reach with Integrations</h2>
        <p className="text-gray-600 mb-6">Discover POS systems, delivery apps, and payment gateways that integrate seamlessly with our dashboard.</p>
        <button className="bg-primary hover:bg-primary/50 text-white font-medium px-6 py-2 rounded-lg text-sm">
          Full Integrations List
        </button>
      </div>
      <div className="flex-1 flex flex-wrap gap-3 justify-center">
        {['Square', 'Toast', 'Stripe', 'UberEats', 'Deliveroo', 'QuickBooks', 'Mailchimp', 'Slack'].map(app => (
          <div key={app} className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm font-medium text-sm text-gray-700 flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded-full"></div> {app}
          </div>
        ))}
        <div className="bg-gray-900 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center">
          +14 more
        </div>
      </div>
    </div>
  </section>
  )
}

"use client"
import React, { useState } from 'react'

export default function Faq() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What kind of analytics does Swiftab provide?",
      a: "Swiftab integrates seamlessly with leading POS systems and provides detailed insights into table turn times, server performance, peak dining hours, and revenue per cover."
    },
    { q: "Is there a limit to the number of waitstaff users?", a: "No, our Pro and Enterprise plans offer unlimited team member accounts with customizable role-based permissions." },
    { q: "How does Swiftab help with kitchen management?", a: "By syncing your front-of-house table statuses with your Kitchen Display System (KDS), ensuring orders are paced correctly." },
    { q: "Can I customize my restaurant floor plan?", a: "Yes, our interactive drag-and-drop builder lets you map out your exact dining room, patio, and bar areas." },
    { q: "Does Swiftab support multi-location management?", a: "Yes, our Enterprise plan allows you to oversee metrics, menus, and staff across multiple restaurant locations from a single admin dashboard." }
  ];
  return (
        <section className="py-12 px-6 max-w-3xl mx-auto w-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-4">All Your Questions, Answered</h2>
        <p className="text-gray-600">Find quick answers to the most commonly asked questions. If you need further help, feel free to contact support.</p>
      </div>

      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 pb-2">
            <button 
              className="w-full flex items-center justify-between text-left py-4 focus:outline-none"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className="font-bold text-gray-900">{faq.q}</span>
              <span className="text-primary text-xl">{openIndex === index ? '−' : '+'}</span>
            </button>
            {openIndex === index && (
              <p className="text-gray-600 text-sm pb-4 pr-8 leading-relaxed">
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}



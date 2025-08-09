import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function Howitworks() {
  return (
    <section id="how-it-works" className="py-10 md:py-20 relative px-20 bg-gray-50">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-50 via-indigo-900/10 to-gray-50 opacity-50"></div>
          <div className="px-4 md:px-6 relative">
            <div
              className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
              data-animate
            >
              {/* <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium text-gray-700 border border-white/20 mb-4">
                <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                  Implementation Process
                </span>
              </div> */}
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-gray-900 to-primary/20 bg-clip-text text-transparent">
                Enterprise-Grade Deployment
              </h2>
              <p className="max-w-[800px] text-gray-700 text-lg md:text-xl">
                Our white-glove implementation process ensures a smooth
                transition with minimal disruption to your operations.
              </p>
            </div>

            <div className="relative">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 hidden lg:block"></div>
              <div className="grid gap-12 md:gap-12 lg:grid-cols-4">
                {[
                  {
                    step: "01",
                    title: "Strategic Planning",
                    description:
                      "Our implementation team works with your management to understand your specific needs, design custom workflows, and create a tailored deployment roadmap.",
                    gradient: "from-primary to-green-500",
                  },
                  {
                    step: "02",
                    title: "System Integration",
                    description:
                      "We seamlessly connect with your existing tech stack including POS systems, payment processors, marketing tools, and operational software.",
                    gradient: "from-primary to-green-400",
                  },
                  {
                    step: "03",
                    title: "Staff Training",
                    description:
                      "Comprehensive training sessions for managers, hosts, and staff ensure everyone is confident with the new system before going live.",
                    gradient: "from-primary to-green-300",
                  },
                  {
                    step: "04",
                    title: "Ongoing Optimization",
                    description:
                      "Our dedicated success managers provide continuous support, regular performance reviews, and strategic recommendations for growth.",
                    gradient: "from-primary to-green-200",
                  },
                ].map((step, index) => (
                  <div
                    key={index}
                    className="relative flex flex-col items-center text-center"
                    data-animate
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div
                      className={`relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r ${step.gradient} shadow-lg shadow-blue-900/20 mb-6`}
                    >
                      <span className="text-2xl font-bold text-white">
                        {step.step}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">
                      {step.title}
                    </h3>
                    <p className="text-gray-700 max-w-xs mt-5">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 space-y-16">
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl border border-gray-200/70 p-8 md:p-10">
                <div className="grid md:grid-cols-2 gap-10 items-center">
                  <div className="space-y-6" data-animate>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                      Dedicated Implementation Team
                    </h3>
                    <p className="text-gray-700">
                      Every enterprise client receives a dedicated
                      implementation team consisting of a project manager,
                      integration specialist, and customer success manager to
                      ensure a flawless transition.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Personalized onboarding experience",
                        "Custom integration development",
                        "Data migration assistance",
                        "24/7 priority support",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start">
                          <div className="mr-3 mt-1">
                            <CheckCircle className="h-5 w-5 text-green-400" />
                          </div>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className="relative rounded-xl overflow-hidden border border-gray-200/70"
                    data-animate
                  >
                    <Image
                      src="/swiftab/management.webp"
                      width={500}
                      height={300}
                      alt="Implementation Team"
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-50 to-transparent opacity-60"></div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/80 text-white border-0 shadow-lg shadow-blue-700/20 px-8 h-14 rounded-full font-medium text-base gap-2 group"
                >
                  Schedule Implementation Consultation
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </section>
  )
}

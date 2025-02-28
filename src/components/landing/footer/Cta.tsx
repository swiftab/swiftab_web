import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

export default function Cta() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white"></div>
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-10"></div>
      <div className="container px-4 md:px-6 relative">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="flex flex-col justify-center space-y-6" data-animate>
            <div className="space-y-4 justify-center text-center items-center">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900  ">
                Ready to Transform Your Reservation Experience?
              </h2>
              <p className="text-xl text-gray-700">
                Join thousands of restaurants already using SwifTab to
                streamline their operations and delight their guests.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-900 hover:bg-white/90 px-8 h-14 rounded-full font-medium text-base"
              >
                Start Free Trial
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-900 text-gray-900 hover:bg-white/10 px-8 h-14 rounded-full font-medium text-base"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
          <div className="relative" data-animate>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-600/20 blur-3xl rounded-full opacity-30"></div>
            <div className="relative bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-gray-200/70 p-1 shadow-2xl">
              <div className="bg-gray-50/80 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Get in Touch
                </h3>
                <form className="grid gap-4">
                  <div className="grid gap-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-700"
                    >
                      Restaurant Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Enter your restaurant name"
                      className="bg-white/5 border-gray-200/70 text-gray-900 placeholder:text-gray-500 focus-visible:ring-primary/50"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="bg-white/5 border-gray-200/70 text-gray-900 placeholder:text-gray-500 focus-visible:ring-primary/50"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="phone"
                      className="text-sm font-medium text-gray-700"
                    >
                      Phone
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(123) 456-7890"
                      className="bg-white/5 border-gray-200/70 text-gray-900 placeholder:text-gray-500 focus-visible:ring-primary/50"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your restaurant and needs"
                      className="bg-white/5 border-gray-200/70 text-gray-900 placeholder:text-gray-500 focus-visible:ring-primary/50"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/50 text-white border-0 h-12"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

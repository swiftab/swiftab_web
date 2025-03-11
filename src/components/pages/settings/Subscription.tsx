import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Subscription = () => {
  const plans = [
    {
      name: "Starter",
      price: "Ksh.499",
      description:
        "Perfect for small restaurants just getting started with online reservations.",
      features: [
        "Up to 100 reservations/month",
        "Basic email reminders",
        "Table management",
        "Standard support",
        "1 staff account",
      ],
      gradient: "from-blue-600/20 to-blue-600/5",
    },
    {
      name: "Professional",
      price: "Ksh.999",
      description:
        "Ideal for established restaurants looking to grow their business.",
      features: [
        "Unlimited reservations",
        "SMS & email reminders",
        "Guest profiles & history",
        "Priority support",
        "5 staff accounts",
        "Analytics dashboard",
      ],
      popular: true,
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      name: "Enterprise",
      price: "Ksh.1199",
      description:
        "For restaurant groups and high-volume establishments.",
      features: [
        "Unlimited reservations",
        "Advanced guest management",
        "Custom branding",
        "API access",
        "Unlimited staff accounts",
        "Dedicated account manager",
        "Multi-location support",
      ],
      gradient: "from-indigo-600/20 to-indigo-600/5",
    },
  ];

  return (
    <section className="relative px-4 md:px-20 bg-gradient-to-r from-gray-50 to-white">
      <div className="container mx-auto relative">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-gray-900 to-primary bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h2>
          <p className="max-w-2xl text-gray-700 text-lg md:text-xl">
            Choose the plan that's right for your restaurant. No hidden fees.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative flex flex-col rounded-2xl ${
                plan.popular
                  ? "bg-gradient-to-br from-blue-500 to-indigo-600 shadow-xl shadow-blue-900/30"
                  : "bg-gradient-to-br from-white to-white/80 border border-gray-200"
              } overflow-hidden`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/grid-pattern.svg')] bg-repeat"></div>
              )}

              <div className="p-6 relative">
                {plan.popular && (
                  <div className="absolute top-6 right-6">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-medium text-white">
                      Most Popular
                    </div>
                  </div>
                )}

                <h3 className={`text-2xl font-bold ${plan.popular ? "text-white" : "text-gray-900"} mb-2`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline mb-4">
                  <span className={`text-4xl font-extrabold tracking-tight ${plan.popular ? "text-white" : "text-gray-900"}`}>
                    {plan.price}
                  </span>
                  <span className={`ml-1 text-sm font-medium ${plan.popular ? "text-white/80" : "text-gray-700"}`}>
                    /month
                  </span>
                </div>
                <p className={`mb-6 ${plan.popular ? "text-white/90" : "text-gray-700"}`}>
                  {plan.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckCircle
                        className={`h-5 w-5 mr-2 mt-0.5 ${plan.popular ? "text-white" : "text-blue-500"}`}
                      />
                      <span className={plan.popular ? "text-white/90" : "text-gray-700"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full h-12 rounded-xl ${
                    plan.popular
                      ? "bg-white text-blue-500 hover:bg-white/90"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  Get Started
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 text-gray-500">
          All plans include a 14-day free trial. No credit card required.
        </div>
      </div>
    </section>
  );
};

export default Subscription;
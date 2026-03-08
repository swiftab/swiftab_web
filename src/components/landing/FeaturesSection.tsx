import React from 'react'

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, iconBg }) => (
  <div className="bg-white p-9 rounded-xl border border-gray-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_25px_-4px_rgba(0,0,0,0.1)] transition-shadow">
    <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center mb-6`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed text-sm">
      {description}
    </p>
  </div>
);

export default function FeaturesSection() {
    const featuresData = [
    {
      title: "Interactive Floor Plans",
      description: "Easily tailor your dashboard with flexible table layouts. Drag and drop to match your exact restaurant floor plan in real-time.",
      iconBg: "bg-orange-100 text-orange-500",
      icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
    },
    {
      title: "Real-Time Order Analytics",
      description: "Access live service metrics and actionable insights to manage kitchen load, turn tables faster, and stay ahead of the rush.",
      iconBg: "bg-blue-100 text-blue-500",
      icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
    },
    {
      title: "Mobile POS Integration",
      description: "Connect seamlessly with mobile Point-of-Sale systems to synchronize table statuses and ensure waitstaff and the kitchen are always aligned.",
      iconBg: "bg-yellow-100 text-yellow-600",
      icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
    },
    {
      title: "User-Friendly Admin",
      description: "Navigate with ease using an intuitive design crafted specifically for fast-paced hospitality environments where simplicity is key.",
      iconBg: "bg-purple-100 text-purple-500",
      icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    }
  ];
  return (
    <section className="py-12 px-6 bg-gray-50/50 w-full" id='features'>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">What Sets Us Apart</h2>
          <p className="text-lg text-gray-600">Explore the features that make managing your restaurant operations easier, smarter, and more efficient.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuresData.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

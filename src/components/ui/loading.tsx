import React from "react";

// Utility function to merge class names (simplified version)
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

export const LoadingSpinner = ({ className }: { className?: string }) => {
  return (
    <div className={cn("relative flex flex-col items-center justify-center", className)}>
      {/* Main spinning plate */}
      <div className="relative">
        {/* Outer plate ring */}
        <div className="w-16 h-16 border-4 border-amber-100 border-t-amber-500 rounded-full animate-spin"></div>
        
        {/* Inner plate */}
        <div className="absolute inset-2 w-12 h-12 bg-gradient-to-br from-amber-50 to-amber-100 rounded-full shadow-inner"></div>
        
        {/* Animated food elements */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Fork and knife animation */}
          <div className="relative w-8 h-8">
            {/* Fork */}
            <div className="absolute left-1 top-2 w-1 h-4 bg-gray-600 rounded-full animate-pulse"></div>
            <div className="absolute left-0.5 top-1 w-0.5 h-1.5 bg-gray-600 rounded-full"></div>
            <div className="absolute left-1.5 top-1 w-0.5 h-1.5 bg-gray-600 rounded-full"></div>
            
            {/* Knife */}
            <div className="absolute right-1 top-2 w-1 h-4 bg-gray-600 rounded-full animate-pulse animation-delay-500"></div>
            <div className="absolute right-0.5 top-1 w-1 h-1.5 bg-gray-700 rounded-sm"></div>
          </div>
        </div>
      </div>
      
      {/* Chef's hat floating above */}
      <div className="absolute -top-6 animate-bounce">
        <div className="relative">
          {/* Hat base */}
          <div className="w-8 h-3 bg-white rounded-full shadow-sm"></div>
          {/* Hat top */}
          <div className="absolute -top-4 left-1 w-6 h-5 bg-white rounded-t-full shadow-sm"></div>
          {/* Hat band */}
          <div className="absolute -top-1 left-0 w-8 h-1 bg-gray-100 rounded-full"></div>
        </div>
      </div>
      
      {/* Floating ingredients around the spinner */}
      <div className="absolute inset-0 w-20 h-20">
        {/* Tomato */}
        <div className="absolute top-0 left-4 w-2 h-2 bg-red-500 rounded-full animate-pulse opacity-70"></div>
        {/* Basil leaf */}
        <div className="absolute top-6 right-0 w-2 h-1.5 bg-green-500 rounded-full animate-pulse opacity-70 animation-delay-1000"></div>
        {/* Garlic */}
        <div className="absolute bottom-2 left-0 w-1.5 h-2 bg-yellow-100 rounded-full animate-pulse opacity-70 animation-delay-1500"></div>
        {/* Pepper */}
        <div className="absolute bottom-0 right-4 w-1.5 h-1.5 bg-orange-600 rounded-full animate-pulse opacity-70 animation-delay-2000"></div>
      </div>
      
      {/* Loading text */}
      <div className="mt-8 text-center">
        <p className="text-gray-700 font-semibold text-sm tracking-wide animate-pulse">
          Preparing your restaurant ...
        </p>
        <div className="flex justify-center mt-2 space-x-1">
          <div className="w-1 h-1 bg-amber-500 rounded-full animate-bounce"></div>
          <div className="w-1 h-1 bg-amber-500 rounded-full animate-bounce animation-delay-200"></div>
          <div className="w-1 h-1 bg-amber-500 rounded-full animate-bounce animation-delay-400"></div>
        </div>
      </div>
    </div>
  );
};
import React from "react";
import { UtensilsCrossed } from "lucide-react";

const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

export const LoadingSpinner = ({ className, desc = "Loading..." }: { className?: string, desc?: string }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center space-y-8", className)}>
      
      <div className="relative flex items-center justify-center">
        
        <div className="absolute inset-[-20px] border-[3px] border-teal-50 border-t-teal-600 rounded-full animate-spin"></div>
        
        <div className="absolute inset-[-8px] border-2 border-teal-500/20 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
        
        <div className="relative flex items-center justify-center h-16 w-16 bg-gradient-to-tr from-teal-600 to-teal-400 rounded-full shadow-lg shadow-teal-500/30">
          <UtensilsCrossed className="h-7 w-7 text-white drop-shadow-md" />
        </div>
      </div>

      <div className="flex flex-col items-center gap-2.5">
        <h3 className="text-sm font-bold text-gray-700 tracking-wider uppercase">
          {desc}
        </h3>
        
        <div className="flex gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="h-1.5 w-1.5 rounded-full bg-teal-300 animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>

    </div>
  );
};
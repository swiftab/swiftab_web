import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex flex-col items-center mb-4 w-full max-w-md mx-auto">
      <div className="flex flex-row items-center justify-between w-full ">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div key={step} className="flex flex-col items-center ">
            {/* Step Circle */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step <= currentStep
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {step}
            </div>
          </div>
        ))}
      </div>

      {/* Horizontal Divider */}
      <div className="flex w-11/12 justify-between pl-10 absolute top-20 -z-50 left-0 items-center">
        {Array.from({ length: totalSteps - 1 }, (_, i) => i + 1).map((step) => (
          <div
            key={step}
            className={`h-1 flex-grow ${
              step < currentStep ? "bg-primary" : "bg-muted"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}


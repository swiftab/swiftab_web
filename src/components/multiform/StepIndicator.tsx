import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function StepIndicator({ currentStep, totalSteps, className = '' }: StepIndicatorProps) {
  return (
    <div className={`w-full max-w-2xl mx-auto px-4 py-3 ${className}`}>
      <div className="relative">
        {/* Progress Line Background */}
        <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-200 rounded-full" />
        
        {/* Active Progress Line */}
        <div 
          className="absolute top-4 left-0 h-0.5 bg-gradient-to-r from-[#0080807f] to-[#008080] rounded-full transition-all duration-500 ease-out"
          style={{ 
            width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` 
          }}
        />

        {/* Step Circles and Labels */}
        <div className="relative flex justify-between">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => {
            const isCompleted = step < currentStep;
            const isCurrent = step === currentStep;
            //const isPending = step > currentStep;

            return (
              <div key={step} className="flex flex-col items-center group">
                {/* Step Circle */}
                <div
                  className={`
                    relative w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                    transition-all duration-300 ease-out transform
                    ${isCompleted 
                      ? 'bg-gradient-to-r from-[#008080] to-[#008080] text-white shadow-lg scale-110' 
                      : isCurrent
                      ? 'bg-[#008080] text-white shadow-lg ring-4 ring-blue-100 scale-110'
                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                    }
                  `}
                >
                  {isCompleted ? (
                    <svg 
                      className="w-4 h-4" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  ) : (
                    <span>{step}</span>
                  )}
                </div>

                {/* Step Label */}
                <div className="mt-3 text-center">
                  <div
                    className={`
                      text-xs font-medium transition-colors duration-300
                      ${isCompleted || isCurrent
                        ? 'text-blue-600'
                        : 'text-gray-400'
                      }
                    `}
                  >
                    Step {step}
                  </div>
                  
                  {/* Status Indicator */}
                  <div
                    className={`
                      mt-1 text-xs transition-colors duration-300
                      ${isCompleted
                        ? 'text-green-500'
                        : isCurrent
                        ? 'text-blue-500'
                        : 'text-gray-400'
                      }
                    `}
                  >
                    {isCompleted ? 'Complete' : isCurrent ? 'In Progress' : 'Pending'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Summary */}
      <div className="mt-6 text-center">
        <div className="text-sm text-gray-600">
          Step <span className="font-semibold text-blue-600">{currentStep}</span> of{' '}
          <span className="font-semibold">{totalSteps}</span>
        </div>
        <div className="mt-1 text-xs text-gray-500">
          {Math.round(((currentStep - 1) / (totalSteps - 1)) * 100)}% Complete
        </div>
      </div>
    </div>
  );
}
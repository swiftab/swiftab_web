interface StepIndicatorProps {
    currentStep: number
    totalSteps: number
  }
  
  export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
    return (
      <div className="flex justify-between mb-4">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div
            key={step}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            {step}
          </div>
        ))}
      </div>
    )
  }
  
  
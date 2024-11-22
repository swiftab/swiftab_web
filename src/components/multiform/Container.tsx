"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { StepThree } from "./StepThree";
import { StepIndicator } from "./StepIndicator";

interface RestaurantSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RestaurantSetupModal({
  isOpen,
  onClose,
}: RestaurantSetupModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    email: "",
    phone: "",
    image: null as File | null,
    averagePrice: "",
    hoursOfOperation: "",
    rate: 0,
    cuisines: "",
    location: "",
    latitude: "",
    longitude: "",
  });

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleRatingChange = (rating: number) => {
    setFormData({ ...formData, rate: rating });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set Up Your Restaurant</DialogTitle>
        </DialogHeader>
        <StepIndicator currentStep={step} totalSteps={3} />
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <StepOne
              formData={formData}
              handleInputChange={handleInputChange}
              handleFileChange={handleFileChange}
            />
          )}
          {step === 2 && (
            <StepTwo
              formData={formData}
              handleInputChange={handleInputChange}
              handleRatingChange={handleRatingChange}
            />
          )}
          {step === 3 && (
            <StepThree
              formData={formData}
              handleInputChange={handleInputChange}
            />
          )}
          <div className="flex justify-between mt-4">
            {step > 1 && (
              <Button type="button" variant="outline" onClick={handlePrevious}>
                Previous
              </Button>
            )}
            {step < 3 ? (
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button type="submit">Submit</Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

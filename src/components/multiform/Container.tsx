"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { StepThree } from "./StepThree";
import { StepIndicator } from "./StepIndicator";
import { StepFour } from "./RestaurantImage";
import { Formik, Form } from "formik";
import {
  stepOneValidationSchema,
  stepTwoValidationSchema,
  stepThreeValidationSchema,
  stepFourValidationSchema,
} from "./validation";
import { useAddRestaurant } from "@/hooks/restauranthook/restauranthook";
import { ErrorResponse } from "@/types/restaurant";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { useAuth } from "../auth/AuthContext";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

interface RestaurantSetupModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RestaurantSetupModal({
  isOpen,
  onOpenChange,
}: RestaurantSetupModalProps) {
  const { refreshUser, user } = useAuth();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const { toast } = useToast();
  const { mutate: addRestaurant, isPending } = useAddRestaurant();

  const validationSchemas = [
    stepOneValidationSchema,
    stepTwoValidationSchema,
    stepThreeValidationSchema,
    stepFourValidationSchema,
  ];

  const initialValues = {
    stepOne: { restaurantName: "", description: "", email: "", phone: "" },
    stepTwo: { averagePrice: 0, hoursOfOperation: "", rate: 0, cuisines: "" },
    stepThree: { location: "", latitude: "", longitude: "" },
    stepFour: { image: null },
  };

  const stepKeys = ["stepOne", "stepTwo", "stepThree", "stepFour"] as const;

  const handleNext = async (formik: any) => {
    const currentStepKey = stepKeys[step - 1];
    const errors = await formik.validateForm();
    
    const currentStepFields = Object.keys(formik.values[currentStepKey]).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as any);

    formik.setTouched({ ...formik.touched, [currentStepKey]: currentStepFields });

    if (!errors[currentStepKey]) {
      setDirection(1);
      setStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setDirection(-1);
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (values: typeof initialValues) => {
    const combinedData = {
      title: "New Restaurants",
      data: [
        {
          image: values.stepFour.image ? values.stepFour.image : "",
          restaurantName: values.stepOne.restaurantName,
          location: values.stepThree.location,
          latitude: parseFloat(values.stepThree.latitude),
          longitude: parseFloat(values.stepThree.longitude),
          rate: values.stepTwo.rate,
          about: [
            {
              description: values.stepOne.description,
              averagePrice: values.stepTwo.averagePrice,
              hrsOfOperation: values.stepTwo.hoursOfOperation,
              phone: values.stepOne.phone,
              email: values.stepOne.email,
            },
          ],
        },
      ],
    };

    const formData = new FormData();
    if (values.stepFour.image) {
      formData.append("image", values.stepFour.image);
    }
    formData.append("title", combinedData.title);
    formData.append("data", JSON.stringify(combinedData));

    try {
      await addRestaurant(formData, {
        onSuccess: () => {
          toast({
            title: "Success!",
            description: "Your restaurant has been set up successfully.",
            variant: "default",
          });
          refreshUser();
          onOpenChange(false);
        },
        onError: (error: ErrorResponse) => {
          toast({
            title: "Setup Failed",
            description: error.message,
            variant: "destructive",
          });
        },
      });
    } catch (error) {
      console.error("Error submitting restaurant data:", error);
    }
  };

  const handleClose = useCallback(
    (open: boolean) => {
      onOpenChange(open);
      if (!open && user?.restaurantId) {
        window.location.reload();
      }
    },
    [onOpenChange, user]
  );

  const animationClass = direction === 1 
    ? "animate-in fade-in slide-in-from-right-8 duration-300" 
    : "animate-in fade-in slide-in-from-left-8 duration-300";

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="[&>button]:hidden sm:max-w-xl p-0 overflow-hidden bg-white border-0 shadow-2xl rounded-2xl flex flex-col max-h-[90vh] oswald"
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <div className="px-8 pt-8 pb-4 border-b border-gray-100 bg-white z-10">
          <DialogHeader>
            <DialogTitle className="text-xl font-extrabold text-gray-900">
              Set Up Your Restaurant
            </DialogTitle>
            <DialogDescription className="text-gray-500 mt-1">
              Complete your profile to start accepting reservations.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6">
            <StepIndicator currentStep={step} totalSteps={4} />
          </div>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchemas[step - 1]}
          onSubmit={handleSubmit}
          validateOnChange={true}
          validateOnBlur={true}
          enableReinitialize
        >
          {(formik) => (
            <Form className="flex flex-col flex-1 overflow-hidden oswald">
              
              <div className="flex-1 overflow-y-auto px-8 py-6">
                <div key={step} className={animationClass}>
                  {step === 1 && (
                    <StepOne
                      formik={{
                        values: formik.values.stepOne,
                        handleChange: formik.handleChange,
                        errors: formik.errors.stepOne || {},
                        touched: formik.touched.stepOne || {},
                        setFieldValue: formik.setFieldValue,
                      }}
                    />
                  )}
                  {step === 2 && (
                    <StepTwo
                      formik={{
                        values: formik.values.stepTwo,
                        setFieldValue: formik.setFieldValue,
                        handleChange: formik.handleChange,
                        errors: formik.errors.stepTwo || {},
                        touched: formik.touched.stepTwo || {},
                      }}
                    />
                  )}
                  {step === 3 && (
                    <StepThree
                      formData={formik.values.stepThree}
                      handleInputChange={formik.handleChange}
                      errors={formik.errors.stepThree || {}}
                      touched={formik.touched.stepThree || {}}
                    />
                  )}
                  {step === 4 && (
                    <StepFour
                      formik={{
                        values: formik.values.stepFour,
                        setFieldValue: formik.setFieldValue,
                      }}
                    />
                  )}
                </div>
              </div>

              <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center z-10">
                <div>
                  {step > 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePrevious}
                      className="text-gray-600 border-gray-200 hover:bg-gray-100 font-medium px-6"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" /> Back
                    </Button>
                  ) : (
                    <div />
                  )}
                </div>
                
                <div>
                  {step < 4 ? (
                    <Button 
                      type="button" 
                      onClick={() => handleNext(formik)}
                      className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-8 shadow-sm transition-all"
                    >
                      Next Step <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  ) : (
                    <Button 
                      type="submit" 
                      disabled={isPending}
                      className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-8 shadow-sm transition-all disabled:opacity-70"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Finalizing...
                        </>
                      ) : (
                        "Complete Setup"
                      )}
                    </Button>
                  )}
                </div>
              </div>

            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useAuth } from "../auth/AuthContext";

interface RestaurantSetupModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RestaurantSetupModal({
  isOpen,
  onOpenChange,
}: RestaurantSetupModalProps) {
  const { refreshUser,user } = useAuth();
  const [step, setStep] = useState(1);
  const validationSchemas = [
    stepOneValidationSchema,
    stepTwoValidationSchema,
    stepThreeValidationSchema,
    stepFourValidationSchema,
  ];

  const initialValues = {
    stepOne: {
      restaurantName: "",
      description: "",
      email: "",
      phone: "",
    },
    stepTwo: {
      averagePrice: 0,
      hoursOfOperation: "",
      rate: 0,
      cuisines: "",
    },
    stepThree: {
      location: "",
      latitude: "",
      longitude: "",
    },
    stepFour: {
      image: null,
    },
  };

  const handleNext = async (formik: any) => {
    const errors = await formik.validateForm();
    formik.setTouched({
      stepOne: {
        restaurantName: true,
        description: true,
        email: true,
        phone: true,
      },
      stepTwo: {
        averagePrice: true,
        hoursOfOperation: true,
        rate: true,
        cuisines: true,
      },
      stepThree: {
        location: true,
        latitude: true,
        longitude: true,
      },
      stepFour: {
        image: true,
      },
    });

    if (Object.keys(errors).length === 0) {
      setStep((prevStep) => prevStep + 1);
    } else {
      console.log("Errors:", errors);
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const { toast } = useToast();
  const { mutate: addRestaurant, isPending } = useAddRestaurant();

  const handleSubmit = async (values: typeof initialValues) => {
    console.log("Form Values:", values);
    const combinedData = {
      title: "Recommended Restaurants",
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

    // Add the image file
    if (values.stepFour.image) {
      formData.append("image", values.stepFour.image);
    }

    // Append the title
    formData.append("title", combinedData.title);

    // Add the rest of the data as a JSON string
    formData.append("data", JSON.stringify(combinedData));

    // Call the API
    try {
      await addRestaurant(formData, {
        onSuccess: () => {
          toast({
            title: "Successfully!",
            description: "Restaurant created successfully.",
            variant: "default",
          });
          refreshUser();
          onOpenChange(false);
        },
        onError: (error: ErrorResponse) => {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
          console.error("Error adding restaurant:", error.message);
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
    [onOpenChange]
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="[&>button]:hidden w-full max-w-2xl max-h-[calc(100vh-100px)] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">Set Up Your Restaurant</DialogTitle>
        </DialogHeader>
        <StepIndicator currentStep={step} totalSteps={4} />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchemas[step - 1]}
          onSubmit={handleSubmit}
          validateOnChange={true}
          validateOnBlur={true}
          enableReinitialize
        >
          {(formik) => {
            console.log("Formik state:", formik);
            return (
              <Form>
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
                <div className="flex justify-between mt-4">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePrevious}
                    >
                      Previous
                    </Button>
                  )}
                  {step < 4 ? (
                    <Button type="button" onClick={() => handleNext(formik)}>
                      Next
                    </Button>
                  ) : (
                    <Button type="submit" disabled={isPending}>
                      {isPending ? "Submitting..." : "Submit"}
                    </Button>
                  )}
                </div>
              </Form>
            );
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

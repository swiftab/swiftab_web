"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { UserPlus, Mail, Phone, User, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useWaiterSignUp } from "@/hooks/authhook/authhooks";
import WaiterTable from "./WaiterTable";

const WaiterSignUpSchema = Yup.object().shape({
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone format")
    .required("Phone number is required"),
});

export default function WaiterSignupTab() {
  const { toast } = useToast();
  const signUpMutation = useWaiterSignUp();

  const handleSubmit = async (
    values: {
      firstname: string;
      lastname: string;
      email: string;
      phoneNumber: string;
    },
    { setSubmitting, resetForm }: { setSubmitting: (isSubmitting: boolean) => void, resetForm: () => void }
  ) => {
    try {
      await signUpMutation.mutateAsync(values);

      toast({
        title: "Waiter Registered!",
        description: "Account created and validation code sent to their email.",
        variant: "default",
      });
      resetForm();
    } catch (err: any) {
      toast({
        title: "Registration Failed",
        description: err.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <TabsContent value="waiters" className="m-0 mt-4 outline-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 flex flex-col gap-6">
          <Card className="border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] rounded-2xl bg-white overflow-hidden">
            <div className="bg-gray-50/50 border-b border-gray-100 px-6 py-5">
              <div className="flex items-center gap-3">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 leading-none mb-1">
                    Add New Waiter
                  </h2>
                  <p className="text-xs text-gray-500 font-medium">
                    Register staff to access the waiter app
                  </p>
                </div>
              </div>
            </div>

            <CardContent className="p-6">
              <Formik
                initialValues={{
                  firstname: "",
                  lastname: "",
                  email: "",
                  phoneNumber: "",
                }}
                validationSchema={WaiterSignUpSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-4">
                    
                    {/* Name Fields */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="firstname" className="text-xs font-semibold text-gray-700 flex items-center">
                          <User className="h-3.5 w-3.5 mr-1.5 text-gray-400" /> First Name
                        </Label>
                        <Field
                          name="firstname"
                          as={Input}
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                          placeholder="John"
                        />
                        <ErrorMessage name="firstname" component="div" className="text-red-500 text-[11px] font-medium" />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="lastname" className="text-xs font-semibold text-gray-700 flex items-center">
                          <User className="h-3.5 w-3.5 mr-1.5 text-gray-400" /> Last Name
                        </Label>
                        <Field
                          name="lastname"
                          as={Input}
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                          placeholder="Doe"
                        />
                        <ErrorMessage name="lastname" component="div" className="text-red-500 text-[11px] font-medium" />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-xs font-semibold text-gray-700 flex items-center">
                        <Mail className="h-3.5 w-3.5 mr-1.5 text-gray-400" /> Email Address
                      </Label>
                      <Field
                        name="email"
                        as={Input}
                        type="email"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                        placeholder="john@restaurant.com"
                      />
                      <ErrorMessage name="email" component="div" className="text-red-500 text-[11px] font-medium" />
                    </div>

                    {/* Phone Field */}
                    <div className="space-y-1.5">
                      <Label htmlFor="phoneNumber" className="text-xs font-semibold text-gray-700 flex items-center">
                        <Phone className="h-3.5 w-3.5 mr-1.5 text-gray-400" /> Phone Number
                      </Label>
                      <Field
                        name="phoneNumber"
                        as={Input}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                        placeholder="+254 712 345678"
                      />
                      <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-[11px] font-medium" />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg shadow-sm hover:shadow transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full" />
                          <span>Registering...</span>
                        </div>
                      ) : (
                        "Register Waiter"
                      )}
                    </Button>
                  </Form>
                )}
              </Formik>
              
              {/* Info Text */}
              <div className="flex items-start gap-2 mt-5 bg-blue-50/50 p-3 rounded-lg border border-blue-100/50">
                <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-[11px] text-blue-700 leading-relaxed font-medium">
                  A validation code will be emailed to the staff member. They need this code to complete their account setup on the POS app.
                </p>
              </div>

            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-8">
          <Card className="border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] rounded-2xl bg-white h-full overflow-hidden">
            <WaiterTable />
          </Card>
        </div>

      </div>
    </TabsContent>
  );
}
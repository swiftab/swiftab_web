"use client";

import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignUp } from "@/hooks/authhook/authhooks";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Eye, EyeOff, Utensils, ChevronRight, UserPlus } from "lucide-react";
import { FullScreenLoader } from "../Loading/FullScreen";

interface AdminSignUpFormProps {
  onClose?: () => void;
  onToggleView?: () => void;
  restaurantName?: string;
}

const AdminSignUpSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format")
    .required("Phone number is required"),
  restaurantName: Yup.string().required("Restaurant name is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], "Passwords must match")
    .required("Please confirm your password"),
});

export function SignUpForm({ onClose, restaurantName = "Swiftab" }: AdminSignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const signUpMutation = useSignUp();

  const handleSubmit = async (values: {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    restaurantName: string;
    confirmPassword: string;
  }) => {
    try {
      setLoading(true);
      const { confirmPassword, ...submitData } = values;
      await signUpMutation.mutateAsync(submitData);

      toast({
        title: "Registration Successful!",
        description: "Your administrator account has been created. You can now sign in.",
        variant: "default",
      });

      if (onClose) onClose();
      setTimeout(() => {
        router.push("/signin");
      }, 1500);
    } catch (err: any) {
      toast({
        title: "Registration Error",
        description: err.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const adminBenefits = [
    "Full control over reservation management",
    "Real-time table availability monitoring",
    "Staff scheduling and performance tracking",
    "Customer database with preferences and history",
    "Comprehensive reporting and analytics"
  ];

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center p-8 bg-white rounded-lg shadow-lg">
      {loading && <FullScreenLoader />}
      
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Utensils className="h-8 w-8" style={{ color: "#008080" }} />
          <h2 className="text-3xl font-bold text-gray-800">{restaurantName}</h2>
        </div>
        
        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold text-gray-700">Admin Registration</h3>
          <p className="text-gray-500 mt-2">Create your administrative account</p>
        </div>

        {/* Admin Benefits */}
        <div className="mb-8 bg-gray-50 p-6 rounded-lg border border-gray-100">
          <h4 className="font-medium mb-3" style={{ color: "#008080" }}>Administrator Benefits</h4>
          <ul className="space-y-2">
            {adminBenefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="mt-1 flex-shrink-0">
                  <UserPlus size={16} style={{ color: "#008080" }} />
                </div>
                <span className="text-gray-700 text-sm">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <Formik
          initialValues={{
            name: "",
            email: "",
            phoneNumber: "",
            restaurantName: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={AdminSignUpSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-gray-700 font-medium">Your Name</Label>
                  <Field 
                    name="name" 
                    as={Input} 
                    type="text" 
                    className="mt-1 w-full border-gray-300 focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50" 
                    placeholder="John Smith"
                    style={{ "--tw-ring-color": "rgba(0, 128, 128, 0.2)" } as React.CSSProperties}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="restaurantName" className="text-gray-700 font-medium">Restaurant Name</Label>
                  <Field 
                    name="restaurantName" 
                    as={Input} 
                    type="text" 
                    className="mt-1 w-full border-gray-300 focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50" 
                    placeholder="Gourmet Bistro"
                    style={{ "--tw-ring-color": "rgba(0, 128, 128, 0.2)" } as React.CSSProperties}
                  />
                  <ErrorMessage
                    name="restaurantName"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
                <Field 
                  name="email" 
                  as={Input} 
                  type="email" 
                  className="mt-1 w-full border-gray-300 focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50" 
                  placeholder="john@restaurant.com"
                  style={{ "--tw-ring-color": "rgba(0, 128, 128, 0.2)" } as React.CSSProperties}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="phoneNumber" className="text-gray-700 font-medium">Phone Number</Label>
                <Field 
                  name="phoneNumber" 
                  as={Input} 
                  type="text" 
                  className="mt-1 w-full border-gray-300 focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50" 
                  placeholder="+1 (555) 123-4567"
                  style={{ "--tw-ring-color": "rgba(0, 128, 128, 0.2)" } as React.CSSProperties}
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                <div className="relative">
                  <Field 
                    name="password" 
                    as={Input} 
                    type={showPassword ? "text" : "password"} 
                    className="mt-1 w-full pr-10 border-gray-300 focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50" 
                    placeholder="••••••••"
                    style={{ "--tw-ring-color": "rgba(0, 128, 128, 0.2)" } as React.CSSProperties}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Must be at least 8 characters with uppercase, lowercase and number
                </p>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">Confirm Password</Label>
                <div className="relative">
                  <Field 
                    name="confirmPassword" 
                    as={Input} 
                    type={showConfirmPassword ? "text" : "password"} 
                    className="mt-1 w-full pr-10 border-gray-300 focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50" 
                    placeholder="••••••••"
                    style={{ "--tw-ring-color": "rgba(0, 128, 128, 0.2)" } as React.CSSProperties}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting || loading}
                className="w-full text-white py-2 mt-4 hover:bg-teal-700 transition-colors duration-300"
                style={{ backgroundColor: loading ? undefined : "#008080" }}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                    <span>Creating account...</span>
                  </div>
                ) : (
                  <span>Register as Administrator</span>
                )}
              </Button>
              
              <div className="text-center text-gray-600 text-sm mt-6 border-t border-gray-100 pt-4">
                <p>Already have an admin account?</p>
                <div className="flex items-center justify-center mt-2">
                  <Button
                    variant="link"
                    onClick={() => router.push("/signin")}
                    className="inline-flex items-center gap-1"
                    style={{ color: "#008080" }}
                  >
                    Sign in to your account <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
              
              <div className="text-center text-xs text-gray-500 mt-4">
                <p>By registering, you agree to our <a href="/terms" className="hover:underline" style={{ color: "#008080" }}>Terms of Service</a> and <a href="/privacy" className="hover:underline" style={{ color: "#008080" }}>Privacy Policy</a></p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
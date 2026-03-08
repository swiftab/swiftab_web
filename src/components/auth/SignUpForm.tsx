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
import { Eye, EyeOff, ChevronRight } from "lucide-react";
import { FullScreenLoader } from "../Loading/FullScreen";

interface AdminSignUpFormProps {
  onClose?: () => void;
  onToggleView?: () => void;
  restaurantName?: string;
}

const AdminSignUpSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  restaurantName: Yup.string().required("Restaurant is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone format")
    .required("Phone number is required"),
  password: Yup.string()
    .min(8, "Min 8 characters")
    .matches(/[a-z]/, "Needs lowercase")
    .matches(/[A-Z]/, "Needs uppercase")
    .matches(/[0-9]/, "Needs number")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password"),
});

export function SignUpForm({ onClose, restaurantName = "Swiftab" }: AdminSignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const { toast } = useToast();
  const signUpMutation = useSignUp();

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const { confirmPassword, ...submitData } = values;
      await signUpMutation.mutateAsync(submitData);

      toast({
        title: "Registration Successful!",
        description: "Your administrator account has been created.",
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

  return (
    <div className="w-full max-w-md mx-auto flex flex-col oswald">
      {loading && <FullScreenLoader />}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
          Create an account
        </h2>
        <p className="text-sm text-gray-500 font-medium">
          Set up your {restaurantName} admin dashboard
        </p>
      </div>

      <Formik
        initialValues={{
          name: "",
          restaurantName: "",
          email: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={AdminSignUpSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-sm font-semibold text-gray-700">Full Name</Label>
                <Field
                  name="name"
                  as={Input}
                  type="text"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  placeholder="John Doe"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-xs font-medium" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="restaurantName" className="text-sm font-semibold text-gray-700">Restaurant</Label>
                <Field
                  name="restaurantName"
                  as={Input}
                  type="text"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  placeholder="The Gourmet"
                />
                <ErrorMessage name="restaurantName" component="div" className="text-red-500 text-xs font-medium" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address</Label>
                <Field
                  name="email"
                  as={Input}
                  type="email"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  placeholder="admin@place.com"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-xs font-medium" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phoneNumber" className="text-sm font-semibold text-gray-700">Phone Number</Label>
                <Field
                  name="phoneNumber"
                  as={Input}
                  type="text"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  placeholder="+254 7 1234 567"
                />
                <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-xs font-medium" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</Label>
                <div className="relative">
                  <Field
                    name="password"
                    as={Input}
                    type={showPassword ? "text" : "password"}
                    className="w-full px-3 py-2 pr-9 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <ErrorMessage name="password" component="div" className="text-red-500 text-xs font-medium" />
              </div>
              
              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">Confirm Password</Label>
                <div className="relative">
                  <Field
                    name="confirmPassword"
                    as={Input}
                    type={showConfirmPassword ? "text" : "password"}
                    className="w-full px-3 py-2 pr-9 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs font-medium" />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || loading}
              className="w-full py-2.5 mt-4 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg shadow-sm hover:shadow transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading || isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full" />
                  <span>Creating account...</span>
                </div>
              ) : (
                <span>Register as Administrator</span>
              )}
            </Button>

            {/* Footer Links */}
            <div className="pt-4 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/signin")}
                  className="text-teal-600 font-semibold hover:text-teal-700 inline-flex items-center transition-colors"
                >
                  Sign in <ChevronRight size={14} className="ml-0.5 mt-0.5" />
                </button>
              </p>
            </div>
            
            <div className="text-center text-[11px] text-gray-400 mt-2">
              By registering, you agree to our <a href="/terms" className="hover:text-gray-600 transition-colors">Terms</a> and <a href="/privacy" className="hover:text-gray-600 transition-colors">Privacy Policy</a>.
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
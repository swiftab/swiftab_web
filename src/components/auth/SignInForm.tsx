"use client";

import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/authhook/authhooks";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { FullScreenLoader } from "../Loading/FullScreen";
import { Eye, EyeOff, ChevronRight } from "lucide-react";

interface AdminSignInFormProps {
  onToggleView?: () => void;
  onClose?: () => void;
  restaurantName?: string;
}

const AdminSignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export function SignInForm({
  restaurantName = "Swiftab",
}: AdminSignInFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const signInMutation = useLogin();
  const { toast } = useToast();

  useEffect(() => {
    if (signInMutation.isSuccess) {
      toast({
        title: "Welcome Back!",
        description: "Successfully logged into your management dashboard.",
        variant: "default",
      });
      setLoading(true);
      router.replace("/dash");
    }

    if (signInMutation.isError) {
      const errorMessage = signInMutation.error?.message;
      toast({
        title: "Authentication Error",
        description: errorMessage || "Please check your credentials and try again.",
        variant: "destructive",
      });
    }
  }, [signInMutation.isSuccess, signInMutation.isError, signInMutation.error, toast, router]);

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col oswald">
      {loading && <FullScreenLoader />}

      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
          Welcome back
        </h2>
        <p className="text-sm text-gray-500 font-medium">
          Sign in to manage {restaurantName}
        </p>
      </div>

      {error && (
        <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm font-medium text-center">
          {error}
        </div>
      )}

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={AdminSignInSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setError(null);
          try {
            await signInMutation.mutateAsync(values);
          } catch (err: any) {
            console.error("Login failed:", err);
            const errorMessage =
              err?.message ||
              (err.statusCode === 401
                ? "Invalid administrator credentials"
                : "Authentication failed. Please verify your details.");
            setError(errorMessage);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-5">
            {/* Email Input */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                Administrator Email
              </Label>
              <Field
                name="email"
                as={Input}
                type="email"
                autoComplete="email"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                placeholder="admin@restaurant.com"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-xs font-medium mt-1"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                  Password
                </Label>
                <button
                  type="button"
                  onClick={() => router.push("/forgot-password")}
                  className="text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Field
                  name="password"
                  as={Input}
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  className="w-full px-4 py-2.5 pr-10 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-xs font-medium mt-1"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || loading}
              className="w-full py-2.5 mt-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg shadow-sm hover:shadow transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading || isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full" />
                  <span>Signing in...</span>
                </div>
              ) : (
                <span>Sign In to Dashboard</span>
              )}
            </Button>

            {/* Footer Links */}
            <div className="pt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an admin account?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/signup")}
                  className="text-teal-600 font-semibold hover:text-teal-700 inline-flex items-center transition-colors"
                >
                  Create one <ChevronRight size={14} className="ml-0.5 mt-0.5" />
                </button>
              </p>
            </div>
          </Form>
        )}
      </Formik>
      
      <div className="mt-8 text-center">
        <p className="text-xs text-gray-400">
          Need support? Contact{" "}
          <a href="mailto:support@swiftab.com" className="hover:text-gray-600 transition-colors">
            support@swiftab.com
          </a>
        </p>
      </div>
    </div>
  );
}
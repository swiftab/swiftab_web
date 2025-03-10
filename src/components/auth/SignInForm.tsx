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
import { Utensils, Eye, EyeOff, ChevronRight } from "lucide-react";

interface AdminSignInFormProps {
  onToggleView?: () => void;
  onClose?: () => void;
  restaurantName?: string;
}

const AdminSignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export function SignInForm({
  restaurantName = "Swiftab",
}: AdminSignInFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  console.log(error)

  const router = useRouter();

  const signInMutation = useLogin();
  const { toast } = useToast();

  useEffect(() => {
    if (signInMutation.isSuccess) {
      toast({
        title: "Welcome Back!",
        description:
          "You've successfully logged into your restaurant management dashboard.",
        variant: "default",
      });

      setLoading(true);
      router.replace("/dash");
      // setTimeout(() => {
        
      // }, 1500);
    }

    if (signInMutation.isError) {
      const errorMessage = signInMutation.error?.message;
      toast({
        title: "Authentication Error",
        description:
          errorMessage || "Please check your credentials and try again.",
        variant: "destructive",
      });
    }
  }, [
    signInMutation.isSuccess,
    signInMutation.isError,
    signInMutation.error,
    toast,
    router,
  ]);

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center p-8 bg-white rounded-lg shadow-lg">
      {loading && <FullScreenLoader />}

      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Utensils
            className="h-8 w-8 text-teal-600"
            style={{ color: "#008080" }}
          />
          <h2 className="text-3xl font-bold text-gray-800">{restaurantName}</h2>
        </div>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={AdminSignInSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await signInMutation.mutateAsync(values);
            } catch (error: any) {
              console.error("Login failed:", error);
              const errorMessage =
                error?.message ||
                (error.statusCode === 401
                  ? "Invalid administrator credentials"
                  : "Authentication failed. Please verify your email and password.");
              setError(errorMessage);
              if (error?.details) {
                console.error("Error details:", error.details);
              }
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4 ">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Administrator Email
                </Label>
                <div className="relative">
                  <Field
                    name="email"
                    as={Input}
                    type="email"
                    className="pl-3 py-2 border-gray-300 focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
                    placeholder="admin@restaurant.com"
                    style={
                      {
                        "--tw-ring-color": "rgba(0, 128, 128, 0.2)",
                      } as React.CSSProperties
                    }
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Field
                    name="password"
                    as={Input}
                    type={showPassword ? "text" : "password"}
                    className="pl-3 py-2 pr-10 border-gray-300 focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
                    placeholder="••••••••"
                    style={
                      {
                        "--tw-ring-color": "rgba(0, 128, 128, 0.2)",
                      } as React.CSSProperties
                    }
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div className="flex justify-end">
                <Button
                  variant="link"
                  className="text-teal-700 hover:text-teal-900 p-0"
                  onClick={() => router.push("/forgot-password")}
                  style={{ color: "#008080" }}
                >
                  Forgot password?
                </Button>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || loading}
                className="w-full text-white py-2 hover:bg-teal-700 transition-colors duration-300 bg-teal-600"
                style={{ backgroundColor: loading ? undefined : "#008080" }}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                    <span>Accessing dashboard...</span>
                  </div>
                ) : (
                  <span>Sign In to Dashboard</span>
                )}
              </Button>

              <div className="text-center text-gray-600 text-sm mt-6 border-t border-gray-100 pt-4">
                <p>Don't have an admin account?</p>
                <div className="flex items-center justify-center mt-2">
                  <Button
                    variant="link"
                    onClick={() => router.push("/signup")}
                    className="text-teal-700 hover:text-teal-900 inline-flex items-center gap-1"
                    style={{ color: "#008080" }}
                  >
                    Create an account <ChevronRight size={16} />
                  </Button>
                </div>
              </div>

              <div className="text-center text-xs text-gray-500 mt-4">
                <p>
                  Need support? Contact{" "}
                  <a
                    href="mailto:support@restaurant.com"
                    className="text-teal-700 hover:underline"
                    style={{ color: "#008080" }}
                  >
                    support@restaurant.com
                  </a>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

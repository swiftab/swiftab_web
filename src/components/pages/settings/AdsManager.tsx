"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Image, X } from "lucide-react";

// types.ts
export type PromotionType = "DISCOUNT" | "PAYMENT_OFFER" | "SPECIAL" | "SEASONAL";

export type PromotionFormValues = {
  title: string;
  description: string;
  type: PromotionType;
  discountPercentage?: number; // Optional, undefined when not applicable
  paymentMethod?: string; // Optional, undefined when not applicable
  startDate: string; // Matches <input type="date"> output
  endDate: string; // Matches <input type="date"> output
  isActive: boolean;
  termsAndConditions: string;
};

// Validation schema
const PromotionSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .max(100, "Title must be 100 characters or less"),
  description: Yup.string()
    .required("Description is required")
    .max(500, "Description must be 500 characters or less"),
  type: Yup.mixed<PromotionType>()
    .oneOf(["DISCOUNT", "PAYMENT_OFFER", "SPECIAL", "SEASONAL"] as const)
    .required("Promotion type is required"),
  discountPercentage: Yup.number().when("type", {
    is: "DISCOUNT",
    then: (schema) =>
      schema
        .required("Discount percentage is required")
        .min(1, "Must be at least 1%")
        .max(100, "Cannot exceed 100%"),
    otherwise: (schema) => schema.notRequired(), // Optional, undefined
  }),
  paymentMethod: Yup.string().when("type", {
    is: "PAYMENT_OFFER",
    then: (schema) => schema.required("Payment method is required"),
    otherwise: (schema) => schema.notRequired(), // Optional, undefined
  }),
  startDate: Yup.string()
    .required("Start date is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  endDate: Yup.string()
    .required("End date is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
    .test("is-after-start", "End date can't be before start date", function (value) {
      const { startDate } = this.parent;
      return startDate && value ? new Date(value) >= new Date(startDate) : true;
    }),
  isActive: Yup.boolean().default(true),
  termsAndConditions: Yup.string().required("Terms and conditions are required"),
});

export default function AdsManager() {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [promotions, setPromotions] = useState<PromotionFormValues[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (
    values: PromotionFormValues,
    { resetForm }: FormikHelpers<PromotionFormValues>
  ) => {
    try {
      setLoading(true);
      const formData = new FormData();
      if (imageFile) formData.append("image", imageFile);

      Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined) { // Skip undefined only
          formData.append(key, value.toString());
        }
      });

      const response = await fetch("/api/restaurant/promotions", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to create promotion");

      const data = await response.json();
      toast({ title: "Promotion Created", description: "Promotion added successfully." });
      resetForm();
      setImagePreview(null);
      setImageFile(null);
      setPromotions([...promotions, data.promotion]);
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Unexpected error", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
<Formik
  initialValues={{
    title: "",
    description: "",
    type: "DISCOUNT" as PromotionType, // Default value
    //discountPercentage: undefined, // Explicitly undefined
    //paymentMethod: undefined, // Explicitly undefined
    startDate: new Date().toISOString().split("T")[0], // "YYYY-MM-DD"
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    isActive: true,
    termsAndConditions: "",
  }}
  validationSchema={PromotionSchema}
  onSubmit={handleSubmit}
>
      {({ values, setFieldValue, isSubmitting }) => (
        <Form className="space-y-5">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Promotion Title</Label>
            <Field name="title" as={Input} type="text" placeholder="E.g., Weekend Special 20% Off" />
            <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Field name="description" as={Textarea} placeholder="Enter promotion details..." />
            <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* Promotion Type */}
          <div className="space-y-2">
            <Label>Promotion Type</Label>
            <Select onValueChange={(value) => setFieldValue("type", value)} value={values.type}>
              <SelectTrigger>
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DISCOUNT">Discount</SelectItem>
                <SelectItem value="PAYMENT_OFFER">Payment Offer</SelectItem>
                <SelectItem value="SPECIAL">Special</SelectItem>
                <SelectItem value="SEASONAL">Seasonal</SelectItem>
              </SelectContent>
            </Select>
            <ErrorMessage name="type" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Upload Promotion Image</Label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="upload" />
            <label htmlFor="upload" className="flex items-center gap-2 cursor-pointer text-blue-500">
              <Image size={20} /> Choose File
            </label>
            {imagePreview && (
              <div className="relative">
                <img src={imagePreview} alt="Preview" className="w-32 h-32 rounded-md" />
                <button type="button" onClick={() => setImagePreview(null)} className="absolute top-0 right-0">
                  <X size={20} />
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" disabled={isSubmitting || loading}>
            {loading ? "Creating..." : "Create Promotion"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

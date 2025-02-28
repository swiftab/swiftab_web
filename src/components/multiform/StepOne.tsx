import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormikHelpers } from "formik";

interface StepOneProps {
  formik: {
    values: {
      restaurantName: string;
      description: string;
      email: string;
      phone: string;
    };
    handleChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    errors: {
      restaurantName?: string;
      email?: string;
      phone?: string;
      description?: string;
    };
    touched: {
      restaurantName?: boolean;
      email?: boolean;
      phone?: boolean;
      description?: boolean;
    };
    setFieldValue: FormikHelpers<any>["setFieldValue"];
  };
}

export function StepOne({ formik }: StepOneProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  // Function to fetch AI-generated description
  // const generateDescription = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch("/api/generatedesc", {
  //       method: "POST",
  //       body: JSON.stringify({ name: formik.values.restaurantName }),
  //       headers: { "Content-Type": "application/json" },
  //     });
  //     const data = await response.json();
  //     if (data.description) {
  //       formik.setFieldValue("description", data.description);
  //     } else {
  //       console.error("No description returned");
  //     }
  //   } catch (error) {
  //     console.error("Error generating description:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="space-y-4 max-h-full">
      <div className="flex flex-row justify-between gap-2 items-center">
        <div className="w-1/2">
          <Label htmlFor="restaurantName">Restaurant Name</Label>
          <Input
            name="stepOne.restaurantName"
            value={formik.values.restaurantName}
            onChange={formik.handleChange}
            placeholder="Enter restaurant name"
            required
          />
          {formik.touched.restaurantName && formik.errors.restaurantName && (
            <p className="text-red-500 text-sm">{formik.errors.restaurantName}</p>
          )}
        </div>
        <div className="w-1/2">
          <Label htmlFor="email">Email</Label>
          <Input
            name="stepOne.email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="restaurant@example.com"
            required
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          )}
        </div>
      </div>
      <div className="w-1/2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="stepOne.phone"
          type="tel"
          value={formik.values.phone}
          onChange={formik.handleChange}
          placeholder="+254 (755) 123-4567"
          required
        />
        {formik.touched.phone && formik.errors.phone && (
          <p className="text-red-500 text-sm">{formik.errors.phone}</p>
        )}
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="stepOne.description"
          value={formik.values.description}
          onChange={formik.handleChange}
          placeholder="Describe your restaurant"
          required
        />
        {/* <Button onClick={generateDescription} disabled={loading}>
          {loading ? "Generating..." : "Generate Description"}
        </Button> */}
        {formik.touched.description && formik.errors.description && (
          <p className="text-red-500 text-sm">{formik.errors.description}</p>
        )}
      </div>
    </div>
  );
}


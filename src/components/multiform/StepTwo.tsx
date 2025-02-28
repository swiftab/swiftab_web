import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StarRating } from "./StarRating";

interface StepTwoProps {
  formik: {
    values: {
      averagePrice: number;
      hoursOfOperation: string;
      rate: number;
      cuisines: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setFieldValue: (field: string, value: any) => void;
    errors: {
      averagePrice?: string;
      hoursOfOperation?: string;
      rate?: string;
      cuisines?: string;
    };
    touched: {
      averagePrice?: boolean;
      hoursOfOperation?: boolean;
      rate?: boolean;
      cuisines?: boolean;
    };
  };
}

export function StepTwo({ formik }: StepTwoProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="averagePrice">Average Price</Label>
        <Input
          id="averagePrice"
          name="stepTwo.averagePrice"
          type="number"
          value={formik.values.averagePrice}
          onChange={formik.handleChange}
          placeholder="Enter average price"
          required
        />
        {formik.touched.averagePrice && formik.errors.averagePrice && (
          <p className="text-red-500 text-sm">{formik.errors.averagePrice}</p>
        )}
      </div>
      <div>
        <Label htmlFor="hoursOfOperation">Hours of Operation</Label>
        <Input
          id="hoursOfOperation"
          name="stepTwo.hoursOfOperation"
          value={formik.values.hoursOfOperation}
          onChange={formik.handleChange}
          placeholder="e.g., Mon-Fri: 9AM-10PM, Sat-Sun: 10AM-11PM"
          required
        />
        {formik.touched.hoursOfOperation && formik.errors.hoursOfOperation && (
          <p className="text-red-500 text-sm">
            {formik.errors.hoursOfOperation}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="rate">Rate</Label>
        <StarRating
          rating={formik.values.rate}
          onRatingChange={(rating) => formik.setFieldValue("stepTwo.rate", rating)}
        />
        {formik.touched.rate && formik.errors.rate && (
          <p className="text-red-500 text-sm">{formik.errors.rate}</p>
        )}
      </div>
      <div>
        <Label htmlFor="cuisines">Cuisines</Label>
        <Input
          id="cuisines"
          name="stepTwo.cuisines"
          value={formik.values.cuisines}
          onChange={formik.handleChange}
          placeholder="e.g., Italian, Chinese, Mexican"
          required
        />
        {formik.touched.cuisines && formik.errors.cuisines && (
          <p className="text-red-500 text-sm">{formik.errors.cuisines}</p>
        )}
      </div>
    </div>
  );
}

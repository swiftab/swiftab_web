import * as Yup from "yup";

const stepOneValidationSchema = Yup.object().shape({
  stepOne: Yup.object().shape({
    restaurantName: Yup.string().required("Restaurant name is required"),
    description: Yup.string().required("Description is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^\+?\d{10,15}$/, "Invalid phone number")
      .required("Phone number is required"),
  }),
});

const stepTwoValidationSchema = Yup.object().shape({
  stepTwo: Yup.object().shape({
    averagePrice: Yup.number()
      .typeError("Average price must be a number")
      .positive("Price must be positive")
      .required("Average price is required"),
    hoursOfOperation: Yup.string().required("Hours of operation are required"),
    cuisines: Yup.string().required("Cuisines are required"),
    rate: Yup.number()
      .min(1, "Rate must be at least 1")
      .max(5, "Rate cannot exceed 5")
      .required("Rating is required"),
  }),
});

const stepThreeValidationSchema = Yup.object().shape({
  stepThree: Yup.object().shape({
    location: Yup.string().required("Location is required"),
    latitude: Yup.number()
      .typeError("Latitude must be a number")
      .min(-90, "Latitude must be between -90 and 90")
      .max(90, "Latitude must be between -90 and 90")
      .required("Latitude is required"),
    longitude: Yup.number()
      .typeError("Longitude must be a number")
      .min(-180, "Longitude must be between -180 and 180")
      .max(180, "Longitude must be between -180 and 180")
      .required("Longitude is required"),
  }),
});

const stepFourValidationSchema = Yup.object().shape({
  stepFour: Yup.object().shape({
    image: Yup.mixed<File>()
      .nullable()
      .required("Image is required")
      .test(
        "fileSize",
        "File size too large (max 2MB)",
        (value) => !value || (value instanceof File && value.size <= 2 * 1024 * 1024)
      )
      .test(
        "fileType",
        "Unsupported file type",
        (value) =>
          !value ||
          (value instanceof File &&
            ["image/jpeg", "image/png", "image/gif"].includes(value.type))
      ),
  }),
});



export  {stepOneValidationSchema,stepTwoValidationSchema,stepThreeValidationSchema,stepFourValidationSchema};

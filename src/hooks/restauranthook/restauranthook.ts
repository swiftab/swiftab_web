import { AddRestaurant } from "@/lib/api";
import {
  ErrorResponse,
  RestaurantResponse,
} from "@/types/restaurant";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export function useAddRestaurant(): UseMutationResult<
  RestaurantResponse,
  ErrorResponse,
  FormData
> {
  return useMutation<RestaurantResponse, ErrorResponse, FormData>({
    mutationFn: (formData: FormData) => {
      return AddRestaurant(formData);
    },
    onSuccess: (data: RestaurantResponse) => {
      console.log("Restaurant created successfully", data);
      if (data) {
        localStorage.setItem("RestaurantData", JSON.stringify(data));
      }
    },
    onError: (error: ErrorResponse) => {
      console.error("Restaurant setup error:", error.message);
    },
  });
}

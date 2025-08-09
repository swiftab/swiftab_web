import { addMenu } from "@/lib/api";
import { ErrorResponse, MenuResponse } from "@/types/addmenu";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

// Define the type for the mutation variables
interface AddMenuVariables {
  data: FormData; // Updated to expect FormData
  menuType: string;
}

export function useAddMenu(): UseMutationResult<
  MenuResponse,
  ErrorResponse,
  AddMenuVariables
> {
  return useMutation<MenuResponse, ErrorResponse, AddMenuVariables>({
    mutationFn: ({ data, menuType }: AddMenuVariables) => {
      return addMenu(data, menuType); // Call your API with destructured variables
    },
    onSuccess: (data) => {
      console.log("Menu item added successfully:", data);
      // Optionally, invalidate queries or update cache here
    },
    onError: (error) => {
      console.error("Error adding menu item:", error.message);
    },
  });
}

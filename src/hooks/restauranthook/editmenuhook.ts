import { editMenuItem } from "@/lib/api";
import { EditResponse, ErrorResponse, MenuItem } from "@/types/editmenu";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

interface EditMutationVariables {
    updatedItem: MenuItem;
    menuType: string;
  }

export function useEditMenuItem(): UseMutationResult<
  EditResponse,
  ErrorResponse,
  EditMutationVariables
> {
  return useMutation<EditResponse, ErrorResponse, EditMutationVariables>({
    mutationFn: ({ updatedItem, menuType }) =>
      editMenuItem(updatedItem, menuType),
    onSuccess: (data: EditResponse) => {
      console.log("Menu item updated successfully", data);
      window.location.reload();
    },
    onError: (error: ErrorResponse) => {
      console.error("Error updating menu item:", error.message);
    },
  });
}
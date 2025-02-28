import { deleteMenu } from "@/lib/api";
import { DeleteResponse, ErrorResponse } from "@/types/deletemenu";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

interface DeleteMenu {
  menuType: string;
  itemId: string;
}

export function useDeleteMenu(): UseMutationResult<
  DeleteResponse,
  ErrorResponse,
  DeleteMenu
> {
  return useMutation<DeleteResponse, ErrorResponse, DeleteMenu>({
    mutationFn: ({ menuType, itemId }) => {
      return deleteMenu(menuType, itemId);
    },
    onSuccess: (data: DeleteResponse) => {
      console.log("Menu deleted successfully", data);
    },
    onError: (error: ErrorResponse) => {
      console.error("deleted menu error:", error.message);
    },
  });
}

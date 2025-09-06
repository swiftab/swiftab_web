import { deleteWaiter } from "@/lib/api";
import { DeleteResponse, ErrorResponse } from "@/types/deletemenu";
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";

interface DeleteWaiter {
  waiterId: string;
}

export function useDeleteWaiter(): UseMutationResult<
  DeleteResponse,
  ErrorResponse,
  DeleteWaiter
> {
  const queryClient = useQueryClient();
  return useMutation<DeleteResponse, ErrorResponse, DeleteWaiter>({
    mutationFn: ({ waiterId }) => {
      return deleteWaiter(waiterId);
    },
    onSuccess: (data: DeleteResponse) => {
      console.log("Waiter deleted successfully", data);
      queryClient.invalidateQueries({ queryKey: ["waiters"] });
    },
    onError: (error: ErrorResponse) => {
      console.error("deleted waiter error:", error.message);
    },
  });
}

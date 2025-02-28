import { saveLayoutInfo, saveTableLayout } from "@/lib/api";
import {
  ErrorResponse,
  LayoutResponse,
  SaveLayoutData,
} from "@/types/layoutinfo";
import { TableItem, TableResponse } from "@/types/table";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useSaveLayoutInfo(): UseMutationResult<
  LayoutResponse,
  ErrorResponse,
  SaveLayoutData
> {
  return useMutation<LayoutResponse, ErrorResponse, SaveLayoutData>({
    mutationFn: saveLayoutInfo,
    onSuccess: () => {
      toast.success("Layout updated successfully!");
    },
    onError: (error: ErrorResponse) => {
      toast.error(`Error saving layout info: ${error.message}`);
    },
  });
}

// export function useSaveTable(): UseMutationResult<TableResponse, Error, TableItem> {
//   return useMutation<TableResponse, Error, TableItem>({
//     mutationFn: saveTableLayout,
//     onSuccess: () => {
//       toast.success("Table Layout updated successfully!");
//     },
//     onError: (error: Error) => {
//       toast.error(`Error saving table layout: ${error.message}`);
//     },
//   });
// }

export function useSaveTable(): UseMutationResult<
  TableResponse,
  Error,
  TableItem[]
> {
  return useMutation<TableResponse, Error, TableItem[]>({
    mutationFn: (tableArray) => saveTableLayout(tableArray), // Send array
    onSuccess: () => {
      console.log("Table Layout updated successfully");
    },
    onError: (error: Error) => {
      console.error("Error saving table layout:", error.message);
    },
  });
}

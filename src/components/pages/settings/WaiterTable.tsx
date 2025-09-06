"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { fetchWaiter } from "@/lib/api";
import { useDeleteWaiter } from "@/hooks/authhook/deleteWaiterHook";

interface Waiter {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  restaurantId: string;
  createdAt: string;
}

export default function WaiterTable() {
  const {
    data: waiters,
    isLoading,
    isError,
    error,
  } = useQuery<Waiter[]>({
    queryKey: ["waiters"],
    queryFn: fetchWaiter,
  });

  const deleteMutation = useDeleteWaiter()

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this waiter?")) {
      deleteMutation.mutate({ waiterId: id });
    }
  };

  if (isLoading) return <p className="text-gray-500">Loading waiters...</p>;

  if (isError) {
    return (
      <p className="text-red-500">
        {(error as Error).message || "Error fetching waiters."}
      </p>
    );
  }

  if (!waiters || waiters.length === 0) {
    return <p className="text-gray-500">No waiters registered yet.</p>;
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">
        Registered Waiters
      </h3>
      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Restaurant ID</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {waiters.map((waiter) => (
              <TableRow key={waiter._id}>
                <TableCell>
                  {waiter.firstname} {waiter.lastname}
                </TableCell>
                <TableCell>{waiter.email}</TableCell>
                <TableCell>{waiter.phoneNumber}</TableCell>
                <TableCell>{waiter.restaurantId || "-"}</TableCell>
                <TableCell>
                  {new Date(waiter.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleDelete(waiter._id)}
                    variant="destructive"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

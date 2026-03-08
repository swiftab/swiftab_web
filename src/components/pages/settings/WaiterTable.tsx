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
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Trash2, Users, AlertCircle } from "lucide-react";
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

interface WaiterResponse {
  message: string;
  waiter: Waiter[];
}

export default function WaiterTable() {
  const { data, isLoading, isError, error } = useQuery<WaiterResponse>({
    queryKey: ["waiters"],
    queryFn: fetchWaiter,
  });

  const waiters = data?.waiter || [];
  const deleteMutation = useDeleteWaiter();

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to revoke this waiter's access?")) {
      deleteMutation.mutate({ waiterId: id });
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="bg-gray-50/50 border-b border-gray-100 px-6 py-5 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-gray-900 leading-none mb-1">
            Active Staff
          </h2>
          <p className="text-xs text-gray-500 font-medium">
            Manage your restaurant floor team
          </p>
        </div>
        {!isLoading && !isError && (
          <Badge variant="secondary" className="bg-white text-gray-600 shadow-sm border-gray-200">
            {waiters.length} Total
          </Badge>
        )}
      </div>

      <div className="flex-1 p-0">
        {isLoading && (
          <div className="p-6 space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32 bg-gray-100" />
                  <Skeleton className="h-4 w-24 bg-gray-100" />
                </div>
                <div className="space-y-2 hidden md:block">
                  <Skeleton className="h-5 w-40 bg-gray-100" />
                  <Skeleton className="h-4 w-24 bg-gray-100" />
                </div>
                <Skeleton className="h-8 w-8 rounded-md bg-gray-100" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <AlertCircle className="h-10 w-10 text-red-400 mb-3" />
            <h3 className="text-base font-semibold text-gray-900">Failed to load staff</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-sm">
              {(error as Error).message || "There was a problem communicating with the server."}
            </p>
          </div>
        )}

        {!isLoading && !isError && waiters.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center px-4">
            <div className="h-14 w-14 rounded-full bg-gray-50 flex items-center justify-center mb-4 border border-gray-100">
              <Users className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-base font-semibold text-gray-900">No waiters registered</h3>
            <p className="text-sm text-gray-500 max-w-sm mt-1">
              Add a staff member using the form to give them access.
            </p>
          </div>
        )}

        {/* Data Table */}
        {!isLoading && !isError && waiters.length > 0 && (
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader className="bg-gray-50/30">
                <TableRow className="hover:bg-transparent border-b-gray-100">
                  <TableHead className="font-semibold text-gray-600 pl-6 w-[35%]">Staff Member</TableHead>
                  <TableHead className="font-semibold text-gray-600 w-[35%]">Contact Info</TableHead>
                  <TableHead className="font-semibold text-gray-600 hidden xl:table-cell">Joined</TableHead>
                  <TableHead className="text-right font-semibold text-gray-600 pr-6">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {waiters.map((waiter) => (
                  <TableRow key={waiter._id} className="hover:bg-gray-50/80 transition-colors border-b-gray-50 last:border-0">
                    <TableCell className="pl-6 py-4">
                      <div className="font-semibold text-gray-900">
                        {waiter.firstname} {waiter.lastname}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-[10px] font-mono text-gray-500 bg-gray-50 px-1.5 py-0 border-gray-200">
                          ID: ...{waiter._id.slice(-6)}
                        </Badge>
                      </div>
                    </TableCell>
                    
                    <TableCell className="py-4">
                      <div className="text-sm text-gray-900 font-medium">{waiter.email}</div>
                      <div className="text-xs text-gray-500 mt-1">{waiter.phoneNumber}</div>
                    </TableCell>
                    
                    <TableCell className="py-4 text-sm text-gray-600 hidden xl:table-cell">
                      {new Date(waiter.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </TableCell>
                    
                    <TableCell className="text-right pr-6 py-4">
                      <Button
                        onClick={() => handleDelete(waiter._id)}
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Remove Waiter"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, CalendarDays, Users, LayoutDashboard, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ReservationModal } from "./reservationmodal";
import { DateRangePicker } from "./daterangepicker";
import { ReservationStats } from "./reservationstats";
import { Pagination } from "./pagination";
import { useQuery } from "@tanstack/react-query";
import { fetchAllReservation } from "@/hooks/reservationhook/fetchreservation";
import { Skeleton } from "@/components/ui/skeleton";

interface Reservation {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  start: string;
  end: string;
  guests: number;
  table: string;
  floor: string;
  status: string;
}

const ITEMS_PER_PAGE = 10;

export default function ReservationsPage() {
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState<{ start?: Date; end?: Date }>({});
  const [filters, setFilters] = useState({
    status: "all",
    floor: "all",
    guestsMin: "",
    guestsMax: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const { data: serverData, error, isPending } = useQuery({
    queryKey: ["reservations"],
    queryFn: fetchAllReservation,
    select: (data) =>
      data.map((item: any) => ({
        id: item.reservationID,
        name: item.name,
        email: item.email,
        phoneNumber: item.phoneNumber,
        start: item.start,
        end: item.end,
        guests: item.guests,
        table: item.table,
        floor: item.floor,
        status: item.status,
      })),
    retry: false,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [dateRange, filters, searchTerm]);

  const filteredReservations = useMemo(() => {
    if (!serverData) return [];

    return serverData.filter((reservation: Reservation) => {
      const reservationDate = new Date(reservation.start);
      const matchesSearch = reservation.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDate =
        (!dateRange.start || reservationDate >= dateRange.start) &&
        (!dateRange.end || reservationDate <= dateRange.end);
      const matchesStatus = filters.status === "all" || reservation.status === filters.status;
      const matchesFloor = filters.floor === "all" || reservation.floor === filters.floor;
      const matchesGuests =
        (!filters.guestsMin || reservation.guests >= Number(filters.guestsMin)) &&
        (!filters.guestsMax || reservation.guests <= Number(filters.guestsMax));

      return matchesSearch && matchesDate && matchesStatus && matchesFloor && matchesGuests;
    });
  }, [serverData, dateRange, filters, searchTerm]);

  const totalPages = Math.ceil(filteredReservations.length / ITEMS_PER_PAGE);

  const paginatedReservations = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredReservations.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredReservations, currentPage]);

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const getStatusBadge = (status: string) => {
    const s = status.toLowerCase();
    if (s === "confirmed" || s === "active") {
      return <Badge className="bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20 hover:bg-green-50 shadow-none font-medium px-2.5 py-0.5">{status}</Badge>;
    }
    if (s === "pending") {
      return <Badge className="bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20 hover:bg-amber-50 shadow-none font-medium px-2.5 py-0.5">{status}</Badge>;
    }
    if (s === "canceled" || s === "cancelled") {
      return <Badge className="bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20 hover:bg-red-50 shadow-none font-medium px-2.5 py-0.5">{status}</Badge>;
    }
    return <Badge variant="outline" className="text-gray-600 font-medium px-2.5 py-0.5">{status}</Badge>;
  };

  const formatTime = (timeStr: string) => {
    return new Date(timeStr).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (error && error.message !== "No reservations found") {
    return (
      <div className="w-full flex-1 p-6">
        <div className="rounded-xl border border-red-100 bg-red-50 p-8 text-center max-w-2xl mx-auto mt-12">
          <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-900 mb-2">Failed to load reservations</h3>
          <p className="text-red-600 text-sm">Please check your connection and refresh the dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex-1 p-4 md:p-8 bg-gray-50/30 min-h-screen oswald">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Reservations</h1>
          <p className="text-sm text-gray-500">Manage table bookings and guest seating</p>
        </div> */}

        <div className="mb-8">
          <ReservationStats reservations={filteredReservations} />
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col lg:flex-row gap-4 justify-between items-center z-10 relative">
          
          <div className="relative w-full lg:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              className="pl-9 bg-gray-50 border-gray-200 focus:bg-white focus:ring-teal-500/20 focus:border-teal-500 transition-colors w-full"
              placeholder="Search guest names..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <div className="w-full sm:w-auto">
              <DateRangePicker
                onChange={(range) => {
                  setDateRange({
                    start: range.start ? new Date(range.start) : undefined,
                    end: range.end ? new Date(range.end) : undefined,
                  });
                }}
              />
            </div>

            <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
              <SelectTrigger className="w-140px bg-gray-50 border-gray-200">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="canceled">Canceled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.floor} onValueChange={(value) => handleFilterChange("floor", value)}>
              <SelectTrigger className="w-160px bg-gray-50 border-gray-200">
                <SelectValue placeholder="Floor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Floors</SelectItem>
                <SelectItem value="Main Dining Room">Main Dining Room</SelectItem>
                <SelectItem value="Terrace">Terrace</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-md px-2 focus-within:ring-1 focus-within:ring-teal-500 focus-within:border-teal-500">
               <Users className="h-4 w-4 text-gray-400" />
               <Input
                type="number"
                placeholder="Min"
                className="w-14 border-0 bg-transparent p-0 text-sm focus-visible:ring-0 text-center h-9"
                value={filters.guestsMin}
                onChange={(e) => handleFilterChange("guestsMin", e.target.value)}
              />
              <span className="text-gray-300">-</span>
              <Input
                type="number"
                placeholder="Max"
                className="w-14 border-0 bg-transparent p-0 text-sm focus-visible:ring-0 text-center h-9"
                value={filters.guestsMax}
                onChange={(e) => handleFilterChange("guestsMax", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {isPending ? (
            <div className="p-6"><ReservationsLoadingSkeleton /></div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table className="min-w-full">
                  <TableHeader className="bg-gray-50/50">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="font-semibold text-gray-600 pl-6">Guest Details</TableHead>
                      <TableHead className="font-semibold text-gray-600">Date & Time</TableHead>
                      <TableHead className="font-semibold text-gray-600">Party Size</TableHead>
                      <TableHead className="font-semibold text-gray-600">Location</TableHead>
                      <TableHead className="font-semibold text-gray-600 pr-6 text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedReservations.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-16">
                           <div className="flex flex-col items-center justify-center">
                              <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                                <CalendarDays className="h-6 w-6 text-gray-400" />
                              </div>
                              <h3 className="text-lg font-medium text-gray-900">No reservations found</h3>
                              <p className="text-sm text-gray-500 max-w-sm mt-1">Adjust your filters or date range to find what you're looking for.</p>
                           </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedReservations.map((reservation: Reservation) => (
                        <TableRow
                          key={reservation.id}
                          onClick={() => setSelectedReservation(reservation)}
                          className="cursor-pointer hover:bg-gray-50/80 transition-colors"
                        >
                          <TableCell className="pl-6">
                            <div className="flex flex-col">
                              <span className="font-semibold text-gray-900">{reservation.name}</span>
                              <span className="text-xs text-gray-500 mt-0.5">{reservation.phoneNumber}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                             <div className="flex flex-col">
                              <span className="text-sm text-gray-900 font-medium">{new Date(reservation.start).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                              <span className="text-xs text-gray-500 mt-0.5">
                                {formatTime(reservation.start)} - {formatTime(reservation.end)}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center text-sm text-gray-700">
                              <Users className="w-4 h-4 mr-2 text-gray-400" />
                              {reservation.guests} {reservation.guests === 1 ? 'Guest' : 'Guests'}
                            </div>
                          </TableCell>
                          <TableCell>
                             <div className="flex flex-col">
                                <div className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-gray-100 text-gray-800 w-max mb-1">
                                  Table {reservation.table}
                                </div>
                                <span className="text-xs text-gray-500 flex items-center">
                                  <LayoutDashboard className="w-3 h-3 mr-1" /> {reservation.floor}
                                </span>
                             </div>
                          </TableCell>
                          <TableCell className="pr-6 text-right">
                            {getStatusBadge(reservation.status)}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
              
              {/* Pagination Area */}
              {totalPages > 1 && (
                <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {selectedReservation && (
        <ReservationModal
          reservation={selectedReservation}
          onClose={() => setSelectedReservation(null)}
        />
      )}
    </div>
  );
}

// --- Loading Skeleton ---
function ReservationsLoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0 px-6">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32 bg-gray-100" />
            <Skeleton className="h-4 w-24 bg-gray-100" />
          </div>
          <div className="space-y-2">
             <Skeleton className="h-5 w-28 bg-gray-100" />
             <Skeleton className="h-4 w-20 bg-gray-100" />
          </div>
          <Skeleton className="h-5 w-20 bg-gray-100" />
          <div className="space-y-2">
             <Skeleton className="h-5 w-16 bg-gray-100" />
             <Skeleton className="h-4 w-24 bg-gray-100" />
          </div>
          <Skeleton className="h-6 w-20 rounded-full bg-gray-100" />
        </div>
      ))}
    </div>
  );
}
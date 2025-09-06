"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { LoadingSpinner } from "@/components/ui/loading";

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
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState<{ start?: Date; end?: Date }>({});
  const [filters, setFilters] = useState({
    status: "all",
    floor: "all",
    guestsMin: "",
    guestsMax: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: serverData,
    error,
    isPending,
  } = useQuery({
    queryKey: ["reservations"],
    queryFn: fetchAllReservation,
    select: (data) =>
      data.map((item: any) => ({
        id: item.reservationInfo.reservationID,
        name: item.reservationInfo.name,
        email: item.reservationInfo.email,
        phoneNumber: item.reservationInfo.phoneNumber,
        start: item.reservationInfo.bookingFor,
        end: item.reservationInfo.endTime,
        guests: item.reservationInfo.guest,
        table: item.reservationInfo.tableNumber,
        floor: item.reservationInfo.diningArea,
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
      const matchesSearch = reservation.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesDate =
        (!dateRange.start || reservationDate >= dateRange.start) &&
        (!dateRange.end || reservationDate <= dateRange.end);
      const matchesStatus =
        filters.status === "all" || reservation.status === filters.status;
      const matchesFloor =
        filters.floor === "all" || reservation.floor === filters.floor;
      const matchesGuests =
        (!filters.guestsMin ||
          reservation.guests >= Number(filters.guestsMin)) &&
        (!filters.guestsMax || reservation.guests <= Number(filters.guestsMax));

      return (
        matchesSearch &&
        matchesDate &&
        matchesStatus &&
        matchesFloor &&
        matchesGuests
      );
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

  if (isPending)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#008080]/50 to-[#008080]/100">
        <LoadingSpinner desc="Fetching reservation ... " />
      </div>
    );

  if (error && error.message !== "No reservations found") {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#008080]/50 to-[#008080]/100">
        <LoadingSpinner desc="Error fetching reservations ... " />
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <ReservationStats reservations={filteredReservations} />

      <div className="flex justify-between items-center mb-6">
        <DateRangePicker
          onChange={(range) => {
            setDateRange({
              start: range.start ? new Date(range.start) : undefined,
              end: range.end ? new Date(range.end) : undefined,
            });
          }}
        />

        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Reservation
        </Button>
      </div>

      <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
          <Input
            className="pl-8 border-gray-700"
            placeholder="Search reservations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <Select
            value={filters.status}
            onValueChange={(value) => handleFilterChange("status", value)}
          >
            <SelectTrigger className="w-[180px] border-gray-700">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.floor}
            onValueChange={(value) => handleFilterChange("floor", value)}
          >
            <SelectTrigger className="w-[180px] border-gray-700">
              <SelectValue placeholder="Filter by floor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Floors</SelectItem>
              <SelectItem value="Main Dining Room">Main Dining Room</SelectItem>
              <SelectItem value="Terrace">Terrace</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="number"
            placeholder="Min Guests"
            className="w-24 border-gray-700"
            value={filters.guestsMin}
            onChange={(e) => handleFilterChange("guestsMin", e.target.value)}
          />
          <Input
            type="number"
            placeholder="Max Guests"
            className="w-24 border-gray-700"
            value={filters.guestsMax}
            onChange={(e) => handleFilterChange("guestsMax", e.target.value)}
          />
        </div>
      </div>

      <Table className="mb-4">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Guests</TableHead>
            <TableHead>Table</TableHead>
            <TableHead>Floor</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedReservations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-gray-500 py-6">
                No reservations found
              </TableCell>
            </TableRow>
          ) : (
            paginatedReservations.map((reservation: Reservation) => (
              <TableRow
                key={reservation.id}
                onClick={() => setSelectedReservation(reservation)}
                className="cursor-pointer hover:bg-gray-50"
              >
                <TableCell className="font-medium">
                  {reservation.name}
                </TableCell>
                <TableCell>
                  {new Date(reservation.start).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(reservation.start).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  -{" "}
                  {new Date(reservation.end).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TableCell>
                <TableCell>{reservation.guests}</TableCell>
                <TableCell>{reservation.table}</TableCell>
                <TableCell>{reservation.floor}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      reservation.status === "confirmed"
                        ? "default"
                        : "destructive"
                    }
                  >
                    {reservation.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {selectedReservation && (
        <ReservationModal
          reservation={selectedReservation}
          onClose={() => setSelectedReservation(null)}
        />
      )}
    </div>
  );
}

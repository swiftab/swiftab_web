"use client"

import { useState } from "react"
import { CalendarIcon, Filter, Search } from 'lucide-react'
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Sample data
const initialCustomers = [
  {
    id: 1,
    name: "Jhon Libson",
    phone: "+99451704695",
    email: "jhonlibson@gmail.com",
    reservation: new Date("2024-01-29"),
    status: "Active",
  },
  {
    id: 2,
    name: "Mary Kenson",
    phone: "+99451656951",
    email: "marykenson@gmail.com",
    reservation: new Date("2024-01-29"),
    status: "Active",
  },
  {
    id: 3,
    name: "Mike Norry",
    phone: "+99451794658",
    email: "mikenorry@gmail.com",
    reservation: new Date("2024-01-29"),
    status: "Active",
  },
  {
    id: 4,
    name: "Emily Brown",
    phone: "+99451704695",
    email: "emilybrown@gmail.com",
    reservation: new Date("2024-01-29"),
    status: "Active",
  },
  {
    id: 5,
    name: "Sarah Davis",
    phone: "+99451745432",
    email: "sarahdavis@gmail.com",
    reservation: new Date("2024-01-29"),
    status: "Cancelled",
  },
]

export function ReservationList() {
  const [customers, setCustomers] = useState(initialCustomers)
  const [search, setSearch] = useState("")
  const [date, setDate] = useState<Date>()
  const [status, setStatus] = useState<string>()

  // Filter function
  const filterCustomers = () => {
    let filtered = [...initialCustomers]

    if (search) {
      filtered = filtered.filter(
        customer =>
          customer.name.toLowerCase().includes(search.toLowerCase()) ||
          customer.email.toLowerCase().includes(search.toLowerCase()) ||
          customer.phone.includes(search)
      )
    }

    if (date) {
      filtered = filtered.filter(
        customer =>
          format(customer.reservation, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
      )
    }

    if (status) {
      filtered = filtered.filter(customer => customer.status === status)
    }

    setCustomers(filtered)
  }

  // Reset filters
  const resetFilters = () => {
    setDate(undefined)
    setStatus(undefined)
    setCustomers(initialCustomers)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Filter Reservations</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <div className="flex flex-col gap-2">
                  <label>Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal ${
                          !date && "text-muted-foreground"
                        }`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex flex-col gap-2">
                  <label>Status</label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={resetFilters}>
                  Reset
                </Button>
                <Button onClick={filterCustomers}>Apply Filters</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            className="pl-8"
            value={search}
            onChange={e => {
              setSearch(e.target.value)
              filterCustomers()
            }}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Recent Reservation</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map(customer => (
              <TableRow key={customer.id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{format(customer.reservation, "dd.MM.yyyy")}</TableCell>
                <TableCell>
                  <Badge
                    variant={customer.status === "Active" ? "default" : "destructive"}
                  >
                    {customer.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}


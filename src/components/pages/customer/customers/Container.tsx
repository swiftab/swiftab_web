"use client"

import { useState } from "react"
import { Search, Mail, Phone, MapPin, Calendar } from 'lucide-react'
import { format } from "date-fns"

import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample customer data
const initialCustomers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    address: "123 Main St, Anytown, USA",
    lastVisit: new Date("2024-01-25"),
    totalVisits: 15,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 234 567 891",
    address: "456 Elm St, Othertown, USA",
    lastVisit: new Date("2024-01-24"),
    totalVisits: 8,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    phone: "+1 234 567 892",
    address: "789 Oak St, Somewhere, USA",
    lastVisit: new Date("2024-01-23"),
    totalVisits: 22,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function CustomerDetails() {
  const [customers, setCustomers] = useState(initialCustomers)
  const [search, setSearch] = useState("")

  const filterCustomers = (searchTerm: string) => {
    const filtered = initialCustomers.filter(
      customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm)
    )
    setCustomers(filtered)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value
    setSearch(searchTerm)
    filterCustomers(searchTerm)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            className="pl-8"
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {customers.map(customer => (
          <Card key={customer.id}>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar>
                <AvatarImage src={customer.avatar} alt={customer.name} />
                <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{customer.name}</CardTitle>
                <p className="text-sm text-muted-foreground">Customer ID: {customer.id}</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{customer.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{customer.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{customer.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Last visit: {format(customer.lastVisit, "dd.MM.yyyy")}</span>
                </div>
                <div className="mt-2 text-sm font-semibold">
                  Total visits: {customer.totalVisits}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


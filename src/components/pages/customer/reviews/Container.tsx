"use client"

import { useState } from "react"
import { Star, Search } from 'lucide-react'
import { format } from "date-fns"

import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Sample review data
const initialReviews = [
  {
    id: 1,
    customerName: "John Doe",
    rating: 5,
    comment: "Excellent service and food!",
    date: new Date("2024-01-25"),
  },
  {
    id: 2,
    customerName: "Jane Smith",
    rating: 4,
    comment: "Great atmosphere, but the wait was a bit long.",
    date: new Date("2024-01-24"),
  },
  {
    id: 3,
    customerName: "Mike Johnson",
    rating: 3,
    comment: "Food was okay, service could be improved.",
    date: new Date("2024-01-23"),
  },
  {
    id: 4,
    customerName: "Emily Brown",
    rating: 5,
    comment: "Amazing experience! Will definitely come back.",
    date: new Date("2024-01-22"),
  },
  {
    id: 5,
    customerName: "Chris Lee",
    rating: 2,
    comment: "Disappointed with the quality of food.",
    date: new Date("2024-01-21"),
  },
]

export function ReviewList() {
  const [reviews, setReviews] = useState(initialReviews)
  const [search, setSearch] = useState("")

  const filterReviews = (searchTerm: string) => {
    const filtered = initialReviews.filter(
      review =>
        review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setReviews(filtered)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value
    setSearch(searchTerm)
    filterReviews(searchTerm)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reviews..."
            className="pl-8"
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.map(review => (
              <TableRow key={review.id}>
                <TableCell>{review.customerName}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2">{review.rating}/5</span>
                  </div>
                </TableCell>
                <TableCell>{review.comment}</TableCell>
                <TableCell>{format(review.date, "dd.MM.yyyy")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}


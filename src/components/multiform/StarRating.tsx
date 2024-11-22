import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: number
  onRatingChange: (rating: number) => void
}

export function StarRating({ rating, onRatingChange }: StarRatingProps) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-6 h-6 cursor-pointer ${
            star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
          onClick={() => onRatingChange(star)}
        />
      ))}
    </div>
  )
}


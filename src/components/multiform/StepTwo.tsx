import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { StarRating } from './StarRating'

interface StepTwoProps {
  formData: {
    averagePrice: string
    hoursOfOperation: string
    rate: number
    cuisines: string
  }
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleRatingChange: (rating: number) => void
}

export function StepTwo({ formData, handleInputChange, handleRatingChange }: StepTwoProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="averagePrice">Average Price</Label>
        <Input
          id="averagePrice"
          name="averagePrice"
          type="number"
          value={formData.averagePrice}
          onChange={handleInputChange}
          placeholder="Enter average price"
          required
        />
      </div>
      <div>
        <Label htmlFor="hoursOfOperation">Hours of Operation</Label>
        <Input
          id="hoursOfOperation"
          name="hoursOfOperation"
          value={formData.hoursOfOperation}
          onChange={handleInputChange}
          placeholder="e.g., Mon-Fri: 9AM-10PM, Sat-Sun: 10AM-11PM"
          required
        />
      </div>
      <div>
        <Label htmlFor="rate">Rate</Label>
        <StarRating rating={formData.rate} onRatingChange={handleRatingChange} />
      </div>
      <div>
        <Label htmlFor="cuisines">Cuisines</Label>
        <Input
          id="cuisines"
          name="cuisines"
          value={formData.cuisines}
          onChange={handleInputChange}
          placeholder="e.g., Italian, Chinese, Mexican"
          required
        />
      </div>
    </div>
  )
}


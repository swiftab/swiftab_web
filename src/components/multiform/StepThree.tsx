import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface StepThreeProps {
  formData: {
    location: string
    latitude: string
    longitude: string
  }
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function StepThree({ formData, handleInputChange }: StepThreeProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          placeholder="Enter restaurant address"
          required
        />
      </div>
      <div>
        <Label htmlFor="latitude">Latitude</Label>
        <Input
          id="latitude"
          name="latitude"
          type="number"
          step="any"
          value={formData.latitude}
          onChange={handleInputChange}
          placeholder="Enter latitude"
          required
        />
      </div>
      <div>
        <Label htmlFor="longitude">Longitude</Label>
        <Input
          id="longitude"
          name="longitude"
          type="number"
          step="any"
          value={formData.longitude}
          onChange={handleInputChange}
          placeholder="Enter longitude"
          required
        />
      </div>
    </div>
  )
}


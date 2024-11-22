import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface StepOneProps {
  formData: {
    name: string;
    description: string;
    email: string;
    phone: string;
    image: File | null;
  };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function StepOne({
  formData,
  handleInputChange,
  handleFileChange,
}: StepOneProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Restaurant Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter restaurant name"
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Describe your restaurant"
          required
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="restaurant@example.com"
          required
        />
      </div>
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="+1 (555) 123-4567"
          required
        />
      </div>
      <div>
        <Label htmlFor="image">Restaurant Image</Label>
        <Input
          id="image"
          name="image"
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          required
        />
      </div>
    </div>
  );
}

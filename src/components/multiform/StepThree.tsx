import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface StepThreeProps {
  formData: {
    location: string;
    latitude: string;
    longitude: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: {
    location?: string;
    latitude?: string;
    longitude?: string;
  };
  touched: {
    location?: boolean;
    latitude?: boolean;
    longitude?: boolean;
  };
}

interface MapboxFeature {
  place_name: string;
  center: [number, number]; // [longitude, latitude]
}

export function StepThree({
  formData,
  handleInputChange,
  errors,
  touched,
}: StepThreeProps) {
  const [suggestions, setSuggestions] = useState<MapboxFeature[]>([]);

  const handleLocationChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleInputChange(e);

    if (value.length > 2) {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            value
          )}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch suggestions");
        }

        const data = await response.json();
        setSuggestions(data.features || []);
      } catch (error) {
        console.error("Error fetching location suggestions:", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };
  
  const selectSuggestion = (feature: MapboxFeature) => {
    const [longitude, latitude] = feature.center;
    setSuggestions([]);
    handleInputChange({
      target: { name: "stepThree.location", value: feature.place_name },
    } as React.ChangeEvent<HTMLInputElement>);
    handleInputChange({
      target: { name: "stepThree.latitude", value: latitude.toString() },
    } as React.ChangeEvent<HTMLInputElement>);
    handleInputChange({
      target: { name: "stepThree.longitude", value: longitude.toString() },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  // const selectSuggestion = (feature: MapboxFeature) => {
  //   const [longitude, latitude] = feature.center;
  //   setSuggestions([]);
  
  //   formik.setFieldValue("stepThree.location", feature.place_name);
  //   formik.setFieldValue("stepThree.latitude", latitude);
  //   formik.setFieldValue("stepThree.longitude", longitude);
  // };
  

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          name="stepThree.location"
          value={formData.location}
          onChange={handleLocationChange}
          placeholder="Enter restaurant address"
        />
        {touched.location && errors.location && (
          <p className="text-red-500 text-sm">{errors.location}</p>
        )}
        {suggestions.length > 0 && (
          <ul className="suggestions-list border border-gray-300 rounded-md mt-2">
            {suggestions.map((feature, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => selectSuggestion(feature)}
              >
                {feature.place_name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <Label htmlFor="latitude">Latitude</Label>
        <Input
          id="latitude"
          name="stepThree.latitude"
          type="number"
          step="any"
          value={formData.latitude}
          onChange={handleInputChange}
          placeholder="Enter latitude"
        />
        {touched.latitude && errors.latitude && (
          <p className="text-red-500 text-sm">{errors.latitude}</p>
        )}
      </div>
      <div>
        <Label htmlFor="longitude">Longitude</Label>
        <Input
          id="longitude"
          name="stepThree.longitude"
          type="number"
          step="any"
          value={formData.longitude}
          onChange={handleInputChange}
          placeholder="Enter longitude"
        />
        {touched.longitude && errors.longitude && (
          <p className="text-red-500 text-sm">{errors.longitude}</p>
        )}
      </div>
    </div>
  );
}

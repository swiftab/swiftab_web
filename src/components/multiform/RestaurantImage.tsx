import React, { useState, ChangeEvent } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Upload } from "lucide-react";
import imageCompression from 'browser-image-compression';

interface StepFourProps {
  formik: {
    values: { image: null }; // Change to File type
    setFieldValue: (field: string, value: File | null) => void;
  };
}

export function StepFour({ formik }: StepFourProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const options = {
          maxSizeMB: 0.3, // Set the maximum size in MB
          maxWidthOrHeight: 1920, // Set the maximum width or height
          useWebWorker: true,
        };
  
        // Compress the image
        const compressedBlob = await imageCompression(file, options);
  
        // Convert the Blob to a File
        const compressedFile = new File([compressedBlob], file.name, {
          type: file.type,
          lastModified: Date.now(),
        });
  
        // Set the compressed file as the preview
        setImagePreview(URL.createObjectURL(compressedFile));
  
        // Set the compressed file in formik
        formik.setFieldValue("stepFour.image", compressedFile);
  
        console.log("Compressed File:", compressedFile);
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }
  };
  

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      try {
        const options = {
          maxSizeMB: 0.3, // Set the maximum size in MB
          maxWidthOrHeight: 1920, // Set the maximum width or height
          useWebWorker: true,
        };

        // Compress the image
        const compressedFile = await imageCompression(file, options);
        setImagePreview(URL.createObjectURL(compressedFile)); // Preview the compressed image
        formik.setFieldValue("image", compressedFile); // Set the compressed file
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <Label
        htmlFor="image"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Upload Restaurant Image
      </Label>
      <div
        className={`flex flex-row items-center space-x-4 border-2 border-dashed rounded-lg p-2 transition-all duration-300 ${
          isDragging ? "border-primary bg-primary/10" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="relative group cursor-pointer flex-1">
          <Input
            id="image"
            name="image"
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            required
            className="sr-only"
          />
          <div className="flex items-center justify-center h-20 border border-gray-300 border-dashed rounded-md group-hover:border-primary transition-colors duration-300">
            <div className="text-center">
              <Upload className="mx-auto h-6 w-6 text-gray-400 group-hover:text-primary transition-colors duration-300" />
              <label
                htmlFor="image"
                className="mt-2 block text-xs font-medium text-primary hover:text-primary-dark cursor-pointer"
              >
                Upload
              </label>
            </div>
          </div>
        </div>
        <div className="flex-1">
          {imagePreview ? (
            <div className="relative h-20 w-full overflow-hidden rounded-md">
              <Image
                src={imagePreview}
                alt="Restaurant image preview"
                fill
                style={{ objectFit: "cover" }}
                className="transition-opacity duration-300"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-20 bg-gray-100 rounded-md">
              <p className="text-sm text-gray-500">No image selected</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
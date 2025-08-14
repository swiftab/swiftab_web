"use client";

import Container from "@/components/pages/table/floorplan/Container";
import { RestaurantLayout } from "@/components/pages/table/restaurantlayout";
import { LoadingSpinner } from "@/components/ui/loading";
import { fetchRestaurantInfo } from "@/hooks/tablehook/fetchreslayout";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";

export default function FloorPlans() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["diningAreas"],
    queryFn: fetchRestaurantInfo,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (
      (error && (error as Error).message === "Dining areas not found") ||
      data?.diningAreas?.length === 0
    ) {
      setIsModalOpen(true);
    }
  }, [error, data]);

  if (isLoading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#008080]/50 to-[#008080]/100">
        <LoadingSpinner desc="Fetching restaurant layout ... " />
      </div>
    );

  if (error && (error as Error).message !== "Dining areas not found") {
    return (
      <div>
        <p>Error: {(error as Error).message}</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-hidden overflow-y-hidden">
        <Container />
      </div>
      <RestaurantLayout isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}

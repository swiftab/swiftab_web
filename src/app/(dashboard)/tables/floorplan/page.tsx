"use client";

import { FullScreenLoader } from "@/components/Loading/FullScreen";
import Container from "@/components/pages/table/floorplan/Container";
import { RestaurantLayoutModal } from "@/components/pages/table/restaurantlayout";
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

  if (isLoading) return <FullScreenLoader />;

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
      <RestaurantLayoutModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}

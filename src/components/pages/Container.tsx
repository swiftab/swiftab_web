"use client";

import { useState, useEffect } from "react";
import { RestaurantSetupModal } from "../multiform/Container";

interface DashboardContentProps {
  children: React.ReactNode;
}

export function DashboardContent({ children }: DashboardContentProps) {
  const [isNewUser, setIsNewUser] = useState(true); // This should be determined by your authentication logic
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Check if the user is new when the component mounts
    // This is where you'd typically check your authentication state or make an API call
    if (isNewUser) {
      setIsModalOpen(true);
    }
  }, [isNewUser]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Here you might want to update the user's status in your backend
    setIsNewUser(false);
  };

  return (
    <>
      {children}
      <RestaurantSetupModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import { RestaurantSetupModal } from "../multiform/Container";

interface DashboardContentProps {
  children: React.ReactNode;
}

export function DashboardContent({ children }: DashboardContentProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isNewUser, setIsNewUser] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("Stored User:", storedUser);
    if (storedUser) {
      const user = JSON.parse(storedUser);
      console.log("Parsed User:", user);
      if (!user.restaurantId) {
        setIsNewUser(true);
        setIsModalOpen(true);
      }
    }
  }, []);  

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

// "use client";

// import React from "react";
// import { VerticalTimeline } from "./verticaltimeline";
// import { useQueries } from "@tanstack/react-query";
// import { fetchAllReservation } from "@/hooks/reservationhook/fetchreservation";
// import { FullScreenLoader } from "@/components/Loading/FullScreen";
// import { fetchRestaurantTables } from "@/hooks/tablehook/fetchrestable";

// export default function Container() {
//   const results = useQueries({
//     queries: [
//       {
//         queryKey: ["allReservations"],
//         queryFn: fetchAllReservation,
//       },
//       {
//         queryKey: ["restaurantTables"],
//         queryFn: fetchRestaurantTables,
//         select: (data) =>
//           data?.restaurantLayoutData
//             ? {
//                 diningAreas: data.restaurantLayoutData.diningAreas,
//               }
//             : { diningAreas: [] },
//       },
//     ],
//   });
  
//   // Extract results
//   const allReservations = results[0].data;
//   const allReservationsError = results[0].error;
//   const allReservationsLoading = results[0].isPending;
  
//   const restaurantTables = results[1].data;
//   const restaurantTablesError = results[1].error;
//   const restaurantTablesLoading = results[1].isPending;
  
//   // Check if any query is loading or has errors
//   const isLoading = allReservationsLoading || restaurantTablesLoading;
//   const isError = allReservationsError || restaurantTablesError;
  
//   if (isLoading || isError) return <div><FullScreenLoader /></div>;
  
//   // Extract dining areas
//   const diningAreas = restaurantTables?.diningAreas ?? [];
  
//   // Ensure reservations are in correct format
//   const formattedReservations = allReservations?.map((data) => ({
//     reservationInfo: data.reservationInfo,
//     status: data.status,
//   })) ?? [];
  
//   return (
//     <VerticalTimeline timelineData={formattedReservations} diningAreas={diningAreas} />
//   );
// }  
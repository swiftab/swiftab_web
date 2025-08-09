// import { Card, CardContent } from "@/components/ui/card";
// import React, { useState } from "react";

// type PromotionFormValues = {
//   title: string;
//   description: string;
//   type: "DISCOUNT" | "PAYMENT_OFFER" | "SPECIAL" | "SEASONAL";
//   discountPercentage?: number | null;
//   paymentMethod?: string | null;
//   startDate: string;
//   endDate: string;
//   isActive: boolean;
//   termsAndConditions: string;
// };
// export default function ExistingPromotions() {
//   const [promotions, setPromotions] = useState<PromotionFormValues[]>([]);
//   const getPromoTypeLabel = (type: PromotionFormValues["type"]): string => {
//     switch (type) {
//       case "DISCOUNT":
//         return "Discount Offer";
//       case "PAYMENT_OFFER":
//         return "Payment Promotion";
//       case "SPECIAL":
//         return "Special Offer";
//       case "SEASONAL":
//         return "Seasonal Promotion";
//       default:
//         return "Unknown Promotion";
//     }
//   };
//   return (
//     <div className="mt-8">
//       <h3 className="text-lg font-medium text-gray-800 mb-4">
//         Active Promotions
//       </h3>

//       {promotions.length === 0 ? (
//         <div className="text-center py-8 bg-gray-50 rounded-md border border-gray-200">
//           <Ticket className="h-12 w-12 text-gray-400 mx-auto mb-3" />
//           <p className="text-gray-500">No promotions have been created yet.</p>
//           <p className="text-gray-400 text-sm mt-1">
//             Create your first promotion using the form above.
//           </p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {promotions.map((promo) => (
//             <Card
//               key={promo.id}
//               className="overflow-hidden hover:shadow-md transition-shadow duration-300"
//             >
//               {promo.imageUrl && (
//                 <div className="h-40 w-full">
//                   <img
//                     src={promo.imageUrl}
//                     alt={promo.title}
//                     className="h-full w-full object-cover"
//                   />
//                 </div>
//               )}
//               <CardContent className="p-4">
//                 <div className="flex justify-between items-start mb-2">
//                   <h4 className="font-semibold text-gray-800">{promo.title}</h4>
//                   <span
//                     className={`text-xs px-2 py-1 rounded-full ${
//                       promo.isActive
//                         ? "bg-green-100 text-green-800"
//                         : "bg-gray-100 text-gray-800"
//                     }`}
//                   >
//                     {promo.isActive ? "Active" : "Inactive"}
//                   </span>
//                 </div>
//                 <p className="text-xs text-purple-600 mb-2">
//                   {getPromoTypeLabel(promo.type)}
//                 </p>
//                 <p className="text-sm text-gray-600 mb-3 line-clamp-2">
//                   {promo.description}
//                 </p>
//                 <div className="flex justify-between text-xs text-gray-500">
//                   <span>
//                     Starts: {new Date(promo.startDate).toLocaleDateString()}
//                   </span>
//                   <span>
//                     Ends: {new Date(promo.endDate).toLocaleDateString()}
//                   </span>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

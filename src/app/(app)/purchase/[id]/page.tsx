// "use client";

// import React, { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import PurchaseForm from "@/components/PurchaseForm/PurchaseForm";
// // import { fetchTicketData } from "@/utils/fetchTicketData";

// const PurchasePage = () => {
//   const searchParams = useSearchParams();
//   const ticketId = searchParams.get("id");

//   const [ticketDetails, setTicketDetails] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (ticketId) {
//         const data = await fetchTicketData(ticketId);
//         setTicketDetails(data);
//       }
//     };
//     fetchData();
//   }, [ticketId]);

//   if (!ticketDetails) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-lg text-red-500">
//           Loading ticket details or invalid ticket ID.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-10">
//       <div className="max-w-6xl mx-auto">
//         <PurchaseForm ticketDetails={ticketDetails} />
//       </div>
//     </div>
//   );
// };

// export default PurchasePage;
// "use client";

// import { useGetRequestConfrimQuery } from "@/redux/features/connection/connection.api";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import GlobalLoader from "@/components/common/GlobalLoader";
// import { formatDistanceToNow } from "date-fns";
// import React from "react";

// const ConfirmRequest = () => {
//   const { data: requestsData, isLoading, isError } = useGetRequestConfrimQuery({});

//   console.log("requestsData", requestsData);

//   if (isLoading) return <GlobalLoader />;
//   if (isError) return <p className="text-center text-red-500">Failed to load confirmed requests.</p>;

//   if (!requestsData?.data?.length) {
//     return <p className="text-center text-gray-500">No confirmed requests found.</p>;
//   }

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4 text-blue-600">Confirmed Requests</h1>
//       <ul className="space-y-4">
//         {requestsData.data.map((req: any) => (
//           <li
//             key={req._id}
//             className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
//           >
//             <div className="flex items-center gap-4">
//               <Avatar>
//                 <AvatarImage src={req.receiverId?.profileImg || "/default-avatar.png"} />
//                 <AvatarFallback>{req.receiverId?.name?.charAt(0) || "U"}</AvatarFallback>
//               </Avatar>
//               <div>
//                 <p className="font-semibold">{req.receiverId?.name}</p>
//                 <p className="text-sm text-gray-500">
//                   {req.status === "accepted" ? "✅ Your request was accepted" : "❌ Your request was rejected"}
//                 </p>
//                 <p className="text-xs text-gray-400">
//                   {formatDistanceToNow(new Date(req.updatedAt))} ago
//                 </p>
//               </div>
//             </div>
//             <span
//               className={`text-xs px-2 py-1 rounded ${
//                 req.status === "accepted"
//                   ? "bg-green-100 text-green-700"
//                   : "bg-red-100 text-red-700"
//               }`}
//             >
//               {req.status}
//             </span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ConfirmRequest;

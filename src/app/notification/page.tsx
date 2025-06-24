"use client";

import React from "react";
import { useGetSentRequestsQuery, useSendConnectionRequestMutation, useUpdateConnectionRequestMutation } from "@/redux/features/connection/connection.api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import GlobalLoader from "@/components/common/GlobalLoader";
import toast from "react-hot-toast";
import { useGetMEQuery } from "@/redux/features/userManagement/userMamagement.api";

const ReceivedNotifications = () => {

  const { data, isLoading, isError } = useGetSentRequestsQuery({});
   console.log("Received Requests Data:", data);
  const [updateConnection] = useUpdateConnectionRequestMutation({})

  const user = useGetMEQuery({});
  console.log("uder id", user.data)
console.log("user data", user.data?.user._id)

  const requests = data?.data || [];


const handleUpdate = async (id: string, status: "accepted" | "rejected") => {
  try {
    
    console.log(`Request ${status} successfully`, id);

  const res =   await updateConnection({ id, status}).unwrap();  
console.log("Update response:", res);

    toast.success(`Request ${status}`);
  } catch (err) {
    toast.error("Failed to update connection status");
  }
};


  if (isLoading) return <GlobalLoader />;
  if (isError) return <p className="text-center text-red-500">Failed to load requests.</p>;
  if (!requests.length) return <p className="text-center text-gray-500">No new requests.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">Received Connection Requests</h1>
      <ul className="space-y-4">
        {requests.map((req: any) => (
          <li
            key={req._id}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
          >
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={req.senderId?.profileImg || "/default-avatar.png"} />
                <AvatarFallback>{req.senderId?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{req.senderId?.name}</p>
                <p className="text-sm text-gray-500">
                  Sent {formatDistanceToNow(new Date(req.createdAt))} ago
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleUpdate(req._id, "accepted")}
              >
                Accept
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleUpdate(req._id, "accepted")}
              >
                Reject
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReceivedNotifications;

"use client";

import React from "react";
import {
  useGetRequestConfrimQuery,
  useGetSentRequestsQuery,
  useUpdateConnectionRequestMutation,
} from "@/redux/features/connection/connection.api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import GlobalLoader from "@/components/common/GlobalLoader";
import toast from "react-hot-toast";

const ReceivedNotifications = () => {
  const {
    data: requestsData,
    isLoading: requestsLoading,
    isError: requestsError,
  } = useGetRequestConfrimQuery({});

  const {
    data: sentData,
    isLoading: sentLoading,
    isError: sentError,
  } = useGetSentRequestsQuery({});

  const [updateConnection] = useUpdateConnectionRequestMutation();

  const requests = sentData?.data || [];

  const handleUpdate = async (id: string, status: "accepted" | "rejected") => {
    try {
      await updateConnection({ id, status }).unwrap();
      toast.success(`Request ${status}`);
    } catch {
      toast.error("Failed to update connection status");
    }
  };

  if (requestsLoading || sentLoading) return <GlobalLoader />;
  if (requestsError)
    return (
      <p className="text-center text-red-500">Failed to load received requests.</p>
    );
  if (sentError)
    return (
      <p className="text-center text-red-500">Failed to load sent requests.</p>
    );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">
        Received Connection Requests
      </h1>

      <ul className="mb-6">
        {requestsData?.data?.length ? (
          requestsData.data.map((req) => (
            <li
              key={req.receiverId._id}
              className="bg-green-50 p-3 rounded shadow text-sm text-gray-800"
            >
              ✅ <strong>{req.receiverId.name}</strong> has{" "}
              <span className="font-medium text-green-700">{req.status}</span>{" "}
              your request.
            </li>
          ))
        ) : (
          <li className="text-center text-gray-400">No confirmed requests yet.</li>
        )}
      </ul>

      <ul className="space-y-4">
        {requests.length ? (
          requests.map((req: any) => (
            <li
              key={req._id}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
            >
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={req.senderId?.profileImg || "/default-avatar.png"} />
                  <AvatarFallback>
                    {req.senderId?.name?.charAt(0) || "U"}
                  </AvatarFallback>
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
                  onClick={() => handleUpdate(req._id, "rejected")}
                >
                  Reject
                </Button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No new requests.</p>
        )}
      </ul>
    </div>
  );
};

export default ReceivedNotifications;

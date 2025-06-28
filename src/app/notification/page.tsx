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
import ProtectedRoute from "@/components/ProtectedRoute";
import { Bell } from "lucide-react";

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
  if (requestsError || sentError)
    return (
      <div className="flex items-center justify-center h-48 text-red-600 font-medium">
        🚫 Failed to load notifications.
      </div>
    );

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6 flex items-center justify-center gap-2">
          <Bell className="text-blue-500" /> All Notifications
        </h1>

        {/* ✅ Confirmed Requests */}
        <div className="mb-6 space-y-2">
          {requestsData?.data?.length ? (
            requestsData.data.map((req) => (
              <div
                key={req.receiverId._id}
                className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-md text-sm shadow-sm"
              >
                ✅ <strong>{req.receiverId.name}</strong> has{" "}
                <span className="font-semibold">{req.status}</span> your request.
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No confirmed requests yet.</p>
          )}
        </div>

        {/* 🔄 Pending Requests */}
        <div className="space-y-4">
          {requests.length ? (
            requests.map((req: any) => (
              <div
                key={req._id}
                className="flex items-center justify-between bg-white/70 border border-gray-200 p-4 rounded-xl shadow-sm backdrop-blur-md hover:shadow-md transition"
              >
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={req.senderId?.profileImg || "/default-avatar.png"} />
                    <AvatarFallback>
                      {req.senderId?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {req.senderId?.name}
                    </p>
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
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-8">No new requests found.</p>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ReceivedNotifications;

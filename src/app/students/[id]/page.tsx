"use client";

import React from "react";
import { useParams } from "next/navigation";

import { useGetSingleStudentQuery } from "@/redux/features/userManagement/userMamagement.api";
import UserDetails from "@/components/common/UserDetails";
import GlobalLoader from "@/components/common/GlobalLoader";
import { useSendConnectionRequestMutation } from "@/redux/features/connection/connection.api";
import toast from "react-hot-toast";

const StudentDetailPage = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetSingleStudentQuery(id as string);

  const [addSendRequest] = useSendConnectionRequestMutation();

  const handleConnect = async (receiverId: string) => {
    try {
      const response = await addSendRequest({ receiverId }).unwrap();
      console.log("Connection request sent:", response);

      if (response.success) {
        toast.success("Connection request sent successfully!");
      } else {
        toast.error("Failed to send connection request.");
      }
    } catch (error) {
      toast.error("Something went wrong or already sent a request.");
    }
  };

  if (isLoading) return <GlobalLoader />;
  if (isError || !data?.data)
    return <p className="p-6 text-red-500">Error loading student data.</p>;

  return (
    <div className="p-6">
      <UserDetails data={data.data} onConnect={handleConnect} />
    </div>
  );
};

export default StudentDetailPage;

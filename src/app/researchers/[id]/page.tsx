"use client";

import React from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

import GlobalLoader from "@/components/common/GlobalLoader";
import UserDetails from "@/components/common/UserDetails";

import {
  useGetSingleResearcherQuery,
} from "@/redux/features/userManagement/userMamagement.api";

import { useSendConnectionRequestMutation } from "@/redux/features/connection/connection.api";

const ResearcherDetailsPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetSingleResearcherQuery(id as string);
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
    return <p className="p-6 text-red-500">Error loading researcher data.</p>;

  return (
    <div className="p-4 sm:p-6 md:p-10">
      <UserDetails data={data.data} onConnect={handleConnect} />
    </div>
  );
};

export default ResearcherDetailsPage;

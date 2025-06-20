"use client"

import ResearcherDetails from '@/pages/userDetails/ResearcherDetails';
import { useGetSingleResearcherQuery } from '@/redux/features/userManagement/userMamagement.api';
import { useParams } from 'next/navigation';
import React from 'react'

const ResearcherDetailsPage = () => {

 const { id } = useParams(); 

  const { data, isLoading, isError } = useGetSingleResearcherQuery(id as string); // ✅ useQuery, not mutation

  console.log("teacher ID:", id); 
    console.log("teacher Data:", data); // ✅

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError || !data) return <p className="p-6 text-red-500">Error loading student data.</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Student Profile</h1>
      <ResearcherDetails data={data.data} />
    </div>
  );
}
export default ResearcherDetailsPage
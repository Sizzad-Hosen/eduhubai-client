"use client";

import React from "react";
import { useParams } from "next/navigation";
import { StudentDetails } from "@/pages/userDetails/StudentDetails";
import { useGetSingleStudentQuery } from "@/redux/features/userManagement/userMamagement.api";

const StudentDetailPage = () => {

  const { id } = useParams(); // ✅ dynamic [id] route থেকে id নিচ্ছে

  const { data, isLoading, isError } = useGetSingleStudentQuery(id as string); // ✅ useQuery, not mutation


  console.log("Student ID:", id); // ✅ id টি console এ দেখাচ্ছে
    console.log("Student Data:", data); // ✅


  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError || !data) return <p className="p-6 text-red-500">Error loading student data.</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Student Profile</h1>
      <StudentDetails data={data.data} />
    </div>
  );
};

export default StudentDetailPage;

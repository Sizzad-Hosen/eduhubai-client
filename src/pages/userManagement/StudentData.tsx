"use client";

import React, { useState } from "react";
import { useGetAllStudentsQuery } from "@/redux/features/userManagement/userMamagement.api";
import ProfileCard from "@/components/common/ProfileCard";
import { Button } from "@/components/ui/button";
import { TQueryParam } from "@/types/global";
import SearchBar from "@/components/common/Searchbar";
import { studentSearchableFields } from "@/constant/searchableFields";

const StudentsDataPage = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const limit = 6;

  const { data: studentData, isLoading, isFetching } = useGetAllStudentsQuery([
    { name: "page", value: page },
    { name: "limit", value: limit },
    { name: "sort", value: "id" },
    ...params,
  ]);

  const students = studentData?.data || [];
  const total = studentData?.meta?.total || 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6 space-y-6">
         <SearchBar
        searchableFields={studentSearchableFields}
        onSearch={(filters) =>
          setParams(
            Object.entries(filters).map(([name, value]) => ({ name, value }))
          )
        }
      />
      {isLoading ? (
        <p className="text-center py-10 text-lg">Loading students...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.length > 0 ? (
              students.map((student: any) => (
                <ProfileCard
                  userType="students"
                  key={student._id}
                  id={student._id}
                  name={student.name}
                  email={student.email}
                  profileImg={student.profileImg}
                  university={student.bsc || "N/A"}
                  skills={student.skill || []}
                  city={student.address?.city || "N/A"}
                  presentAddress={student.address?.presentAddress || "N/A"}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">No students found.</p>
            )}
          </div>

          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1 || isFetching}
            >
              Previous
            </Button>
            <span className="text-sm text-gray-600">Page {page} of {totalPages}</span>
            <Button
              variant="outline"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page >= totalPages || isFetching}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default StudentsDataPage;

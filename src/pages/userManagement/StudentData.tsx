"use client";

import React, { useState, useMemo } from "react";
import { useGetAllStudentsQuery } from "@/redux/features/userManagement/userMamagement.api";
import ProfileCard from "@/components/common/ProfileCard";
import { Button } from "@/components/ui/button";
import { TQueryParam } from "@/types/global";
import SearchBar from "@/components/common/Searchbar";
import { studentSearchableFields } from "@/constant/searchableFields";
import GlobalLoader from "@/components/common/GlobalLoader";

const StudentsDataPage = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const limit = 6;

  // Memoized queryParams to prevent unnecessary re-fetching
  const queryParams = useMemo(() => {
    return [
      { name: "page", value: page },
      { name: "limit", value: limit },
      { name: "sort", value: "id" },
      ...params,
    ];
  }, [page, params]);

  const {
    data: studentData,
    isLoading,
    isFetching,
    error,
  } = useGetAllStudentsQuery(queryParams);

  const students = studentData?.data?.data || [];
  const total = studentData?.data?.meta?.total || 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const handleSearch = (filters: Record<string, string | number>) => {
    const newParams = Object.entries(filters).map(([name, value]) => ({
      name,
      value,
    }));
    setParams(newParams);
    setPage(1); // Reset to page 1 on new search
  };

  return (
    <div className="p-6 space-y-6 min-h-[70vh]">
      <SearchBar
        searchableFields={studentSearchableFields}
        onSearch={handleSearch}
      />

      {isLoading ? (
        <GlobalLoader />
      ) : error ? (
        <p className="text-red-500 text-center">Something went wrong!</p>
      ) : (
        <>
          <div className="grid grid-cols-1 p-5 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.length > 0 ? (
              students.map((student: any) => (
                <ProfileCard
                  userType="students"
                  key={student._id}
                  id={student._id}
                  name={student.name}
                  role={student.role}
                  email={student.email}
                  profileImg={student.profileImg}
                  university={student.bsc || "N/A"}
                  skills={student.skill || []}
                  city={student.address?.city || "N/A"}
                  presentAddress={student.address?.presentAddress || "N/A"}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No students found.
              </p>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1 || isFetching}
            >
              Previous
            </Button>
            <span className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
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
